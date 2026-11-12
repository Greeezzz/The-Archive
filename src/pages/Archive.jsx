import { useState, useCallback, useMemo, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import CharacterCard from '../components/CharacterCard';
import BannerCard from '../components/BannerCard';
import StageViewer from '../components/StageViewer';
import DecodeText from '../components/motion/DecodeText';
import Reveal from '../components/motion/Reveal';
import characters from '../data/characters.json';
import banners from '../data/banners.json';
import './Archive.css';

const MemoizedCharacterCard = memo(CharacterCard);
const MemoizedBannerCard = memo(BannerCard);

export default function Archive() {
  const [params, setParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('archive');
  const [searchQuery, setSearchQuery] = useState('');

  // Selection lives in the URL so every entry has a shareable link.
  const entryParam = params.get('entry');
  const bannerParam = params.get('banner');
  const selected = useMemo(
    () => (entryParam ? characters.find((c) => c.number === entryParam) || null : null),
    [entryParam]
  );
  const selectedBanner = useMemo(
    () => (bannerParam ? banners.find((b) => String(b.id) === bannerParam) || null : null),
    [bannerParam]
  );

  const handleSetSelected = useCallback(
    (char) => setParams({ entry: char.number }, { replace: true }),
    [setParams]
  );
  const handleSetSelectedBanner = useCallback(
    (banner) => setParams({ banner: String(banner.id) }, { replace: true }),
    [setParams]
  );
  const closeModal = useCallback(() => setParams({}, { replace: true }), [setParams]);
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSearchQuery('');
  }, []);

  // Filter characters
  const filteredCharacters = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return characters;
    return characters.filter(char =>
      (char.name || '').toLowerCase().includes(query) ||
      (char.quote || '').toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Filter banners
  const filteredBanners = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return banners;
    return banners.filter(banner =>
      (banner.title || '').toLowerCase().includes(query) ||
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

  // Paging: the viewer owns the arrow keys, these callbacks own the URL.
  const selectedIndex = selected
    ? filteredCharacters.findIndex((c) => c.number === selected.number)
    : -1;
  const bannerIndex = selectedBanner
    ? filteredBanners.findIndex((b) => String(b.id) === String(selectedBanner.id))
    : -1;

  const goPrev = useCallback(() => {
    if (selectedIndex > 0) {
      setParams({ entry: filteredCharacters[selectedIndex - 1].number }, { replace: true });
    }
  }, [selectedIndex, filteredCharacters, setParams]);

  const goNext = useCallback(() => {
    if (selectedIndex >= 0 && selectedIndex < filteredCharacters.length - 1) {
      setParams({ entry: filteredCharacters[selectedIndex + 1].number }, { replace: true });
    }
  }, [selectedIndex, filteredCharacters, setParams]);

  const goPrevBanner = useCallback(() => {
    if (bannerIndex > 0) {
      setParams({ banner: String(filteredBanners[bannerIndex - 1].id) }, { replace: true });
    }
  }, [bannerIndex, filteredBanners, setParams]);

  const goNextBanner = useCallback(() => {
    if (bannerIndex >= 0 && bannerIndex < filteredBanners.length - 1) {
      setParams({ banner: String(filteredBanners[bannerIndex + 1].id) }, { replace: true });
    }
  }, [bannerIndex, filteredBanners, setParams]);

  // Announce entry changes to screen readers (arrow-key navigation is silent otherwise).
  // Derived during render — a live region announces on DOM text change, no state needed.
  const announce = selected
    ? `Entry ${selected.number}, ${selected.name}`
    : selectedBanner
      ? `Banner ${selectedBanner.title}`
      : '';

  return (
    <div className="archive-wrapper">
      <main className="archive">
        {/* Console Header */}
        <header className="archive__header">
          <div className="archive__top-meta">
            <span className="archive__status-label">
              <span className="archive__status-dot" />
              DATABASE // SEC-01 // OPERATOR_REGISTRY
            </span>
            <span>VER: 2.4.0 // STABLE</span>
          </div>

          <div className="archive__header-main">
            <div className="archive__title-block">
              <span className="archive__eyebrow">// ARCHIVE COLLECTION</span>
              <h1 className="archive__title">
                <DecodeText text="OPERATOR FILES" duration={550} />
                <span className="archive__title-signal">.</span>
              </h1>
            </div>
          </div>

          {/* Controls Row: Segmented Tabs & Search Input */}
          <div className="archive__controls-row">
            <div className="archive__tabs" role="tablist">
              <button
                className={`archive__tab ${showCharacterGrid ? 'archive__tab--active' : ''}`}
                onClick={() => handleTabChange('archive')}
                role="tab"
                aria-selected={showCharacterGrid}
              >
                {showCharacterGrid && (
                  <motion.div
                    className="archive__tab-indicator"
                    layoutId="activeTabIndicator"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span>OPERATORS</span>
                <span className="archive__tab-count">[{characters.length}]</span>
              </button>

              <button
                className={`archive__tab ${showBannerGrid ? 'archive__tab--active' : ''}`}
                onClick={() => handleTabChange('banner')}
                role="tab"
                aria-selected={showBannerGrid}
              >
                {showBannerGrid && (
                  <motion.div
                    className="archive__tab-indicator"
                    layoutId="activeTabIndicator"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span>BANNERS</span>
                <span className="archive__tab-count">[{banners.length}]</span>
              </button>
            </div>

            {/* Terminal Style Search */}
            <div className="archive__search-box">
              <span className="archive__search-prompt">&gt;</span>
              <input
                type="text"
                className="archive__search-input"
                placeholder={showCharacterGrid ? 'SEARCH_OPERATORS...' : 'SEARCH_BANNERS...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Filter archive entries"
              />
              {isSearching && (
                <button
                  className="archive__search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content Section */}
        <section className="archive__section">
          {/* Empty State */}
          {noResults && (
            <div className="archive__empty">
              <span className="archive__empty-code">SIGNAL_LOST // 0 MATCHES</span>
              <p className="archive__empty-text">No dossiers match query: "{searchQuery}"</p>
              <button
                className="ui-btn ui-btn--secondary"
                onClick={() => setSearchQuery('')}
              >
                RESET QUERY
              </button>
            </div>
          )}

          {/* Character Grid */}
          {showCharacterGrid && !noResults && (
            <motion.div layout className="archive__grid">
              {filteredCharacters.map((char, i) => (
                <Reveal key={char.id} delay={Math.min(i * 0.04, 0.3)}>
                  <MemoizedCharacterCard
                    character={char}
                    index={i}
                    onClick={handleSetSelected}
                  />
                </Reveal>
              ))}
            </motion.div>
          )}

          {/* Banner Grid */}
          {showBannerGrid && !noResults && (
            <motion.div layout className="archive__grid archive__grid--banner">
              {filteredBanners.map((banner, i) => (
                <Reveal key={banner.id} delay={Math.min(i * 0.06, 0.3)}>
                  <MemoizedBannerCard
                    banner={banner}
                    index={i}
                    onClick={handleSetSelectedBanner}
                  />
                </Reveal>
              ))}
            </motion.div>
          )}
        </section>

        {/* Live region so arrow-key stepping is announced */}
        <span className="visually-hidden" role="status" aria-live="polite">
          {announce}
        </span>

        {/* Stage viewer (Phase E) replaces the two modals */}
        <AnimatePresence mode="wait">
          {selected && (
            <StageViewer
              key="operator-stage"
              kind="operator"
              entry={selected}
              index={selectedIndex}
              total={filteredCharacters.length}
              onClose={closeModal}
              onPrev={goPrev}
              onNext={goNext}
            />
          )}
          {selectedBanner && (
            <StageViewer
              key="banner-stage"
              kind="banner"
              entry={selectedBanner}
              index={bannerIndex}
              total={filteredBanners.length}
              onClose={closeModal}
              onPrev={goPrevBanner}
              onNext={goNextBanner}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}