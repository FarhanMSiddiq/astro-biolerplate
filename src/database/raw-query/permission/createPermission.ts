import type { Permission } from "../../../types/permission";
import { db } from "../../connections/db";

async function createPermission(
  name: string,
  code: string,
): Promise<Permission[]> {
  try {
    const result = await db.query<Permission>(
      `INSERT INTO permission (name , code) VALUES ('${name}' , '${code}') RETURNING *`,
    );
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export { createPermission };
