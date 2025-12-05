// server/controllers/booksController.js
import Book from "../models/Book.js";

export const createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book.toObject({ versionKey: false }));
  } catch (err) {
    next(err);
  }
};

export const getBooks = async (req, res, next) => {
  try {
    const { sort = "rating", order = "desc", limit = 50, userEmail, q, genre } = req.query;
    const filter = {};
    if (userEmail) filter.userEmail = userEmail;
    if (genre) filter.genre = genre;
    if (q) {
      filter.$text = { $search: q };
    }
    const sortObj = {};
    sortObj[sort] = order === "asc" ? 1 : -1;
    
    const books = await Book.find(filter)
      .select('-__v')
      .sort(sortObj)
      .limit(Math.min(Number(limit) || 50, 100))
      .lean();
    
    res.json(books);
  } catch (err) {
    next(err);
  }
};

export const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).select('-__v').lean();
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const updated = await Book.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    ).select('-__v').lean();
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
