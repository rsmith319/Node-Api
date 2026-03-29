import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment
} from "../controllers/appointment.controller.js";

const router = Router();

router.get("/appointments", asyncHandler(getAllAppointments));
router.get("/appointments/:id", asyncHandler(getAppointmentById));
router.post("/appointments", asyncHandler(createAppointment));
router.put("/appointments/:id", asyncHandler(updateAppointment));
router.delete("/appointments/:id", asyncHandler(deleteAppointment));

export default router;