import { memo, useState, useCallback, useMemo } from 'react';
import { isLightColor } from '../lib/color';
import './CharacterCard.css';

const CharacterCard = memo(function CharacterCard({ character, onClick, index }) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const entryNum = String(index + 1).padStart(2, '0');

  const accentColor = useMemo(() => character.color || '#c0392b', [character.color]);
  const isLight = useMemo(() => isLightColor(accentColor), [accentColor]);

  const handleClick = useCallback(() => {
    onClick(character);
  }, [character, onClick]);

  return (
    <article
      className={`card ${character.isWiderDesign ? 'card--wide' : ''} ${isLight ? 'card--light' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--index': index,
        '--accent': accentColor,
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(character)}
    >
      {/* Glow border */}
      <div className="card__glow" />

      {/* Corner brackets */}
      <div className="card__bracket card__bracket--tl" />
      <div className="card__bracket card__bracket--tr" />
      <div className="card__bracket card__bracket--bl" />
      <div className="card__bracket card__bracket--br" />

      {/* Image */}
      <div className="card__image-wrap">
        {/* Entry number — inside image-wrap so it can't clip */}
        <div className="card__entry">
          <span className="card__entry-num">No. {entryNum}</span>
          <span className="card__entry-line" />
        </div>

        {!imgError ? (
          <img
            src={character.image}
            alt={character.name}
            className="card__image"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="card__image-fallback">
            {character.number}
          </div>
        )}

        {/* Color tint overlay */}
        <div className="card__color-tint" />

        {/* Hover overlay */}
        <div className={`card__overlay ${isHovered ? 'card__overlay--visible' : ''}`}>
          <span className="card__view-label">View Entry</span>
          <span className="card__overlay-name">{character.name}</span>
          <span className="card__overlay-num">
            #{character.number}
          </span>
        </div>

        {/* Shine effect */}
        <div className={`card__shine ${isHovered ? 'card__shine--active' : ''}`} />
      </div>

      {/* Info */}
      <div className="card__info">
        <span className="card__number">
          #{character.number}
        </span>
        <h3 className="card__name">{character.name}</h3>
      </div>
    </article>
  );
});

export default CharacterCard;