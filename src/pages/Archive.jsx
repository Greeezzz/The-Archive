import React, { useState, useCallback, useMemo, memo } from 'react';
import CharacterCard from '../components/CharacterCard';
import BannerCard from '../components/BannerCard';
import CharacterModal from '../components/CharacterModal';
import BannerModal from '../components/BannerModal';
import characters from '../data/characters.json';
import banners from '../data/banners.json';
import './Archive.css';

// Memoized card components
const MemoizedCharacterCard = memo(CharacterCard);
const MemoizedBannerCard = memo(BannerCard);

export default function Archive() {
  const [selected, setSelected] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [activeTab, setActiveTab] = useState('archive');
  const [searchQuery, setSearchQuery] = useState('');

  // Memoized callbacks
  const handleSetSelected = useCallback((char) => setSelected(char), []);
  const handleSetSelectedBanner = useCallback((banner) => setSelectedBanner(banner), []);
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSearchQuery('');
  }, []);

  // Filter characters - memoized
  const filteredCharacters = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return characters;
    return characters.filter(char =>
      (char.name || '').toLowerCase().includes(query) ||
      (char.quote || '').toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Filter banners - memoized
  const filteredBanners = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return banners;
    return banners.filter(banner =>
      (banner.name || '').toLowerCase().includes(query) ||
      (banner.description || '').toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const isCharacterTab = activeTab === 'archive';
  const isSearching = searchQuery.trim().length > 0;
  const showCharacterGrid = isCharacterTab;
  const showBannerGrid = !isCharacterTab;
  const noResults = isSearching && (
    (showCharacterGrid && filteredCharacters.length === 0) ||
    (showBannerGrid && filteredBanners.length === 0)
  );

  return (
    <div className="archive-wrapper">
      <main className="archive">

        {/* Header */}
        <header className="archive__header">

          {/* Top rule */}
          <div className="archive__top">
            <div className="archive__top-rule" />
            <div className="archive__issue-info">
              <span className="archive__issue-vol">Vol. I</span>
              <span className="archive__issue-sep" />
              <span className="archive__issue-label">The Archive</span>
            </div>
          </div>

          {/* Main header */}
          <div className="archive__header-main">
            <div className="archive__meta-col">
              <div className="archive__vert-rule" />
              <span className="archive__vol">Issue 01</span>
            </div>

            <div className="archive__title-block">
              <p className="archive__eyebrow">— Collection</p>
              <h1 className="archive__title">
                <span className="archive__title-line archive__title-line--1">
                  <span className="archive__title-serif">The</span>
                </span>
                <span className="archive__title-line archive__title-line--2">
                  <span className="archive__title-bold">Archive</span>
                  <span className="archive__title-accent">.</span>
                </span>
              </h1>
            </div>

            <div className="archive__control-block">
              <div className="archive__count-block">
                <span className="archive__count-num">
                  {showCharacterGrid ? filteredCharacters.length : filteredBanners.length}
                </span>
                <span className="archive__count-label">
                  {showCharacterGrid
                    ? filteredCharacters.length === characters.length ? 'Characters' : `of ${characters.length}`
                    : filteredBanners.length === banners.length ? 'Banners' : `of ${banners.length}`
                  }
                </span>
              </div>

              <div className="archive__tabs">
                <button
                  className={`archive__tab ${showCharacterGrid ? 'archive__tab--active' : ''}`}
                  onClick={() => handleTabChange('archive')}
                >
                  <span className="archive__tab-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="7" height="7" rx="1"/>
                      <rect x="14" y="3" width="7" height="7" rx="1"/>
                      <rect x="3" y="14" width="7" height="7" rx="1"/>
                      <rect x="14" y="14" width="7" height="7" rx="1"/>
                    </svg>
                  </span>
                  Archive
                  <span className="archive__tab-count">{characters.length}</span>
                </button>
                <span className="archive__tab-sep">/</span>
                <button
                  className={`archive__tab ${showBannerGrid ? 'archive__tab--active' : ''}`}
                  onClick={() => handleTabChange('banner')}
                >
                  <span className="archive__tab-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="6" width="18" height="12" rx="2"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </span>
                  Banner
                  <span className="archive__tab-count">{banners.length}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="archive__search-wrap">
            <div className={`archive__search ${isSearching ? 'archive__search--active' : ''}`}>
              <svg className="archive__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                className="archive__search-input"
                placeholder={`Search ${showCharacterGrid ? 'characters' : 'banners'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isSearching && (
                <button
                  className="archive__search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </div>
            <div className="archive__search-rule" />
          </div>

          <div className="archive__bottom-rule" />
        </header>

        {/* Grid section */}
        <section className="archive__section">
          <div className="archive__section-label">
            <span className="archive__section-text">
              {showCharacterGrid ? 'Character Entries' : 'Banner Collection'}
              {isSearching && <span className="archive__section-filtered"> — filtered</span>}
            </span>
            <div className="archive__section-line" />
          </div>

          {/* Empty state */}
          {noResults && (
            <div className="archive__empty">
              <div className="archive__empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                  <path d="M8 8l6 6M14 8l-6 6"/>
                </svg>
              </div>
              <p className="archive__empty-text">No results for "{searchQuery}"</p>
              <button className="archive__empty-btn" onClick={() => setSearchQuery('')}>
                Clear search
              </button>
            </div>
          )}

          {/* Character grid */}
          {showCharacterGrid && (
            <div className="archive__grid">
              {filteredCharacters.map((char, i) => (
                <MemoizedCharacterCard
                  key={char.id}
                  character={char}
                  index={i}
                  onClick={handleSetSelected}
                />
              ))}
            </div>
          )}

          {/* Banner grid */}
          {showBannerGrid && (
            <div className="archive__grid archive__grid--banner">
              {filteredBanners.map((banner, i) => (
                <MemoizedBannerCard
                  key={banner.id}
                  banner={banner}
                  index={i}
                  onClick={handleSetSelectedBanner}
                />
              ))}
            </div>
          )}
        </section>

        {/* Ghost watermark */}
        <div className="archive__watermark" aria-hidden="true">
          {showCharacterGrid ? 'ENTRIES' : 'BANNERS'}
        </div>

        {/* Modals */}
        {selected && (
          <CharacterModal character={selected} onClose={() => setSelected(null)} />
        )}
        {selectedBanner && (
          <BannerModal banner={selectedBanner} onClose={() => setSelectedBanner(null)} />
        )}
      </main>
    </div>
  );
}