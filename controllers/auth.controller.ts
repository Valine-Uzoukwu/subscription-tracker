import mongoose from "mongoose";
import User from "../models/user.model.ts";
import { hash, compare, genSalt } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.ts";

export const signUp = async (req: any, res: any, next: any) => {
  const session = await mongoose.startSession(); // session of mongoose transaction

  try {
    session.startTransaction();
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = Object.assign(new Error("User already exists"), {
        statusCode: 400,
      });
      throw error;
    }

    //stores the hashed password in the database instead of the plain text password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    //creates new user in the database using mongoose transaction aborts if something goes wrong otherwise returns an array of newly created users
    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session },
    );

    //attaches json webtoken to user with following id
    const token = jwt.sign(
      { userId: newUsers[0]._id }, //newUsers[0]._id is the id of the newly created user
      JWT_SECRET as string,
      {
        expiresIn: (JWT_EXPIRES_IN ?? "1h") as string,
      },
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { token, user: newUsers[0] },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = Object.assign(new Error("User not found"), {
        statusCode: 404,
      });
      throw error;
    }

    //uses bcrypt to compare the hashed password stored in the database with the hashed version of the password provided by the user during sign-in
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      const error = Object.assign(new Error("Invalid password"), {
        statusCode: 401,
      });
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET as string, {
      expiresIn: (JWT_EXPIRES_IN ?? "1h") as string,
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: { token, user },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req: any, res: any, next: any) => {
  // implement the signout logic here
};
