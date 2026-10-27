export const SITE = {
  name: 'FinanceQuizPulse',
  tagline: 'Clear, practical money education',
  description:
    'FinanceQuizPulse explains personal finance, saving, investing, banking and the economy in plain language — educational guides for everyday financial decisions.',
  /** Used to build canonical and Open Graph URLs. Set VITE_SITE_URL in production. */
  url: (import.meta.env.VITE_SITE_URL || 'https://financequizpulse.com').replace(/\/$/, ''),
  defaultImage: '/images/og/og-default.png',
  locale: 'en_US',
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Money Basics', to: '/category/money-basics' },
  { label: 'Grow Wealth', to: '/category/grow-wealth' },
  { label: 'Save Smarter', to: '/category/save-smarter' },
  { label: 'Credit & Cards', to: '/category/credit-cards' },
  { label: 'Economy & Rates', to: '/category/economy-rates' },
  { label: 'About', to: '/about' },
];
