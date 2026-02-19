import type { APIRoute } from 'astro';
import { requireAdmin, updateUserRole, getUserProfile, type UserRole } from '../../../lib/firebase-admin';

export const prerender = false;

export const PATCH: APIRoute = async ({ request }) => {
  const authResult = await requireAdmin(request);
  if (authResult instanceof Response) return authResult;

  if (request.headers.get('content-type')?.includes('application/json') === false) {
    return new Response(JSON.stringify({ error: 'Content-Type must be application/json' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  let body: { uid?: string; role?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const { uid, role } = body;
  if (!uid || typeof uid !== 'string') {
    return new Response(JSON.stringify({ error: 'uid required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (role !== 'admin' && role !== 'user') {
    return new Response(JSON.stringify({ error: 'role must be "admin" or "user"' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const existing = await getUserProfile(uid);
  if (!existing) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  try {
    await updateUserRole(uid, role as UserRole);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
