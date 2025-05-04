import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/userController";
import { isAuthenticated, isOwner } from "../middleware";

const userRoutes: Router = Router();

userRoutes.get("/", isAuthenticated, getAllUsers);
userRoutes.delete("/:id", isAuthenticated, isOwner, deleteUser);
userRoutes.patch("/:id", isAuthenticated, isOwner, updateUser);

export default userRoutes;
