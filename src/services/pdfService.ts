import { PDFDocument } from "pdf-lib";
import fs from "fs";

export const extractPages = async (
  filePath: string,
  pages: number[]
): Promise<string> => {
  const existingPdfBytes = fs.readFileSync(filePath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const newPdf = await PDFDocument.create();

  const copiedPages = await newPdf.copyPages(
    pdfDoc,
    pages.map((p) => p - 1)
  );

  copiedPages.forEach((page) => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();

  const newFilePath = `uploads/new-${Date.now()}.pdf`;
  fs.writeFileSync(newFilePath, pdfBytes);

  return newFilePath;
};