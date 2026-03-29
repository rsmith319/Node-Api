import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Role } from "../src/enums/Role";
import { Appointment } from "./Appointment.js";

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
  })
  role!: Role;

  @Column({ type: "boolean", default: true })
  enabled!: boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.customer)
  customerAppointments!: Appointment[];

  @OneToMany(() => Appointment, (appointment) => appointment.provider)
  providerAppointments!: Appointment[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}