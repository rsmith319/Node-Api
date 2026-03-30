import 'reflect-metadata'

import app from "./app.js";
import { AppDataSource } from "./data-source.js";
import { env } from "./config/env.js"

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");

    app.listen(env.port, "0.0.0.0", () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Error starting application:", error);
    process.exit(1);
  }
}

startServer();