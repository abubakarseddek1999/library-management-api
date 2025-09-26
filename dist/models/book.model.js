"use strict";
// src/models/book.model.ts
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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
// 1️⃣ Book Schema
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String,
        required: true,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    },
    isbn: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
}, { timestamps: true });
// 2️⃣ Instance Method: reduceCopies
bookSchema.methods.reduceCopies = function (quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.copies < quantity)
            throw new Error("Not enough copies available");
        this.copies -= quantity;
        if (this.copies === 0)
            this.available = false;
        yield this.save();
    });
};
// 3️⃣ Static Method: updateAvailability
bookSchema.statics.updateAvailability = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(id);
        if (book) {
            book.available = book.copies > 0;
            yield book.save();
        }
    });
};
// 4️⃣ Model Creation
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
