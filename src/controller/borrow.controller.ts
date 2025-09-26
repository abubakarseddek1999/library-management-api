// src/controllers/borrow.controller.ts
import { Request, Response } from "express";
// import Book from "../models/book.model";
import { Borrow } from "../models/borrow.model";

// ================== CREATE BORROW ==================
export const createBorrow = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    const borrowed = await Borrow.create({
      book,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowed,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error borrowing book",
      error: error.message,
    });
  }
};

// ================== GET ALL BORROWS SUMMARY ==================
export const getAllBorrows = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching borrowed books summary",
      error: error.message,
    });
  }
};

// ================== GET BORROW BY ID ==================
export const getBorrowById = async (req: Request, res: Response) => {
  try {
    const borrowId = req.params.borrowId;
    const borrow = await Borrow.findById(borrowId).populate("book", "title isbn");

    if (!borrow) {
      return res.status(404).json({
        success: false,
        message: "Borrow record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Borrow record retrieved successfully",
      data: borrow,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching borrow record",
      error: error.message,
    });
  }
};
