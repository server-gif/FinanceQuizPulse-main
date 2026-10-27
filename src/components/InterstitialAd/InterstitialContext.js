import { createContext, useContext } from 'react';

export const InterstitialContext = createContext(null);

/**
 * Returns `{ openWithInterstitial, runWithInterstitial }`.
 *
 * - `openWithInterstitial(to)` — show the interstitial, then navigate to `to`.
 * - `runWithInterstitial(onClose)` — show the interstitial as an in-page overlay,
 *   then call `onClose()` when dismissed. No route change, no redirect. Used by
 *   the quiz's "Next question" so closing the ad simply advances the question.
 *   If no ad is currently available, `onClose()` fires immediately.
 *
 * Must be used inside <InterstitialProvider>.
 */
export function useInterstitialNavigation() {
  const context = useContext(InterstitialContext);
  if (!context) {
    throw new Error('useInterstitialNavigation must be used inside <InterstitialProvider>');
  }
  return context;
}
