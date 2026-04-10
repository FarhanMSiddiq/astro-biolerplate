import type { Permission } from "../../../types/permission";
import { db } from "../../connections/db";

async function deletePermission(id: string): Promise<Permission | null> {
  try {
    const result = await db.query<Permission>(
      `DELETE FROM permission WHERE id = ${id} RETURNING *`,
    );
    return result.rows[0] || null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default deletePermission;
