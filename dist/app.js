"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const pdfRoutes_1 = __importDefault(require("./routes/pdfRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./constants/routes");
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const uploadsDir = path_1.default.join(process.cwd(), "uploads");
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
}));
app.use(express_1.default.json());
app.use(routes_1.API_ROUTES.UPLOADS, express_1.default.static(uploadsDir, {
    setHeaders: (res, filePath) => {
        const fileName = path_1.default.basename(filePath);
        res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    },
}));
app.use(`${routes_1.API_ROUTES.BASE}${routes_1.API_ROUTES.PDF.BASE}`, pdfRoutes_1.default);
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
