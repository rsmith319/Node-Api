import { Router } from "express";
import authRoutes from "./auth.routes.ts";
import userRoutes from "./user.routes.ts";
import appointmentRoutes from "./appointment.routes.ts";

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(appointmentRoutes);

export default router;