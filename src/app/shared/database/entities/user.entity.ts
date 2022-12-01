import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EProfile } from "../../enums/profile.enum";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ type: "enum", enum: EProfile })
  profile!: EProfile;

  @Column()
  company?: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
