import type { MigrationInterface, QueryRunner } from "typeorm";

export class SampleDataRolePermissionTable1739933838767
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const role_permissions = [
      { role_id: 1, permission_id: 1 },
      { role_id: 1, permission_id: 2 },
      { role_id: 1, permission_id: 3 },
      { role_id: 2, permission_id: 1 },
    ];

    for (const role_permission of role_permissions) {
      await queryRunner.query(`
                          INSERT INTO "role_permission" ("role_id", "permission_id") 
                          VALUES ('${role_permission.role_id}', '${role_permission.permission_id}')
                      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                      DELETE FROM "role_permission" WHERE "id" IN (1,2,3,4)
            `);
  }
}
