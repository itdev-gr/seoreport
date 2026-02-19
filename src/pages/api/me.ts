import type { APIRoute } from 'astro';
import { getUserIdFromRequest, getUserProfile } from '../../lib/firebase-admin';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const uid = await getUserIdFromRequest(request);
  if (!uid) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const profile = await getUserProfile(uid);
  if (!profile) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(
    JSON.stringify({ uid: profile.uid, email: profile.email, role: profile.role ?? 'user' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
