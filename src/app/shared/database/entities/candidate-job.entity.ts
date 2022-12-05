import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EntityBase } from "./base.entity";
import { JobEntity } from "./job.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "candidates_jobs" })
export class CandidateJobEntity extends EntityBase {
  @Column({ name: "candidate_id" })
  candidateId!: string;

  @Column({ name: "job_id" })
  jobId!: string;

  @Column({ name: "success_indicator" })
  successIndicator?: boolean;

  @ManyToOne(() => UserEntity, (entity) => entity.jobs)
  @JoinColumn({ name: "candidate_id", referencedColumnName: "id" })
  candidateEntity?: UserEntity;

  @ManyToOne(() => JobEntity, (entity) => entity.candidatesEntities)
  @JoinColumn({ name: "job_id", referencedColumnName: "id" })
  jobEntity?: JobEntity;
}
