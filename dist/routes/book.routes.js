"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/book.routes.ts
const express_1 = require("express");
const book_controller_1 = require("../controller/book.controller");
const bookRouter = (0, express_1.Router)();
// ================== Book Routes ==================
// 1️⃣ Create a new book
bookRouter.post("/", book_controller_1.createBook);
// 2️⃣ Get all books with optional filtering, sorting, pagination
bookRouter.get("/", book_controller_1.getAllBooks);
// 3️⃣ Get a single book by ID
bookRouter.get("/:bookId", book_controller_1.getBookById);
// 4️⃣ Update a book by ID
bookRouter.patch("/:bookId", book_controller_1.updateBook);
// bookRouter.put("/:bookId", updateBook);
// 5️⃣ Delete a book by ID
bookRouter.delete("/:bookId", book_controller_1.deleteBook);
exports.default = bookRouter;
