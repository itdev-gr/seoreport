import type { APIRoute } from 'astro';
import { getAdminAuth, upsertUserProfileInFirestore } from '../../../lib/firebase-admin';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return new Response(JSON.stringify({ error: 'Missing or invalid Authorization header' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const auth = await getAdminAuth();
  if (!auth) {
    return new Response(
      JSON.stringify({ error: 'Firebase Admin not configured (FIREBASE_SERVICE_ACCOUNT_JSON)' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let decoded: { uid: string; email?: string; name?: string };
  try {
    decoded = await auth.verifyIdToken(token);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { uid, email, name } = decoded;
  if (!uid || !email) {
    return new Response(JSON.stringify({ error: 'Token missing uid or email' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await upsertUserProfileInFirestore(uid, email, name ?? undefined);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: `Sync failed: ${msg}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
