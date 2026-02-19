import type { APIRoute } from 'astro';
import { getDecodedTokenFromRequest, getUserProfile, upsertUserProfileInFirestore } from '../../lib/firebase-admin';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const decoded = await getDecodedTokenFromRequest(request);
  if (!decoded) {
    console.log('[Firebase API] me: invalid_token');
    return new Response(JSON.stringify({ error: 'Unauthorized', code: 'invalid_token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const { uid, email } = decoded;
  let profile = await getUserProfile(uid);
  if (!profile) {
    if (email) {
      try {
        await upsertUserProfileInFirestore(uid, email);
        profile = await getUserProfile(uid);
      } catch {
        // fall through to 401 no_profile
      }
    }
    if (!profile) {
      console.log('[Firebase API] me: no_profile');
      return new Response(JSON.stringify({ error: 'User not found', code: 'no_profile' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  return new Response(
    JSON.stringify({ uid: profile.uid, email: profile.email, role: profile.role ?? 'user' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
