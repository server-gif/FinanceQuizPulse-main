import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiChevronRight, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { NAV_LINKS, SITE } from '../../config/site';
import useTheme from '../../hooks/useTheme';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import './Header.css';

/** Must match the desktop breakpoint in Header.css */
const DESKTOP_QUERY = '(min-width: 1024px)';

/** Sparkle-button inner content (Uiverse by MuhammadHasann), shared by both CTA slots. */
const CTA_CONTENT = (
  <>
    <span className="header__cta-dots" aria-hidden="true" />
    <svg
      className="header__cta-sparkle"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        className="header__cta-path"
        strokeLinejoin="round"
        strokeLinecap="round"
        d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
      />
      <path
        className="header__cta-path"
        strokeLinejoin="round"
        strokeLinecap="round"
        d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
      />
      <path
        className="header__cta-path"
        strokeLinejoin="round"
        strokeLinecap="round"
        d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
      />
    </svg>
    <span className="header__cta-text">Explore Now</span>
  </>
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  // Add a soft shadow once the page scrolls; hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    setScrolled(lastY > 4);
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 4);
      const delta = y - lastY;
      // Ignore tiny scrolls so the header does not flicker.
      if (Math.abs(delta) < 6) return;
      setHidden(delta > 0 && y > 90);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // While the mobile menu is open: Escape closes it, resizing to desktop closes it,
  // and the page behind it does not scroll.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false);
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event) => event.matches && setMenuOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onChange);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onChange);
    };
  }, [menuOpen]);

  // Logo click: already home → glide back to the top; elsewhere → normal navigation.
  const onLogoClick = (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (pathname !== '/') return;
    event.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const classes = [
    'header',
    menuOpen && 'header--open',
    scrolled && 'header--scrolled',
    hidden && !menuOpen && 'header--hidden',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes}>
      <Container className="header__inner">
        <Link to="/" className="header__logo" aria-label={`${SITE.name} home`} onClick={onLogoClick}>
          <Logo className="header__mark" />
          <span className="header__name">
            Finance<span>QuizPulse</span>
          </span>
        </Link>

        <nav id="primary-nav" className="header__nav" aria-label="Primary">
          <ul className="header__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to} className="header__item">
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `header__link ${isActive ? 'is-active' : ''}`}
                >
                  <span>{link.label}</span>
                  <FiChevronRight className="header__link-arrow" aria-hidden="true" />
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA at the bottom of the mobile menu */}
          <Link to="/blog" className="header__cta header__cta--block">
            {CTA_CONTENT}
          </Link>
        </nav>

        <div className="header__controls">
          <button
            type="button"
            className="header__icon-btn header__theme"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </button>

          <Link to="/blog" className="header__cta header__cta--inline">
            {CTA_CONTENT}
          </Link>

          <button
            type="button"
            className="header__icon-btn header__toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {/* Dimmed page behind the mobile menu; click to close */}
      <button
        type="button"
        className="header__backdrop"
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setMenuOpen(false)}
      />
    </header>
  );
}