import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
  children,
  variant = 'secondary', // 'primary' | 'secondary' | 'ghost'
  to,
  href,
  className = '',
  chamfer = true,
  icon,
  ...props
}) {
  const btnClasses = [
    'ui-btn',
    `ui-btn--${variant}`,
    chamfer ? '' : 'ui-btn--nocut',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && <span className="ui-btn__icon" aria-hidden="true">{icon}</span>}
      <span className="ui-btn__label">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={btnClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={btnClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={btnClasses} {...props}>
      {content}
    </button>
  );
}
