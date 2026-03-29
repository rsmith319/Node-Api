import { AppDataSource } from "../data-source.js";
import { User } from "../../entities/User.js";

export const userRepository = AppDataSource.getRepository(User);