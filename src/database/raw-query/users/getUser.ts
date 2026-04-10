import type { Users } from "../../../types/users";
import { db } from "../../connections/db";

async function getAllUsers(): Promise<Users[]> {
  try {
    const result = await db.query<Users>(`
     SELECT 
        users.*, 
        user_role.role_id, 
        role.name AS role_name,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'id', permission.id,
              'name', permission.name,
              'code', permission.code,
              'created_at', permission.created_at,
              'updated_at', permission.updated_at
            )
          ) FILTER (WHERE permission.id IS NOT NULL), '[]'
        ) AS permissions
      FROM users
      LEFT JOIN user_role ON users.id = user_role.user_id
      LEFT JOIN role ON user_role.role_id = role.id
      LEFT JOIN user_permission ON users.id = user_permission.user_id
      LEFT JOIN permission ON user_permission.permission_id = permission.id
      GROUP BY users.id, user_role.role_id, role.name
    `);
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getUserByEmail(email: string): Promise<Users> {
  const query = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
  const values = [email];

  const result = await db.query(query, values);
  return result.rows[0] || null;
}

export { getAllUsers, getUserByEmail };
