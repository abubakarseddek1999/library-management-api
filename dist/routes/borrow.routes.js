"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/borrow.route.ts
const express_1 = require("express");
const borrow_controller_1 = require("../controller/borrow.controller");
const router = (0, express_1.Router)();
// 1️⃣ Borrow a book
router.post("/", borrow_controller_1.createBorrow);
// 2️⃣ Get all borrowed books summary
router.get("/", borrow_controller_1.getAllBorrows);
// 3️⃣ Get a single borrow record by ID
router.get("/:borrowId", borrow_controller_1.getBorrowById);
exports.default = router;
