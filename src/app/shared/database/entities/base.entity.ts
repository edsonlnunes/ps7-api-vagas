import { randomUUID } from "crypto";
import { BeforeInsert, BeforeUpdate, Column, PrimaryColumn } from "typeorm";

export class EntityBase {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "updated_at" })
  updatedAt!: Date;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @BeforeInsert()
  beforeCreate() {
    if (!this.id) {
      this.id = randomUUID();
    }
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }
}
