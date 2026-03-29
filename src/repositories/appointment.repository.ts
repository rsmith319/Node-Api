import { AppDataSource } from "../data-source.js";
import { Appointment } from "../../entities/Appointment.js";

export const appointmentRepository = AppDataSource.getRepository(Appointment);