import express from "express";
import upload from "../middlewares/uploadMiddleware";
import { uploadPdf, extractPdf } from "../controllers/pdfController";

const router = express.Router();

router.post("/upload", upload.single("pdf"), uploadPdf);
router.post("/extract", extractPdf);

export default router;