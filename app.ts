import express from "express";
import { NODE_ENV, PORT } from "./config/env.ts"; // imports the PORT variable from the env.ts file
import userRouter from "./routes/user.routes.ts"; // imports the userRouter from the user.routes.ts file
import subscriptionRouter from "./routes/subscription.routes.ts";
import authRouter from "./routes/auth.routes.ts";
import connectDB from "./database/mongodb.ts"; // imports the connectDB function from the db.ts file

const app = express();

//ex:  auth routes by going to http://localhost:3000/api/v1/auth

app.use("/api/v1/auth", authRouter); // mounts the authRouter at the /api/v1/auth path
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API!");
});

app.listen(PORT, async () => {
  console.log(
    `Subscription Tracker API is running on http://localhost:${PORT}`,
  );
  await connectDB(); // calls the connectDB function to connect to the database when the server starts
});

export default app;
