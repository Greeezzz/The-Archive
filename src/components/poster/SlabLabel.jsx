/**
 * Black label bar with a yellow offset outline (DESIGN.md §5).
 *
 * Yellow is only ever the outline here; the text sits on ink, which passes
 * contrast. The bar itself is not decorative — it carries a real label.
 */
export default function SlabLabel({ children, className = '', as: Component = 'span' }) {
  return <Component className={`slab-label ${className}`.trim()}>{children}</Component>;
}
