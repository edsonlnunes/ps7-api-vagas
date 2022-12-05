import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableCandidatesJobs1670279795195
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "candidates_jobs",
        columns: [
          { name: "id", type: "uuid", isNullable: false, isPrimary: true },
          { name: "job_id", type: "uuid", isNullable: false },
          { name: "candidate_id", type: "uuid", isNullable: false },
          { name: "success_indicator", type: "boolean", isNullable: true },
          { name: "updated_at", type: "timestamp", isNullable: false },
          { name: "created_at", type: "timestamp", isNullable: false },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: "fk_candidates_jobs_jobs",
            columnNames: ["job_id"],
            referencedTableName: "jobs",
            referencedColumnNames: ["id"],
          }),
          new TableForeignKey({
            name: "fk_candidates_jobs_users",
            columnNames: ["candidate_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("candidates_jobs", true, true, true);
  }
}
