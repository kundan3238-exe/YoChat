import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import { getUsersForSidebar,searchUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/search", authMiddleware, searchUsers);
router.get("/",authMiddleware,getUsersForSidebar)

export default router;