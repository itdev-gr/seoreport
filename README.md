# SEO Report

Minimal SaaS SEO Report με Astro, Tailwind και Firebase Auth. Εμφανίζει βασικά στατιστικά (έτοιμο για σύνδεση με Google Search Console API).

## Tech stack

- **Astro** – UI & routing
- **Tailwind CSS** – styling
- **Firebase Auth** – login (email/password)
- **Data layer** – `src/lib/search-console.ts` (τώρα mock, μελλοντικά GSC API)

## Setup

```bash
npm install
cp .env.example .env
# Συμπληρώστε τις μεταβλητές Firebase στο .env
npm run dev
```

### Firebase (client – login πελάτη)

1. Δημιουργήστε project στο [Firebase Console](https://console.firebase.google.com).
2. Ενεργοποιήστε **Authentication** → **Sign-in method** → **Email/Password**.
3. Αντιγράψτε τα config values στο `.env` (όπως στο `.env.example`).

### Firebase Admin (setup + admin)

- **Setup** (`/setup`) – για το άτομο που προσθέτει πελάτες: φόρμα email, κωδικός, Search Console ID. Δημιουργεί χρήστη στο Firebase Auth και εγγραφή στο Firestore.
- **Admin** (`/admin`) – για το άτομο που δουλεύει τα reports: λίστα πελατών, προβολή report (και παρέα με τον πελάτη).

Για να λειτουργήσει η προσθήκη πελατών:

1. Στο Firebase Console: **Project Settings** → **Service accounts** → **Generate new private key**. Αποθηκεύστε το JSON.
2. Ενεργοποιήστε **Firestore Database** στο project.
3. Στο `.env` ορίστε `FIREBASE_SERVICE_ACCOUNT_JSON` = το περιεχόμενο του JSON (σε μία γραμμή, escaped).

## Δομή

```
src/
├── components/     # MetricCard, DataTable, AuthWrapper, MetricCardSkeleton
├── data/          # mock-dashboard.ts (mock JSON)
├── layouts/       # Layout.astro (header με gradient)
├── lib/           # firebase.ts, search-console.ts (data layer)
├── pages/         # index (redirect), dashboard
├── styles/        # global.css
└── middleware.ts  # Route protection (έτοιμο για server-side auth)
```

## Σύνδεση Google Search Console API

- Τα δεδομένα τραβούνται από `fetchDashboardData()` στο `src/lib/search-console.ts`.
- Αντικαταστήστε το mock με κλήσεις στο [Search Console API](https://developers.google.com/webmaster-tools/search-console-api-original) και χρησιμοποιήστε το `accessToken` από το Firebase Auth ή OAuth.

## Scripts

- `npm run dev` – development (server + API routes)
- `npm run build` – production build (output: server, απαιτεί Node adapter)
- `npm run preview` – τρέχει το built server τοπικά

## Brand colors

- Primary: `#0cb09a`
- Dark: `#0c1929`
- Header: gradient από dark προς primary
