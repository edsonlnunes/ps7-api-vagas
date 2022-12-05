import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CandidateJobEntity } from "./candidate-job.entity";
import { UserEntity } from "./user.entity";

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

  @OneToMany(() => CandidateJobEntity, (entity) => entity.jobEntity)
  candidatesEntities?: CandidateJobEntity[];
}
