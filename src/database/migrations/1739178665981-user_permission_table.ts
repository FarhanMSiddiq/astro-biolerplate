import type { MigrationInterface, QueryRunner } from "typeorm";

export class UserPermissionTable1739178665981 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_permission" (
                "id" SERIAL PRIMARY KEY,
                "user_id" INT NOT NULL,
                "permission_id" INT NOT NULL,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
                FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user_permission"
        `);
  }
}
