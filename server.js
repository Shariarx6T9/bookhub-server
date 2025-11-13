import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// MongoDB connection (fixed for Windows SSL issue)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tlsAllowInvalidCertificates: true,
      retryWrites: true,
      w: "majority",
    });
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
