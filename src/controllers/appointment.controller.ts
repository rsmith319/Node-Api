import { Request, Response } from "express";
import { Appointment } from "../entities/Appointment.ts";
import { AppointmentStatus } from "../enums/AppointmentStatus.ts";
import { appointmentRepository } from "../repositories/appointment.repository.ts";
import { userRepository } from "../repositories/user.repository.ts";

export async function createAppointment(req: Request, res: Response) {
  try {
    const { appointmentDate, reason, status, customerId, providerId } = req.body as {
      appointmentDate?: string;
      reason?: string;
      status?: AppointmentStatus;
      customerId?: string;
      providerId?: string;
    };

    if (!appointmentDate || !reason || !customerId || !providerId) {
      return res.status(400).json({
        message: "appointmentDate, reason, customerId, and providerId are required",
      });
    }

    const customer = await userRepository.findOne({
      where: { id: customerId },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const provider = await userRepository.findOne({
      where: { id: providerId },
    });

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    const appointment = appointmentRepository.create({
      appointmentDate: new Date(appointmentDate),
      reason,
      status: status ?? AppointmentStatus.PENDING,
      customer,
      provider,
    });

    const savedAppointment = await appointmentRepository.save(appointment);
    return res.status(201).json(savedAppointment);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create appointment",
      error,
    });
  }
}

export async function updateAppointment(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const appointment = await appointmentRepository.findOne({ where: { id } });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const payload = req.body as Partial<Appointment> & {
      customerId?: string;
      providerId?: string;
    };

    if (payload.customerId) {
      const customer = await userRepository.findOne({
        where: { id: payload.customerId },
      });

      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      appointment.customer = customer;
    }

    if (payload.providerId) {
      const provider = await userRepository.findOne({
        where: { id: payload.providerId },
      });

      if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
      }

      appointment.provider = provider;
    }

    if (payload.appointmentDate) {
      appointment.appointmentDate = new Date(payload.appointmentDate as unknown as string);
    }

    if (payload.reason !== undefined) {
      appointment.reason = payload.reason;
    }

    if (payload.status !== undefined) {
      appointment.status = payload.status;
    }

    const updatedAppointment = await appointmentRepository.save(appointment);
    return res.status(200).json(updatedAppointment);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update appointment",
      error,
    });
  }
}

export async function deleteAppointment(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const appointment = await appointmentRepository.findOne({ where: { id } });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await appointmentRepository.remove(appointment);
    return res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete appointment",
      error,
    });
  }
}

export async function getAllAppointments(req: Request, res: Response) {
  try {
    const appointments = await appointmentRepository.find({
      order: { appointmentDate: "ASC" },
    });

    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch appointments",
      error,
    });
  }
}

export async function getAppointmentById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid appointment id" });
    }

    const appointment = await appointmentRepository.findOne({
      where: { id },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch appointment",
      error,
    });
  }
}

export async function updateAppointmentStatus(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const { status } = req.body as { status: AppointmentStatus };

    const appointment = await appointmentRepository.findOne({ where: { id } });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (status !== undefined) {
      appointment.status = status;
    }

    const updatedAppointment = await appointmentRepository.save(appointment);
    return res.status(200).json(updatedAppointment);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update appointment status",
      error,
    });
  }
}
