import Container from '../components/Container/Container';
import SEO from '../components/SEO/SEO';
import { SITE } from '../config/site';
import './Legal.css';

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description={`How ${SITE.name} collects, uses and protects your information.`}
        path="/privacy"
      />

      <section className="legal page-section">
        <Container size="narrow">
          <span className="eyebrow">Legal</span>
          <h1 className="legal__title">Privacy Policy</h1>
          <p className="legal__updated">Last updated: October 2026</p>

          <div className="legal__body">
            <p>
              Here is how {SITE.name} (“we”, “us”, “the site”) deals with information when you visit. The
              quick version: no sign-ups, no personal details requested, nothing sold — the only tracking
              comes from our advertising and basic analytics partners.
            </p>

            <h2 id="information-we-collect">What is collected</h2>
            <ul>
              <li>
                <strong>Automatically:</strong> technical bits such as browser type, device, rough region and
                which pages you open, so we can see how the site is doing.
              </li>
              <li>
                <strong>Through cookies:</strong> advertising and preference cookies placed by us or by our ad
                partners (details in the cookies section below).
              </li>
              <li>
                <strong>From you directly:</strong> nothing — there is no registration, and you never have to
                hand over a name, email or payment details to read an article.
              </li>
            </ul>

            <h2 id="how-we-use-it">How we use it</h2>
            <p>
              We put collected information to work only for running and improving the site: keeping it safe,
              seeing which guides people actually read, and showing the ads that keep the content free. Your
              personal information is never sold, and it is shared only with the providers described here or
              when the law forces us to.
            </p>

            <h2 id="advertising">Advertising and Google</h2>
            <p>
              Ads on this site are served through Google Ad Manager. Google and its partners may use cookies
              to show you ads based on visits to this or other sites you have browsed, which is how
              personalised advertising works. You can opt out of personalised ads in Google’s Ads Settings
              (google.com/ads/settings) or through the aboutads.info choices page. Google’s own privacy
              practices live at google.com/policies/privacy.
            </p>

            <h2 id="cookies">Cookies</h2>
            <p>
              Cookies are tiny files your browser stores. Ours are used for delivering ads, frequency
              limiting (so you don’t keep seeing the same ad) and remembering preferences like dark mode.
              Blocking or deleting cookies in your browser settings is perfectly fine — the site keeps
              working, only some preferences will reset.
            </p>

            <h2 id="data-retention">How long we keep it</h2>
            <p>
              Aggregate analytics data stays as long as it helps us improve the site. Cookie-based data
              follows the expiry periods set by the providers named above. We keep no database of who our
              readers are.
            </p>

            <h2 id="children">Children’s privacy</h2>
            <p>
              This is a general-audience money education site, not a children’s destination. We never
              knowingly gather personal information from anyone under 16.
            </p>

            <h2 id="changes">Changes to this policy</h2>
            <p>
              As the site or the law shifts, this policy may get updated. The “last updated” date above tells
              you when the page last changed, and the version standing here always applies while you keep
              using the site.
            </p>

            <h2 id="contact">Contact</h2>
            <p>
              A question about privacy? You will find our details on the <a href="/about">About</a> page.
            </p>

          
          </div>
        </Container>
      </section>
    </>
  );
}
