/**
 * L8 — giant ghost numeral/word behind content.
 *
 * Purely decorative: aria-hidden, no interaction, mask-faded toward the bottom.
 */
export default function GhostText({
  children,
  size = 'clamp(96px, 22vw, 320px)',
  hatched = false,
  className = '',
  style = {},
}) {
  const classes = [
    'ghost-type',
    hatched ? 'ghost-type--hatch' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} style={{ fontSize: size, ...style }} aria-hidden="true">
      {children}
    </span>
  );
}
