import { Document, Model } from "mongoose";


export type Genre =
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";


export interface IBook extends Document {
    title: string;
    author: string;
    genre: Genre;
    isbn: string;
    description?: string;
    available: boolean;   // Is book borrowable
    copies: number;       // Total copies available (non-negative)
    reduceCopies(quantity: number): Promise<void>;
}

export interface IBookModel extends Model<IBook> {
    updateAvailability(id: string): Promise<void>;
}