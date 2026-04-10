import type { MigrationInterface, QueryRunner } from "typeorm";

export class SampleDataRoleTable1739932767639 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roles = [{ name: "admin" }, { name: "user" }];

    for (const role of roles) {
      await queryRunner.query(`
                  INSERT INTO "role" ("name") 
                  VALUES ('${role.name}')
              `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              DELETE FROM "role" WHERE "id" IN (1,2)
    `);
  }
}
