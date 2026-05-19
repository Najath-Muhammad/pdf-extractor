import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/responses";

// A lightweight custom error class controllers can throw to set the HTTP status.
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  // Determine status code — respect AppError, otherwise default to 500
  const statusCode =
    err instanceof AppError ? err.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR;

  const message =
    err instanceof Error ? err.message : "Internal Server Error";

  console.error(`❌ [Error Middleware] ${statusCode} — ${message}`);

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && err instanceof Error
      ? { stack: err.stack }
      : {}),
  });
};

