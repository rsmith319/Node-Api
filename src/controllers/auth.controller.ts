import { Request, Response } from "express";
import { userRepository } from "../repositories/user.repository.js";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.status(200).json({
    message: "Login successful",
    user
  });
}