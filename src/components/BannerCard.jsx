import React, { useState } from 'react';
import './BannerCard.css';

export default function BannerCard({ banner, onClick, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="banner-card"
      onClick={() => onClick(banner)}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Glow border on hover using banner color */}
      <div
        className="banner-card__glow"
        style={{ '--accent': banner.color }}
      />

      <div className="banner-card__image-wrap">
        {!imgError ? (
          <img
            src={banner.image}
            alt={banner.title}
            className="banner-card__image"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : null}
        
        {/* Fallback if image not found */}
        {imgError && (
          <div className="banner-card__image-fallback" style={{ '--accent': banner.color, display: 'flex' }}>
            <span>No Image</span>
          </div>
        )}

        <div className="banner-card__overlay">
          <span className="banner-card__view-label">View</span>
        </div>
      </div>

      <div className="banner-card__info">
        <h3 className="banner-card__title">{banner.title}</h3>
        <p className="banner-card__description">{banner.description}</p>
      </div>
    </div>
  );
}
