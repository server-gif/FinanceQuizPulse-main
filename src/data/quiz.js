/**
 * Money Facts quiz — a short, general-knowledge check, not an assessment of
 * anyone's personal finances. Every question carries an `answer` (index of the
 * correct option), a plain-language `why` shown after answering, and a `slug`
 * pointing at the guide that covers the idea in depth.
 *
 * All content is educational only and is not financial advice.
 */
export const QUIZ_QUESTIONS = [
  {
    id: 'emergency-fund',
    question: 'Most money guides suggest an emergency fund should cover roughly how many months of essential spending?',
    options: ['Half a month', '3 to 6 months', 'Exactly 1 week', 'Your full yearly income'],
    answer: 1,
    why:
      'A cushion of about three to six months of essential costs absorbs a job gap or an unexpected bill without pushing you onto costly credit. Keep it somewhere you can reach fast, not locked away.',
    slug: 'first-paycheck-money-guide',
  },
  {
    id: 'index-fund',
    question: 'What does an index fund actually do with your money?',
    options: [
      'A manager picks the best stocks each week',
      'It guarantees a fixed return every year',
      'It copies a whole list of companies, so you own a slice of the market',
      'It only buys government bonds',
    ],
    answer: 2,
    why:
      'An index fund tracks a published list — the top companies by size, for example — instead of paying someone to guess winners. That passiveness is why the yearly fee is usually tiny.',
    slug: 'index-funds-boring-ownership',
  },
  {
    id: 'debt-strategy',
    question: 'The "snowball" and "avalanche" approaches are two ways to do what?',
    options: [
      'Clear several balances you owe',
      'Compare fixed deposits',
      'Read a payslip',
      'Split bills with a partner',
    ],
    answer: 0,
    why:
      'Snowball clears the smallest balance first for a quick motivation win; avalanche targets the costliest rate first to save more over time. Neither is wrong — the best one is the one you stick with.',
    slug: 'debt-snowball-vs-avalanche',
  },
  {
    id: 'credit-score',
    question: 'Which habit most reliably nudges a credit score in the right direction?',
    options: [
      'Applying for many new cards at once',
      'Using a large share of your limit every month',
      'Paying on time and keeping balances low relative to your limit',
      'Never using credit at all',
    ],
    answer: 2,
    why:
      'Scores reward a steady record of on-time payments and light usage of the limit you are given. Opening many accounts quickly or maxing out a card tends to pull the number down.',
    slug: 'building-credit-from-zero',
  },
  {
    id: 'net-worth',
    question: 'Your net worth is best described as what?',
    options: [
      'Your monthly salary',
      'Everything you own minus everything you owe',
      'The total in your bank account',
      'Your highest ever savings balance',
    ],
    answer: 1,
    why:
      'Net worth adds up what you own and subtracts what you owe. It is the one number that shows real progress over time — steadier than any single paycheck or balance.',
    slug: 'net-worth-the-only-number',
  },
];

/** Score bands shown on the result screen. */
export const QUIZ_RESULTS = [
  {
    min: 5,
    title: 'Money sharp',
    blurb:
      'A clean sweep. You already think about money the way the good guides describe it — time to put it into action.',
  },
  {
    min: 3,
    title: 'Solid foundation',
    blurb:
      'You know the essentials and just have a few gaps left. The guides below will close them quickly.',
  },
  {
    min: 0,
    title: 'Just getting started',
    blurb:
      'Everyone begins somewhere, and these ideas are the ones worth learning first. Start with the guides below.',
  },
];
