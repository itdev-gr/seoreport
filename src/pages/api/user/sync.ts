import type { APIRoute } from 'astro';
import { getAdminAuth, upsertUserProfileInFirestore } from '../../../lib/firebase-admin';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  console.log('[Firebase API] POST /api/user/sync');
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    console.log('[Firebase API] sync: missing token');
    return new Response(JSON.stringify({ error: 'Missing or invalid Authorization header' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const auth = await getAdminAuth();
  if (!auth) {
    console.log('[Firebase API] sync: Admin not configured');
    return new Response(
      JSON.stringify({ error: 'Firebase Admin not configured (FIREBASE_SERVICE_ACCOUNT_JSON)' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let decoded: { uid: string; email?: string; name?: string };
  try {
    decoded = await auth.verifyIdToken(token);
  } catch (e) {
    console.log('[Firebase API] sync: error', e instanceof Error ? e.message : 'Invalid or expired token');
    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { uid, email, name } = decoded;
  if (!uid || !email) {
    console.log('[Firebase API] sync: error token missing uid or email');
    return new Response(JSON.stringify({ error: 'Token missing uid or email' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log('[Firebase API] sync: token verified', { uid, email });
  try {
    await upsertUserProfileInFirestore(uid, email, name ?? undefined);
    console.log('[Firebase API] sync: upsert done');
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log('[Firebase API] sync: error', msg);
    return new Response(JSON.stringify({ error: `Sync failed: ${msg}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
