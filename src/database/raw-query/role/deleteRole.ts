import type { Role } from "../../../types/role";
import { db } from "../../connections/db";

async function deleteRole(id: string): Promise<Role | null> {
  try {
    const result = await db.query<Role>(
      `DELETE FROM role WHERE id = ${id} RETURNING *`,
    );
    return result.rows[0] || null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default deleteRole;
