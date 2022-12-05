import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableJobs1670279294327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "jobs",
        columns: [
          { name: "id", type: "uuid", isNullable: false, isPrimary: true },
          { name: "description", type: "text", isNullable: false },
          { name: "company", type: "varchar", length: "50", isNullable: false },
          { name: "limit_date", type: "date", isNullable: false },
          { name: "status", type: "boolean", isNullable: false },
          { name: "max_applicant", type: "int", isNullable: true },
          { name: "id_recruiter", type: "uuid", isNullable: false },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: "fk_jobs_users",
            columnNames: ["id_recruiter"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("jobs", true, true, true);
  }
}
