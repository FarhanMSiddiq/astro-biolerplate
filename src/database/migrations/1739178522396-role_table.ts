import type { MigrationInterface, QueryRunner } from "typeorm";

export class RoleTable1739178522396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "role" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL UNIQUE,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "role"
        `);
    }

}
