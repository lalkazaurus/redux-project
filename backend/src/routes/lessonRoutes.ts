import { Router } from "express";
import {
  getLessons,
  getLessonsBySurname,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../controllers/lessonController";

const lessonRoutes: Router = Router();

lessonRoutes.get("/", getLessons);
lessonRoutes.get("/:surname", getLessonsBySurname);
lessonRoutes.post("/", createLesson);
lessonRoutes.put("/:id", updateLesson);
lessonRoutes.delete("/:id", deleteLesson);

export default lessonRoutes;
