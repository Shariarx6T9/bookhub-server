// server/controllers/booksController.js
import Book from "../models/Book.js";

export const createBook = async (req, res, next) => {
  try {
    const payload = req.body;
    const book = await Book.create(payload);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

export const getBooks = async (req, res, next) => {
  try {
    const { sort = "rating", order = "desc", limit = 0, userEmail, q } = req.query;
    const filter = {};
    if (userEmail) filter.userEmail = userEmail;
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ title: regex }, { author: regex }];
    }
    const sortObj = {};
    sortObj[sort] = order === "asc" ? 1 : -1;
    const books = await Book.find(filter).sort(sortObj).limit(Number(limit) || 0);
    res.json(books);
  } catch (err) {
    next(err);
  }
};

export const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    next(err);
  }
};
