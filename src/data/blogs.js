/**
 * Article data. UI components receive these objects through props —
 * add, remove or edit articles here without touching any component.
 *
 * Content blocks: { type: 'p'|'h2'|'h3', text } | { type: 'ul'|'ol', items } | { type: 'callout', title, text }
 * All content is general and educational; it is not personalised financial advice.
 */

const p = (text) => ({ type: 'p', text });
const h2 = (text) => ({ type: 'h2', text });
const h3 = (text) => ({ type: 'h3', text });
const ul = (...items) => ({ type: 'ul', items });
const ol = (...items) => ({ type: 'ol', items });
const callout = (title, text) => ({ type: 'callout', title, text });

const RAW_BLOGS = [
  {
    id: 1,
    slug: 'debt-snowball-vs-avalanche',
    title: 'Debt Snowball vs Avalanche: Which Clears Faster?',
    category: 'Banking & Credit',
    section: 'credit-cards',
    excerpt:
      'One method targets the smallest balance first, the other the highest rate. Neither is wrong — the best plan is the one you stick with when motivation dips.',
    isoDate: '2026-10-24',
    author: 'Banking Desk',
    featured: true,
    imageAlt: 'An energy bill invoice and a calculator placed on a clean white desk',
    content: [
      p('Carrying multiple debts feels paralytic until you pick a strategy. Two frameworks dominate the conversation: the snowball method attacks the smallest balance first, the avalanche method targets the highest interest rate. Both work — the question is which one matches how you actually behave under stress.'),
      h2('How the Snowball Works'),
      p('List every debt from smallest balance to largest. Pay minimums on everything, then throw every spare rupee at the smallest one. When it disappears, the freed payment rolls into the next. The psychological win of crossing an account off the list fuels the next round.'),
      h2('How the Avalanche Works'),
      p('Sort by interest rate descending. Attack the costliest debt first because that is where money bleeds fastest. Mathematically the avalanche saves more over the life of the debt, but it can take months before a balance is small enough to vanish, and that silence is where people lose steam.'),
      callout('The Honest Trade-Off', 'Avalanche saves money. Snowball saves motivation. If you have abandoned a plan before because progress felt invisible, the snowball is not the childish option — it is the realistic one.'),
      h2('Combining Both'),
      p('There is no rule against mixing them. Use the avalanche order for large high-rate balances, but knock out one or two tiny accounts early purely for the psychological boost. The goal is to stay in the game long enough to clear everything.'),
      h2('Before You Start Paying'),
      ol(
        'List every debt with its balance, rate and minimum payment.',
        'Stop adding to any of them — freeze the cards, pause new borrowing.',
        'Negotiate rates or consolidate if it lowers your blended cost without extending the term.',
        'Automate minimums so nothing goes late while you focus surplus on the target.',
      ),
      h2('The Finish Line'),
      p('Whichever order you choose, the last step is the same: the money that was going to debt payments does not vanish when the debt does. Redirect it immediately into savings or investments so the monthly cash flow you just reclaimed keeps working for you.'),
    ],
  },

  {
    id: 2,
    slug: 'index-funds-boring-ownership',
    title: 'Index Funds: The Boring Path to Real Ownership',
    category: 'Investing',
    section: 'grow-wealth',
    excerpt:
      'Owning everything beats picking winners for most people. A plain look at why low-cost index funds outperform the majority of active managers over any horizon you can name.',
    isoDate: '2026-10-21',
    author: 'Markets Team',
    imageAlt: 'A stock market trading screen showing green and red candlestick charts',
    content: [
      p('Index funds are the financial equivalent of whole-grain bread: nobody gets excited about them, and yet they outperform the flashy alternatives for most people over most time periods. The reason is structural, not lucky.'),
      h2('What an Index Fund Actually Buys'),
      p('Instead of hiring a manager to pick stocks, an index fund replicates a list — the top 50 or 300 companies by market size. You own a slice of the entire economy rather than betting on one person\'s research team. The cost of that passiveness is a tiny annual fee, often under 0.2%.'),
      h2('Why Most Active Managers Lose'),
      ul(
        'Fees: a 1.5% expense ratio must be earned back before the investor sees a single rupee of outperformance.',
        'Survivorship bias: the managers who performed well last decade often retired or closed their funds.',
        'Crowding: the same research and data lead many professionals to similar picks, erasing any edge.',
        'Turnover: frequent trading generates short-term capital gains taxed at higher rates.',
      ),
      callout('The Scoreboard', 'Over any rolling 15-year period, roughly 85–90% of actively managed Indian equity funds have underperformed their benchmark index after fees.'),
      h2('The Boring Behaviour Advantage'),
      p('Because an index fund has no stock-picking narrative, there is nothing to second-guess when prices fall. You are not asking "did the manager get it wrong?" — you are asking "do I still believe the economy will grow over a decade?" That simpler question is easier to answer honestly during a crash.'),
      h2('How to Start'),
      ol(
        'Pick a broad benchmark (Nifty 50, Nifty 500 or a total-market index).',
        'Choose a fund tracking it with the lowest expense ratio and smallest tracking error.',
        'Set a monthly auto-debit for a fixed amount on the day after payday.',
        'Check the balance once a quarter, not once a day.',
      ),
      h2('When Boring Becomes Powerful'),
      p('A flat monthly contribution into a total-market index, left untouched for twenty years, produces a number that surprises almost everyone who tried it. The strategy is not exciting. That is precisely why it survives your own emotions, your advisor\'s commissions and the next market headline.'),
    ],
  },

  {
    id: 3,
    slug: 'first-paycheck-money-guide',
    title: 'Your First Paycheck: A Money Starter Guide',
    category: 'Personal Finance',
    section: 'money-basics',
    excerpt:
      'The jump from student to salaried changes everything. A simple framework for splitting that first deposit so good habits form before lifestyle inflation arrives.',
    isoDate: '2026-10-18',
    author: 'Planning Desk',
    imageAlt: 'A miniature figure sitting on a stack of golden coins reading a tiny newspaper',
    content: [
      p('Your first salary is a one-time event that sets the template for every future one. The habits you build in the first three months — before rent rises, before the first festive sale, before the "you deserve this" narrative kicks in — compound for decades.'),
      h2('The 48-Hour Rule'),
      p('Before spending anything, let the money sit untouched for two full paydays. That gap forces you to see the actual balance rather than the number on the offer letter. Most first-job surprises come from taxes, provident fund deductions and professional adjustments you forgot about.'),
      h2('Split the Deposit'),
      ol(
        'Fixed costs (rent, utilities, transport, food): roughly 50%.',
        'Future-you fund (SIP, PPF, emergency savings): at least 20%.',
        'Guilt-free spending (dining, entertainment, shopping): up to 20%.',
        'Learning and growth (courses, books, certifications): the remaining 10%.',
      ),
      callout('The Raise Trap', 'Your salary will grow. If your spending grows at the same rate, your savings percentage never improves. Lock the 20% now and treat future raises as savings accelerators, not spending permission.'),
      h2('Open the Right Accounts'),
      ul(
        'One salary account where the money lands.',
        'One separate savings account for the emergency fund (not linked to your debit card).',
        'One demat or mutual fund account for investments (automate SIP so you never see the money).',
      ),
      h2('Insurance Before Investing'),
      p('A single hospital bill can erase two years of SIPs. Get a personal health cover (not just your employer group policy) and, if anyone depends on your income, a term life policy. Premiums at 22 are absurdly low compared to the same cover at 32.'),
      h2('The Long Game Starts Now'),
      p('You do not need to optimise everything today. You need to build the muscle of paying yourself first, consistently, before the spending decisions happen. Twenty years from now the habit will matter more than the amount.'),
    ],
  },

  {
    id: 4,
    slug: 'insurance-need-vs-sell',
    title: 'Insurance: What You Actually Need vs What Gets Sold',
    category: 'Saving',
    section: 'save-smarter',
    excerpt:
      'Endowment plans, money-back policies and ULIPs are packaged to look like investments. Real protection is cheaper and uglier — and you should know why.',
    isoDate: '2026-10-15',
    author: 'Finance Desk',
    imageAlt: 'A family of four standing together in an open field at golden-hour sunset',
    content: [
      p('Insurance is the product nobody enjoys thinking about, which is exactly why it gets oversold in confusing formats. Understanding the difference between protection and investment stops you from paying twice for the same promise.'),
      h2('The Only Question That Matters'),
      p('"If I died or got seriously ill tomorrow, who would suffer financially?" If the answer is nobody — you have no dependents, no joint debt, no one relying on your income — you need very little life cover. If the answer is your parents, your children or a co-borrower, you need enough cover to replace their lost income.'),
      h2('Term Insurance: Ugly but Honest'),
      ul(
        'Pure protection: if you die during the term, the sum assured pays out. Otherwise nothing returns.',
        'A 1-crore cover at age 28 costs roughly 8,000–12,000 a year.',
        'No savings component means no hidden commissions eating your premium.',
        'The simplicity is the feature — you are buying a payout, not a maturity bonus.',
      ),
      callout('The Endowment Problem', 'A "money-back" or endowment plan returns roughly 5–6% annualised over 20 years while giving you only a fraction of the death cover a term plan provides at the same premium. You are buying two mediocre products instead of one good one each.'),
      h2('Health Insurance Is Non-Negotiable'),
      p('A single hospitalisation can wipe out savings. Buy an individual or family floater policy of at least 5–10 lakhs. Employer group cover is a starting point, not a safety net — you lose it the day you switch jobs. Check room-rent limits, co-pay clauses and pre-existing-disease waiting periods before you sign.'),
      h2('When to Skip Insurance Altogether'),
      p('If an unexpected loss would not change your life financially — a dropped phone, a cancelled flight, a scratched rental car — self-insure. The premium on small-ticket policies is almost always worse value than paying the occasional repair from savings.'),
      h2('Review Annually'),
      ol(
        'Life stage changes (marriage, child, home EMI) mean your cover needs to grow.',
        'Health policies renew with premium jumps — compare alternatives each year.',
        'Remove any policy that mixes investment and protection in favour of separate products.',
      ),
    ],
  },

  {
    id: 5,
    slug: 'tax-advantaged-accounts-missing',
    title: 'Tax-Advantaged Accounts You Might Be Ignoring',
    category: 'Personal Finance',
    section: 'money-basics',
    excerpt:
      'The government leaves several doors open for reducing your taxable income. Most people walk past them because the paperwork feels tedious — until April.',
    isoDate: '2026-10-12',
    author: 'Finance Desk',
    imageAlt: 'A hand holding a clear glass jar labelled savings, filled with coins and banknotes',
    content: [
      p('Every rupee you route into the right account before the financial year ends saves tax at your slab rate. Yet most people discover these options only when their CA sends a WhatsApp message in March saying "did you invest?"'),
      h2('Section 80C: The Old Guard'),
      ul(
        'EPF (Employee Provident Fund): your employer matches your contribution, and the combined amount counts under 80C.',
        'PPF (Public Provident Fund): 1.5 lakh ceiling, current rate around 7.1%, tax-free maturity.',
        'ELSS mutual funds: three-year lock-in, equity-linked returns, lowest waiting period among 80C options.',
        'National Savings Certificate, five-year tax-saving FD, children\'s tuition fees — all share the same 1.5 lakh umbrella.',
      ),
      h2('Section 80CCD(1B): The Extra 50,000'),
      p('On top of the 1.5 lakh 80C limit, the NPS (National Pension System) gives an additional 50,000 deduction. If your 80C slots are already full, NPS is the only way to push your total deduction to 2 lakh.'),
      callout('The Lock-In Trade', 'NPS money is locked until 60. That is the price of the tax break. If you might need the cash before then, treat it as a retirement-only contribution.'),
      h2('Section 80D: Health Insurance Premiums'),
      p('Premiums for self and family: up to 25,000 (60,000 if parents are senior citizens). This deduction sits on top of 80C, so it is free money for a policy you should already have.'),
      h2('Home Purchase: Sections 24 and 80EEA'),
      ol(
        'Interest on a self-occupied property: up to 2 lakh deduction under Section 24(b).',
        'Principal repayment: counts under 80C (shared with PPF, EPF, etc.).',
        'First-time buyers under the affordable-housing scheme may claim an extra 50,000 under 80EEA.',
      ),
      h2('HRA: The Most Overlooked'),
      p('If you live on rent and receive HRA in your salary, you can claim a deduction without investing anything extra. Form 12AA, rent receipts and your landlord\'s PAN (if rent exceeds 1 lakh a month) are all it takes.'),
      h2('The March Panic Fix'),
      p('Set up monthly auto-debits into PPF or ELSS in April, not a lump sum in March. You will sleep better, avoid the last-day technical glitches on the post-office portal, and the money will have eleven extra months of compounding.'),
    ],
  },

  {
    id: 6,
    slug: 'rent-vs-buy-the-math',
    title: 'Rent vs Buy: The Math Nobody Shows You',
    category: 'Personal Finance',
    section: 'money-basics',
    excerpt:
      'The emotional case for ownership is strong. The financial case depends on numbers most people never calculate — opportunity cost, maintenance and the true EMI outlay.',
    isoDate: '2026-10-09',
    author: 'Economy Desk',
    imageAlt: 'Modern apartment buildings viewed from street level against a clear sky',
    content: [
      p('"Rent is wasteful, at least the EMI gets you an asset" is the most repeated financial sentence in Indian households. It is also incomplete. The comparison that matters is not rent versus EMI — it is the total cost of owning versus the total cost of renting plus investing the difference.'),
      h2('The Hidden Costs of Owning'),
      ul(
        'Down payment: 10–20% of property value locked up with no liquidity.',
        'Stamp duty, registration and brokerage: 6–10% gone before you move in.',
        'EMI interest: in a 20-year home finance at 8.5%, you pay roughly 1.5 times the principal in interest alone.',
        'Maintenance, property tax, society charges: typically 0.3–0.5% of property value annually.',
        'Opportunity cost: the down payment invested in an index fund at 12% would have compounded significantly.',
      ),
      h2('The True Cost of Renting'),
      p('Rent is not just the monthly cheque. Factor in the annual escalation (5–10% in most metros), zero forced savings and no equity building. But renting gives you mobility, predictable costs and the freedom to invest the capital you did not lock in a down payment.'),
      callout('The 35% Rule', 'If your total monthly housing cost (EMI + maintenance + taxes) exceeds 35% of take-home income, you are house-poor. The remaining budget for investing, living and emergencies shrinks dangerously.'),
      h2('When Buying Makes Sense'),
      ol(
        'You plan to stay in the same city and property for at least seven years.',
        'The EMI plus hidden costs stays under 35% of income.',
        'Property prices in your target area have been flat or falling, reducing the risk of buying at a peak.',
        'You would otherwise not save — the forced discipline of an EMI is genuinely useful for some people.',
      ),
      h2('When Renting Wins'),
      p('If your career might move cities in three years, if the rent-to-price ratio in your area is below 3% (common in prime metros), or if the down payment invested elsewhere would outpace property appreciation, renting and investing the difference produces a larger net worth after 15 years.'),
      h2('The Decision Is Personal'),
      p('The spreadsheet gives you a number. Stability, emotional comfort, school districts and landlord relationships give you a life. Both are valid. Just make the choice with the full math visible rather than a slogan.'),
    ],
  },

  {
    id: 7,
    slug: 'building-credit-from-zero',
    title: 'Building Credit From Zero: A Practical Playbook',
    category: 'Banking & Credit',
    section: 'credit-cards',
    excerpt:
      'No credit history means no score, and no score means every lender sees a stranger. A step-by-step path from invisible to trustworthy in under a year.',
    isoDate: '2026-10-06',
    author: 'Banking Desk',
    imageAlt: 'A hand holding a credit card against a blurred gradient background',
    content: [
      p('A credit score is a trust signal built over time. If you have never borrowed, you have no signal, and lenders treat you as a risk. The fix is simple but requires patience: borrow tiny amounts, repay perfectly, and let the bureaus notice.'),
      h2('Start With What You Can Get'),
      ul(
        'A secured credit card: deposit a refundable amount (often 10,000–25,000) and receive a card with a small limit.',
        'A student or starter card from your salary-account bank: limits are low but approval odds are high.',
        'A small consumer-durable EMI (phone, laptop) from an NBFC that reports to CIBIL.',
      ),
      h2('The Utilisation Game'),
      p('Bureaus check how much of your available limit you use. Keeping the reported balance below 30% of your limit (ideally below 10%) signals that you are not desperate for credit. If your limit is 20,000, never let the statement show more than 6,000.'),
      callout('The Reporting Date', 'Balances are captured on a fixed monthly date, not your due date. Pay the card two days before the statement cut so the reported figure is near zero.'),
      h2('Payment History: The 35% Weight'),
      p('One missed payment can drop a young score by 50–100 points and stays on your report for up to seven years. Automate at least the minimum payment so a busy week never becomes a default.'),
      h2('Don\'t Apply Everywhere'),
      ol(
        'Each application triggers a hard enquiry visible to other lenders.',
        'Five enquiries in one month signals urgency, even if every card was approved.',
        'Apply for one product, use it well for six months, then consider a second.',
      ),
      h2('Length of History Matters'),
      p('A credit card you have held for three years with perfect payments is worth more than three cards opened last month. Keep your oldest account active even if you prefer a different card for daily use — a small annual fee on an old card buys you a longer credit history.'),
      h2('Check Your Own Report'),
      p('Bureaus in India allow one free report per year. Pull it, verify every account belongs to you, and dispute errors in writing. A wrong "settled" status or an account you never opened can silently block future borrowing.'),
    ],
  },

  {
    id: 8,
    slug: 'real-cost-of-running-a-car',
    title: 'The Real Cost of Running a Car (Beyond the EMI)',
    category: 'Personal Finance',
    section: 'money-basics',
    excerpt:
      'The showroom price is the entry ticket. Fuel, insurance, servicing, depreciation and parking add a second salary that never appears in the brochure.',
    isoDate: '2026-10-03',
    author: 'Economy Desk',
    imageAlt: 'A sleek electric car parked in front of a modern glass building at dusk',
    content: [
      p('A car EMI is the most visible cost and the least representative one. Once you add fuel, insurance, maintenance, depreciation and parking, the true annual cost often matches or exceeds the EMI itself.'),
      h2('The Full Ledger'),
      ul(
        'EMI or opportunity cost of the down payment.',
        'Fuel: a 15 kmpl car doing 1,000 km/month at 100/litre costs roughly 6,700 a month.',
        'Insurance: 15,000–30,000/year depending on city, car value and no-claim bonus.',
        'Periodic servicing: 5,000–12,000 every six months for a mainstream sedan.',
        'Depreciation: a new car loses 15–20% of its value in year one alone.',
        'Parking, tolls, car washes, tyres, unexpected repairs.',
      ),
      callout('The 5-Year Number', 'A 10-lakh car bought on 70% credit typically costs 14–16 lakh total over five years when you include everything above. The sticker price was only 65% of the true outlay.'),
      h2('The Same Trip by Cab'),
      p('If you drive 1,000 km a month, a ride-hailing app at 15/km costs 15,000 — often less than the all-in cost of ownership. The car wins on comfort, spontaneity and weekend trips. It loses on pure arithmetic unless you drive 2,000+ km monthly.'),
      h2('Depreciation: The Silent Killer'),
      ol(
        'Year 1: lose 15–20% of value.',
        'Years 2–5: lose 8–10% annually.',
        'After year 5: the curve flattens, which is why a two-year-old car is better value than new.',
      ),
      h2('Reducing the Bill Without Selling'),
      p('Buy a three-year-old car instead of new. Service at an independent garage after warranty ends. Compare insurance quotes every renewal year rather than auto-renewing. Combine errands to reduce fuel. Park at home instead of paying monthly rent for a spot you use twelve hours a day.'),
      h2('When a Car Is the Right Call'),
      p('If your commute has no public transport, you have children or elderly parents to ferry, or the time saved by driving versus cabs is worth money to you, the car earns its keep. Just budget the full cost honestly instead of treating the EMI as the only line item.'),
    ],
  },

  {
    id: 9,
    slug: 'fixed-deposits-vs-bonds',
    title: 'Fixed Deposits vs Bonds: Where to Park Surplus Cash',
    category: 'Investing',
    section: 'grow-wealth',
    excerpt:
      'Both promise a fixed return. The differences are in tax treatment, liquidity, credit risk and whether your money actually beats inflation after the government takes its share.',
    isoDate: '2026-09-30',
    author: 'Markets Team',
    imageAlt: 'Classical stone columns of a bank building photographed from below against an overcast sky',
    content: [
      p('Once your emergency fund is full and your SIPs are running, surplus cash needs a parking spot that earns something without gambling. Fixed deposits and government/corporate bonds are the two most common choices. They look similar on the surface and behave very differently in practice.'),
      h2('The Fixed Deposit Case'),
      ul(
        'Simplicity: walk into a bank or use an app, pick a tenure, done.',
        'DICGC insurance covers up to 5 lakh per depositor per bank.',
        'Premature withdrawal is possible with a small penalty (usually 0.5–1%).',
        'Senior citizens get an extra 0.5% and TDS exemption up to a threshold.',
      ),
      h2('The Bond Case'),
      p('Government securities (G-secs) carry sovereign risk — effectively zero. Corporate bonds pay more but introduce credit risk. The key advantage over FDs: if you hold a listed bond to maturity, the price you locked in is what you get regardless of rate changes, and the coupon can be higher than a bank\'s post-office offer.'),
      callout('Tax Reality', 'FD interest is added to your income and taxed at your slab. Bond capital gains held over 12 months are taxed at 12.5% without indexation (post-April 2023 rules). For anyone in the 30% bracket, the bond tax treatment can add 1–1.5% to the effective post-tax yield.'),
      h2('Liquidity Compared'),
      ol(
        'FDs: break it online in minutes, accept a small penalty.',
        'Listed bonds: sell on the exchange during market hours, but bid-ask spreads on smaller issues can be wide.',
        'G-secs via Retail Direct: 24×7 access, but settlement is T+1.',
      ),
      h2('Inflation Check'),
      p('A 7% FD in a 6% CPI environment earns 1% real. A 7.5% G-sec with slightly better tax treatment can push that to 2%. Neither is exciting, but both are honest about what "safe" returns look like after the government and inflation take their share.'),
      h2('A Sensible Blend'),
      p('Keep the shortest-term money (under one year) in an FD for instant access. Put 2–5 year surplus into a ladder of G-secs or high-rated corporate bonds so a portion matures each year, giving you regularity without locking everything at one rate.'),
    ],
  },

  {
    id: 10,
    slug: 'reading-a-payslip',
    title: 'How to Read a Payslip Without Panic',
    category: 'Personal Finance',
    section: 'money-basics',
    excerpt:
      'CTC is not what hits your account. Understanding every deduction, allowance and tax line turns a confusing PDF into a tool for negotiating your next offer.',
    isoDate: '2026-09-27',
    author: 'Finance Desk',
    imageAlt: 'A metallic ballpoint pen resting beside a blank bank check with security patterns',
    content: [
      p('Your offer letter says 12 LPA. Your bank says 78,000. The gap is not theft — it is structure. Reading a payslip properly helps you plan cash flow, spot errors and negotiate compensation packages that actually put more money in your pocket.'),
      h2('The Three Sections'),
      ul(
        'Earnings: Basic, HRA, special allowance, LTA, food coupons, medical reimbursement.',
        'Deductions: EPF, professional tax, income tax (TDS), housing EMIs, insurance premium.',
        'Net Pay: what actually hits your salary account.',
      ),
      h2('Why Basic Matters Most'),
      p('EPF is 12% of Basic + DA. Gratuity is calculated on Basic. Higher Basic means higher retirement contributions but also higher taxable income. Some employers keep Basic at 40% of CTC to reduce their EPF burden — you can negotiate for a higher percentage.'),
      callout('The 40% Trap', 'If Basic is only 30% of CTC, your employer\'s EPF contribution looks smaller on paper but your take-home rises. Trade-off: lower future pension vs more cash now. Neither is wrong — just know which one you are choosing.'),
      h2('HRA: Free Money If You Rent'),
      ol(
        'If your city gives 50% HRA and you live in rented accommodation, a large portion of that allowance is tax-exempt.',
        'Submit rent receipts and your landlord\'s PAN before the first TDS deduction cycle.',
        'If you own a home and get HRA, the full amount is taxable — restructure your package to shift that portion into other allowances.',
      ),
      h2('Perks and Notional Tax'),
      p('Company car, paid accommodation above a threshold, stock options at exercise — these add a "perquisite value" to your taxable income even though no cash hits your account. Check whether your payslip shows a "notional" deduction column; if it does, that portion is taxed at source.'),
      h2('Spotting Errors'),
      p('Compare your payslip against your Form 16 at year-end. Common mismatches: extra months of professional tax, wrong HRA exemption calculation, or EPF contributions that do not match 12% of Basic. A single email to HR can recover thousands.'),
      h2('The Big Picture'),
      p('Once you understand the structure, you can ask for a restructured package that increases your take-home without increasing CTC — shifting more into HRA, food coupons or reimbursements that are tax-efficient. The same salary can produce a very different payslip.'),
    ],
  },

  {
    id: 11,
    slug: 'financial-goals-that-survive',
    title: 'Financial Goals That Survive a Bad Year',
    category: 'Saving',
    section: 'save-smarter',
    excerpt:
      'Most money plans work until life does not. A framework for setting targets that bend instead of break when income drops, health fails or priorities shift.',
    isoDate: '2026-09-24',
    author: 'Planning Desk',
    imageAlt: 'An open laptop on a wooden desk surrounded by a notebook, pen and small potted plant',
    content: [
      p('A goal written as "save 20 lakh in five years" is a promise to a version of you that does not yet know what is coming. The best financial goals have structure, flexibility and a built-in pause button that does not feel like failure.'),
      h2('Use Ranges, Not Numbers'),
      p('"Save between 15 and 22 lakh over four to five years" gives your brain a target zone rather than a single pass/fail line. When income dips, you are still inside the range. When it surges, you push toward the upper bound. Either way, you are on track.'),
      h2('Attach a Why to Each What'),
      ul(
        '"Emergency fund" is abstract. "Sleep without checking my bank balance" is a feeling.',
        '"Retirement corpus" is 30 years away. "Not asking my children for money at 65" is vivid.',
        '"Child\'s education" is a line item. "Letting them choose a course without a cost filter" is a story.',
      ),
      callout('The Identity Test', 'If a goal is something you think you should want (a bigger flat, a luxury car) rather than something you genuinely value, you will abandon it at the first discomfort. Pick goals that survive honesty.'),
      h2('Break Long Goals Into Quarters'),
      ol(
        'Annual milestone: "This year I add 4 lakh to my corpus."',
        'Quarterly checkpoint: "By March, the SIP balance should cross 12 lakh."',
        'Monthly action: "Auto-debit 33,000 on the 2nd."',
      ),
      h2('Plan the Pause Before You Need It'),
      p('Life will interrupt: a medical bill, a job switch, a family emergency. Decide in advance what a "pause" looks like — reduce SIP by 50% for three months, skip one quarter\'s milestone — so that when it happens you follow a plan instead of spiralling into guilt and quitting entirely.'),
      h2('Review, Don\'t Restart'),
      p('Once a year, sit down with your numbers and ask: are the goals still mine? Is the timeline realistic given what last year actually looked like? Adjust the range, shift the deadline, celebrate the progress. A goal you revise is not a failure — it is a living plan that survived the year.'),
    ],
  },

  {
    id: 12,
    slug: 'when-to-break-money-rules',
    title: 'When to Break Your Own Money Rules',
    category: 'Personal Finance',
    section: 'money-basics',
    excerpt:
      'Discipline is the foundation, but rigid rules can cost more than they save. A guide to the rare moments when flexibility beats the plan.',
    isoDate: '2026-09-21',
    author: 'Finance Desk',
    imageAlt: 'Three coloured pens laid neatly on a white sheet of paper with printed text',
    content: [
      p('Money rules — "never spend more than 20% on dining," "always invest before you spend," "never touch the emergency fund" — are guardrails that protect you from your own impulses. But a guardrail that never comes off can block a necessary exit.'),
      h2('The Rule Was Right When You Made It'),
      p('Rules are written in calm months by a version of you who did not anticipate the layoff, the medical diagnosis or the once-in-a-decade opportunity. When circumstances genuinely change, the rule that made sense then may not make sense now. Breaking it is not weakness — it is updating.'),
      h2('When Breaking a Rule Makes Sense'),
      ul(
        'A career opportunity requires relocating to a costlier city for two years and the salary jump justifies it.',
        'A parent\'s health needs mean the emergency fund is doing exactly what it was built for.',
        'A market crash has dropped your target stock to a valuation you will never see again, and the cash is sitting in a 3% savings account.',
        'Spending on a reliable appliance replacement saves a monthly rental fee that has been quietly draining the budget.',
      ),
      callout('The Test', 'Can you articulate WHY you are breaking the rule in one sentence? If the reason is "I feel like it" or "everyone else is doing it," the rule still applies. If the reason is structural — the world changed — the rule should change too.'),
      h2('How to Break a Rule Without Breaking the System'),
      ol(
        'Set a time limit: "I will overspend on dining for two months while I settle into the new city, then return to the rule."',
        'Name the source: "This withdrawal comes from the emergency fund, not from investments."',
        'Write a rebuild plan: "I will replenish the fund by March by redirecting my monthly SIP surplus."',
        'Do not let one exception become a new default.',
      ),
      h2('When You Should Not Break the Rule'),
      p('Boredom, FOMO, social pressure and "this time is different" are not structural changes. They are your brain looking for permission. If the only reason to break the rule is that following it feels restrictive, that is exactly the feeling the rule was designed to survive.'),
      h2('The Meta-Rule'),
      p('The only rule that should never be broken: never make a financial decision you cannot explain to a calm, rational version of yourself six months later. If you can, the exception is justified. If you cannot, the rule still applies.'),
    ],
  },

  {
    id: 13,
    slug: 'net-worth-the-only-number',
    title: 'Net Worth: The Only Financial Number That Matters',
    category: 'Business & Economy',
    section: 'economy-rates',
    excerpt:
      'Salary tells you what flows in. Net worth tells you what stays. Tracking it quarterly turns vague financial anxiety into a measurable trajectory.',
    isoDate: '2026-09-18',
    author: 'Economy Desk',
    imageAlt: 'Overhead view of a person working on a MacBook displaying financial charts and data',
    content: [
      p('Income is a headline. Net worth is the story. A person earning 30 lakh a year with 28 lakh in expenses and no assets has less financial security than someone earning 8 lakh who has quietly built a 40 lakh portfolio over a decade.'),
      h2('The Formula'),
      p('Net worth = everything you own (cash, investments, property, vehicle resale value, gold) minus everything you owe (home EMI, car finance, credit card balances, personal debt). The result is a single number that captures your entire financial position in one line.'),
      h2('Why It Beats Every Other Metric'),
      ul(
        'It includes hidden progress: an EPF balance you never see still counts.',
        'It penalises lifestyle inflation: a bigger EMI on a fancier car drops the number.',
        'It rewards debt repayment: clearing an EMI increases net worth even without new income.',
        'It is immune to salary negotiation theatre: the number does not care what your CTC claims.',
      ),
      callout('The First Calculation Is Uncomfortable', 'Most people in their late twenties discover their net worth is negative — the car EMI and credit card balance exceed their savings. That shock is useful. It is the starting line, not the verdict.'),
      h2('How to Track It'),
      ol(
        'Pick one day per quarter (a Sunday, a birthday, any fixed anchor).',
        'List every asset with its current market value (use the latest portfolio statement, property valuation apps, car resale quotes).',
        'List every outstanding EMI and debt balance.',
        'Subtract, write the number down and do not judge it. Just note the direction versus last quarter.',
      ),
      h2('The Trajectory Matters More Than the Number'),
      p('A net worth of 5 lakh that is growing 15% annually is in better shape than 50 lakh that has been flat for three years. The slope tells you whether your habits are building or eroding. A flat line is a signal to audit; a falling line is a signal to act.'),
      h2('What Moves the Needle Fastest'),
      p('At lower net worths, increasing income and saving the delta moves the number faster than chasing investment returns. At higher net worths, asset allocation and tax efficiency matter more than the next raise. Knowing which phase you are in prevents you from optimising the wrong lever.'),
    ],
  },

  {
    id: 14,
    slug: 'splitting-finances-as-a-couple',
    title: 'Splitting Finances as a Couple Without Keeping Score',
    category: 'Personal Finance',
    section: 'money-basics',
    excerpt:
      'Two incomes, one life. The conversation about who pays for what is really about trust, autonomy and shared goals — and it gets easier with structure.',
    isoDate: '2026-09-15',
    author: 'Planning Desk',
    imageAlt: 'A young couple seated at a kitchen table reviewing a stack of unpaid bills together',
    content: [
      p('Money is the most common source of conflict in relationships, and it is rarely about the numbers. It is about fairness, autonomy and whether both people feel their contribution is seen. A structure agreed in calm times prevents the scorekeeping that erodes trust.'),
      h2('The Three Models'),
      ul(
        'Fully joint: all income goes into one pot, all spending comes from it. Simple, but requires total transparency and can erode personal autonomy.',
        'Fully separate: each person pays a fixed share of household costs, keeps the rest. Clean, but can feel transactional and breeds resentment when incomes differ.',
        'The Hybrid: a joint account covers shared expenses (rent, utilities, groceries, EMIs), and each person keeps a personal account for guilt-free individual spending.',
      ),
      callout('The Proportional Twist', 'In the hybrid model, contribute to the joint account as a percentage of income rather than a fixed amount. If one earns 60% of household income, they pay 60% of shared costs. Fairness is not equality — it is proportionality.'),
      h2('Have the Money Date First'),
      ol(
        'Sit down together before moving in or getting married.',
        'Disclose every debt, obligation and financial commitment honestly.',
        'Agree on a monthly "household budget" number that both feel is fair.',
        'Decide what counts as a "shared" expense versus a "personal" one.',
      ),
      h2('Protect Individual Autonomy'),
      p('Neither partner should need permission to buy a coffee, a book or a gadget from their own surplus. The moment personal spending requires justification, the relationship starts keeping receipts. Agree on a personal threshold above which you give each other a heads-up (not approval — a heads-up) and keep everything below it private.'),
      h2('When One Person Earns Significantly Less'),
      p('The lower earner should not feel like a guest in their own home. The joint contribution scales with income, and the higher earner\'s surplus goes toward shared long-term goals (home fund, retirement) rather than individual luxury. The framing is "we are building together," not "I am subsidising you."'),
      h2('Annual Review, Not Daily Audit'),
      p('Once a year, revisit the split. Incomes change, a child arrives, one person goes back to study. The model that worked at 27 may need adjusting at 32. The conversation itself — sitting down, being honest, making a plan together — is the actual financial product. The numbers are just the paperwork.'),
    ],
  },
];

const wordCount = (blocks) =>
  blocks
    .flatMap((block) => (block.items ? block.items : [block.title, block.text]))
    .filter(Boolean)
    .join(' ')
    .split(/\s+/).length;

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

/**
 * Article photographs live in public/images/photos/ and are served from our own
 * origin — the site makes no third-party image request. They were fetched once by
 * scripts/fetch-photos.ps1 and are used under the Unsplash Licence (free for
 * commercial use, no attribution required). Copyright stays with each
 * photographer, so the Terms page never describes photographs as our own work.
 *
 * imageAlt below describes what each photograph actually shows.
 */
const IMAGES = {
  'debt-snowball-vs-avalanche': '/images/photos/debt-snowball-vs-avalanche.jpg',
  'index-funds-boring-ownership': '/images/photos/index-funds-boring-ownership.jpg',
  'first-paycheck-money-guide': '/images/photos/first-paycheck-money-guide.jpg',
  'insurance-need-vs-sell': '/images/photos/insurance-need-vs-sell.jpg',
  'tax-advantaged-accounts-missing': '/images/photos/tax-advantaged-accounts-missing.jpg',
  'rent-vs-buy-the-math': '/images/photos/rent-vs-buy-the-math.jpg',
  'building-credit-from-zero': '/images/photos/building-credit-from-zero.jpg',
  'real-cost-of-running-a-car': '/images/photos/real-cost-of-running-a-car.jpg',
  'fixed-deposits-vs-bonds': '/images/photos/fixed-deposits-vs-bonds.jpg',
  'reading-a-payslip': '/images/photos/reading-a-payslip.jpg',
  'financial-goals-that-survive': '/images/photos/financial-goals-that-survive.jpg',
  'when-to-break-money-rules': '/images/photos/when-to-break-money-rules.jpg',
  'net-worth-the-only-number': '/images/photos/net-worth-the-only-number.jpg',
  'splitting-finances-as-a-couple': '/images/photos/splitting-finances-as-a-couple.jpg',
};

/** Final article objects: derived fields (image paths, date, read time) are computed once. */
export const BLOGS = RAW_BLOGS.map((blog) => ({
  ...blog,
  image: IMAGES[blog.slug],
  ogImage: IMAGES[blog.slug],
  date: formatDate(blog.isoDate),
  readTime: Math.max(1, Math.round(wordCount(blog.content) / 160)),
})).sort((a, b) => b.isoDate.localeCompare(a.isoDate));

export const getBlogBySlug = (slug) => BLOGS.find((blog) => blog.slug === slug);

export const getBlogsBySection = (section) => BLOGS.filter((blog) => blog.section === section);

export const getFeaturedBlog = () => BLOGS.find((blog) => blog.featured) ?? BLOGS[0];

/** Same-section articles first, then the most recent others. */
export const getRelatedBlogs = (blog, limit = 3) => {
  const others = BLOGS.filter((item) => item.id !== blog.id);
  const sameSection = others.filter((item) => item.section === blog.section);
  const rest = others.filter((item) => item.section !== blog.section);
  return [...sameSection, ...rest].slice(0, limit);
};
