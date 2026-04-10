import type { Users } from "../../../types/users";
import { db } from "../../connections/db";

async function updateUser(
  id: number,
  nama: string,
  email: string,
  password: string,
  role_id: string,
): Promise<Users | null> {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    let query;
    let values;

    if (password === "") {
      query = `
        UPDATE users 
        SET nama = $1, email = $2, updated_at = CURRENT_TIMESTAMP 
        WHERE id = $3 RETURNING *`;
      values = [nama, email, id];
    } else {
      query = `
        UPDATE users 
        SET nama = $1, email = $2, password = $3, updated_at = CURRENT_TIMESTAMP 
        WHERE id = $4 RETURNING *`;
      values = [nama, email, password, id];
    }

    const result = await client.query<Users>(query, values);
    if (!result.rows[0]) throw new Error("User not found");

    await client.query(`UPDATE user_role SET role_id = $1 WHERE user_id = $2`, [
      role_id,
      id,
    ]);

    await client.query(`DELETE FROM user_permission WHERE user_id = $1`, [id]);

    const rolePermissions = await client.query(
      `SELECT permission_id FROM role_permission WHERE role_id = $1`,
      [role_id],
    );

    for (const row of rolePermissions.rows) {
      await client.query(
        `INSERT INTO user_permission (user_id, permission_id) VALUES ($1, $2)`,
        [id, row.permission_id],
      );
    }

    await client.query("COMMIT");

    return result.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    throw err;
  } finally {
    client.release();
  }
}

export default updateUser;
