import type { APIRoute } from "astro";
import { checkRoleUsed } from "../../../../database/raw-query/role/getRole";

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;
  if (id == undefined) {
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const role = await checkRoleUsed(id);
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
