/**
 * 2-4px magenta/cyan/green blocks at the edge of a slab or art (DESIGN.md §5).
 * Max 3 slivers per screen; purely decorative.
 */
export default function GlitchSlivers({ className = '' }) {
  return (
    <span className={`glitch-slivers ${className}`.trim()} aria-hidden="true">
      <span className="glitch-slivers__a" />
      <span className="glitch-slivers__b" />
      <span className="glitch-slivers__c" />
    </span>
  );
}
