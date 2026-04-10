import type { MigrationInterface, QueryRunner } from "typeorm";

export class SampleDataPermissionTable1739933106045
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const permissions = [
      { name: "access users", code: "can_access_users" },
      { name: "access role", code: "can_access_role" },
      { name: "access permission", code: "can_access_permission" },
    ];

    for (const permission of permissions) {
      await queryRunner.query(`
                      INSERT INTO "permission" ( "name", "code") 
                      VALUES ('${permission.name}', '${permission.code}')
                  `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                  DELETE FROM "permission" WHERE "id" IN (1,2,3)
        `);
  }
}
