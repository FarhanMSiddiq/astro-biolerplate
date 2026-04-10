import type { MigrationInterface, QueryRunner } from "typeorm";

export class SampleDataUserPermissionTable1739934468759
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user_permissions = [
      { user_id: 1, permission_id: 1 },
      { user_id: 1, permission_id: 2 },
      { user_id: 1, permission_id: 3 },
      { user_id: 2, permission_id: 1 },
    ];

    for (const user_permission of user_permissions) {
      await queryRunner.query(`
                              INSERT INTO "user_permission" ("user_id", "permission_id") 
                              VALUES ('${user_permission.user_id}', '${user_permission.permission_id}')
                          `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                          DELETE FROM "user_permission" WHERE "id" IN (1,2)
                `);
  }
}
