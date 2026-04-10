import type { MigrationInterface, QueryRunner } from "typeorm";

export class UserRoleTable1739178623125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_role" (
                "id" SERIAL PRIMARY KEY,
                "user_id" INT NOT NULL,
                "role_id" INT NOT NULL,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
                FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user_role"
        `);
  }
}
