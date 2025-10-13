"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const borrow_routes_1 = __importDefault(require("./routes/borrow.routes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // <-- parse JSON bodies
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // শুধু React app এর জন্য allow
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
// ================= ROUTES ==================
app.use('/api/books', book_routes_1.default);
app.use('/api/borrow', borrow_routes_1.default); // borrow API route
// Root route
app.get("/", (req, res) => {
    res.send("Library Management API is running");
});
app.use(errorHandler_1.default); // Error handling middleware
exports.default = app;
