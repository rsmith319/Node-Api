import "reflect-metadata";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AppointmentStatus } from "@/enums/AppointmentStatus.js";
import type { User } from "./User.js";

@Entity({ name: "appointments" })
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "timestamp" })
  appointmentDate!: Date;

  @Column({ type: "varchar", length: 500 })
  reason!: string;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status!: AppointmentStatus;

  @ManyToOne("User", {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "customerId" })
  customer!: Relation<User>;

  @ManyToOne("User", (user: User) => user.providerAppointments, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "providerId" })
  provider!: Relation<User>;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}