import Container from '../components/Container/Container';
import SEO from '../components/SEO/SEO';
import { SITE } from '../config/site';
import './Legal.css';

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description={`The terms that apply when you read and use ${SITE.name}.`}
        path="/terms"
      />

      <section className="legal page-section">
        <Container size="narrow">
          <span className="eyebrow">Legal</span>
          <h1 className="legal__title">Terms &amp; Conditions</h1>
          <p className="legal__updated">Last updated: October 2026</p>

          <div className="legal__body">
            <p>
              By opening {SITE.name} (“we”, “us”, “the site”), you accept the terms on this page. If any of
              them don’t sit right with you, the simple answer is to stop using the site.
            </p>

            <h2 id="educational-use">Educational use only</h2>
            <p>
              Every article, guide and tool here is published for general information and learning. Nothing on
              the site counts as financial, investment, tax or legal advice, an offer, a solicitation, or a
              nudge to buy or sell anything. No sentence here promises or guarantees any return or financial
              outcome. Money products involve risk, rules differ across countries and shift over time, and
              yesterday’s performance says nothing reliable about tomorrow. Weigh your own situation, and
              where it makes sense, talk to a qualified professional before you act.
            </p>

            <h2 id="copyright">Copyright and content ownership</h2>
            <p>
              Every article, guide, headline and summary on {SITE.name} is work we created here and belongs
              to {SITE.name}. Copyright covers all of it, © {new Date().getFullYear()} {SITE.name}. None of it
              may be republished, mirrored, translated for publication or reproduced in full on another
              website, in print or on a social channel without our prior written permission.
            </p>

            <h2 id="third-party-material">Third-party material we do not own</h2>
            <p>
              Some article photographs come from third-party stock libraries under licence. Those images
              stay the copyright of the photographers who shot them and are <strong>not</strong> our work:
              the permission below does not extend to them, and re-uploading or reusing them elsewhere is not
              authorised by us. Company, product, exchange and institution names mentioned in articles remain
              trademarks of their owners — we name them descriptively, which implies no endorsement or
              affiliation.
            </p>

            <h2 id="permitted-use">What you are welcome to do</h2>
            <ul>
              <li>Read every article free of cost, and share or link to it from anywhere you like.</li>
              <li>
                Quote a short passage — a few lines — in conversation, study notes, coursework or social
                media, as long as you credit {SITE.name} and link back to the original article.
              </li>
              <li>
                Take the ideas and general facts we explain and build your own writing on them, in your own
                words.
              </li>
            </ul>

            <h2 id="not-permitted">What is not permitted</h2>
            <ul>
              <li>Republishing a full article, or a substantial slice of one, without written permission.</li>
              <li>
                Scraping, mirroring or bulk-copying the site — including feeding our content into AI training
                or automated content-generation systems.
              </li>
              <li>Presenting our articles as somebody else’s work.</li>
              <li>Redistributing the licensed photographs that appear on article pages.</li>
            </ul>
            <p>
              Want a guide reproduced, translated or adapted at scale? Drop us a question first through the
              contact below — we happily answer permission requests for genuine educational use.
            </p>

            <h2 id="no-warranty">No warranty</h2>
            <p>
              We put real effort into keeping content accurate and current, and we write it ourselves instead
              of rehashing other publishers’ material. Even so, we make no promise that it is complete, up to
              date or free of errors, and we accept no liability for loss or damage coming from its use. The
              site is provided “as is”, without warranties of any kind.
            </p>

            <h2 id="advertising">Advertising</h2>
            <p>
              Advertising on the site is served by Google Ad Manager. Ads are clearly labelled, kept apart
              from editorial content, and advertisers hold zero influence over what we publish. We are not
              responsible for the ads, for the products or services they promote, or for any transactions
              you enter into with an advertiser.
            </p>

            <h2 id="acceptable-use">Acceptable site use</h2>
            <ul>
              <li>You may not use the site in any way that damages, strains or impairs it.</li>
              <li>You may not tamper with ad delivery, or probe the site for weaknesses without consent.</li>
            </ul>

            <h2 id="external-links">External links</h2>
            <p>
              Articles may link out to third-party websites for reference. We do not run those sites, take no
              responsibility for their content or practices, and a link is never an endorsement.
            </p>

            <h2 id="changes">Changes to these terms</h2>
            <p>
              These terms may be updated as the site or the law changes. The “last updated” date above shows
              when the page last changed; keeping using the site and you are taken to accept the version
              standing here.
            </p>

            <h2 id="contact">Contact</h2>
            <p>
              A question about these terms? Our details are on the <a href="/about">About</a> page.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
