import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIResumeFeedback = async (resumeText) => {
  try {

   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an expert resume reviewer.
Analyze this resume and return JSON only with 4 fields:
{
  "strengths": ["Point 1", "Point 2"],
  "improvements": ["Point 1", "Point 2"],
  "keywords": ["Keyword1", "Keyword2"],
  "score": <0-100 number>
}

Resume Text:
${resumeText}
`;

    const result = await model.generateContent(prompt);
    const feedbackText = result.response.text();

    // Clean JSON extraction
    const jsonStart = feedbackText.indexOf("{");
    const jsonEnd = feedbackText.lastIndexOf("}") + 1;
    const jsonStr = feedbackText.slice(jsonStart, jsonEnd);
    const feedback = JSON.parse(jsonStr);

    return feedback;

  } catch (err) {
    console.error("Gemini Error:", err);
    return { error: "Gemini feedback generation failed" };
  }
};
