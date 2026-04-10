import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { getPermissionByUser } from "../../../database/raw-query/permission/getPermission";
import { getRoleByUser } from "../../../database/raw-query/role/getRole";
import { getUserByEmail } from "../../../database/raw-query/users/getUser";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email dan Password diperlukan" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Email tidak ditemukan" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ message: "Password salah" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const permission = await getPermissionByUser(user.id);
    const role = await getRoleByUser(user.id);

    return new Response(
      JSON.stringify({
        message: "Login berhasil",
        data: {
          user: { id: user.id, nama: user.nama, email: user.email },
          permission: permission,
          role: role,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return new Response(JSON.stringify({ error: "Terjadi kesalahan" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
