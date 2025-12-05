import express from "express";
import cors from "cors";
import booksRouter from "./routes/books.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use("/api/books", booksRouter);

app.get("/", (req, res) => res.json({ message: "BookHub API is running", timestamp: new Date().toISOString() }));

app.use(errorHandler);

export default app;
