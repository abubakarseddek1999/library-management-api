"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Store sensitive data in env instead of hardcoding
        // Connect to MongoDB
        yield mongoose_1.default.connect(process.env.MONGODB_URI || "");
        console.log("✅ Connected to MongoDB using Mongoose!");
        server = app_1.default.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    }
    catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1);
    }
});
// Graceful shutdown (important for production)
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🔌 Closing MongoDB connection...");
    yield mongoose_1.default.connection.close();
    process.exit(0);
}));
startServer();
