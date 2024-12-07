import express from "express";
import "dotenv/config";
import cors from "cors";
import { router } from "./routes/index";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend domain
    credentials: true, // Enable credentials (cookies)
  })
);
app.use("/api/v1", router);
app.listen(3000, () => {
  console.log("API Server is running on port 3000");
});
