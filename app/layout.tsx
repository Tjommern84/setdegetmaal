import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sett deg et mål – finn riktig trening for deg',
  description:
    'Svar på noen enkle spørsmål og finn treningsopplegget som passer deg. PT, yoga, idrettslag, gym og mer – i din by.',
  metadataBase: new URL('https://xn--settdegtml-58a.no'),
  openGraph: {
    title: 'Sett deg et mål',
    description: 'Finn riktig trening for deg på 2 minutter.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
