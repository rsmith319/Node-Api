import "reflect-metadata"
import { Request, Response } from "express";
import { userRepository } from "@/repositories/user.repository.ts";
import { User } from "../entities/User.ts";

export async function getAllUsers(_req: Request, res: Response) {
  try {
    const users = await userRepository.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch users", error });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userId = Array.isArray(id) ? id[0] : id;
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user", error });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const payload = req.body as Partial<User>;

    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.email ||
      !payload.password ||
      !payload.phoneNumber
    ) {
      return res.status(400).json({
        message: "firstName, lastName, email, password, and phoneNumber are required",
      });
    }

    const existingUser = await userRepository.findOne({
      where: { email: payload.email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const user = userRepository.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
      phoneNumber: payload.phoneNumber,
      role: payload.role,
      enabled: payload.enabled ?? true,
    });

    const savedUser = await userRepository.save(user);
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create user", error });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userId = Array.isArray(id) ? id[0] : id;
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const payload = req.body as Partial<User>;

    if (payload.email && payload.email !== user.email) {
      const existingUser = await userRepository.findOne({
        where: { email: payload.email },
      });

      if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

    userRepository.merge(user, payload);
    const updatedUser = await userRepository.save(user);

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update user", error });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userId = Array.isArray(id) ? id[0] : id;
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await userRepository.remove(user);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete user", error });
  }
}