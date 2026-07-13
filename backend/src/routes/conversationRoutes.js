import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getConversations,
  createConversation,
} from "../controllers/conversationController.js";

const router = express.Router();

router.get("/", authMiddleware, getConversations);
router.post("/", authMiddleware, createConversation);

export default router;