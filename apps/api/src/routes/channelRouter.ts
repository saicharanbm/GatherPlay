import { Router } from "express";
import { channelSchema, uploadChannelSchema } from "../types";
import { verifyUserMiddleware } from "../middlewares/verifyUserMiddleware";
import client from "@repo/db/client";
import { getUserChannel } from "../utils";
import { getSecureUrl } from "../utils/s3";

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
channelRouter.get("/:slug", verifyUserMiddleware, async (req, res) => {
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

// get channel details of the user

channelRouter.get("/me", verifyUserMiddleware, async (req, res) => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized: User not found" });
    return;
  }
  try {
    const channel = await getUserChannel(req.userId);
    if (!channel) {
      res.status(404).json({ message: "Channel not found" });
      return;
    }
    res.json(channel);
  } catch (error) {
    res.status(404).json({ message: "Channel not found" });
  }
});

//get signed  url to upload avatar and cover image to s3 directly from the client without the fear of leaking any secrets

channelRouter.post("/getSecureUrl", verifyUserMiddleware, async (req, res) => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized: User not found" });
    return;
  }
  const request = uploadChannelSchema.safeParse(req.body);

  if (!request.success) {
    res.status(400).json({ message: "Please provide valid credentials" });
    return;
  }
  try {
    const user = await getUserChannel(req.userId);
    if (!user) {
      res.status(404).json({ message: "Channel not found" });
      return;
    }
    const avatarSecureUrl = await getSecureUrl(
      request.data.avatarName,
      request.data.avatarType
    );
    const headerSecureUrl = await getSecureUrl(
      request.data.headerName,
      request.data.headerType
    );
    res.json({ message: { avatarSecureUrl, headerSecureUrl } });
  } catch (error) {
    res.status(400).json({ message: "Please provide valid credentials" });
  }
});
