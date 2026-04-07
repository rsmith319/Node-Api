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
    process.env.CLIENT_URL_2 || "http://localhost:5173",
    process.env.REMOTE_ACCESS ||"http://127.0.0.1:3002",
    process.env.FRONTEND || "https://nice-coast-0d1e2a10f.2.azurestaticapps.net",
    
    
  ]
};