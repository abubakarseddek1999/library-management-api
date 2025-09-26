// src/routes/borrow.route.ts
import { Router } from "express";
import {
    createBorrow,
    getAllBorrows,
    getBorrowById
} from "../controller/borrow.controller";

const router = Router();

// 1️⃣ Borrow a book
router.post("/", createBorrow);

// 2️⃣ Get all borrowed books summary
router.get("/", getAllBorrows);

// 3️⃣ Get a single borrow record by ID
router.get("/:borrowId", getBorrowById);

export default router;
