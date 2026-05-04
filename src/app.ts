import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import pdfRouter from "./routes/pdfRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

app.use("/api/pdf", pdfRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});