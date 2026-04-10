import type { APIRoute } from "astro";
import updateUserPermissions from "../../../../database/raw-query/users/updateUserPermission";

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const userId = params.id;
    const { permissions } = await request.json();

    if (userId == undefined) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!Array.isArray(permissions) || permissions.some(isNaN)) {
      return new Response(
        JSON.stringify({ error: "Invalid permissions format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    await updateUserPermissions(userId, permissions);

    return new Response(
      JSON.stringify({ message: "Permissions updated successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
