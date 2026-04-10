import type { APIRoute } from "astro";
import updateRole from "../../../../database/raw-query/role/updateRole";

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const { id, name } = await request.json();

    if (!id || !name) {
      return new Response(JSON.stringify({ error: "ID dan Name diperlukan" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const role = await updateRole(id, name);

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
