"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfController = void 0;
const path_1 = __importDefault(require("path"));
const responses_1 = require("../../constants/responses");
class PdfController {
    constructor(_pdfService) {
        this._pdfService = _pdfService;
        this.uploadPdf = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    res.status(responses_1.HTTP_STATUS.BAD_REQUEST).json({ error: responses_1.RESPONSE_MESSAGES.NO_FILE_UPLOADED });
                    return;
                }
                const relPath = path_1.default
                    .relative(process.cwd(), req.file.path)
                    .replace(/\\/g, "/");
                const pageCount = yield this._pdfService.getPageCount(req.file.path);
                res.status(responses_1.HTTP_STATUS.OK).json({
                    message: responses_1.RESPONSE_MESSAGES.UPLOAD_SUCCESS,
                    filePath: relPath,
                    pageCount,
                    originalName: req.file.originalname,
                });
            }
            catch (err) {
                next(err);
            }
        });
        this.extractPdf = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { filePath, pages } = req.body;
            if (!filePath || !Array.isArray(pages) || pages.length === 0) {
                res.status(responses_1.HTTP_STATUS.BAD_REQUEST).json({ error: responses_1.RESPONSE_MESSAGES.MISSING_EXTRACT_PARAMS });
                return;
            }
            try {
                const downloadUrl = yield this._pdfService.extractPages(filePath, pages.map(Number));
                res.status(responses_1.HTTP_STATUS.OK).json({ message: responses_1.RESPONSE_MESSAGES.EXTRACT_SUCCESS, downloadUrl });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.PdfController = PdfController;
