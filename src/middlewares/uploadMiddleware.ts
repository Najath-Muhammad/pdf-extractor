import multer from "multer";
import { Request } from "express";

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
      cb(new Error("Only PDF files allowed"));
    }
  },
});

export default upload;