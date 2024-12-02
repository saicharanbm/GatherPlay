import express from "express";
import "dotenv/config";
import cors from "cors";
import { router } from "./routes/index";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);
app.listen(3000, () => {
  console.log("API Server is running on port 3000");
});
