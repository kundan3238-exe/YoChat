import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Routes from "./routes/Routes.js";

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

export default app;
