// src/controllers/book.controller.ts
import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { IBook } from "../interfaces/book.interface";

// ================== CREATE BOOK ==================
export const createBook = async (req: Request, res: Response) => {
    try {
        const { title, author, genre, isbn, description, copies, available } = req.body;

        // 1️⃣ Early check for duplicate ISBN
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({
                message: "Book with this ISBN already exists",
                success: false,
            });
        }

        // 2️⃣ Create book
        const newBook = await Book.create({
            title,
            author,
            genre,
            isbn,
            description,
            copies,
            available: available ?? true,
        });

        // Success response
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook,
        });
    } catch (error: any) {
        // 3️⃣ Handle race condition / duplicate key error (MongoDB)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Book with this ISBN already exists (duplicate detected by DB)",
            });
        }

        // General error
        res.status(500).json({
            success: false,
            message: "Error creating book",
            error: error.message,
        });
    }
};


// ================== GET ALL BOOKS ==================
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = 10 } = req.query;

        const query: any = {};
        if (filter) query.genre = filter;

        const books = await Book.find(query)
            .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error fetching books",
            error: error.message,
        });
    }
};

// ================== GET BOOK BY ID ==================
export const getBookById = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId);

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
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error fetching book",
            error: error.message,
        });
    }
};


// ================== UPDATE BOOK ==================
export const updateBook = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;

        // Only update the fields provided in req.body
        const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
            new: true,           // return the updated document
            runValidators: true, // enforce schema validations
        });

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        // Update availability using static method
        await Book.updateAvailability(bookId);

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error updating book",
            error: error.message,
        });
    }
};


// ================== DELETE BOOK ==================
export const deleteBook = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const deletedBook = await Book.findByIdAndDelete(bookId);

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
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error deleting book",
            error: error.message,
        });
    }
};
