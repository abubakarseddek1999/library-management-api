// src/models/book.model.ts

import { model, Schema } from "mongoose";
import { Genre, IBook, IBookModel } from "../interfaces/book.interface";

// 1️⃣ Book Schema
const bookSchema = new Schema<IBook>(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        genre: {
            type: String,
            required: true,
            enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"] as Genre[],
        },
        isbn: { type: String, required: true, unique: true, trim: true },
        description: { type: String, trim: true },
        copies: { type: Number, required: true, min: 0 },
        available: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// 2️⃣ Instance Method: reduceCopies
bookSchema.methods.reduceCopies = async function (quantity: number) {
    if (this.copies < quantity) throw new Error("Not enough copies available");
    this.copies -= quantity;
    if (this.copies === 0) this.available = false;
    await this.save();
};

// 3️⃣ Static Method: updateAvailability
bookSchema.statics.updateAvailability = async function (id: string) {
    const book = await this.findById(id);
    if (book) {
        book.available = book.copies > 0;
        await book.save();
    }
};

// 4️⃣ Model Creation
export const Book = model<IBook, IBookModel>("Book", bookSchema);
