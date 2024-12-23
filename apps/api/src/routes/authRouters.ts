import { Router } from "express";

export const authRouter = Router();
import { signupSchema, loginSchema } from "../types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { hash, compare } from "../Scrypt";
import client from "@repo/db/client";
import { generateAccessToken, generateRefreshToken } from "../utils";
import { verifyUserMiddleware } from "../middlewares/verifyUserMiddleware";

authRouter.post("/signup", async (req, res) => {
  const response = signupSchema.safeParse(req.body);
  if (!response.success) {
    res.status(400).json({ message: "Please provide valid credentials" });
    return;
  }
  const hashedPassword = await hash(response.data.password.trim());
  try {
    const user = await client.user.create({
      data: {
        fullName: response.data.fullName.trim(),
        email: response.data.email.trim(),
        password: hashedPassword,
      },
    });
    res.json({ message: "User successfully registered" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: "Username or email already exists" });
  }
});
authRouter.post("/login", async (req, res) => {
  const response = loginSchema.safeParse(req.body);
  console.log(response);
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

    //generate refresh token
    const refreshToken = generateRefreshToken(user.id);

    //generate a access token jwt token
    const token = generateAccessToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json({
      message: {
        token,
        user: { id: user.id, fullName: user.fullName, email: user.email },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.post("/get-token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  // console.log(refreshToken);
  if (!refreshToken) {
    res
      .status(401)
      .json({ message: "Unauthorized: No refresh token provided" });
    return;
  }
  try {
    if (!process.env.JWT_SECRET) {
      res
        .status(500)
        .json({ message: "Internal Server Error: Missing JWT_SECRET" });
      return;
    }

    const decodedToken = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET
    ) as JwtPayload;

    const userId = decodedToken.userId;
    const user = await client.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.cookie("refreshToken", "", { httpOnly: true, expires: new Date(0) });
      res.status(401).json({ message: "Unauthorized: User not found" });
      return;
    }

    const token = generateAccessToken(user.id);
    res.json({ message: { token }, userId });
  } catch (error: any) {
    res.cookie("refreshToken", "", { httpOnly: true, expires: new Date(0) });

    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Unauthorized: Refresh token expired" });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Unauthorized: Invalid refresh token" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("refreshToken", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logout successful" });
});

authRouter.get("/me", verifyUserMiddleware, async (req, res) => {
  const user = await client.user.findUnique({
    where: {
      id: req.userId,
    },
  });
  console.log(req.headers);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json({
    message: {
      fullName: user.fullName,
      email: user.email,
      avatarUrl: user.avatarUrl,
    },
  });
});
