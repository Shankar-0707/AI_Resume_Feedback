import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ResumeCreation from "../models/ResumeCreation.js";
import pkg from "pdfkit";
// const { PDFDocument } = pkg;
const PDFDocument = pkg.default ? pkg.default : pkg;
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
dotenv.config();

const router = express.Router();


// Create RESUME using Gemini AI

router.post("/create", async (req, res) => {
    try{
        const { userId, name, email, phone, skills, experience, education } = req.body;

        if (!userId || userId === 'undefined' || userId === 'null') {
            console.error("Authentication Error: Missing or invalid userId received in request body.");
            // Send a clear client error (401 Unauthorized or 400 Bad Request)
            return res.status(401).json({ error: "User is not authenticated. Please log in again." });
        }

        const prompt = `
        Generate a professional single-page resume for:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Skills: ${skills.join(", ")}
        Experience: ${experience}
        Education: ${education}
        Make it concise and formatted in bullet points.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const aiText = result.response.text();


        // const response = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro/generateContent",
        //     {
        //         contents: [{ parts: [{ text: prompt }] }],
        //     },
        //     {
        //         headers: {
        //         "Content-Type": "application/json",
        //         "x-goog-api-key": process.env.GEMINI_API_KEY,
        //         },
        //     }
        // );


        // const aiText = response.data.candidates[0].content.parts[0].text;

        const newResume = new ResumeCreation({
            userId,
            name,
            email,
            phone,
            skills,
            experience,
            education,
            generatedResume: aiText,
        });

        await newResume.save();
        res.status(201).json({
            message: "Resume Created Successfully",
            resume : newResume
        });
    }
    catch(err){
        console.error("Error generating resume:", err);
        res.status(500).json({ error: "Error generating resume" });
    }
})



// Get resume by userID
router.get("/:userId", async (req, res) => {
    try{
        const resume = await ResumeCreation.find({userId : req.params.userId}).sort({ createdAt: -1 });
        if(resume.length === 0) {
            return res.status(404).json({ message: "No resumes found for this user." });
        }
        if(!resume) return res.status(404).json({ message: "Resume not found" });
        res.json(resume);
    }
    catch(err){
        res.status(500).json({ error: "Error fetching resume" });
    }
})

// Download Resume as PDF

router.get("/download/:resumeId", async (req, res) => {
    try{
        const resume = await ResumeCreation.findById(req.params.resumeId);
        if (!resume) return res.status(404).json({ message: "Resume not found" });

        const doc = new PDFDocument();
        const filePath = `./${resume.name}_Resume.pdf`;
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc.fontSize(20).text(`${resume.name}`, {align : "center"});
        doc.moveDown();
        doc.fontSize(12).text(`Email: ${resume.email}`);
        doc.text(`Phone: ${resume.phone}`);
        doc.moveDown();
        doc.text(resume.generatedResume);
        doc.end();

        stream.on("finish", () => {
            res.download(filePath, `${resume.name}_resume.pdf`, () => {
                fs.unlinkSync(filePath);
            });
        });
    }
    catch(err){
        res.status(500).json({ error: "Error downloading resume" });
    }
})


export default router;