import type { APIRoute } from "astro";
import { getAllRole } from "../../../../database/raw-query/role/getRole";

export const GET: APIRoute = async () => {
  try {
    const role = await getAllRole();
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
