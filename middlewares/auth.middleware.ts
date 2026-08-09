import jwt from "jsonwebtoken";
import User from "../models/user.model.ts";
import { JWT_SECRET } from "../config/env.ts";

const authorize = async (req: any, res: any, next: any) => {
  try {
    let token;

    if (
      req.headers?.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]; // retrieve the token from the header
    }
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // verify the token and decode it to get the user ID
    const decoded = jwt.verify(
      token,
      JWT_SECRET as string,
    ) as jwt.JwtPayload & {
      userId?: string;
    };

    // find the user in the database using the decoded user ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user; // attach the user object to the request for further use in the route handler
    next(); // pass control to the next middleware or route handler
  } catch (error: any) {
    res
      .status(401)
      .json({
        message: "Unauthorized",
        error: error?.message || String(error),
      });
  }
};

export default authorize;
