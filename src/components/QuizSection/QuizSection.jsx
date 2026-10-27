import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiBookOpen,
  FiCheck,
  FiClock,
  FiHelpCircle,
  FiLock,
  FiRotateCcw,
  FiX,
  FiZap,
} from 'react-icons/fi';
import { useArticleLink } from '../../hooks/useArticleLink';
import { useInterstitialNavigation } from '../InterstitialAd/InterstitialContext';
import { getBlogBySlug } from '../../data/blogs';
import { QUIZ_QUESTIONS, QUIZ_RESULTS } from '../../data/quiz';
import Container from '../Container/Container';
import './QuizSection.css';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/** 0-based indexes whose advance click should surface the interstitial: Q2 "Next question" and Q5 "See my result". */
const AD_ON_ADVANCE_FROM = new Set([1, 4]);

/** A suggested guide row that routes through the interstitial like every other article link. */
function GuideLink({ slug, index }) {
  const blog = getBlogBySlug(slug);
  const { to, onClick } = useArticleLink(slug);
  if (!blog) return null;

  return (
    <Link to={to} onClick={onClick} className="quiz__guide">
      <span className="quiz__guide-num" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="quiz__guide-body">
        <span className="quiz__guide-cat">{blog.category}</span>
        <span className="quiz__guide-title">{blog.title}</span>
      </span>
      <span className="quiz__guide-arrow" aria-hidden="true">
        <FiArrowRight />
      </span>
    </Link>
  );
}

/** Circular score indicator. */
function ScoreRing({ score, total }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / total);

  return (
    <div className="quiz__ring" role="img" aria-label={`You scored ${score} out of ${total}`}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id="quizRingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <circle className="quiz__ring-track" cx="60" cy="60" r={radius} />
        <circle
          className="quiz__ring-fill"
          cx="60"
          cy="60"
          r={radius}
          stroke="url(#quizRingGrad)"
          strokeDasharray={circumference}
          style={{ '--ring-c': circumference, '--ring-offset': offset }}
        />
      </svg>
      <span className="quiz__ring-value" aria-hidden="true">
        {score}
        <small>/{total}</small>
      </span>
    </div>
  );
}

/**
 * Money Facts quiz — a short, self-contained knowledge check.
 *
 * Intro → one question at a time → instant feedback with a plain-language
 * explanation → a result band with guides for the questions you missed.
 * Purely client-side: no answers or scores ever leave the browser.
 */
export default function QuizSection() {
  const [stage, setStage] = useState('intro'); // 'intro' | 'playing' | 'result'
  const [current, setCurrent] = useState(0);
  const [picks, setPicks] = useState([]); // chosen option index per question
  const [revealed, setRevealed] = useState(false);
  const { runWithInterstitial } = useInterstitialNavigation();

  const total = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[current];

  const score = useMemo(
    () => QUIZ_QUESTIONS.reduce((sum, q, i) => (picks[i] === q.answer ? sum + 1 : sum), 0),
    [picks],
  );

  const result = useMemo(
    () => QUIZ_RESULTS.find((band) => score >= band.min) ?? QUIZ_RESULTS[QUIZ_RESULTS.length - 1],
    [score],
  );

  // Guides for the questions answered wrong; if a clean sweep, point at the first topics.
  const suggestedSlugs = useMemo(() => {
    const missed = QUIZ_QUESTIONS.filter((q, i) => picks[i] !== q.answer).map((q) => q.slug);
    return (missed.length ? missed : QUIZ_QUESTIONS.map((q) => q.slug)).slice(0, 3);
  }, [picks]);

  const start = () => {
    setPicks([]);
    setCurrent(0);
    setRevealed(false);
    setStage('playing');
  };

  const choose = (optionIndex) => {
    if (revealed) return;
    setPicks((prev) => {
      const next = [...prev];
      next[current] = optionIndex;
      return next;
    });
    setRevealed(true);
  };

  const advance = () => {
    const isLast = current + 1 >= total;
    const goNext = () => {
      if (isLast) {
        setStage('result');
        return;
      }
      setCurrent((i) => i + 1);
      setRevealed(false);
    };

    // Q2 → Q3 and Q5 → result: show the interstitial as an in-page overlay,
    // then advance on close. No redirect — the URL stays on /#quiz.
    if (AD_ON_ADVANCE_FROM.has(current)) {
      runWithInterstitial(goNext);
      return;
    }
    goNext();
  };

  /** State of each progress step: is-right / is-wrong / is-current / '' (upcoming). */
  const stepState = (i) => {
    if (stage === 'intro') return '';
    const answered = stage === 'result' || i < current || (i === current && revealed);
    if (answered) return picks[i] === QUIZ_QUESTIONS[i].answer ? 'is-right' : 'is-wrong';
    if (i === current) return 'is-current';
    return '';
  };

  const isCorrect = picks[current] === question?.answer;

  return (
    <section className="quiz page-section" id="quiz" aria-labelledby="quiz-title">
      <Container className="quiz__inner">
        {/* ---------- Heading ---------- */}
        <header className="quiz__head">
          <span className="quiz__kicker">
            <span className="quiz__kicker-slash" aria-hidden="true">//</span>
            Money check
          </span>
          <h2 id="quiz-title" className="quiz__title">
            How sharp are your <span>money instincts</span>?
          </h2>
          <p className="quiz__desc">
            Five quick, everyday questions — no personal details, no sign-up. See where you stand and
            get pointed at the guide for anything that felt fuzzy.
          </p>
        </header>

        {/* ---------- Dark card ---------- */}
        <div className="quiz__card">
          <span className="quiz__glow quiz__glow--a" aria-hidden="true" />
          <span className="quiz__glow quiz__glow--b" aria-hidden="true" />

          {/* Top bar: label + step dots + score */}
          <div className="quiz__bar">
            <span className="quiz__bar-label">
              <span className="quiz__bar-dot" aria-hidden="true" />
              Money Quiz
            </span>

            <ol className="quiz__steps" aria-hidden="true">
              {QUIZ_QUESTIONS.map((q, i) => (
                <li key={q.question} className={`quiz__step ${stepState(i)}`}>
                  {stepState(i) === 'is-right' ? <FiCheck /> : stepState(i) === 'is-wrong' ? <FiX /> : i + 1}
                </li>
              ))}
            </ol>

            <span className="quiz__bar-score">
              <span className="quiz__sr">Score: </span>
              <strong>{score}</strong>/{total}
            </span>
          </div>

          <div className="quiz__body">
            {/* ===== INTRO ===== */}
            {stage === 'intro' && (
              <div className="quiz__intro">
                <h3 className="quiz__intro-title">
                  Ready when <em>you</em> are.
                </h3>

                <ul className="quiz__chips">
                  <li><FiHelpCircle aria-hidden="true" /> {total} questions</li>
                  <li><FiClock aria-hidden="true" /> About 60 seconds</li>
                  <li><FiZap aria-hidden="true" /> Instant answers</li>
                </ul>

                <button type="button" className="quiz__btn quiz__btn--pulse" onClick={start}>
                  <span>Start the quiz</span>
                  <FiArrowRight aria-hidden="true" />
                </button>

                <p className="quiz__intro-note">
                  <FiLock aria-hidden="true" />
                  <span>A friendly general-knowledge check — nothing you tap leaves your device.</span>
                </p>
              </div>
            )}

            {/* ===== PLAYING ===== */}
            {stage === 'playing' && (
              <div className="quiz__play" key={current}>
                <p className="quiz__q-label">
                  Question {current + 1} <span>of {total}</span>
                </p>
                <h3 className="quiz__question">{question.question}</h3>

                <ul className="quiz__options">
                  {question.options.map((option, i) => {
                    const picked = picks[current] === i;
                    const isAnswer = i === question.answer;
                    let state = '';
                    if (revealed && isAnswer) state = 'is-correct';
                    else if (revealed && picked && !isAnswer) state = 'is-wrong';
                    else if (revealed) state = 'is-dim';

                    return (
                      <li key={option}>
                        <button
                          type="button"
                          className={`quiz__option ${state}`}
                          onClick={() => choose(i)}
                          disabled={revealed}
                          aria-pressed={picked}
                        >
                          <span className="quiz__option-mark" aria-hidden="true">
                            {revealed && isAnswer ? (
                              <FiCheck />
                            ) : revealed && picked && !isAnswer ? (
                              <FiX />
                            ) : (
                              LETTERS[i]
                            )}
                          </span>
                          <span className="quiz__option-text">{option}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {revealed && (
                  <div className={`quiz__explain ${isCorrect ? 'is-right' : 'is-wrong'}`} aria-live="polite">
                    <div className="quiz__explain-text">
                      <p className="quiz__explain-verdict">
                        {isCorrect ? <FiCheck aria-hidden="true" /> : <FiBookOpen aria-hidden="true" />}
                        {isCorrect ? 'Correct!' : 'Good to know'}
                      </p>
                      <p className="quiz__explain-why">{question.why}</p>
                    </div>
                    <button type="button" className="quiz__btn quiz__btn--light" onClick={advance}>
                      <span>{current + 1 >= total ? 'See my result' : 'Next question'}</span>
                      <FiArrowRight aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ===== RESULT ===== */}
            {stage === 'result' && (
              <div className="quiz__result" aria-live="polite">
                <ScoreRing score={score} total={total} />
                <p className="quiz__q-label">Your result</p>
                <h3 className="quiz__result-title">{result.title}</h3>
                <p className="quiz__result-blurb">{result.blurb}</p>

                <div className="quiz__guides">
                  <p className="quiz__guides-head">
                    {score === total ? 'Keep the momentum going' : 'Read these next'}
                  </p>
                  {suggestedSlugs.map((slug, i) => (
                    <GuideLink key={slug} slug={slug} index={i} />
                  ))}
                </div>

                <button type="button" className="quiz__btn quiz__btn--outline" onClick={start}>
                  <FiRotateCcw aria-hidden="true" />
                  <span>Retake the quiz</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}