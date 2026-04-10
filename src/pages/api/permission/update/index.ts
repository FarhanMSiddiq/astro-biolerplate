import type { APIRoute } from "astro";
import updatePermission from "../../../../database/raw-query/permission/updatePermission";

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const { id, name, code } = await request.json();

    if (!id || !name || !code) {
      return new Response(
        JSON.stringify({ error: "ID , Name , dan Code diperlukan" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const permission = await updatePermission(id, name, code);

    return new Response(JSON.stringify(permission), {
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
