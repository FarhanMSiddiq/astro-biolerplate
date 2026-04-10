import type { Users } from "../../../types/users";
import { db } from "../../connections/db";

async function deleteUser(id: string): Promise<Users | null> {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    await client.query(`DELETE FROM user_role WHERE user_id = $1`, [id]);

    await client.query(`DELETE FROM user_permission WHERE user_id = $1`, [id]);

    const result = await client.query<Users>(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id],
    );

    await client.query("COMMIT");

    return result.rows[0] || null;
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    throw err;
  } finally {
    client.release();
  }
}

export default deleteUser;
