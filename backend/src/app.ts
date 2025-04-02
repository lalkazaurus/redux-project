import express, { Request, Response } from "express";
import connectDB from "./config/db";
import cors from "./middleware/corsConfig";
import lessonRoutes from "./routes/lessonRoutes";

const app = express();

connectDB();

app.use(cors);
app.use(express.json());
app.use("/lessons", lessonRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running");
});

export default app;
