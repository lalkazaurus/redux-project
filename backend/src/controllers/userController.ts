import express from "express";
import { deleteUserById, getUserById, getUsers } from "../models/User";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "ID is required" });
    }

    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ error: "Username is required" });
      return;
    }

    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.username = username;
    await user.save();

    res.status(200).json(user).end();
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
    return;
  }
};
