import { memo, useState, useCallback } from 'react';
import './BannerCard.css';

const BannerCard = memo(function BannerCard({ banner, onClick, index }) {
  const [imgError, setImgError] = useState(false);
  const entryNum = String(index + 1).padStart(3, '0');

  const handleClick = useCallback(() => {
    onClick(banner);
  }, [banner, onClick]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(banner);
    }
  }, [banner, onClick]);

  return (
    <article
      className="banner-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{
        '--entry': banner.color || 'var(--ink-mute)',
      }}
      role="button"
      tabIndex={0}
    >
      {/* Corner Brackets */}
      <span className="banner-card__bracket banner-card__bracket--tl" aria-hidden="true" />
      <span className="banner-card__bracket banner-card__bracket--tr" aria-hidden="true" />
      <span className="banner-card__bracket banner-card__bracket--bl" aria-hidden="true" />
      <span className="banner-card__bracket banner-card__bracket--br" aria-hidden="true" />

      {/* Image Panel */}
      <div className="banner-card__image-wrap">
        <span className="banner-card__scanline" aria-hidden="true" />
        <span className="banner-card__image-scrim" aria-hidden="true" />

        {!imgError ? (
          <img
            src={banner.image}
            srcSet={`${banner.image.replace('/banners/', '/banners/960/')} 960w, ${banner.image} 1720w`}
            sizes="(max-width: 900px) 90vw, 46vw"
            alt={banner.title}
            className="banner-card__image"
            width={1720}
            height={968}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="banner-card__image-fallback">
            <span>NO IMAGE</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="banner-card__info">
        <div className="banner-card__identity">
          <h2 className="banner-card__title">{banner.title}</h2>
          <span className="banner-card__num">BANNER-{entryNum}</span>
        </div>
        <p className="banner-card__description">{banner.description}</p>
      </div>
    </article>
  );
});

export default BannerCard;