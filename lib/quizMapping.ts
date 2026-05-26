import type { QuizAnswers } from './quizConfig';

export type SearchParams = {
  mainCategory: string;
  tags?: string[];
  goal?: string;
};

export type Recommendation = {
  category: string;
  categoryLabel: string;
  headline: string;
  description: string;
  searchParams: SearchParams;
};

export function mapQuizToRecommendations(answers: QuizAnswers): Recommendation[] {
  const { situation, goals, style } = answers;
  const recs: Recommendation[] = [];

  // Skade / rehab — høyest prioritet
  if (goals.includes('rehab') || situation === 'skade') {
    recs.push({
      category: 'helse',
      categoryLabel: 'Helse & behandling',
      headline: 'Trygg rehabilitering',
      description: 'Fysioterapeuter og rehab-spesialister som tar hensyn til din situasjon.',
      searchParams: { mainCategory: 'helse', tags: ['rehab'] },
    });
  }

  // Coach / PT
  if (style.includes('coach') || situation === 'nybegynner') {
    recs.push({
      category: 'oppfolging',
      categoryLabel: 'Oppfølging & coaching',
      headline: 'Personlig oppfølging',
      description: 'PT-er og coacher som tilpasser opplegget til deg og følger deg over tid.',
      searchParams: { mainCategory: 'oppfolging' },
    });
  }

  // Natur / friluft
  if (goals.includes('natur') || style.includes('ute')) {
    recs.push({
      category: 'aktivitet-sport',
      categoryLabel: 'Aktivitet & sport',
      headline: 'Ute i naturen',
      description: 'Idrettslag og grupper som bruker skog, fjell og friluft aktivt.',
      searchParams: { mainCategory: 'aktivitet-sport', tags: ['orientering'] },
    });
  }

  // Stress / ro / fleksibilitet → yoga
  if (goals.includes('stress') || goals.includes('mobilitet')) {
    recs.push({
      category: 'trene-sammen',
      categoryLabel: 'Trene sammen',
      headline: 'Ro og bevegelse',
      description: 'Yoga, mindfulness og bevegelighetstrening i rolige omgivelser.',
      searchParams: { mainCategory: 'trene-sammen', tags: ['yoga'] },
    });
  }

  // Gruppe / sosial
  if (goals.includes('sosial') || style.includes('gruppe')) {
    recs.push({
      category: 'trene-sammen',
      categoryLabel: 'Trene sammen',
      headline: 'Fellesskap og gruppetimer',
      description: 'Bootcamp, løpegrupper og gruppetimer der du møter andre med samme mål.',
      searchParams: { mainCategory: 'trene-sammen' },
    });
  }

  // Styrke / kondisjon / alene → gym
  if (
    goals.includes('styrke') || goals.includes('kondisjon') ||
    goals.includes('vektnedgang') || style.includes('alene')
  ) {
    recs.push({
      category: 'trene-selv',
      categoryLabel: 'Trene selv',
      headline: 'Gym og egentreningsøkter',
      description: 'Treningssentre med god utrustning der du kan trene på egne premisser.',
      searchParams: { mainCategory: 'trene-selv' },
    });
  }

  // Dedupliser på category, behold maks 3
  const seen = new Set<string>();
  return recs.filter((r) => {
    const key = r.category + (r.searchParams.tags?.[0] ?? '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 3);
}
