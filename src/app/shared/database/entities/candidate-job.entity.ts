import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { JobEntity } from "./job.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "candidates_jobs" })
export class CandidateJobEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "candidate_id" })
  candidateId!: string;

  @Column({ name: "job_id" })
  jobId!: string;

  @Column({ name: "success_indicator" })
  successIndicator?: boolean;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @ManyToOne(() => UserEntity, (entity) => entity.jobs)
  @JoinColumn({ name: "candidate_id", referencedColumnName: "id" })
  candidateEntity?: UserEntity;

  @ManyToOne(() => JobEntity, (entity) => entity.candidatesEntities)
  @JoinColumn({ name: "job_id", referencedColumnName: "id" })
  jobEntity?: JobEntity;
}
