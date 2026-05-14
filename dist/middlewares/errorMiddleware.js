"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const responses_1 = require("../constants/responses");
const errorHandler = (err, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error(`❌ [Error Middleware]: ${message}`);
    res.status(responses_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: message });
};
exports.errorHandler = errorHandler;
