'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import { STEPS, CITIES } from '@/lib/quizConfig';
import { QuizStep } from '@/components/QuizStep';
import { ProgressBar } from '@/components/ProgressBar';

function Quiz() {
  const router = useRouter();
  const params = useSearchParams();

  const step = Math.min(Math.max(Number(params.get('step') ?? '1'), 1), 4);
  const s1 = params.get('s1') ?? '';
  const s2 = params.get('s2') ?? '';
  const s3 = params.get('s3') ?? '';
  const city = params.get('city') ?? '';

  const selected: string[] = useMemo(() => {
    if (step === 1) return s1 ? [s1] : [];
    if (step === 2) return s2 ? s2.split(',') : [];
    if (step === 3) return s3 ? s3.split(',') : [];
    return [];
  }, [step, s1, s2, s3]);

  const canAdvance = useMemo(() => {
    if (step === 1) return false; // single-select auto-advances
    if (step === 4) return city.length > 0;
    return selected.length > 0;
  }, [step, selected, city]);

  function navigate(updates: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    Object.entries(updates).forEach(([k, v]) => next.set(k, v));
    router.push(`/quiz?${next.toString()}`);
  }

  function handleToggle(value: string) {
    const currentStep = STEPS[step - 1];
    if (currentStep.multiSelect) {
      const next = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];
      const p = new URLSearchParams(params.toString());
      p.set(`s${step}`, next.join(','));
      router.replace(`/quiz?${p.toString()}`);
    } else {
      navigate({ step: String(step + 1), [`s${step}`]: value });
    }
  }

  function handleBack() {
    if (step > 1) navigate({ step: String(step - 1) });
    else router.push('/');
  }

  function handleNext() {
    if (step < 4) {
      navigate({ step: String(step + 1) });
    } else {
      router.push(`/resultat?s1=${s1}&s2=${s2}&s3=${s3}&city=${city}`);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-lg px-4 py-10">
        <ProgressBar step={step} total={4} />

        <div className="mt-8">
          {step <= 3 ? (
            <QuizStep
              step={STEPS[step - 1]}
              selected={selected}
              onToggle={handleToggle}
            />
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Hvor bor du?
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Vi finner tilbud i nærheten av deg
              </p>
              <select
                value={city}
                onChange={(e) => {
                  const p = new URLSearchParams(params.toString());
                  p.set('city', e.target.value);
                  router.replace(`/quiz?${p.toString()}`);
                }}
                className="mt-6 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 text-slate-900 focus:border-rose-500 focus:outline-none"
              >
                <option value="">Velg by...</option>
                {CITIES.map((c) => (
                  <option key={c} value={c.toLowerCase()}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="text-sm text-slate-400 transition-colors hover:text-slate-600"
          >
            ← Tilbake
          </button>

          {step > 1 && (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canAdvance}
              className="rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === 4 ? 'Se anbefalingene mine →' : 'Neste →'}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default function QuizPage() {
  return (
    <Suspense>
      <Quiz />
    </Suspense>
  );
}
