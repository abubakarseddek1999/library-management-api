"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/book.routes.ts
const express_1 = require("express");
const book_controler_1 = require("../controller/book.controler");
const bookRouter = (0, express_1.Router)();
// ================== Book Routes ==================
// 1️⃣ Create a new book
bookRouter.post("/", book_controler_1.createBook);
// 2️⃣ Get all books with optional filtering, sorting, pagination
bookRouter.get("/", book_controler_1.getAllBooks);
// 3️⃣ Get a single book by ID
bookRouter.get("/:bookId", book_controler_1.getBookById);
// 4️⃣ Update a book by ID
bookRouter.patch("/:bookId", book_controler_1.updateBook);
// bookRouter.put("/:bookId", updateBook);
// 5️⃣ Delete a book by ID
bookRouter.delete("/:bookId", book_controler_1.deleteBook);
exports.default = bookRouter;
