import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./config/env.ts";
import { User } from "./entities/User.ts";
import { Appointment } from "./entities/Appointment.ts";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUsername,
  password: env.dbPassword,
  database: env.dbName,
  entities: [User, Appointment],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false
  }
});