import { Router } from "express";

export const authRouter = Router();
import { signupSchema } from "../types";
import jwt from "jsonwebtoken";
import { hash, compare } from "../Scrypt";
import client from "@repo/db/client";

authRouter.post("/signup", async (req, res) => {
  const response = signupSchema.safeParse(req.body);
  if (!response.success) {
    res.status(400).json({ message: "Please provide valid credentials" });
    return;
  }
  const hashedPassword = await hash(response.data.password);
  try {
    const user = await client.user.create({
      data: {
        username: response.data.username,
        email: response.data.email,
        password: hashedPassword,
      },
    });
    res.json({ message: "User successfully registered" });
  } catch (error) {
    res.status(409).json({ message: "Username or email already exists" });
  }
});
authRouter.post("/login", async (req, res) => {
  const response = signupSchema.safeParse(req.body);
  if (!response.success) {
    res.status(400).json({ message: "Please provide valid credentials" });
    return;
  }
  //check if the user exists
  try {
    const user = await client.user.findUnique({
      where: {
        email: response.data.email,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isPasswordValid = await compare(
      response.data.password,
      user.password
    );
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    // throw an error when the JWT_SECRET is not present in .env
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not set");
    }
    //generate a jwt token
    const token = jwt.sign(
      { userId: user.id, role: user.username },
      process.env.JWT_SECRET
    );

    res.json({
      message: {
        token,
        user: { id: user.id, username: user.username, email: user.email },
      },
    });
  } catch (error) {}
});
