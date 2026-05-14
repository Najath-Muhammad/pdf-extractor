import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/responses";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  const message = err instanceof Error ? err.message : "Internal Server Error";
  
  console.error(`❌ [Error Middleware]: ${message}`);

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: message });
};
