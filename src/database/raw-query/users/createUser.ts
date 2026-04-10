import type { Users } from "../../../types/users";
import { db } from "../../connections/db";

async function createUser(
  nama: string,
  email: string,
  password: string,
  role_id: number,
): Promise<Users[]> {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const userResult = await client.query<Users>(
      `INSERT INTO users (nama, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [nama, email, password],
    );
    const user = userResult.rows[0];

    await client.query(
      `INSERT INTO user_role (user_id, role_id) VALUES ($1, $2)`,
      [user.id, role_id],
    );

    const rolePermissions = await client.query<{ permission_id: number }>(
      `SELECT permission_id FROM role_permission WHERE role_id = $1`,
      [role_id],
    );

    const permissionValues = rolePermissions.rows
      .map((perm) => `(${user.id}, ${perm.permission_id})`)
      .join(", ");

    if (permissionValues) {
      await client.query(
        `INSERT INTO user_permission (user_id, permission_id) VALUES ${permissionValues}`,
      );
    }

    await client.query("COMMIT");

    return [user];
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    throw err;
  } finally {
    client.release();
  }
}

export { createUser };
