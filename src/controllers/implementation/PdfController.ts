import { Request, Response } from "express";
import path from "path";
import { IPdfController } from "../interfaces/IPdfController";
import { IPdfService } from "../../services/interfaces/IPdfService";

export class PdfController implements IPdfController {
  constructor(private readonly pdfService: IPdfService) {}

  uploadPdf = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const relPath = path
        .relative(process.cwd(), req.file.path)
        .replace(/\\/g, "/");

      const pageCount = await this.pdfService.getPageCount(req.file.path);

      res.json({
        message: "File uploaded successfully",
        filePath: relPath,
        pageCount,
        originalName: req.file.originalname,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      res.status(500).json({ error: message });
    }
  };

  extractPdf = async (req: Request, res: Response): Promise<void> => {
    const { filePath, pages } = req.body as { filePath?: string; pages?: unknown };

    if (!filePath || !Array.isArray(pages) || pages.length === 0) {
      res.status(400).json({ error: "filePath and a non-empty pages array are required" });
      return;
    }

    try {
      const downloadUrl = await this.pdfService.extractPages(filePath, pages.map(Number));
      res.json({ message: "PDF extracted successfully", downloadUrl });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Extraction failed";
      res.status(500).json({ error: message });
    }
  };
}
