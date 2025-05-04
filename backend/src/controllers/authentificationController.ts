import express from "express";
import UserModel, { createUser, getUserByEmail } from "../models/User";
import { authentification, random } from "../helpers";

export const register = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentification: {
        password: authentification(salt, password),
        salt,
      },
    });

    res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const login = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.sendStatus(400);
    }

    const existingUser = await UserModel.findOne({ email })
      .select("+authentification.salt +authentification.password")
      .exec();

    if (!existingUser) {
      res.sendStatus(400);
    }

    const expectedHash = authentification(
      existingUser.authentification.salt,
      password,
    );

    if (existingUser.authentification.password !== expectedHash) {
      res.sendStatus(400);
    }

    const salt = random();
    existingUser.authentification.sessionToken = authentification(
      existingUser._id.toString(),
      salt,
    );

    await existingUser.save();

    res.cookie("Auth", existingUser.authentification.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    res.status(200).json(existingUser).end();
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const logout = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const sessionToken = req.cookies?.Auth;

    if (!sessionToken) {
      res.status(401).send("No session token");
    }

    const existingUser = await UserModel.findOne({
      "authentification.sessionToken": sessionToken,
    });

    if (!existingUser) {
      res.status(401).send("Invalid session");
    }

    existingUser.authentification.sessionToken = undefined;
    await existingUser.save();

    res.clearCookie("Auth", {
      domain: "localhost",
      path: "/",
    });

    res.status(200).send("Logged out successfully");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
