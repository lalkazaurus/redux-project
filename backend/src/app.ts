import express, { Request, Response } from "express";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import cors from "./middleware/corsConfig";
import lessonRoutes from "./routes/lessonRoutes";
import cookieParser from "cookie-parser";
import compression from "compression";
import authentificationRoutes from "./routes/authentificationRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

connectDB();

app.use(cors);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use("/lessons", lessonRoutes);
app.use("/auth", authentificationRoutes);
app.use("/users", userRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running");
});

export default app;
