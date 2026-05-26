import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-rose-500">
        settdegetmål.no
      </p>

      <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
        Finn treningen som faktisk passer deg
      </h1>

      <p className="mt-4 max-w-md text-base text-slate-500 sm:text-lg">
        Svar på et par enkle spørsmål. Vi finner PT-er, treningssentre, idrettslag og
        gruppeaktiviteter i nærheten av deg.
      </p>

      <Link
        href="/quiz"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-rose-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
      >
        FINN DITT MÅL
        <span aria-hidden>→</span>
      </Link>

      <p className="mt-4 text-xs text-slate-400">Gratis · Tar 2 minutter · Uforpliktende</p>

      <footer className="absolute bottom-6 text-xs text-slate-300">
        Levert av{' '}
        <a
          href="https://fithub.no"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-500"
        >
          fithub.no
        </a>
      </footer>
    </main>
  );
}
