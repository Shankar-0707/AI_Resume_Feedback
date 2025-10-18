import mongoose from "mongoose";

const ResumeCreationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  email: String,
  phone: String,
  skills: [String],
  experience: String,
  education: String,
  summary: String,
  generatedResume: String, // final AI-generated text
}, { timestamps: true });

export default mongoose.model("ResumeCreation", ResumeCreationSchema);