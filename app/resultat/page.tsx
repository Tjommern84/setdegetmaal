import Link from 'next/link';
import type { Metadata } from 'next';
import { mapQuizToRecommendations } from '@/lib/quizMapping';
import { searchServices } from '@/lib/searchServices';
import { cityCoordinates } from '@/lib/cityCoordinates';
import { ResultCard } from '@/components/ResultCard';
import type { QuizAnswers } from '@/lib/quizConfig';

export const metadata: Metadata = {
  title: 'Dine anbefalinger – settdegetmål.no',
  robots: { index: false },
};

const fithubUrl = process.env.NEXT_PUBLIC_FITHUB_URL ?? 'https://fithub.no';

const CATEGORY_DISPLAY: Record<string, string> = {
  'trene-selv':     'Trene selv',
  'trene-sammen':   'Trene sammen',
  'oppfolging':     'Oppfølging & coaching',
  'aktivitet-sport':'Aktivitet & sport',
  'helse':          'Helse & behandling',
};

export default async function ResultatPage({
  searchParams,
}: {
  searchParams: { s1?: string; s2?: string; s3?: string; city?: string };
}) {
  const answers: QuizAnswers = {
    situation: searchParams.s1 ?? '',
    goals:     searchParams.s2 ? searchParams.s2.split(',') : [],
    style:     searchParams.s3 ? searchParams.s3.split(',') : [],
    city:      searchParams.city ?? '',
  };

  const city = answers.city.toLowerCase();
  const coords = cityCoordinates[city];
  const cityLabel = answers.city
    ? answers.city.charAt(0).toUpperCase() + answers.city.slice(1)
    : '';

  const recommendations = mapQuizToRecommendations(answers);

  // Fetch top 3 providers per recommendation in parallel
  const withResults = await Promise.all(
    recommendations.map(async (rec) => {
      if (!coords) return { rec, services: [] };
      try {
        const services = await searchServices({
          mainCategory: rec.searchParams.mainCategory,
          tags: rec.searchParams.tags,
          city,
          lat: coords.lat,
          lon: coords.lon,
          limit: 3,
        });
        return { rec, services };
      } catch {
        return { rec, services: [] };
      }
    })
  );

  const hasResults = withResults.some((r) => r.services.length > 0);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-xl px-4 py-10">

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-500">
            Dine anbefalinger
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {cityLabel
              ? `Her er det best for deg i ${cityLabel}`
              : 'Her er det best for deg'}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Basert på svarene dine har vi funnet de beste matchene.
          </p>
        </div>

        {!hasResults && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Vi bygger fortsatt dekning i {cityLabel || 'denne byen'}.{' '}
            <a href={`${fithubUrl}/resultater`} className="font-medium underline">
              Søk på fithub.no
            </a>{' '}
            for å se hva som finnes.
          </div>
        )}

        <div className="grid gap-8">
          {withResults.map(({ rec, services }) => {
            const resultsQuery = new URLSearchParams({
              cat: rec.searchParams.mainCategory,
              location: cityLabel,
              ...(coords ? { lat: String(coords.lat), lon: String(coords.lon) } : {}),
              ...(rec.searchParams.tags?.length ? { tags: rec.searchParams.tags.join(',') } : {}),
            }).toString();

            return (
              <section key={rec.category + (rec.searchParams.tags?.[0] ?? '')}>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                      {rec.categoryLabel}
                    </p>
                    <h2 className="text-lg font-bold text-slate-900">{rec.headline}</h2>
                    <p className="mt-0.5 text-sm text-slate-500">{rec.description}</p>
                  </div>
                </div>

                {services.length > 0 ? (
                  <div className="grid gap-3">
                    {services.map((s) => (
                      <ResultCard key={s.id} service={s} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic">
                    Ingen treff her akkurat nå.
                  </p>
                )}

                <a
                  href={`${fithubUrl}/resultater?${resultsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-rose-600 hover:text-rose-800 transition-colors"
                >
                  Se alle i {cityLabel || 'din by'} →
                </a>
              </section>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-900">
            Vil du utforske mer?
          </p>
          <p className="mt-1 text-xs text-slate-400">
            fithub.no har alle tilbydere, kart og filtrering
          </p>
          <a
            href={`${fithubUrl}/resultater${coords ? `?location=${encodeURIComponent(cityLabel)}&lat=${coords.lat}&lon=${coords.lon}` : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Åpne fithub.no →
          </a>
        </div>

        <div className="mt-6 text-center">
          <Link href="/quiz" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
            ← Prøv igjen med andre svar
          </Link>
        </div>
      </div>
    </main>
  );
}
