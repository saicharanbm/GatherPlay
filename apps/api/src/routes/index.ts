import { Router } from "express";
import client from "@repo/db/client";

import { authRouter } from "./authRouters";
import { videoRouter } from "./videoRouter";
import { channelRouter } from "./channelRouter";

export const router = Router();

router.use("/auth", authRouter);
router.use("/videos", videoRouter);
router.use("/channel", channelRouter);
