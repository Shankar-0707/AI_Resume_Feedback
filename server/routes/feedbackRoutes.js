import express from "express";
import Feedback from "../models/Feedback.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//get all feedbacks

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const feedbacks = await Feedback.find({ userId }).sort({ createdAt: 1 }); 
    console.log(feedbacks)// oldest to newest
    res.json(feedbacks);
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    res.status(500).json({ msg: "Error fetching feedbacks" });
  }
});

// Get all feedbacks for the logged-in user
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.user.id }).sort({ createdAt: 1 });
    res.json(feedbacks);
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    res.status(500).json({ msg: "Error fetching feedbacks" });
  }
});

export default router;