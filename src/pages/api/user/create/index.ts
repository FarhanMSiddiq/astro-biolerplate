import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { createUser } from "../../../../database/raw-query/users/createUser";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { nama, email, password, role_id } = await request.json();

    if (!nama || !email || !password || !role_id) {
      return new Response(
        JSON.stringify({ error: "Nama, Email, Password, Role ID diperlukan" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const hashPass = await bcrypt.hash(password, 8);
    const user = await createUser(nama, email, hashPass, role_id);

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
