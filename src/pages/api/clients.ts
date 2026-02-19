import type { APIRoute } from 'astro';

export const prerender = false;

import { getClientsFromFirestore } from '../../lib/firebase-admin';
import { mockClients } from '../../data/mock-clients';

export const GET: APIRoute = async () => {
  console.log('[Firebase API] GET /api/clients');
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
