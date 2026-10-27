/**
 * FinanceQuizPulse brand mark — the "Shield + pulse" logo: a trust/security
 * shield (finance) with a heartbeat "pulse" line running through it, in the
 * brand violet→pink→orange gradient on a rounded navy tile. Kept as a scalable
 * SVG so it stays crisp at every size — header, footer, splash, favicon.
 *
 * Source asset: public/images/brand/logo-shield.svg
 */
export default function Logo({ className = '' }) {
  return (
    <img
      className={className}
      src="/images/brand/logo-shield.svg"
      width={512}
      height={512}
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}
