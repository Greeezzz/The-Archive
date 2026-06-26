import React, { memo, useState } from 'react';
import './CharacterCard.css';

const CharacterCard = memo(function CharacterCard({ character, onClick, index }) {
  const [imgError, setImgError] = useState(false);
  const entryNum = String(index + 1).padStart(2, '0');

  return (
    <article
      className={`card ${character.isWiderDesign ? 'card--wide' : ''}`}
      onClick={() => onClick(character)}
      style={{ '--index': index }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(character)}
    >
      {/* Entry number label */}
      <div className="card__entry">
        <span className="card__entry-num">No. {entryNum}</span>
        <span className="card__entry-line" />
      </div>

      {/* Glow border */}
      <div
        className="card__glow"
        style={{ '--accent': character.color }}
      />

      {/* Corner brackets */}
      <div className="card__bracket card__bracket--tl" />
      <div className="card__bracket card__bracket--tr" />
      <div className="card__bracket card__bracket--bl" />
      <div className="card__bracket card__bracket--br" />

      {/* Image */}
      <div className="card__image-wrap">
        {!imgError ? (
          <img
            src={character.image}
            alt={character.name}
            className="card__image"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="card__image-fallback" style={{ display: 'flex' }}>
            <span>{character.number}</span>
          </div>
        )}

        {/* Editorial hover overlay */}
        <div className="card__overlay">
          <span className="card__view-label">View Entry</span>
          <span className="card__overlay-name">{character.name}</span>
          <span
            className="card__overlay-num"
            style={{ color: character.color }}
          >
            #{character.number}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="card__info">
        <span
          className="card__number"
          style={{ color: character.color }}
        >
          #{character.number}
        </span>
        <h3 className="card__name">{character.name}</h3>
      </div>
    </article>
  );
});

export default CharacterCard;
