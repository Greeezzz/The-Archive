import React, { memo, useState } from 'react';
import './BannerCard.css';

const BannerCard = memo(function BannerCard({ banner, onClick, index }) {
  const [imgError, setImgError] = useState(false);
  const entryNum = String(index + 1).padStart(2, '0');

  return (
    <article
      className="banner-card"
      onClick={() => onClick(banner)}
      style={{ '--index': index }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(banner)}
    >
      {/* Entry number label */}
      <div className="banner-card__entry">
        <span className="banner-card__entry-num">No. {entryNum}</span>
        <span className="banner-card__entry-line" />
      </div>

      {/* Glow border */}
      <div
        className="banner-card__glow"
        style={{ '--accent': banner.color }}
      />

      {/* Corner brackets */}
      <div className="banner-card__bracket banner-card__bracket--tl" />
      <div className="banner-card__bracket banner-card__bracket--tr" />
      <div className="banner-card__bracket banner-card__bracket--bl" />
      <div className="banner-card__bracket banner-card__bracket--br" />

      {/* Image */}
      <div className="banner-card__image-wrap">
        {!imgError ? (
          <img
            src={banner.image}
            alt={banner.title}
            className="banner-card__image"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="banner-card__image-fallback" style={{ display: 'flex' }}>
            <span>No Image</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="banner-card__overlay">
          <span className="banner-card__view-label">View</span>
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
