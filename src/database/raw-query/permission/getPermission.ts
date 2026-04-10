import type { Permission } from "../../../types/permission";
import { db } from "../../connections/db";

async function getAllPermission(): Promise<Permission[]> {
  try {
    const result = await db.query<Permission>("SELECT * FROM permission");
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getPermissionByUser(id: number): Promise<Permission[]> {
  const query = ` SELECT p.*
    FROM user_permission up
    JOIN permission p ON up.permission_id = p.id
    WHERE up.user_id = $1`;
  const values = [id];

  const result = await db.query<Permission>(query, values);
  return result.rows;
}

async function checkPermissionUsed(id: string): Promise<Permission[]> {
  const query = `SELECT * FROM user_permission WHERE permission_id = $1`;
  const values = [id];

  const result = await db.query(query, values);
  return result.rows;
}

export { checkPermissionUsed, getAllPermission, getPermissionByUser };
