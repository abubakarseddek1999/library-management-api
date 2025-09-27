# Library Management API

A **Library Management System** built using **Express, TypeScript, and MongoDB (Mongoose)**.  
This project allows you to manage books, borrow books, and view borrowed books summary.

---

## 📂 Project Structure

library-management-api/
│
├─ dist/ # Compiled JS files
├─ node_modules/ # Dependencies
├─ src/
│ ├─ config/
│ │ └─ db.ts # MongoDB connection
│ ├─ controller/
│ │ ├─ book.controller.ts
│ │ └─ borrow.controller.ts
│ ├─ interfaces/
│ │ ├─ book.interface.ts
│ │ └─ borrow.interface.ts
│ ├─ middlewares/
│ │ └─ errorHandler.ts
│ ├─ models/
│ │ ├─ book.model.ts
│ │ └─ borrow.model.ts
│ ├─ routes/
│ │ ├─ book.routes.ts
│ │ └─ borrow.routes.ts
│ ├─ app.ts # Express app
│ └─ server.ts # Server entry
├─ .env # Environment variables
├─ package.json
├─ tsconfig.json
├─ package-lock.json
└─ README.md


---

## ⚡ Features

- **Books**
  - Create, read, update, delete books
  - Filtering, sorting, and pagination
  - Schema validation
  - Unique ISBN enforcement
- **Borrow**
  - Borrow books with availability check
  - Automatically reduce copies
  - Update availability if no copies left
  - Borrowed books summary (aggregation)
- **Error Handling**
  - Validation errors
  - Duplicate keys
  - Invalid ObjectId
  - General internal server errors

---

## 🛠 Tech Stack

- **Node.js & Express** — REST API framework  
- **TypeScript** — Strongly typed JavaScript  
- **MongoDB & Mongoose** — Database and ODM  
- **ts-node-dev / Nodemon** — Hot reloading for development  

---

## ⚡ Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd library-management-api


Install dependencies:

npm install


Create a .env file in the root:

MONGODB_URI=<your_mongodb_connection_string>
PORT=5000


Run the server in development:

npm run dev


Server runs at:

http://localhost:5000

🚀 API Endpoints
Books
Create Book

POST /api/books

Request Body:

{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "Overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}

Get All Books

GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=10

Get Book by ID

GET /api/books/:bookId

Update Book

PATCH /api/books/:bookId

Request Body Example:

{
  "copies": 10
}

Delete Book

DELETE /api/books/:bookId

Borrow
Borrow a Book

POST /api/borrow

Request Body Example:

{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

Borrowed Books Summary

GET /api/borrow

Response Example:

{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}

⚠️ Error Handling Examples

Validation Error

{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "path": "copies",
        "value": -5
      }
    }
  }
}


Duplicate ISBN

{
  "success": false,
  "message": "Book with this ISBN already exists"
}


Invalid ObjectId

{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "CastError",
    "path": "_id",
    "value": "invalid-id"
  }
}