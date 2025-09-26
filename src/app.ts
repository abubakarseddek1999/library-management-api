import express, { Application, Request, Response } from 'express';
import bookRouter from './routes/book.routes';
import borrowRouter from './routes/borrow.routes';

const app: Application = express();
app.use(express.json());  // <-- parse JSON bodies

// ================= ROUTES ==================
app.use('/api/books', bookRouter);
app.use('/api/borrow', borrowRouter); // borrow API route

// Root route
app.get("/", (req: Request, res: Response) => {
    res.send("Library Management API is running");
});

export default app;
