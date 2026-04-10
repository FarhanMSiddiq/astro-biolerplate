import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import updateUser from "../../../../database/raw-query/users/updateUser";

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const { id, nama, email, password, role_id } = await request.json();

    if (!nama || !email || !role_id) {
      return new Response(
        JSON.stringify({ error: "Nama, Email , Role ID diperlukan" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    let hashPass = "";
    if (password != "") {
      hashPass = await bcrypt.hash(password, 8);
    }
    const user = await updateUser(id, nama, email, hashPass, role_id);

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
