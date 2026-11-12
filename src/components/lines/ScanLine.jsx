/**
 * L7 — scan line with magenta/cyan glitch offsets.
 *
 * Requires `container-type: size` on the positioned parent so the sweep can use
 * `100cqh` instead of a JS-measured pixel height (LINES.md §2).
 */
export default function ScanLine({ active = false, className = '' }) {
  const classes = ['scan', active ? 'is-in' : '', className].filter(Boolean).join(' ');
  return <span className={classes} aria-hidden="true" />;
}
