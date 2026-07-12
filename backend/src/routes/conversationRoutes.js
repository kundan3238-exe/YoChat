import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getConversations } from "../controllers/conversationController.js";

const router = express.Router();

router.get("/", authMiddleware, getConversations);

export default router;