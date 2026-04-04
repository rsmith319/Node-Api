import { AppDataSource } from "../data-source.ts";
import { User } from "../entities/User.ts";

export const userRepository = AppDataSource.getRepository(User);