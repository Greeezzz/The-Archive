/**
 * Repeated tiny mono text as a texture band (DESIGN.md §5).
 *
 * Pure decoration: aria-hidden, one line, no per-item animation.
 */
export default function MicroTextBand({
  text = 'THE ARCHIVE',
  repeat = 12,
  className = '',
  reverse = false,
}) {
  const line = `${text} · `.repeat(repeat);
  return (
    <span
      className={`micro-band ${reverse ? 'micro-band--reverse' : ''} ${className}`.trim()}
      aria-hidden="true"
    >
      {line}
    </span>
  );
}
