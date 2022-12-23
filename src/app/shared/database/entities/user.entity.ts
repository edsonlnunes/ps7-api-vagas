import { Column, Entity, OneToMany } from "typeorm";
import { ExpProfile } from "../../enums/profile.enum";
import { EntityBase } from "./base.entity";
import { CandidateJobEntity } from "./candidate-job.entity";

@Entity({ name: "users" })
export class UserEntity extends EntityBase {
  @Column()
  name!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ type: "varchar" })
  profile!: ExpProfile;

  @Column()
  company?: string;

  @OneToMany(() => CandidateJobEntity, (entity) => entity.candidateEntity)
  jobs?: CandidateJobEntity[];
}
