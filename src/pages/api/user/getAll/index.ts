import type { APIRoute } from "astro";
import { getAllUsers } from "../../../../database/raw-query/users/getUser";

export const GET: APIRoute = async () => {
  try {
    const users = await getAllUsers();
    return new Response(JSON.stringify(users), {
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
