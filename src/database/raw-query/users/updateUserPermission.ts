import { db } from "../../connections/db";

async function updateUserPermissions(userId: string, permissionIds: number[]) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // Hapus semua permission user berdasarkan user_id
    await client.query(`DELETE FROM user_permission WHERE user_id = $1`, [
      userId,
    ]);

    // Tambahkan permission baru jika ada
    if (permissionIds.length > 0) {
      const insertValues = permissionIds
        .map((_, index) => `($1, $${index + 2})`)
        .join(",");
      await client.query(
        `INSERT INTO user_permission (user_id, permission_id) VALUES ${insertValues}`,
        [userId, ...permissionIds],
      );
    }

    await client.query("COMMIT");

    return { status: 200, message: "Permissions updated successfully" };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    throw err;
  } finally {
    client.release();
  }
}

export default updateUserPermissions;
