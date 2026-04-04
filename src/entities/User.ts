import "reflect-metadata";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Relation,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Role } from "../enums/Role.js";
import type { Appointment } from "./Appointment.js";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  firstName!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  lastName!: string;

  @Column({ type: "varchar", unique: true, length: 255, nullable: true })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  password!: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  phoneNumber!: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.CUSTOMER,
    nullable: true
  })
  role!: Role;

  @Column({ type: "boolean", default: true })
  enabled!: boolean;

  @OneToMany("Appointment", (appointment: Appointment) => appointment.customer)
  appointments!: Relation<Appointment[]>;

  @OneToMany("Appointment", (appointment: Appointment) => appointment.provider)
  providerAppointments!: Relation<Appointment[]>;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}