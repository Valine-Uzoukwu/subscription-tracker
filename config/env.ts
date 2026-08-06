import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(process.cwd(), ".env") });
config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || "development"}.local`),
});

export const PORT = process.env.PORT ?? "5000";
export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const DB_URI = process.env.DB_URI ?? "";
export const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1h";