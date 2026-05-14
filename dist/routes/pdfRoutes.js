"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const PdfService_1 = require("../services/implementation/PdfService");
const PdfController_1 = require("../controllers/implementation/PdfController");
const routes_1 = require("../constants/routes");
const pdfService = new PdfService_1.PdfService();
const pdfController = new PdfController_1.PdfController(pdfService);
const pdfRouter = express_1.default.Router();
pdfRouter.post(routes_1.API_ROUTES.PDF.UPLOAD, uploadMiddleware_1.default.single("pdf"), (req, res) => pdfController.uploadPdf(req, res));
pdfRouter.post(routes_1.API_ROUTES.PDF.EXTRACT, (req, res) => pdfController.extractPdf(req, res));
exports.default = pdfRouter;
