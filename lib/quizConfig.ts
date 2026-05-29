export type QuizAnswers = {
  situation: string;
  goals: string[];
  style: string[];
  city: string;
};

export type QuizStep = {
  id: number;
  question: string;
  hint?: string;
  multiSelect: boolean;
  options: { value: string; label: string; emoji: string }[];
};

export const STEPS: QuizStep[] = [
  {
    id: 1,
    question: 'Hva er situasjonen din nå?',
    multiSelect: false,
    options: [
      { value: 'nybegynner', label: 'Helt ny på trening', emoji: '🌱' },
      { value: 'pause',      label: 'Trent før, men tatt en pause', emoji: '⏸️' },
      { value: 'ny-aktivitet', label: 'Aktiv, men vil prøve noe nytt', emoji: '🔄' },
      { value: 'skade',      label: 'På vei tilbake etter skade eller sykdom', emoji: '🩹' },
    ],
  },
  {
    id: 2,
    question: 'Hva ønsker du å oppnå?',
    hint: 'Velg gjerne flere',
    multiSelect: true,
    options: [
      { value: 'vektnedgang', label: 'Gå ned i vekt / forme kroppen', emoji: '⚖️' },
      { value: 'styrke',      label: 'Bli sterkere', emoji: '💪' },
      { value: 'kondisjon',   label: 'Bedre kondisjon og utholdenhet', emoji: '🏃' },
      { value: 'mobilitet',   label: 'Mer fleksibel og smertefri', emoji: '🧘' },
      { value: 'stress',      label: 'Redusere stress og finne ro', emoji: '🌿' },
      { value: 'rehab',       label: 'Rehabilitere etter skade', emoji: '🩺' },
      { value: 'sosial',      label: 'Finne et sosialt fellesskap', emoji: '🤝' },
      { value: 'natur',       label: 'Oppleve naturen og friluftslivet', emoji: '🌲' },
      { value: 'prestasjon',  label: 'Konkurrere / forbedre prestasjoner', emoji: '🏅' },
    ],
  },
  {
    id: 3,
    question: 'Hva passer deg best?',
    hint: 'Velg det som kjennes riktig',
    multiSelect: true,
    options: [
      { value: 'alene',     label: 'Trene alene i eget tempo', emoji: '🎧' },
      { value: 'gruppe',    label: 'Trene i gruppe med andre', emoji: '👥' },
      { value: 'coach',     label: 'Ha fast veiledning eller coach', emoji: '📋' },
      { value: 'ute',       label: 'Ut i frisk luft og marka', emoji: '🌤️' },
      { value: 'inne',      label: 'Innendørs studio eller senter', emoji: '🏢' },
      { value: 'fleksibel', label: 'Fleksibel timeplan', emoji: '📅' },
      { value: 'fast',      label: 'Faste treningsdager å forholde meg til', emoji: '🔒' },
      { value: 'tuftepark', label: 'Gratis utendørs treningsplass', emoji: '🌳' },
    ],
  },
];

export const CITIES: string[] = [
  'Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen',
  'Fredrikstad', 'Kristiansand', 'Tromsø', 'Sandnes', 'Asker',
  'Lillestrøm', 'Halden', 'Moss', 'Hamar', 'Skien',
  'Porsgrunn', 'Bodø', 'Ålesund', 'Sarpsborg', 'Sandefjord',
  'Larvik', 'Tønsberg', 'Horten', 'Gjøvik', 'Lillehammer',
  'Molde', 'Arendal', 'Haugesund', 'Kongsberg', 'Notodden',
  'Elverum', 'Steinkjer',
];
