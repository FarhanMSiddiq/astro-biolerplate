import type { Role } from "../../../types/role";
import { db } from "../../connections/db";

async function createRole(name: string): Promise<Role[]> {
  try {
    const result = await db.query<Role>(
      `INSERT INTO role (name) VALUES ('${name}') RETURNING *`,
    );
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export { createRole };
