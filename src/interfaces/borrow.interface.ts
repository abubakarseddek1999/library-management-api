// src/interfaces/borrow.interface.ts
import { Document, Types } from "mongoose";

export interface IBorrow extends Document {
    book: Types.ObjectId;// Book ObjectId (reference)
    quantity: number; // Number of copies borrowed
    dueDate: Date; // Return date
    createdAt: Date;
    updatedAt: Date;
}
