import type { Role } from "../../../types/role";
import { db } from "../../connections/db";

async function updateRole(id: number, name: string): Promise<Role | null> {
  try {
    const query = `
        UPDATE role 
        SET name = $1, updated_at = CURRENT_TIMESTAMP 
        WHERE id = $2 RETURNING *`;
    const values = [name, id];

    const result = await db.query<Role>(query, values);
    return result.rows[0] || null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default updateRole;
