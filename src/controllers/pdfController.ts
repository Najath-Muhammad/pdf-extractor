import { Request, Response } from "express";
import { extractPages } from "../services/pdfService";

export const uploadPdf = (req: Request, res: Response) => {
  try {
    res.json({
      message: "File uploaded",
      filePath: req.file?.path,
    });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
};

export const extractPdf = async (req: Request, res: Response) => {
  const { filePath, pages } = req.body;

  try {
    const newFilePath = await extractPages(filePath, pages);
    res.json({ newFilePath });
  } catch (err) {
    res.status(500).json({ error: "Extraction failed" });
  }
};