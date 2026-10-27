/** Top-level sections used by navigation, category pages and the footer. */
export const CATEGORIES = [
  {
    slug: 'money-basics',
    name: 'Money Basics',
    title: 'Money Basics',
    description: 'Budgeting, taxes and long-term planning — the everyday building blocks of a healthy financial life.',
  },
  {
    slug: 'grow-wealth',
    name: 'Grow Wealth',
    title: 'Grow Wealth',
    description: 'How markets, mutual funds and compounding work, explained for people starting out.',
  },
  {
    slug: 'save-smarter',
    name: 'Save Smarter',
    title: 'Save Smarter',
    description: 'Practical ways to build savings, cut costs and prepare for the unexpected.',
  },
  {
    slug: 'credit-cards',
    name: 'Credit & Cards',
    title: 'Credit & Cards',
    description: 'Accounts, credit scores, credit cards and borrowing — understand the rules before you sign.',
  },
  {
    slug: 'economy-rates',
    name: 'Economy & Rates',
    title: 'Economy & Rates',
    description: 'Inflation, interest rates and small-business finance, and what they mean for your money.',
  },
];

export const getCategoryBySlug = (slug) => CATEGORIES.find((category) => category.slug === slug);
