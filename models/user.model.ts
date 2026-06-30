import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User Name is required"],
    trim: true,
    minlength: [2, "User Name must be at least 2 characters long"],
    maxlength: [50, "User Name must be at most 50 characters long"],
  },
  email: {
    type: String,
    required: [true, "User Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "User Email is invalid"],
  },
  password: {
    type: String,
    required: [true, "User Password is required"],
    minlength: [6, "User Password must be at least 6 characters long"],
  },
  options: { timestamps: true },
});

const User = mongoose.model("User", userSchema);
export default User;
