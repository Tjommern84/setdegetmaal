'use client';

import type { QuizStep as QuizStepType } from '@/lib/quizConfig';

type Props = {
  step: QuizStepType;
  selected: string[];
  onToggle: (value: string) => void;
};

export function QuizStep({ step, selected, onToggle }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        {step.question}
      </h2>
      {step.hint && (
        <p className="mt-1 text-sm text-slate-400">{step.hint}</p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {step.options.map((opt) => {
          const active = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onToggle(opt.value)}
              className={[
                'flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-all',
                active
                  ? 'border-rose-500 bg-rose-50 text-rose-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
              ].join(' ')}
            >
              <span className="text-xl leading-none">{opt.emoji}</span>
              <span className="text-sm font-medium leading-snug">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
