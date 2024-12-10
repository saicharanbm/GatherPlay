import client from "@repo/db/client";
import jwt from "jsonwebtoken";

export const getUserChannel = async (userId: string) => {
  const channel = await client.channel.findUnique({
    where: {
      userId,
    },
  });
  return channel;
};

export const getSubscribersCount = async (channelId: string) => {
  const subCount = await client.subscription.count({
    where: {
      channelId: channelId,
    },
  });
  return subCount;
};

export const getVideosCount = async (channelId: string) => {
  const videoCount = await client.video.count({
    where: {
      channelId: channelId,
    },
  });
  return videoCount;
};

export const generateAccessToken = (userId: string) => {
  console.log();
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  return jwt.sign({ userId, type: "access" }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  return jwt.sign({ userId, type: "refresh" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
