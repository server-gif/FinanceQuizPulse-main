import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AD_CONFIG } from '../../config/ads';
import { createAdSlot, getGptLoadState, loadGpt } from '../../services/googleAdManager';
import { InterstitialContext } from './InterstitialContext';
import './InterstitialAd.css';

let lastShownAt = 0;

/** Article clicks counted since the app loaded, for the every-other-click cadence. */
let articleClicks = 0;

/** The div inside our custom overlay that the preloaded creative renders into. */
const AD_DIV_ID = 'sfq-interstitial-ad';

/** After an empty preload response, try loading the next ad in the background. */
const REFILL_RETRY_MS = 30000;

/**
 * Is this (1-based) article click due to show the interstitial?
 *   'even'  → 2nd, 4th, 6th…
 *   'odd'   → 1st, 3rd, 5th…
 *   'every' → every click
 * Unknown values fall back to 'odd'.
 */
function isAdDue(cadence, count) {
  if (cadence === 'every') return true;
  if (cadence === 'even') return count % 2 === 0;
  return count % 2 === 1;
}

/**
 * Owns the "click article → show interstitial overlay → close → navigate" flow.
 *
 * The ad is a normal in-page display slot preloaded at app start into our own
 * full-screen overlay — a blurred navy veil that reads identically in light and
 * dark themes, unlike Google's cross-origin vignette which cannot be styled.
 * On an article click the overlay simply appears (the creative is already
 * rendered, so there is no network wait); if no ad is preloaded the reader
 * navigates immediately — nobody ever waits for an ad.
 *
 * Per AD_CONFIG.interstitial.clickCadence only every 2nd article click
 * (2, 4, 6… by default) shows the ad; skipped clicks open the article
 * directly without consuming the preload. Closing the overlay continues the
 * pending navigation and refreshes the slot for the next click.
 */
export default function InterstitialProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const config = AD_CONFIG.interstitial;

  const gateRef = useRef(null); // persistent preloaded slot handle
  const readyRef = useRef(false);
  const pendingRef = useRef(null);
  const timersRef = useRef({ refill: null });
  const [open, setOpen] = useState(false);

  const clearTimer = (key) => {
    if (timersRef.current[key]) {
      clearTimeout(timersRef.current[key]);
      timersRef.current[key] = null;
    }
  };

  // Load the next ad into the persistent slot in the background.
  const scheduleRefill = useCallback((delay) => {
    clearTimer('refill');
    timersRef.current.refill = setTimeout(() => {
      if (gateRef.current) gateRef.current.refresh();
    }, delay);
  }, []);

  // Close button / Escape / tab-hidden: hide the veil and continue the pending flow.
  // The pending target is either a route to navigate to or an in-page callback
  // (used by the quiz's "Next question", which must not change the URL).
  const proceed = useCallback(() => {
    const target = pendingRef.current;
    if (!target) return; // nothing in flight — never fire twice
    pendingRef.current = null;
    setOpen(false);
    if (target.kind === 'navigate') {
      navigate(target.to);
    } else {
      target.fn();
    }
    // This creative is consumed — load the next one (respecting the cap).
    scheduleRefill(config.frequencyCapMs);
  }, [navigate, scheduleRefill, config.frequencyCapMs]);

  // GPT callbacks are registered once; keep them pointing at the latest proceed().
  const proceedRef = useRef(proceed);
  proceedRef.current = proceed;

  // Preload the interstitial slot once at app start, into the hidden overlay.
  useEffect(() => {
    if (!AD_CONFIG.enabled || !config.enabled || !config.adUnitPath) return undefined;

    let cancelled = false;

    const onTabHidden = () => {
      // Reader switched tabs while the ad was open — let them land on the article.
      if (document.hidden && pendingRef.current) proceedRef.current();
    };
    document.addEventListener('visibilitychange', onTabHidden);

    loadGpt()
      .then(() => {
        if (cancelled) return;
        gateRef.current = createAdSlot({
          adUnitPath: config.adUnitPath,
          divId: AD_DIV_ID,
          sizes: config.sizes,
          targeting: { format: 'interstitial' },
          onRenderEnded: (event) => {
            readyRef.current = !event.isEmpty;
            if (event.isEmpty) scheduleRefill(REFILL_RETRY_MS);
          },
        });
      })
      .catch(() => {
        readyRef.current = false;
      });

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onTabHidden);
      clearTimer('refill');
      if (gateRef.current) {
        gateRef.current.destroy();
        gateRef.current = null;
      }
      readyRef.current = false;
    };
  }, [config.enabled, config.adUnitPath, config.sizes, scheduleRefill]);

  /** Shared gate: can we show the ad right now? */
  const canShowInterstitial = useCallback(() => {
    if (pendingRef.current) return false; // a flow is already in flight
    const now = Date.now();
    const capped = config.frequencyCapMs > 0 && now - lastShownAt < config.frequencyCapMs;
    const unavailable =
      !AD_CONFIG.enabled || !config.enabled || !config.adUnitPath || getGptLoadState() === 'failed';
    return !capped && !unavailable && readyRef.current && !!gateRef.current;
  }, [config.enabled, config.frequencyCapMs, config.adUnitPath]);

  const openWithInterstitial = useCallback(
    (to) => {
      articleClicks += 1;
      const offTurn = !isAdDue(config.clickCadence, articleClicks);

      // Not this click's turn, or no preloaded ad right now → go straight to
      // the article, zero waiting, keeping the creative for a due click.
      if (offTurn || !canShowInterstitial()) {
        navigate(to);
        return;
      }

      lastShownAt = Date.now();
      readyRef.current = false; // consumed by this show
      pendingRef.current = { kind: 'navigate', to };
      setOpen(true);
    },
    [config.clickCadence, navigate, canShowInterstitial],
  );

  /**
   * Show the interstitial, then run `onClose` — no route change.
   * Used by the quiz's "Next question": the ad veil overlays the same page
   * and closing it advances the question in state, without any redirect.
   * If no ad is available, `onClose` runs immediately so the UI never stalls.
   */
  const runWithInterstitial = useCallback(
    (onClose) => {
      if (!canShowInterstitial()) {
        onClose();
        return;
      }
      lastShownAt = Date.now();
      readyRef.current = false;
      pendingRef.current = { kind: 'callback', fn: onClose };
      setOpen(true);
    },
    [canShowInterstitial],
  );

  // Freeze the page while the veil is open, and let Escape close the ad.
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => event.key === 'Escape' && proceedRef.current();
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // If the route changes some other way (back button, header link), drop the pending flow.
  useEffect(() => {
    if (pendingRef.current) {
      pendingRef.current = null;
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  const value = useMemo(
    () => ({ openWithInterstitial, runWithInterstitial }),
    [openWithInterstitial, runWithInterstitial],
  );

  return (
    <InterstitialContext.Provider value={value}>
      {children}
      <div
        className={`inter ${open ? 'inter--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Advertisement"
        aria-hidden={!open}
      >
        <div className="inter__stack">
          <button type="button" className="inter__close" onClick={proceed} tabIndex={open ? 0 : -1}>
            Close
          </button>
          <div className="inter__card">
            <div id={AD_DIV_ID} className="inter__ad" />
          </div>
        </div>
      </div>
    </InterstitialContext.Provider>
  );
}
