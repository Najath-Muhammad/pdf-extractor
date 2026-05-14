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
  (req, res, next) => pdfController.uploadPdf(req, res, next)
);

pdfRouter.post(
  API_ROUTES.PDF.EXTRACT,
  (req, res, next) => pdfController.extractPdf(req, res, next)
);

export default pdfRouter;