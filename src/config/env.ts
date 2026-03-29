import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3002,
  dbHost: process.env.DB_HOST || "",
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbUsername: process.env.DB_USERNAME || "",
  dbPassword: process.env.DB_PASSWORD || "",
  dbName: process.env.DB_NAME || "",
  allowedOrigins: [
    process.env.CLIENT_URL_1 || "http://localhost:3000",
    process.env.CLIENT_URL_2 || "http://localhost:5173"
  ]
};