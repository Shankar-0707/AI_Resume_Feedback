import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import resumeRoutes from "./routes/resumeRoutes.js";
import feedbackRoutes from "./routes/feedbackroutes.js"

dotenv.config();
const app = express();


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // if you're using cookies or HTTP authentication
}));
app.use(express.json());

//MongoDb Connect
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB is connected"))
.catch((err) => console.log("MongoDB Error : ", err));

// Routes Placeholders
app.get("/", (req, res) => {
    res.send("AI Resume Feedback Backend Running");
})

app.get("/api", (req, res) => {
    res.send("AI Resume Feedback Backend Running /api route");
})

app.use("/api/resume", resumeRoutes);
app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("Server running on Port : ", PORT));