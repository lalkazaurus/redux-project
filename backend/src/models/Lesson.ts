import { Schema, model } from "mongoose";

export interface ILesson {
  id: string;
  surname: string;
  date: string;
  link: string;
  time: string;
}

const LessonSchema = new Schema<ILesson>({
  id: { type: String, required: true, unique: true },
  surname: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String, required: true },
  time: { type: String, required: true },
});

const LessonModel = model<ILesson>("Lesson", LessonSchema);

export default LessonModel;
