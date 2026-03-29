import "reflect-metadata"

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AppointmentStatus } from "../src/enums/AppointmentStatus";
import { User } from "../entities/User";

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

  @ManyToOne(() => User, (user) => user.customerAppointments, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "customerId" })
  customer!: User;

  @ManyToOne(() => User, (user) => user.providerAppointments, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "providerId" })
  provider!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}