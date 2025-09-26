// src/routes/book.routes.ts
import { Router } from "express";
import {
    createBook,
    deleteBook,
    getAllBooks,
    getBookById,
    updateBook
} from "../controller/book.controler";

const bookRouter = Router();

// ================== Book Routes ==================

// 1️⃣ Create a new book
bookRouter.post("/", createBook);

// 2️⃣ Get all books with optional filtering, sorting, pagination
bookRouter.get("/", getAllBooks);

// 3️⃣ Get a single book by ID
bookRouter.get("/:bookId", getBookById);

// 4️⃣ Update a book by ID
bookRouter.patch("/:bookId", updateBook);
// bookRouter.put("/:bookId", updateBook);

// 5️⃣ Delete a book by ID
bookRouter.delete("/:bookId", deleteBook);

export default bookRouter;
