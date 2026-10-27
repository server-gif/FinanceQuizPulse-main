import { Link } from 'react-router-dom';
import Container from '../components/Container/Container';
import SEO from '../components/SEO/SEO';
import { SITE } from '../config/site';
import './About.css';

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description={`${SITE.name} publishes clear, independent financial education for everyday readers.`}
        path="/about"
      />

      <section className="about page-section">
        <Container size="narrow">
          <span className="eyebrow">About</span>
          <h1 className="about__title">Money made simple, explained like a friend would.</h1>
          <p className="about__lede">
            {SITE.name} breaks down everyday money questions — spending, saving, borrowing and investing —
            into guides anyone can follow, with no jargon and no sales talk.
          </p>

          <div className="about__body">
            <h2>What we cover</h2>
            <p>
              You will find practical articles on personal finance, saving habits, investing, mutual funds,
              banking, credit, interest rates, taxes and how the wider economy touches your wallet. Every
              guide lays out the idea in plain words, the trade-offs behind it, and the right questions to
              ask yourself before you decide anything.
            </p>

            <h2 id="editorial-standards">Editorial standards</h2>
            <ul>
              <li>
                Each article is written from the ground up for this site — we never copy, scrape or put a
                light spin on someone else's publishing.
              </li>
              <li>We lay out concepts and options clearly; we never tell a reader exactly what to buy or sell.</li>
              <li>Numbers in our examples are round and illustrative — they are not forecasts of future returns.</li>
              <li>Figures you see in our worked examples are calculations we made ourselves, not quoted research or official statistics.</li>
              <li>Ads sit behind clear labels and never mix into the editorial text.</li>
              <li>When rules or everyday practices change, we revisit and update our articles.</li>
            </ul>

            <h2 id="disclaimer">Disclaimer</h2>
            <p>
              Everything here exists for general education only — it is not financial, investment, tax or
              legal advice. Money products carry risk, and the rules differ from country to country. Take
              your own situation into account and talk to a qualified professional before acting on anything
              you read here.
            </p>

            <h2 id="who-writes-here">Who writes here</h2>
            <p>
              Articles appear under desk names — Markets, Banking, Finance and Economy — instead of fake
              individual bylines or made-up professional credentials. You can find our rules for reusing
              content in the{' '}
              <Link to="/terms#copyright">Terms &amp; Conditions</Link>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
