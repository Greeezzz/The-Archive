import { memo, useState, useCallback } from 'react';
import './CharacterCard.css';

const CharacterCard = memo(function CharacterCard({ character, onClick, index }) {
  const [imgError, setImgError] = useState(false);
  const entryNum = character.number || String(index + 1).padStart(3, '0');

  const handleClick = useCallback(() => {
    onClick(character);
  }, [character, onClick]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(character);
    }
  }, [character, onClick]);

  return (
    <article
      className={`card ${character.isWiderDesign ? 'card--wide' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{
        '--entry': character.color || 'var(--ink-mute)',
      }}
      role="button"
      tabIndex={0}
    >
      {/* Corner Brackets */}
      <span className="card__bracket card__bracket--tl" aria-hidden="true" />
      <span className="card__bracket card__bracket--tr" aria-hidden="true" />
      <span className="card__bracket card__bracket--bl" aria-hidden="true" />
      <span className="card__bracket card__bracket--br" aria-hidden="true" />

      {/* Image Panel */}
      <div className="card__image-wrap">
        <span className="card__scanline" aria-hidden="true" />
        <span className="card__image-scrim" aria-hidden="true" />

        {!imgError ? (
          <img
            src={character.image}
            alt={character.name}
            className="card__image"
            width={900}
            height={1126}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="card__image-fallback">
            <span>{entryNum}</span>
          </div>
        )}
      </div>

      {/* Bottom Info Bar */}
      <div className="card__info">
        <div className="card__identity">
          <span className="card__number">ENTRY-{entryNum}</span>
          <h2 className="card__name">{character.name}</h2>
        </div>
        <span className="card__status-indicator" aria-hidden="true" />
      </div>
    </article>
  );
});

export default CharacterCard;