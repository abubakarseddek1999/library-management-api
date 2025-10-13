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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
// ================== CREATE BOOK ==================
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, genre, isbn, description, copies, available } = req.body;
        // 1️⃣ Early check for duplicate ISBN
        const existingBook = yield book_model_1.Book.findOne({ isbn });
        if (existingBook) {
            // সরাসরি response না দিয়ে error throw করো
            const err = new Error("Book with this ISBN already exists");
            err.statusCode = 400;
            return next(err);
        }
        // 2️⃣ Create book
        const newBook = yield book_model_1.Book.create({
            title,
            author,
            genre,
            isbn,
            description,
            copies,
            available: available !== null && available !== void 0 ? available : true,
        });
        // ✅ Success response
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook,
        });
    }
    catch (error) {
        next(error); // সব error middleware-এ যাবে
    }
});
exports.createBook = createBook;
// ================== GET ALL BOOKS ==================
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = 10 } = req.query;
        const query = {};
        if (filter)
            query.genre = filter;
        const books = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: sort === "asc" ? 1 : -1 })
            .limit(Number(limit));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error); // সব error middleware-এ যাবে
    }
});
exports.getAllBooks = getAllBooks;
// ================== GET BOOK BY ID ==================
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        next(error); // সব error middleware-এ যাবে
    }
});
exports.getBookById = getBookById;
// ================== UPDATE BOOK ==================
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        // Only update the fields provided in req.body
        const updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, req.body, {
            new: true, // return the updated document
            runValidators: true, // enforce schema validations
        });
        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        // Update availability using static method
        yield book_model_1.Book.updateAvailability(bookId);
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        next(error); // সব error middleware-এ যাবে
    }
});
exports.updateBook = updateBook;
// ================== DELETE BOOK ==================
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const deletedBook = yield book_model_1.Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error); // সব error middleware-এ যাবে
    }
});
exports.deleteBook = deleteBook;
