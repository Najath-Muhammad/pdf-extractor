import { Request, Response, NextFunction } from "express";
import path from "path";
import { IPdfController } from "../../interfaces/IPdfController";
import { IPdfService } from "../../interfaces/IPdfService";
import { HTTP_STATUS, RESPONSE_MESSAGES } from "../../constants/responses";

export class PdfController implements IPdfController {
  constructor(private readonly _pdfService: IPdfService) {}

  uploadPdf = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: RESPONSE_MESSAGES.NO_FILE_UPLOADED });
        return;
      }

      const relPath = path
        .relative(process.cwd(), req.file.path)
        .replace(/\\/g, "/");

      const pageCount = await this._pdfService.getPageCount(req.file.path);

      res.status(HTTP_STATUS.OK).json({
        message: RESPONSE_MESSAGES.UPLOAD_SUCCESS,
        filePath: relPath,
        pageCount,
        originalName: req.file.originalname,
      });
    } catch (err) {
      next(err);
    }
  };

  extractPdf = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { filePath, pages } = req.body as { filePath?: string; pages?: unknown };

    if (!filePath || !Array.isArray(pages) || pages.length === 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: RESPONSE_MESSAGES.MISSING_EXTRACT_PARAMS });
      return;
    }

    try {
      const downloadUrl = await this._pdfService.extractPages(filePath, pages.map(Number));
      res.status(HTTP_STATUS.OK).json({ message: RESPONSE_MESSAGES.EXTRACT_SUCCESS, downloadUrl });
    } catch (err) {
      next(err);
    }
  };
}

