import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;
    if(!token) return res.status(401).json({ msg: "No token, access denied" });

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id : decoded.id };
        next();
    }
    catch(err){ 
        return res.status(401).json({ msg: "Invalid token" });
    }
}