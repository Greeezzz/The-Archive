import './Tag.css';

export default function Tag({
  children,
  variant = 'default', // 'default' | 'signal' | 'data' | 'alert'
  chamfer = true,
  className = '',
  as: Component = 'span',
  ...props
}) {
  const tagClasses = [
    'ui-tag',
    variant !== 'default' ? `ui-tag--${variant}` : '',
    chamfer ? '' : 'ui-tag--nocut',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={tagClasses} {...props}>
      {children}
    </Component>
  );
}
