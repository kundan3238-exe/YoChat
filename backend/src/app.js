import "./config/env.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Routes from "./routes/Routes.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";

const app = express();


app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json()); //? Middleware

app.use(express.urlencoded({ extended: true })); //? Converts html forms to req.body.

app.use(cookieParser());

app.use("/api", Routes);

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/users", userRoutes);

app.use("/api/conversations", conversationRoutes);

export default app;
