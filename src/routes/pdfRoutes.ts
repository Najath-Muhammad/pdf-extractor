import express from "express";
import upload from "../middlewares/uploadMiddleware";
import { PdfService } from "../services/implementation/PdfService";
import { PdfController } from "../controllers/implementation/PdfController";
import { API_ROUTES } from "../constants/routes";

const pdfService = new PdfService();
const pdfController = new PdfController(pdfService);

const pdfRouter = express.Router();

pdfRouter.post(
  API_ROUTES.PDF.UPLOAD,
  upload.single("pdf"),
  (req, res) => pdfController.uploadPdf(req, res)
);

pdfRouter.post(
  API_ROUTES.PDF.EXTRACT,
  (req, res) => pdfController.extractPdf(req, res)
);

export default pdfRouter;