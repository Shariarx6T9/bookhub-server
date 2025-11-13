// server/models/Book.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  genre: { type: String, trim: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  summary: { type: String, trim: true },
  coverUrl: { type: String, trim: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true, index: true }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
