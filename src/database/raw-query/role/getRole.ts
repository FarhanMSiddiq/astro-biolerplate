import type { Role } from "../../../types/role";
import { db } from "../../connections/db";

async function getAllRole(): Promise<Role[]> {
  try {
    const result = await db.query<Role>("SELECT * FROM role");
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getRoleByUser(id: number): Promise<Role> {
  const query = `SELECT p.*
    FROM user_role up
    JOIN role p ON up.role_id = p.id
    WHERE up.user_id = $1 LIMIT 1`;
  const values = [id];

  const result = await db.query(query, values);
  return result.rows[0] || null;
}

async function checkRoleUsed(id: string): Promise<Role[]> {
  const query = `SELECT * FROM user_role WHERE role_id = $1`;
  const values = [id];

  const result = await db.query(query, values);
  return result.rows;
}

export { checkRoleUsed, getAllRole, getRoleByUser };
