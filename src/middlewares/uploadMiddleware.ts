import multer from "multer";
import { Request } from "express";
import { RESPONSE_MESSAGES } from "../constants/responses";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req: Request, file, cb) => {
    cb(null, Date.now() + ".pdf");
  },
});

const upload = multer({
  storage,
  fileFilter: (req: Request, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error(RESPONSE_MESSAGES.ONLY_PDF_ALLOWED));
    }
  },
});

export default upload;