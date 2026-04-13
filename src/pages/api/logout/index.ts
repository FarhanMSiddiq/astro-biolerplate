import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, request }) => {
  cookies.delete("id", { path: "/" });
  cookies.delete("nama", { path: "/" });
  cookies.delete("email", { path: "/" });
  cookies.delete("permission", { path: "/" });
  cookies.delete("role", { path: "/" });

  const baseUrl = new URL(request.url).origin;

  return new Response(null, {
    status: 302,
    headers: {
      Location: `${baseUrl}/`,
    },
  });
};
