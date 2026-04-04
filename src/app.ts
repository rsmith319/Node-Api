import express from "express";
import cors from "cors";
import router from "./routes/index.ts";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { notFound } from "./middleware/notFound.midleware.js";

const app = express();

app.use(
  cors({
    origin: env.allowedOrigins,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

app.use("/api/v1", router);
app.use(notFound);
app.use(errorHandler);

export default app;