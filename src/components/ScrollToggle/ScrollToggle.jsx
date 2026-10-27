import { useEffect, useState } from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import './ScrollToggle.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Sticky scroll toggle — a floating button pinned to the bottom-right.
 *
 * Near the top (or mid-page) it points down and scrolls to the bottom; once the
 * reader reaches the bottom it flips to point up and scrolls back to the top.
 * It hides itself on pages short enough that there is nothing to scroll.
 */
export default function ScrollToggle() {
  const [atBottom, setAtBottom] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollY = window.scrollY || doc.scrollTop || 0;
      const viewport = window.innerHeight;
      const height = doc.scrollHeight;
      setVisible(height - viewport > 240); // only when there's real scroll room
      setAtBottom(scrollY + viewport >= height - 160);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

  const scrollToBottom = () =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });

  const handleClick = () => (atBottom ? scrollToTop() : scrollToBottom());

  if (!visible) return null;

  return (
    <button
      type="button"
      className={`scroll-toggle ${atBottom ? 'is-up' : 'is-down'}`}
      onClick={handleClick}
      aria-label={atBottom ? 'Scroll back to top' : 'Scroll to bottom'}
      title={atBottom ? 'Back to top' : 'Scroll to bottom'}
    >
      <span className="scroll-toggle__icon" aria-hidden="true">
        {atBottom ? <FiArrowUp /> : <FiArrowDown />}
      </span>
    </button>
  );
}
