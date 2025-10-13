"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, req, res, next) => {
    console.error("🚨 Error caught:", err);
    // Handle Mongoose Validation Error
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        return res.status(400).json({
            message: "Validation failed",
            success: false,
            error: Object.keys(err.errors).reduce((acc, key) => {
                acc[key] = {
                    message: err.errors[key].message,
                    kind: err.errors[key].kind,
                    path: err.errors[key].path,
                    value: err.errors[key].value,
                };
                return acc;
            }, {}),
        });
    }
    // Handle CastError (invalid ObjectId etc.)
    if (err instanceof mongoose_1.default.Error.CastError) {
        return res.status(400).json({
            message: "Validation failed",
            success: false,
            error: {
                name: "CastError",
                path: err.path,
                value: err.value,
                message: err.message,
            },
        });
    }
    // Handle Duplicate Key Error
    if (err.code === 11000) {
        return res.status(400).json({
            message: "Validation failed",
            success: false,
            error: {
                name: "MongoServerError",
                code: 11000,
                keyValue: err.keyValue,
            },
        });
    }
    // Default (Internal Server Error)
    return res.status(500).json({
        message: "Internal Server Error",
        success: false,
        error: err.message || String(err),
    });
};
exports.default = errorHandler;
