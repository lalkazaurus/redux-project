import express from "express";
import { getUserBySessionToken } from "../models/User";
import { get, merge } from "lodash";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const sessionToken = req.cookies?.Auth;

    if (!sessionToken) {
      res.status(403).json({ error: "No session token" });
      return;
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      res.status(403).json({ error: "Invalid session token" });
      return;
    }

    merge(req, { identity: existingUser });
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const isOwner = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  try {
    const { id } = req.params;
    const currentUserId: string = get(req, "identity._id");

    if (!currentUserId) {
      res.status(403).json({ error: "User not authenticated" });
      return;
    }

    const stringId = currentUserId.toString();

    if (stringId !== id) {
      res.status(403).json({ error: "User not authorized" });
      return;
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
