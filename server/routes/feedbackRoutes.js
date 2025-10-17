import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

//get all feedbacks

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const feedbacks = await Feedback.find({ userId }).sort({ createdAt: 1 }); // oldest to newest
    res.json(feedbacks);
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    res.status(500).json({ msg: "Error fetching feedbacks" });
  }
});

export default router;