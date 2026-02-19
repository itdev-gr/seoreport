import type { APIRoute } from 'astro';

export const prerender = false;

import { getAdminAuth, createClientInFirestore } from '../../lib/firebase-admin';

export const POST: APIRoute = async ({ request }) => {
  console.log('[Firebase API] POST /api/create-client');
  if (request.headers.get('content-type')?.includes('application/json') === false) {
    return new Response(JSON.stringify({ error: 'Content-Type must be application/json' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  let body: { email?: string; password?: string; name?: string; domain?: string; searchConsoleId?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  const { email, password, name, domain, searchConsoleId } = body;
  if (!email || !password || !searchConsoleId) {
    return new Response(
      JSON.stringify({ error: 'Απαιτούνται: email, password, searchConsoleId' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  const auth = await getAdminAuth();
  if (!auth) {
    console.log('[Firebase API] create-client: Admin not configured');
    return new Response(
      JSON.stringify({ error: 'Firebase Admin δεν είναι ρυθμισμένο (FIREBASE_SERVICE_ACCOUNT_JSON)' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
  try {
    await auth.createUser({ email, password });
    console.log('[Firebase API] create-client: user created');
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log('[Firebase API] create-client: error', msg);
    return new Response(JSON.stringify({ error: `Δημιουργία χρήστη: ${msg}` }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const clientName = name?.trim() || email.split('@')[0];
    const client = await createClientInFirestore(email, clientName, searchConsoleId.trim(), domain?.trim());
    console.log('[Firebase API] create-client: client saved');
    return new Response(JSON.stringify({ success: true, client }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log('[Firebase API] create-client: error', msg);
    return new Response(JSON.stringify({ error: `Αποθήκευση πελάτη: ${msg}` }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
