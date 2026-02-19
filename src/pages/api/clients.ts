import type { APIRoute } from 'astro';
import { requireAdmin, getClientsFromFirestore } from '../../lib/firebase-admin';
import { mockClients } from '../../data/mock-clients';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  console.log('[Firebase API] GET /api/clients');
  const authResult = await requireAdmin(request);
  if (authResult instanceof Response) return authResult;
  try {
    const clients = await getClientsFromFirestore();
    console.log('[Firebase API] clients: count', clients.length);
    if (clients.length > 0) {
      return new Response(JSON.stringify(clients), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(mockClients), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.log('[Firebase API] clients: error', String(e));
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
