import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import pdfRouter from "./routes/pdfRoutes";
import dotenv from "dotenv";
import { API_ROUTES } from "./constants/routes";

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
app.use(
  API_ROUTES.UPLOADS,
  express.static(uploadsDir, {
    setHeaders: (res, filePath) => {
      const fileName = path.basename(filePath);
      res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    },
  })
);

app.use(`${API_ROUTES.BASE}${API_ROUTES.PDF.BASE}`, pdfRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});