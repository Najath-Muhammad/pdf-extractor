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
exports.PdfService = void 0;
const pdf_lib_1 = require("pdf-lib");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const responses_1 = require("../../constants/responses");
class PdfService {
    _resolvePath(filePath) {
        const absolute = path_1.default.isAbsolute(filePath)
            ? filePath
            : path_1.default.join(process.cwd(), filePath);
        if (!fs_1.default.existsSync(absolute)) {
            throw new Error(responses_1.RESPONSE_MESSAGES.FILE_NOT_FOUND(absolute));
        }
        return absolute;
    }
    getPageCount(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const absolute = this._resolvePath(filePath);
            const bytes = fs_1.default.readFileSync(absolute);
            const doc = yield pdf_lib_1.PDFDocument.load(bytes);
            return doc.getPageCount();
        });
    }
    extractPages(filePath, pages) {
        return __awaiter(this, void 0, void 0, function* () {
            const absolute = this._resolvePath(filePath);
            const bytes = fs_1.default.readFileSync(absolute);
            const source = yield pdf_lib_1.PDFDocument.load(bytes);
            const totalPages = source.getPageCount();
            const validPages = pages.filter((p) => p >= 1 && p <= totalPages);
            if (validPages.length === 0) {
                throw new Error(responses_1.RESPONSE_MESSAGES.NO_VALID_PAGES(totalPages));
            }
            const output = yield pdf_lib_1.PDFDocument.create();
            const copied = yield output.copyPages(source, validPages.map((p) => p - 1));
            copied.forEach((page) => output.addPage(page));
            const outputBytes = yield output.save();
            const fileName = `extracted-${Date.now()}.pdf`;
            const outputPath = path_1.default.join(process.cwd(), "uploads", fileName);
            fs_1.default.writeFileSync(outputPath, outputBytes);
            return `/uploads/${fileName}`;
        });
    }
}
exports.PdfService = PdfService;
