import { useId, useState } from 'react';
import { FAQS } from '../../data/faqs';
import Container from '../Container/Container';
import './FaqSection.css';

/**
 * FAQ accordion — numbered rows that open with a smooth height animation.
 * Buttons use aria-expanded / aria-controls so it stays keyboard and
 * screen-reader friendly. One question is open at a time.
 */
export default function FaqSection({ faqs = FAQS }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  const toggle = (index) => setOpenIndex((current) => (current === index ? -1 : index));

  return (
    <section className="faq page-section" id="faq" aria-labelledby={`${baseId}-title`}>
      <Container className="faq__inner">
        {/* ---------- Heading ---------- */}
        <header className="faq__head">
          <span className="faq__kicker">
            <span className="faq__kicker-slash" aria-hidden="true">//</span>
            Answers
          </span>
          <h2 id={`${baseId}-title`} className="faq__title">
            Frequently <span>asked</span> questions
          </h2>
          <p className="faq__desc">
            Quick answers to the money questions readers ask us most.
          </p>
        </header>

        {/* ---------- Accordion ---------- */}
        <ol className="faq__list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const btnId = `${baseId}-q-${index}`;
            const panelId = `${baseId}-a-${index}`;

            return (
              <li key={faq.question} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <h3 className="faq__q">
                  <button
                    type="button"
                    id={btnId}
                    className="faq__btn"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span className="faq__num" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="faq__q-text">{faq.question}</span>
                    <span className="faq__icon" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="faq__panel"
                >
                  <div className="faq__panel-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}