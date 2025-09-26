import express, { Application, Request, Response } from 'express';
import bookRouter from './routes/book.routes';

const app: Application = express();
app.use(express.json());  // <-- parse JSON bodies

app.use('/api/books', bookRouter);

app.get("/", (req, res) => {
    res.send("Library Management API is running");
});

export default app;