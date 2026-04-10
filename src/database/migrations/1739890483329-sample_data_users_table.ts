import bcrypt from "bcryptjs";
import type { MigrationInterface, QueryRunner } from "typeorm";

export class SampleDataUsersTable1739890483329 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = [
      {
        nama: "admin",
        email: "admin@gmail.com",
        password: "password123",
      },
      { nama: "user", email: "user@gmail.com", password: "password123" },
    ];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 8);

      await queryRunner.query(`
                INSERT INTO "users" ("nama", "email", "password") 
                VALUES ('${user.nama}', '${user.email}', '${hashedPassword}')
            `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "users" WHERE "id" IN (1,2)
        `);
  }
}
