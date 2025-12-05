// server/models/Book.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, index: true },
  author: { type: String, required: true, trim: true, index: true },
  genre: { type: String, trim: true, index: true },
  rating: { type: Number, min: 0, max: 5, default: 0, index: true },
  summary: { type: String, trim: true },
  coverUrl: { type: String, trim: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true, index: true }
}, { timestamps: true });

bookSchema.index({ title: 'text', author: 'text' });
bookSchema.index({ userEmail: 1, rating: -1 });
bookSchema.index({ genre: 1, rating: -1 });

export default mongoose.model("Book", bookSchema);
