// src/models/borrow.model.ts
import { Schema, model } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// 1️⃣ Pre-save hook to reduce book copies
borrowSchema.pre("save", async function (next) {
  try {
    const book = await Book.findById(this.book);
    if (!book) throw new Error("Book not found");

    if (book.copies < this.quantity) {
      throw new Error("Not enough copies available to borrow");
    }

    // Reduce copies
    book.copies -= this.quantity;
    if (book.copies === 0) book.available = false;

    await book.save();
    next();
  } catch (err) {
    next(err as Error);
  }
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
