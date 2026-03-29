import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser
} from "../controllers/user.controller.js";

const router = Router();

router.get("/users", asyncHandler(getAllUsers));
router.get("/users/:id", asyncHandler(getUserById));
router.post("/users", asyncHandler(createUser));
router.put("/users/:id", asyncHandler(updateUser));
router.delete("/users/:id", asyncHandler(deleteUser));

export default router;