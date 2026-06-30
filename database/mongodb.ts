import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.ts";

if (!DB_URI) {
  throw new Error(
    "DB_URI is not defined in either production or development environment variables. Please check your .env files.",
  );
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI as string);
    console.log(`Connected to MongoDB in ${NODE_ENV} mode.`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
