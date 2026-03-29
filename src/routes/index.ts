import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import appointmentRoutes from "./appointment.routes.js";

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(appointmentRoutes);

export default router;