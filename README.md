# settdegetmål.no

Quiz-funnel som veileder brukere til riktig treningstilbud. Henter live data fra [fithub.no](https://fithub.no) sin database og lenker videre dit.

## Flyt

```
/ → /quiz?step=1 → step=2 → step=3 → step=4 → /resultat
```

4 steg: situasjon (single) → mål (multi) → preferanser (multi) → by → resultatside med live tilbydere.

## Stack

Next.js 14 App Router · TypeScript · Tailwind CSS · Supabase (delt med fithub.no)

## Setup

```bash
npm install
cp .env.example .env.local  # fyll inn nøkler
npm run dev
```

### Env

```
NEXT_PUBLIC_SUPABASE_URL=     # samme som fithub.no
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_FITHUB_URL=https://fithub.no
```

## Deployment

Eget Vercel-prosjekt. Pek settdegetmål.no-domenet dit.
