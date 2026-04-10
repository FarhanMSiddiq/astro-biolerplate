import type { APIRoute } from "astro";
import { createRole } from "../../../../database/raw-query/role/createRole";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name } = await request.json();

    if (!name) {
      return new Response(JSON.stringify({ error: "Name diperlukan" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const role = await createRole(name);

    return new Response(JSON.stringify(role), {
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
