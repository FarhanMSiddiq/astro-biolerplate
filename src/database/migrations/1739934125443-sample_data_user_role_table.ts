import type { MigrationInterface, QueryRunner } from "typeorm";

export class SampleDataUserRoleTable1739934125443
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user_roles = [
      { user_id: 1, role_id: 1 },
      { user_id: 2, role_id: 2 },
    ];

    for (const user_role of user_roles) {
      await queryRunner.query(`
                          INSERT INTO "user_role" ("user_id", "role_id") 
                          VALUES ('${user_role.user_id}', '${user_role.role_id}')
                      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                      DELETE FROM "user_role" WHERE "id" IN (1,2)
            `);
  }
}
