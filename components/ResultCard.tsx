import Image from 'next/image';
import type { Service } from '@/lib/searchServices';

const fithubUrl = process.env.NEXT_PUBLIC_FITHUB_URL ?? 'https://fithub.no';

export function ResultCard({ service }: { service: Service }) {
  const profileUrl = `${fithubUrl}/tilbyder/${service.id}`;

  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
    >
      {service.logo_image_url ? (
        <Image
          src={service.logo_image_url}
          alt={service.name}
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-full border border-slate-100 object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 text-lg font-bold">
          {service.name.charAt(0)}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-900 leading-snug">{service.name}</p>
        {service.description && (
          <p className="mt-0.5 text-sm text-slate-500 line-clamp-2">{service.description}</p>
        )}
        <div className="mt-1.5 flex flex-wrap gap-2">
          {service.rating_avg > 0 && (
            <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
              ★ {service.rating_avg.toFixed(1)}
            </span>
          )}
          {typeof service.distance_km === 'number' && (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
              {service.distance_km.toFixed(1)} km
            </span>
          )}
        </div>
      </div>
      <span className="shrink-0 text-xs text-slate-400 mt-0.5">Se profil →</span>
    </a>
  );
}
