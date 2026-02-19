import type { APIRoute } from 'astro';

export const prerender = false;

import { getClientsFromFirestore } from '../../lib/firebase-admin';
import { mockClients } from '../../data/mock-clients';

export const GET: APIRoute = async () => {
  try {
    const clients = await getClientsFromFirestore();
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
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
