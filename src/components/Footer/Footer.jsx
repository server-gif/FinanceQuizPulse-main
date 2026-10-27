import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUp, FiBookOpen, FiShield } from 'react-icons/fi';
import { CATEGORIES } from '../../data/categories';
import { SITE } from '../../config/site';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true" />

      <Container className="footer__inner">
        {/* ---------- CTA band ---------- */}
        <div className="footer__cta">
          <div className="footer__cta-text">
            <h2 className="footer__cta-title">
              Make your next money move <span>a smarter one.</span>
            </h2>
            <p>Plain-language guides on budgeting, investing, credit &amp; taxes — free, always.</p>
          </div>
          <Link to="/blog" className="footer__cta-btn">
            Explore Articles
            <span className="footer__cta-icon" aria-hidden="true">
              <FiArrowRight />
            </span>
          </Link>
        </div>

        {/* ---------- Main grid ---------- */}
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <Logo className="footer__logo-mark" />
              <span className="footer__logo-name">
                Finance<span>QuizPulse</span>
              </span>
            </Link>
            <p className="footer__desc">{SITE.description}</p>

            <ul className="footer__badges">
              <li>
                <FiBookOpen aria-hidden="true" />
                Plain-language guides
              </li>
              <li>
                <FiShield aria-hidden="true" />
                Unbiased, no hype
              </li>
            </ul>
          </div>

          <nav aria-label="Topics" className="footer__col">
            <h2 className="footer__heading">Topics</h2>
            <ul className="footer__list">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link to={`/category/${category.slug}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="footer__col">
            <h2 className="footer__heading">Company</h2>
            <ul className="footer__list">
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/blog">All articles</Link></li>
            </ul>
          </nav>

          <nav aria-label="Legal" className="footer__col">
            <h2 className="footer__heading">Legal</h2>
            <ul className="footer__list">
              <li><Link to="/terms">Terms &amp; Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </nav>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="footer__bottom">
          <p className="footer__copy">
            ©{year} financequizpulse.com · {SITE.name}. All rights reserved.
          </p>
          <button type="button" className="footer__top" onClick={scrollToTop}>
            Back to top
            <span className="footer__top-icon" aria-hidden="true">
              <FiArrowUp />
            </span>
          </button>
        </div>

        {/* ---------- Giant wordmark (decorative) ---------- */}
        <div className="footer__wordmark" aria-hidden="true">
          FinanceQuizPulse
        </div>
      </Container>
    </footer>
  );
}