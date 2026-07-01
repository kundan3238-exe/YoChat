import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Routes from "./routes/Routes.js";
import authRoutes from "./routes/authRoutes.js"

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api", Routes);

app.use("/api/auth",authRoutes);

export default app;
