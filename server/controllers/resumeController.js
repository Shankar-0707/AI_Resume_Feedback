import { PDFParse } from 'pdf-parse';
import fs from "fs";
import Resume from "../models/resume.js";
import Feedback from '../models/Feedback.js';
import { getAIResumeFeedback } from "../services/aiService.js";



//upload Resume
export const uploadResume = async (req, res) => {
    try{
        if(!req.file) return res.status(400).json({ msg: "No file uploaded" });

        // save file into DB
        const resume = await Resume.create({
            fileName : req.file.filename,
            filePath : req.file.path,
            uploadAt : new Date(),
        });

        res.status(200).json({ msg: "Resume uploaded successfully", resume });
    }
    catch(err){
        console.error("Upload Error:", err);
        res.status(500).json({ msg: "Server error" });
    }
};


// Analyze resume
export const analyzeResume = async (req, res) => {
    try{
        const resume = await Resume.findById(req.params.id);
        if(!resume) return res.status(404).json({ msg: "Resume not found" });

        const dataBuffer = fs.readFileSync(resume.filePath);
        const parser = new PDFParse({ data: dataBuffer });
        const textResult = await parser.getText();
        // const pdfdata = await pdfParser(dataBuffer);

        // send parsed text to AI service
        const feedback = await getAIResumeFeedback(textResult.text);
       if (feedback.error) {
      return res.status(500).json({ msg: "AI feedback failed" });
    }

    const newFeedback = await Feedback.create({
      resumeId: resume._id,
      strengths: feedback.strengths,
      improvements: feedback.improvements,
      keywords: feedback.keywords,
      score: feedback.score,
    });

    res.status(200).json({ feedback: newFeedback });
    }   
    catch(err){
        console.error("Analysis Error:", err);
        res.status(500).json({ msg: "Server error" });
    }
}