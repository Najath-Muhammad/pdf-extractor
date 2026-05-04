import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";
import { IPdfService } from "../../interfaces/IPdfService";
import { RESPONSE_MESSAGES } from "../../constants/responses";

export class PdfService implements IPdfService {
  private resolvePath(filePath: string): string {
    const absolute = path.isAbsolute(filePath)
      ? filePath
      : path.join(process.cwd(), filePath);

    if (!fs.existsSync(absolute)) {
      throw new Error(RESPONSE_MESSAGES.FILE_NOT_FOUND(absolute));
    }

    return absolute;
  }

  async getPageCount(filePath: string): Promise<number> {
    const absolute = this.resolvePath(filePath);
    const bytes = fs.readFileSync(absolute);
    const doc = await PDFDocument.load(bytes);
    return doc.getPageCount();
  }

  async extractPages(filePath: string, pages: number[]): Promise<string> {
    const absolute = this.resolvePath(filePath);
    const bytes = fs.readFileSync(absolute);

    const source = await PDFDocument.load(bytes);
    const totalPages = source.getPageCount();

    const validPages = pages.filter((p) => p >= 1 && p <= totalPages);
    if (validPages.length === 0) {
      throw new Error(RESPONSE_MESSAGES.NO_VALID_PAGES(totalPages));
    }

    const output = await PDFDocument.create();
    const copied = await output.copyPages(source, validPages.map((p) => p - 1));
    copied.forEach((page) => output.addPage(page));

    const outputBytes = await output.save();
    const fileName = `extracted-${Date.now()}.pdf`;
    const outputPath = path.join(process.cwd(), "uploads", fileName);
    fs.writeFileSync(outputPath, outputBytes);

    return `/uploads/${fileName}`;
  }
}
