/**
 * Firebase Admin SDK – μόνο server-side.
 * Χρήση: δημιουργία χρηστών (Auth), ανάγνωση/εγγραφή πελατών (Firestore).
 */

import type { App } from 'firebase-admin/app';
import type { Auth } from 'firebase-admin/auth';
import type { Firestore } from 'firebase-admin/firestore';

let adminApp: App | null = null;
let adminAuth: Auth | null = null;
let adminDb: Firestore | null = null;

const COLLECTION_CLIENTS = 'clients';
const COLLECTION_USERS = 'users';

let initPromise: Promise<boolean> | null = null;

async function initAdmin(): Promise<boolean> {
  if (adminApp) return true;
  if (initPromise) return initPromise;
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccountJson) {
    console.log('[Firebase Admin] initAdmin: no FIREBASE_SERVICE_ACCOUNT_JSON');
    return false;
  }
  console.log('[Firebase Admin] initAdmin: starting');
  initPromise = (async () => {
    try {
      const { default: admin } = await import('firebase-admin');
      const serviceAccount = JSON.parse(serviceAccountJson) as Record<string, unknown>;
      adminApp = admin.initializeApp({ credential: admin.credential.cert(serviceAccount as object) });
      adminAuth = admin.auth();
      adminDb = admin.firestore();
      console.log('[Firebase Admin] initAdmin: success');
      return true;
    } catch (e) {
      console.log('[Firebase Admin] initAdmin: error', e instanceof Error ? e.message : String(e));
      return false;
    }
  })();
  return initPromise;
}

export async function getAdminAuth(): Promise<Auth | null> {
  await initAdmin();
  console.log('[Firebase Admin] getAdminAuth', adminAuth ? 'ok' : 'null');
  return adminAuth;
}

export async function getAdminDb(): Promise<Firestore | null> {
  await initAdmin();
  console.log('[Firebase Admin] getAdminDb', adminDb ? 'ok' : 'null');
  return adminDb;
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
}

export interface ClientRecord {
  id: string;
  email: string;
  name: string;
  /** Search Console ID από το URL του GSC (π.χ. sc-domain:example.com ή https://www.example.com/) */
  searchConsoleId: string;
  /** Domain για εμφάνιση (π.χ. example.com). Προαιρετικό. */
  domain?: string;
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  lastLoginAt: string;
  updatedAt: string;
  createdAt?: string;
  displayName?: string;
}

export async function upsertUserProfileInFirestore(
  uid: string,
  email: string,
  displayName?: string
): Promise<void> {
  console.log('[Firebase Admin] upsertUserProfile', { uid, email });
  const db = await getAdminDb();
  if (!db) throw new Error('Firebase Admin not configured');
  const now = new Date().toISOString();
  const ref = db.collection(COLLECTION_USERS).doc(uid);
  const existing = await ref.get();
  const data: Record<string, unknown> = {
    uid,
    email,
    lastLoginAt: now,
    updatedAt: now,
    ...(displayName ? { displayName } : {}),
  };
  if (!existing.exists) {
    data.createdAt = now;
  }
  await ref.set(data, { merge: true });
  console.log('[Firebase Admin] upsertUserProfile: done');
}

function slugFromEmail(email: string): string {
  return email.replace(/@.*$/, '').replace(/[^a-z0-9]/gi, '-').toLowerCase().replace(/-+/g, '-').replace(/^-|-$/g, '') || 'client';
}

export async function createClientInFirestore(
  email: string,
  name: string,
  searchConsoleId: string,
  domain?: string
): Promise<ClientRecord> {
  const id = slugFromEmail(email);
  console.log('[Firebase Admin] createClientInFirestore', { email, id });
  const db = await getAdminDb();
  if (!db) throw new Error('Firebase Admin not configured');
  const now = new Date().toISOString();
  const record: ClientRecord = { id, email, name, searchConsoleId, domain, createdAt: now };
  await db.collection(COLLECTION_CLIENTS).doc(id).set(record);
  console.log('[Firebase Admin] createClientInFirestore: done');
  return record;
}

export async function getClientsFromFirestore(): Promise<ClientRecord[]> {
  console.log('[Firebase Admin] getClientsFromFirestore');
  const db = await getAdminDb();
  if (!db) return [];
  const snap = await db.collection(COLLECTION_CLIENTS).orderBy('createdAt', 'desc').get();
  const list = snap.docs.map((d) => d.data() as ClientRecord);
  console.log('[Firebase Admin] getClientsFromFirestore: count', list.length);
  return list;
}

export async function getClientByIdFromFirestore(clientId: string): Promise<ClientRecord | null> {
  console.log('[Firebase Admin] getClientByIdFromFirestore', clientId);
  const db = await getAdminDb();
  if (!db) return null;
  const doc = await db.collection(COLLECTION_CLIENTS).doc(clientId).get();
  if (!doc.exists) {
    console.log('[Firebase Admin] getClientByIdFromFirestore: not found');
    return null;
  }
  console.log('[Firebase Admin] getClientByIdFromFirestore: found');
  return doc.data() as ClientRecord;
}
