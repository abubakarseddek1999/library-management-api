// src/controllers/book.controller.ts
import { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";
import { IBook } from "../interfaces/book.interface";

// ================== CREATE BOOK ==================
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, genre, isbn, description, copies, available } = req.body;

    // 1️⃣ Early check for duplicate ISBN
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      // সরাসরি response না দিয়ে error throw করো
      const err: any = new Error("Book with this ISBN already exists");
      err.statusCode = 400;
      return next(err);
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

    // ✅ Success response
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error: any) {
    next(error); // সব error middleware-এ যাবে
  }
};


// ================== GET ALL BOOKS ==================
export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error); // সব error middleware-এ যাবে
      }
};

// ================== GET BOOK BY ID ==================
export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error); // সব error middleware-এ যাবে
      }
};


// ================== UPDATE BOOK ==================
export const updateBook = async (req: Request, res: Response , next: NextFunction) => {
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
        next(error); // সব error middleware-এ যাবে
      }
};


// ================== DELETE BOOK ==================
export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error); // সব error middleware-এ যাবে
      }
};
