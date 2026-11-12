/**
 * L9 — crosshair glyph for the right rail / section markers.
 *
 * Rotates 90° on route change so the rail reads as "live" without any loop.
 */
export default function Crosshair({ rotated = false, className = '' }) {
  const classes = ['crosshair', rotated ? 'crosshair--rotated' : '', className]
    .filter(Boolean)
    .join(' ');
  return <span className={classes} aria-hidden="true" />;
}
