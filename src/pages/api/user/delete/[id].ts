import type { APIRoute } from 'astro';
import deleteUser from '../../../../database/raw-query/users/deleteUser';

export const DELETE: APIRoute = async ({ params }) => {
    
    try {
        const id = params.id;
        if (id==undefined) {
            return new Response(JSON.stringify({ error: "ID is required" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const users = await deleteUser(id);
        return new Response(JSON.stringify(users), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
  }