import { Request, Response } from "express";
import { extractPages, getPdfPageCount } from "../services/pdfService";
import path from "path";

export const uploadPdf = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const relPath = path.relative(process.cwd(), req.file.path).replace(/\\/g, "/");
    const pageCount = await getPdfPageCount(req.file.path);

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

export const extractPdf = async (req: Request, res: Response) => {
  const { filePath, pages } = req.body;

  if (!filePath || !Array.isArray(pages) || pages.length === 0) {
    res.status(400).json({ error: "filePath and non-empty pages array are required" });
    return;
  }

  try {
    const downloadUrl = await extractPages(filePath, pages);
    res.json({
      message: "PDF extracted successfully",
      downloadUrl,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Extraction failed";
    res.status(500).json({ error: message });
  }
};