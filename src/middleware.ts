/**
 * Route protection middleware.
 * Σε static build τρέχει κατά το request (dev/preview). Μελλοντικά: έλεγχος Firebase session/cookie.
 */

import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  // Προστασία routes: αν χρειαστεί server-side redirect, γίνεται εδώ.
  // Τώρα η προστασία γίνεται client-side μέσω AuthWrapper.
  return next();
});
