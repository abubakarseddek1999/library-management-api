# 📚 Library Management API

A robust **Library Management System** built with **Express.js**, **TypeScript**, and **MongoDB**. This RESTful API provides comprehensive functionality for managing books, handling borrowing operations, and tracking library inventory with advanced features like filtering, sorting, and pagination.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## 🚀 Features

### 📖 Book Management
- **CRUD Operations**: Create, read, update, and delete books
- **Advanced Filtering**: Filter by genre, author, availability status
- **Sorting & Pagination**: Efficient data retrieval with customizable sorting
- **Schema Validation**: Robust data validation with detailed error messages
- **ISBN Uniqueness**: Automatic enforcement of unique ISBN constraints
- **Inventory Tracking**: Real-time availability and copy management

### 📋 Borrowing System
- **Smart Borrowing**: Automatic availability checks before borrowing
- **Inventory Updates**: Automatic copy reduction and availability status updates
- **Due Date Management**: Flexible due date setting for borrowed items
- **Borrowing Summary**: Aggregated reports of all borrowed books
- **Quantity Control**: Support for borrowing multiple copies

### 🛡️ Error Handling
- **Comprehensive Validation**: Detailed validation error responses
- **Duplicate Prevention**: Intelligent handling of duplicate entries
- **Type Safety**: MongoDB ObjectId validation and casting
- **Graceful Failures**: User-friendly error messages for all scenarios

---

## 🏗️ Project Architecture

\`\`\`
library-management-api/

📦s📦src
 ┣ 📂config
 ┃ ┗ 📜db.ts
 ┣ 📂controller
 ┃ ┣ 📜book.controller.ts
 ┃ ┗ 📜borrow.controller.ts
 ┣ 📂interfaces
 ┃ ┣ 📜book.interface.ts
 ┃ ┗ 📜borrow.interface.ts
 ┣ 📂middlewares
 ┃ ┗ 📜errorHandler.ts
 ┣ 📂models
 ┃ ┣ 📜book.model.ts
 ┃ ┗ 📜borrow.model.ts
 ┣ 📂routes
 ┃ ┣ 📜book.routes.ts
 ┃ ┗ 📜borrow.routes.ts
 ┣ 📜app.ts
 ┗ 📜server.ts

\`\`\`

---

## 🛠️ Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | Latest LTS |
| **Express.js** | Web Framework | ^4.x |
| **TypeScript** | Type Safety | ^5.x |
| **MongoDB** | Database | ^6.x |
| **Mongoose** | ODM | ^7.x |
| **ts-node-dev** | Development Server | ^2.x |

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (v6.0 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd library-management-api
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/library-management
   PORT=5000
   NODE_ENV=development
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Verify installation**
   
   The server will be running at: `http://localhost:5000`

---

## 📡 API Documentation

### 📚 Books Endpoints

#### Create a New Book
\`\`\`http
POST /api/books
Content-Type: application/json

{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "Overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
\`\`\`

#### Get All Books (with filtering)
\`\`\`http
GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=10
\`\`\`

**Query Parameters:**
- `filter` - Filter by genre
- `sortBy` - Sort field (title, author, createdAt, etc.)
- `sort` - Sort direction (asc, desc)
- `limit` - Number of results per page
- `page` - Page number for pagination

#### Get Book by ID
\`\`\`http
GET /api/books/:bookId
\`\`\`

#### Update Book
\`\`\`http
PATCH /api/books/:bookId
Content-Type: application/json

{
  "copies": 10,
  "available": true
}
\`\`\`

#### Delete Book
\`\`\`http
DELETE /api/books/:bookId
\`\`\`

### 📋 Borrowing Endpoints

#### Borrow a Book
\`\`\`http
POST /api/borrow
Content-Type: application/json

{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
\`\`\`

#### Get Borrowed Books Summary
\`\`\`http
GET /api/borrow
\`\`\`

**Response Example:**
\`\`\`json
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
\`\`\`

---

## 🚨 Error Handling

The API provides comprehensive error handling with detailed responses:

### Validation Error
\`\`\`json
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
\`\`\`

### Duplicate ISBN Error
\`\`\`json
{
  "success": false,
  "message": "Book with this ISBN already exists"
}
\`\`\`

### Invalid ObjectId Error
\`\`\`json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "CastError",
    "path": "_id",
    "value": "invalid-id"
  }
}
\`\`\`

---

## 🧪 Development Scripts

\`\`\`bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
\`\`\`

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---


---

## 📞 Support

For support, email [your-email@example.com](abubakarseddek1999@gmail.com).

---

## 🙏 Acknowledgments

- **Express.js** team for the excellent web framework
- **MongoDB** team for the robust database solution
- **TypeScript** team for bringing type safety to JavaScript
- **Mongoose** team for the elegant MongoDB ODM

---

<div align="center">
  <p>Made with ❤️ by [Abu bakar]</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
