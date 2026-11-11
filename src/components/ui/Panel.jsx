import './Panel.css';

export default function Panel({
  children,
  className = '',
  innerClassName = '',
  variant = 'default', // 'default' | 'raised' | 'signal'
  brackets = false,
  chamfer = true,
  as: Component = 'div',
  ...props
}) {
  const panelClasses = [
    'ui-panel',
    chamfer ? '' : 'ui-panel--nocut',
    variant !== 'default' ? `ui-panel--${variant}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={panelClasses} {...props}>
      <div className={`ui-panel__inner ${innerClassName}`}>
        {children}
      </div>
      {brackets && (
        <>
          <span className="ui-bracket ui-bracket--tl" aria-hidden="true" />
          <span className="ui-bracket ui-bracket--tr" aria-hidden="true" />
          <span className="ui-bracket ui-bracket--bl" aria-hidden="true" />
          <span className="ui-bracket ui-bracket--br" aria-hidden="true" />
        </>
      )}
    </Component>
  );
}
