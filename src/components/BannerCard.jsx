import React, { memo, useState, useCallback } from 'react';
import './BannerCard.css';

const BannerCard = memo(function BannerCard({ banner, onClick, index }) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const entryNum = String(index + 1).padStart(2, '0');

  const handleClick = useCallback(() => {
    onClick(banner);
  }, [banner, onClick]);

  return (
    <article
      className="banner-card"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--index': index,
        '--accent': banner.color,
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(banner)}
    >
      {/* Glow border */}
      <div className="banner-card__glow" />

      {/* Corner brackets */}
      <div className="banner-card__bracket banner-card__bracket--tl" />
      <div className="banner-card__bracket banner-card__bracket--tr" />
      <div className="banner-card__bracket banner-card__bracket--bl" />
      <div className="banner-card__bracket banner-card__bracket--br" />

      {/* Image */}
      <div className="banner-card__image-wrap">
        {/* Entry number — inside image-wrap so it can't clip */}
        <div className="banner-card__entry">
          <span className="banner-card__entry-num">No. {entryNum}</span>
          <span className="banner-card__entry-line" />
        </div>

        {!imgError ? (
          <img
            src={banner.image}
            alt={banner.title}
            className="banner-card__image"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="banner-card__image-fallback">
            <span>No Image</span>
          </div>
        )}

        {/* Color tint overlay */}
        <div className="banner-card__color-tint" />

        {/* Hover overlay */}
        <div className={`banner-card__overlay ${isHovered ? 'banner-card__overlay--visible' : ''}`}>
          <span className="banner-card__view-label">View Entry</span>
        </div>
      </div>

      {/* Info */}
      <div className="banner-card__info">
        <h3 className="banner-card__title">{banner.title}</h3>
        <p className="banner-card__description">{banner.description}</p>
      </div>
    </article>
  );
});

export default BannerCard;