export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

export const RESPONSE_MESSAGES = {
  UPLOAD_SUCCESS: "File uploaded successfully",
  UPLOAD_FAILED: "Upload failed",
  NO_FILE_UPLOADED: "No file uploaded",
  EXTRACT_SUCCESS: "PDF extracted successfully",
  EXTRACT_FAILED: "Extraction failed",
  MISSING_EXTRACT_PARAMS: "filePath and a non-empty pages array are required",
  ONLY_PDF_ALLOWED: "Only PDF files allowed",
  FILE_NOT_FOUND: (path: string) => `File not found: ${path}`,
  NO_VALID_PAGES: (totalPages: number) => `No valid pages selected. PDF has ${totalPages} page(s).`
};
