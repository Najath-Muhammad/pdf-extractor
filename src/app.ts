import express from "express";
import cors from "cors";
import pdfRoutes from "./routes/pdfRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/pdf", pdfRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});