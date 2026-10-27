import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiArrowDownRight,
  FiTrendingUp,
  FiShield,
  FiBookOpen,
  FiPieChart,
  FiCreditCard,
  FiFileText,
} from 'react-icons/fi';
import ArticleImage from '../ArticleImage/ArticleImage';
import Container from '../Container/Container';
import { BLOGS } from '../../data/blogs';
import './HeroSection.css';

/** Latest articles shown as rows inside the dashboard window. */
const CARDS = BLOGS.slice(0, 3);

/** Topics we cover. */
const TOPICS = [
  { label: 'Budgeting', Icon: FiPieChart },
  { label: 'Investing', Icon: FiTrendingUp },
  { label: 'Credit', Icon: FiCreditCard },
  { label: 'Taxes', Icon: FiFileText },
];

/** Trust points. */
const TRUST = [
  { label: 'Plain-language guides', Icon: FiBookOpen },
  { label: 'Unbiased, no hype', Icon: FiShield },
];

/** Items in the scrolling ticker (rendered twice so the loop is seamless). */
const TICKER = [...TOPICS, ...TRUST];

/** Brand-aligned hero banner — dashboard-window variant. */
export default function HeroSection() {
  return (
    <section className="hero">
      {/* Decorative background */}
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__glow hero__glow--a" />
        <span className="hero__glow hero__glow--b" />
        <span className="hero__dots" />
      </div>

      <Container className="hero__inner">
        {/* ---------- Left: copy ---------- */}
        <div className="hero__main">
          <span className="hero__kicker">
            <span className="hero__kicker-slash" aria-hidden="true">//</span>
            Finance, Simplified
          </span>

          <h1 className="hero__heading">
            <span className="hero__line">Your Money</span>{' '}
            <span className="hero__line">
              Decisions
              <span className="hero__heading-icon" aria-hidden="true">
                <FiArrowDownRight />
              </span>
            </span>{' '}
            <span className="hero__highlight">Deserve Better</span>
          </h1>

          <p className="hero__subtitle">
            No jargon, no sales pitch — just honest, plain-language guides on budgeting,
            investing, credit &amp; taxes that actually help you decide.
          </p>

          <div className="hero__actions">
            <Link to="/blog" className="hero__btn hero__btn--primary">
              <span className="hero__btn-label">Discover Guides</span>
              <span className="hero__btn-icon" aria-hidden="true">
                <FiArrowRight />
              </span>
            </Link>
          </div>

          {/* Scrolling ticker (visual) */}
          <div className="hero__ticker" aria-hidden="true">
            <div className="hero__ticker-track">
              {[...TICKER, ...TICKER].map(({ label, Icon }, i) => (
                <span key={`${label}-${i}`} className="hero__ticker-item" style={{ '--i': i }}>
                  <Icon />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Same info for screen readers */}
          <ul className="hero__sr-only" aria-label="Topics we cover">
            {TOPICS.map(({ label }) => <li key={label}>{label}</li>)}
          </ul>
          <ul className="hero__sr-only">
            {TRUST.map(({ label }) => <li key={label}>{label}</li>)}
          </ul>
        </div>

        {/* ---------- Right: dashboard window ---------- */}
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__window">
            <div className="hero__window-bar">
              <span className="hero__window-dot" />
              <span className="hero__window-dot" />
              <span className="hero__window-dot" />
              <span className="hero__window-title">Pulse / overview</span>
            </div>

            <div className="hero__window-body">
              {/* Growth panel */}
              <div className="hero__panel">
                <div className="hero__panel-head">
                  <span className="hero__panel-label">Your money, growing</span>
                  <span className="hero__panel-badge">
                    <FiTrendingUp />
                    +12.4%
                  </span>
                </div>

                <svg className="hero__chart" viewBox="0 0 260 90" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heroChartFillAlt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line className="hero__chart-grid" x1="0" y1="22" x2="260" y2="22" />
                  <line className="hero__chart-grid" x1="0" y1="45" x2="260" y2="45" />
                  <line className="hero__chart-grid" x1="0" y1="68" x2="260" y2="68" />
                  <path
                    className="hero__chart-area"
                    d="M0 78 L30 70 L60 74 L90 58 L120 62 L150 44 L180 48 L210 28 L240 22 L260 10 L260 90 L0 90 Z"
                    fill="url(#heroChartFillAlt)"
                  />
                  <path
                    className="hero__chart-line"
                    d="M0 78 L30 70 L60 74 L90 58 L120 62 L150 44 L180 48 L210 28 L240 22 L260 10"
                    pathLength="1"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Latest articles */}
              <div className="hero__list-head">
                <span>Latest guides</span>
                <span className="hero__list-count">{CARDS.length} new</span>
              </div>

              <ul className="hero__list">
                {CARDS.map((blog, index) => (
                  <li key={blog.id} className="hero__card" style={{ '--i': index }}>
                    <span className="hero__card-num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <ArticleImage
                      src={blog.image}
                      alt=""
                      ratio="1 / 1"
                      className="hero__card-image"
                    />
                    <div className="hero__card-text">
                      <span className="hero__card-cat">{blog.category}</span>
                      <span className="hero__card-title">{blog.title}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}