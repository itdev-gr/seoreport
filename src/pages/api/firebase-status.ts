import type { APIRoute } from 'astro';
import { isAdminConfigured, getAdminDb } from '../../lib/firebase-admin';

export const prerender = false;

/**
 * Diagnostic: returns whether the server has Firebase Admin (and thus Firestore) access.
 * If firestoreAccess is false, user sync and clients APIs will not write/read the database.
 */
export const GET: APIRoute = async () => {
  const configured = isAdminConfigured();
  const db = await getAdminDb();
  const firestoreAccess = db !== null;
  return new Response(
    JSON.stringify({
      firebaseAdminConfigured: configured,
      firestoreAccess,
      message: firestoreAccess
        ? 'Server has Firestore access. User sync and clients write to Firestore.'
        : 'Server has no Firestore access. Set FIREBASE_SERVICE_ACCOUNT_JSON (same project as client).',
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
