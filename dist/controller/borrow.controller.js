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
exports.getBorrowById = exports.getAllBorrows = exports.createBorrow = void 0;
// import Book from "../models/book.model";
const borrow_model_1 = require("../models/borrow.model");
// ================== CREATE BORROW ==================
const createBorrow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const borrowed = yield borrow_model_1.Borrow.create({
            book,
            quantity,
            dueDate,
        });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowed,
        });
    }
    catch (error) {
        next(error); // সব error middleware-এ যাবে
    }
});
exports.createBorrow = createBorrow;
// ================== GET ALL BORROWS SUMMARY ==================
const getAllBorrows = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        next(error); // সব error middleware-এ যাবে
    }
});
exports.getAllBorrows = getAllBorrows;
// ================== GET BORROW BY ID ==================
const getBorrowById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowId = req.params.borrowId;
        const borrow = yield borrow_model_1.Borrow.findById(borrowId).populate("book", "title isbn");
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
    }
    catch (error) {
        next(error); // সব error middleware-এ যাবে
    }
});
exports.getBorrowById = getBorrowById;
