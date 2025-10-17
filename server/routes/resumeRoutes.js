import express from "express";
import multer from "multer";
import { uploadResume, analyzeResume } from "../controllers/resumeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// File upload Config
const storage = multer.diskStorage({
    destination : (req, file, cb) => cb(null , "uploads/"),
    filename : (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

//Routes

router.post("/upload",authMiddleware, upload.single("resume"), uploadResume);
router.post("/analyze/:id",authMiddleware, analyzeResume);

export default router;