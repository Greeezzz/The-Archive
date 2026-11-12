/**
 * L6 — topographic contour lines.
 *
 * Hand-authored SVG paths (not traced from any game asset). Static, low
 * contrast, decorative. `variant` picks a different contour set so two
 * corners of the same view don't look copy-pasted.
 */
const PATHS = {
  a: [
    'M-10 78 C 60 60, 120 96, 190 74 S 300 40, 380 62',
    'M-10 96 C 70 78, 130 112, 200 92 S 310 58, 380 82',
    'M-10 114 C 80 96, 140 130, 210 110 S 320 76, 380 100',
    'M-10 132 C 90 114, 150 148, 220 128 S 330 94, 380 118',
  ],
  b: [
    'M-10 30 C 80 10, 150 52, 240 26 S 340 0, 400 22',
    'M-10 50 C 90 30, 160 72, 250 46 S 350 20, 400 42',
    'M-10 70 C 100 50, 170 92, 260 66 S 360 40, 400 62',
  ],
};

export default function TopoLines({ variant = 'a', className = '', ...props }) {
  const paths = PATHS[variant] || PATHS.a;
  return (
    <span className={`topo ${className}`.trim()} aria-hidden="true" {...props}>
      <svg viewBox="0 0 380 160" preserveAspectRatio="none" focusable="false">
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </span>
  );
}
