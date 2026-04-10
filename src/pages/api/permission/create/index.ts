import type { APIRoute } from "astro";
import { createPermission } from "../../../../database/raw-query/permission/createPermission";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, code } = await request.json();

    if (!name || !code) {
      return new Response(JSON.stringify({ error: "Name , Code diperlukan" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const permission = await createPermission(name, code);

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
