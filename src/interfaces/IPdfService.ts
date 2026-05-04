/**
 * IPdfService — Service layer abstraction (Interface Segregation + Dependency Inversion).
 *
 * Controllers depend on this interface, NOT on the concrete PdfService class.
 * Swap the implementation at any time without touching controllers or routes.
 */
export interface IPdfService {
  /**
   * Returns the total page count of the PDF at the given file path.
   * @param filePath  Absolute or CWD-relative path to the uploaded PDF.
   */
  getPageCount(filePath: string): Promise<number>;

  /**
   * Extracts the requested pages from a PDF and writes the result to uploads/.
   * @param filePath  Absolute or CWD-relative path to the source PDF.
   * @param pages     1-based page numbers to extract.
   * @returns         A server-relative URL to the new PDF (e.g. `/uploads/extracted-123.pdf`).
   */
  extractPages(filePath: string, pages: number[]): Promise<string>;
}
