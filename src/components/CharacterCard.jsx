import React, { useState } from 'react';
import './CharacterCard.css';

export default function CharacterCard({ character, onClick, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`card ${character.isWiderDesign ? 'card--wide' : ''}`}
      onClick={() => onClick(character)}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Glow border on hover using character color */}
      <div
        className="card__glow"
        style={{ '--accent': character.color }}
      />

      <div className="card__image-wrap">
        {!imgError ? (
          <img
            src={character.image}
            alt={character.name}
            className="card__image"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : null}
        
        {/* Fallback if image not found */}
        {imgError && (
          <div className="card__image-fallback" style={{ '--accent': character.color, display: 'flex' }}>
            <span>{character.number}</span>
          </div>
        )}

        <div className="card__overlay">
          <span className="card__view-label">View</span>
        </div>
      </div>

      <div className="card__info">
        <span
          className="card__number"
          style={{ color: character.color }}
        >
          #{character.number}
        </span>
        <h3 className="card__name">{character.name}</h3>
      </div>
    </div>
  );
}
