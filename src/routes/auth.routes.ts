import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { login } from "../controllers/auth.controller.ts";
import { createUser } from "@/controllers/user.controller.ts";

const router = Router();

router.post("/login", asyncHandler(login));


export default router;