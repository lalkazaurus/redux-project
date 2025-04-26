import { Request, Response } from "express";
import LessonModel, { ILesson } from "../models/Lesson";

export const getLessons = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const lessons = await LessonModel.find();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getLessonsBySurname = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { surname } = req.params;
    const lessons = await LessonModel.find({ surname });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createLesson = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id, surname, date, link, time }: ILesson = req.body;

    if (!id || !surname || !date || !link || !time) {
      res.status(400).json({
        error: "All fields are required: id, surname, date, link, time",
      });
      return;
    }

    const existingLesson = await LessonModel.findOne({ id });
    if (existingLesson) {
      res.status(400).json({ error: "A lesson with this id already exists" });
      return;
    }

    const newLesson = new LessonModel({ id, surname, date, link, time });
    const savedLesson = await newLesson.save();
    res.status(201).json(savedLesson);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateLesson = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { surname, date, link, time }: Partial<ILesson> = req.body;

    if (!surname || !date || !link || !time) {
      res
        .status(400)
        .json({ error: "All fields are required: surname, date, link, time" });
      return;
    }

    const updatedLesson = await LessonModel.findByIdAndUpdate(
      id,
      { surname, date, link, time },
      { new: true },
    );

    if (!updatedLesson) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    res.json(updatedLesson);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteLesson = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedLesson = await LessonModel.findByIdAndDelete(id);

    if (!deletedLesson) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    res.json({ message: "Lesson deleted successfully", lesson: deletedLesson });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
