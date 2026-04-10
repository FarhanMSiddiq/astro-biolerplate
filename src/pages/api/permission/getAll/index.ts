import type { APIRoute } from "astro";
import { getAllPermission } from "../../../../database/raw-query/permission/getPermission";

export const GET: APIRoute = async () => {
  try {
    const permission = await getAllPermission();
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
