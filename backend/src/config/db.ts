import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`MongoDB Connection Error: ${errMessage}`);
    process.exit(1);
  }
};

export default connectDB;
