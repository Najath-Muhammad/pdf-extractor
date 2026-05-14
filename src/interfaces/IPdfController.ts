import { Request, Response, NextFunction } from "express";

/**
 * IPdfController — Controller layer abstraction.
 *
 * Keeps the route file decoupled from any concrete controller implementation.
 * Routes bind HTTP verbs to these handler signatures.
 */
export interface IPdfController {
  /**
   * Handles PDF upload requests.
   * Reads the file placed by multer, retrieves its page count,
   * and responds with metadata (filePath, pageCount, originalName).
   */
  uploadPdf(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Handles page-extraction requests.
   * Reads filePath + pages from the request body,
   * delegates extraction to the service, and responds with a downloadUrl.
   */
  extractPdf(req: Request, res: Response, next: NextFunction): Promise<void>;
}
