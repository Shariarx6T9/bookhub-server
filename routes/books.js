import express from "express";
import { createBook, getBooks, getBook, updateBook, deleteBook } from "../controllers/booksController.js";

const router = express.Router();

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

// convenience route to get books by user email
router.get("/user/:email", async (req, res, next) => {
  req.query.userEmail = req.params.email;
  next();
}, getBooks);

export default router;
