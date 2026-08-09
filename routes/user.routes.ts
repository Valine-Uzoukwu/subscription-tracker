import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.ts";
import authorize from "../middlewares/auth.middleware.ts";

const userRouter = Router();

userRouter.get("/", getUsers);

// Note: you can chain middlewares in the route handler as long as then end in next() to pass control to the next middleware or controller function)
//admin authorization middleware can be added here to restrict access to only admin users
userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => res.send({ title: "CREATE a new user" }));

userRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE user details by ID" }),
);

userRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE user by ID" }),
);

export default userRouter;
