import { Router } from "express";
import { verifyUserMiddleware } from "../middlewares/verifyUserMiddleware";
import client from "@repo/db/client";
import { S3 } from "@aws-sdk/client-s3";

if (
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_REGION
) {
  throw new Error("AWS credentials not found");
}

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

export const videoRouter = Router();

videoRouter.get("/feed", async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 10;
  const category = req.query.category ? req.query.category.toString() : "";
  // get skip videos count to add pagination using prisma

  const skip = (page - 1) * limit;
  const categoryFilter = category ? { category } : {};

  const videos = await client.video.findMany({
    where: categoryFilter,
    skip,
    take: limit,
    orderBy: { created_at: "desc" },
  });
  const vodeoCount = await client.video.count({ where: categoryFilter });

  res.json({
    videos,
    total_pages: Math.ceil(vodeoCount / limit),
    current_page: page,
  });
});
videoRouter.post("/getSecureUrl", verifyUserMiddleware, (req, res) => {
  res.send("upload");
});
videoRouter.post("/{videoId}", (req, res) => {
  res.send("upload");
});
