import express from "express";
import cors from "cors";
import booksRouter from "./routes/books.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.use("/api/books", booksRouter);

app.get("/", (req, res) => res.json({ message: "BookHub API is running" }));

app.use(errorHandler);

export default app;
