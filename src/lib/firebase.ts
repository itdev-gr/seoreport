/**
 * Firebase Auth configuration.
 * Ο client χρησιμοποιεί αυτό το module για login/logout.
 * Αν δεν υπάρχει config (π.χ. .env), η εφαρμογή τρέχει σε λειτουργία mockup χωρίς login.
 */

import { initializeApp } from 'firebase/app';
import { getAuth, type Auth, type User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID ?? '',
};

/** True μόνο αν έχει συμπληρωθεί Firebase config (.env) */
export const isFirebaseConfigured = Boolean(import.meta.env.PUBLIC_FIREBASE_API_KEY);

/** Mockup mode: είτε δεν υπάρχει Firebase, είτε PUBLIC_MOCKUP=true (π.χ. live demo) */
export const isMockupMode = import.meta.env.PUBLIC_MOCKUP === 'true' || !isFirebaseConfigured;

let authInstance: Auth | null = null;
if (isFirebaseConfigured) {
  console.log('[Firebase] Config loaded, initializing app', { projectId: firebaseConfig.projectId || '(empty)' });
  const app = initializeApp(firebaseConfig);
  console.log('[Firebase] App initialized');
  authInstance = getAuth(app);
  console.log('[Firebase] Auth instance created');
} else {
  console.log('[Firebase] Not configured (mockup or missing env), auth=null');
}

export const auth = authInstance;

export function getCurrentUser(): User | null {
  return auth?.currentUser ?? null;
}
