import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user";

@Entity({ name: "jobs" })
export class JobEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ length: 50 })
  company!: string;

  @Column({ name: "limit_date" })
  limitDate!: Date;

  @Column()
  status!: boolean;

  @Column({ name: "max_applicant" })
  maxApplicant!: number;

  @Column({ name: "id_recruiter" })
  recruiterId!: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "id_recruiter", referencedColumnName: "id" })
  recruiterEntity?: UserEntity;
}
