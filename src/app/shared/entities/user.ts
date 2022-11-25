import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({ length: 50 })
    name!: string;

  @Column({ unique: true, length: 50 })
    username!: string;

  @Column({ length: 50 })
    password!: string;

  @Column({ length: 10 })
    profile!: string;

  @Column({ length: 50 })
    company?: string;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
