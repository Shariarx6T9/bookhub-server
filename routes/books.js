import express from "express";
import { createBook, getBooks, getBook, updateBook, deleteBook } from "../controllers/booksController.js";
import rateLimiter from "../middlewares/rateLimiter.js";

const router = express.Router();

router.use(rateLimiter(15 * 60 * 1000, 200));

router.post("/", createBook);
router.get("/", getBooks);

// convenience route to get books by user email (must come before /:id)
router.get("/user/:email", async (req, res, next) => {
  req.query.userEmail = req.params.email;
  next();
}, getBooks);

router.get("/:id", getBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
