import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/Book.js";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("Missing MONGO_URI in .env");
  process.exit(1);
}
const books = [
  { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", rating: 4.6, summary: "A shepherd's journey to follow his dream and find treasure.", coverUrl: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Atomic Habits", author: "James Clear", genre: "Self-help", rating: 4.7, summary: "Small habits compound into remarkable results.", coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", genre: "Psychology", rating: 4.5, summary: "Explores the two systems that drive the way we think.", coverUrl: "https://images.unsplash.com/photo-1526318472351-c75fcf070cf0?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Sapiens", author: "Yuval Noah Harari", genre: "History", rating: 4.6, summary: "A brief history of humankind.", coverUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Clean Code", author: "Robert C. Martin", genre: "Programming", rating: 4.4, summary: "Principles, patterns, and practices of writing clean code.", coverUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "The Pragmatic Programmer", author: "Andrew Hunt, David Thomas", genre: "Programming", rating: 4.5, summary: "Practical advice for software developers.", coverUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Deep Work", author: "Cal Newport", genre: "Productivity", rating: 4.4, summary: "Rules for focused success in a distracted world.", coverUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "The Lean Startup", author: "Eric Ries", genre: "Business", rating: 4.2, summary: "How today's entrepreneurs use continuous innovation.", coverUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Hooked", author: "Nir Eyal", genre: "Product Design", rating: 4.1, summary: "How to build habit-forming products.", coverUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "The Four Agreements", author: "Don Miguel Ruiz", genre: "Spirituality", rating: 4.3, summary: "A practical guide to personal freedom.", coverUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Meditations", author: "Marcus Aurelius", genre: "Philosophy", rating: 4.4, summary: "Stoic reflections for living a good life.", coverUrl: "https://images.unsplash.com/photo-1512717778859-2f9d0a78d0a9?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Man's Search for Meaning", author: "Viktor E. Frankl", genre: "Psychology", rating: 4.7, summary: "Finding purpose through suffering.", coverUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Zero to One", author: "Peter Thiel", genre: "Business", rating: 4.0, summary: "Notes on startups, or how to build the future.", coverUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", genre: "Self-help", rating: 4.1, summary: "A counterintuitive approach to living a good life.", coverUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Drive", author: "Daniel H. Pink", genre: "Psychology", rating: 4.0, summary: "What truly motivates us.", coverUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "The Power of Habit", author: "Charles Duhigg", genre: "Self-help", rating: 4.3, summary: "Why we do what we do in life and business.", coverUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", genre: "Self-help", rating: 4.5, summary: "Powerful lessons in personal change.", coverUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Born a Crime", author: "Trevor Noah", genre: "Memoir", rating: 4.6, summary: "Stories from a South African childhood.", coverUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Educated", author: "Tara Westover", genre: "Memoir", rating: 4.5, summary: "A memoir about family, loss and the struggle for a better life.", coverUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "The Artist's Way", author: "Julia Cameron", genre: "Creativity", rating: 4.0, summary: "A spiritual path to higher creativity.", coverUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "On Writing", author: "Stephen King", genre: "Writing", rating: 4.4, summary: "A memoir of the craft.", coverUrl: "https://images.unsplash.com/photo-1526318472351-c75fcf070cf0?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Dune", author: "Frank Herbert", genre: "Science Fiction", rating: 4.2, summary: "Epic science fiction novel of politics and power.", coverUrl: "https://images.unsplash.com/photo-1526318472351-c75fcf070cf0?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "1984", author: "George Orwell", genre: "Dystopia", rating: 4.4, summary: "A chilling vision of totalitarianism.", coverUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Brave New World", author: "Aldous Huxley", genre: "Dystopia", rating: 4.0, summary: "A dystopian classic exploring technology and control.", coverUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", rating: 4.6, summary: "Bilbo's adventure in Middle-earth.", coverUrl: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", rating: 4.7, summary: "The beginning of Harry Potter's journey.", coverUrl: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80", userName: "Seeder", userEmail: "seed@demo.com" }
];

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB for seeding...");
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log("Seeded books successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

run();
