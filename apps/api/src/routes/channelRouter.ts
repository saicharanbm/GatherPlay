import { Router } from "express";
import { channelSchema } from "../types";
import { verifyUserMiddleware } from "../middlewares/verifyUserMiddleware";
import client from "@repo/db/client";

export const channelRouter = Router();
channelRouter.post("/", verifyUserMiddleware, async (req, res) => {
  const input = channelSchema.safeParse(req.body);
  if (!input.success) {
    res.status(400).json({ message: "Please provide valid credentials" });
    return;
  }
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized: User not found" });
    return;
  }
  try {
    const channel = await client.channel.create({
      data: {
        userId: req.userId,
        name: input.data.name,
        description: input.data.description,
        slug: input.data.slug,
      },
    });
  } catch (error) {
    res;
  }
});

//view channel
channelRouter.get("\:slug", verifyUserMiddleware, async (req, res) => {
  const slug = req.params.slug;
  if (!slug) {
    res.status(400).json({ message: "Please provide valid slug" });
    return;
  }
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized: User not found" });
    return;
  }
  const channel = await client.channel.findUnique({
    where: { slug },
    include: { videos: true },
  });
  if (!channel) {
    res.status(404).json({ message: "Channel not found" });
    return;
  }
  res.json(channel);
});
