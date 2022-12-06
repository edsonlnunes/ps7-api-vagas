import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { EntityBase } from "./base.entity";
import { CandidateJobEntity } from "./candidate-job.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "jobs" })
export class JobEntity extends EntityBase {
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

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "id_recruiter", referencedColumnName: "id" })
  recruiterEntity?: UserEntity;

  @OneToMany(() => CandidateJobEntity, (entity) => entity.jobEntity)
  inscriptions?: CandidateJobEntity[];
}
