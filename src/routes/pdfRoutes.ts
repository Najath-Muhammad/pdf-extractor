import express from "express";
import upload from "../middlewares/uploadMiddleware";
import { PdfService } from "../services/implementation/PdfService";
import { PdfController } from "../controllers/implementation/PdfController";

const pdfService = new PdfService();
const pdfController = new PdfController(pdfService);

const pdfRouter = express.Router();

pdfRouter.post(
  "/upload",
  upload.single("pdf"),
  (req, res) => pdfController.uploadPdf(req, res)
);

pdfRouter.post(
  "/extract",
  (req, res) => pdfController.extractPdf(req, res)
);

export default pdfRouter;