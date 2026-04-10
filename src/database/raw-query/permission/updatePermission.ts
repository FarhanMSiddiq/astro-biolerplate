import type { Permission } from "../../../types/permission";
import { db } from "../../connections/db";

async function updatePermission(
  id: number,
  name: string,
  code: string,
): Promise<Permission | null> {
  try {
    const query = `
        UPDATE permission 
        SET name = $1, code = $2, updated_at = CURRENT_TIMESTAMP 
        WHERE id = $3 RETURNING *`;
    const values = [name, code, id];

    const result = await db.query<Permission>(query, values);
    return result.rows[0] || null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default updatePermission;
