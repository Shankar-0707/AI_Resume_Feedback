import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
  strengths: [String],
  improvements: [String],
  keywords: [String],
  score: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Feedback", feedbackSchema);
