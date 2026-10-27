import { Outlet, useLocation } from 'react-router-dom';
import AdSlot from '../components/AdSlot/AdSlot';
import Container from '../components/Container/Container';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import ScrollToggle from '../components/ScrollToggle/ScrollToggle';

// Routes that must stay ad-free (legal pages; unknown paths hit NotFound
// via the catch-all and are covered by the whitelist below).
const AD_ALLOWED_PATHS = ['/', '/blog', '/about'];
const AD_ALLOWED_PREFIXES = ['/blog/', '/category/'];

/** Shared page frame: header, top ad, page content, footer. */
export default function MainLayout() {
  // Persistent layout ads request a fresh creative on every page view.
  const { pathname } = useLocation();
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const showAd =
    AD_ALLOWED_PATHS.includes(cleanPath) ||
    AD_ALLOWED_PREFIXES.some((prefix) => cleanPath.startsWith(prefix));

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollToTop />
      <Header />

      {showAd && (
        <div className="ad-band">
          <Container>
            <AdSlot placement="top" refreshKey={pathname} />
          </Container>
        </div>
      )}

      <main id="main">
        <Outlet />
      </main>

      <Footer />

      <ScrollToggle />
    </>
  );
}
