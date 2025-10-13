import express, { Application, Request, Response } from 'express';
import bookRouter from './routes/book.routes';
import borrowRouter from './routes/borrow.routes';
import errorHandler from './middlewares/errorHandler';
import cors from "cors";

const app: Application = express();
app.use(express.json());  // <-- parse JSON bodies

app.use(cors({
    origin: "http://localhost:3000", // শুধু React app এর জন্য allow
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
    credentials: true
  }));


// ================= ROUTES ==================
app.use('/api/books', bookRouter);
app.use('/api/borrow', borrowRouter); // borrow API route

// Root route
app.get("/", (req: Request, res: Response) => {
    res.send("Library Management API is running");
});

app.use(errorHandler); // Error handling middleware
export default app;
