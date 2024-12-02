import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import client from "@repo/db/client";

export const verifyUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment variables");
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    const user = await client.user.findUnique({
      where: { id: decodedToken.userId },
    });

    if (!user || !user.id) {
      res.status(401).json({ message: "Unauthorized: User not found" });
      return;
    }

    req.userId = user.id; // Attach userId to request object
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }
};
