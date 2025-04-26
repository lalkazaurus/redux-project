import { Router } from "express";
import {
  login,
  logout,
  register,
} from "../controllers/authentificationController";

const authentificationRoutes: Router = Router();

authentificationRoutes.post("/register", register);
authentificationRoutes.post("/login", login);
authentificationRoutes.post("/logout", logout);

export default authentificationRoutes;
