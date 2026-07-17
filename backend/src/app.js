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


const allowedOrigins = [
  "http://localhost:5173",
  "https://yo-chat-silk.vercel.app",
  "https://yo-chat-chy7z0oka-kundan-atels-projects.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow tools like Postman or same-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
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
