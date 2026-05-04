import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";

export const extractPages = async (
  filePath: string,
  pages: number[]
): Promise<string> => {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }

  const existingPdfBytes = fs.readFileSync(absolutePath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const totalPages = pdfDoc.getPageCount();

  const validPages = pages.filter((p) => p >= 1 && p <= totalPages);
  if (validPages.length === 0) {
    throw new Error(`No valid pages selected. PDF has ${totalPages} pages total.`);
  }

  const newPdf = await PDFDocument.create();

  const copiedPages = await newPdf.copyPages(
    pdfDoc,
    validPages.map((p) => p - 1)
  );

  copiedPages.forEach((page) => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();

  const newFileName = `extracted-${Date.now()}.pdf`;
  const newFilePath = path.join(process.cwd(), "uploads", newFileName);
  fs.writeFileSync(newFilePath, pdfBytes);

  return `/uploads/${newFileName}`;
};

export const getPdfPageCount = async (filePath: string): Promise<number> => {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }

  const pdfBytes = fs.readFileSync(absolutePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  return pdfDoc.getPageCount();
};