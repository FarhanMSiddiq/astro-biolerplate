import type { MigrationInterface, QueryRunner } from "typeorm";

export class RolePermissionTable1739933663522 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "role_permission" (
                "id" SERIAL PRIMARY KEY,
                "role_id" INT NOT NULL,
                "permission_id" INT NOT NULL,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE,
                FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "role_permission"
        `);
  }
}
