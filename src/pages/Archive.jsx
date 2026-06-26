import React, { useState, useCallback, useMemo } from 'react';
import CharacterCard from '../components/CharacterCard';
import BannerCard from '../components/BannerCard';
import CharacterModal from '../components/CharacterModal';
import BannerModal from '../components/BannerModal';
import characters from '../data/characters.json';
import banners from '../data/banners.json';
import './Archive.css';

export default function Archive() {
  const [selected, setSelected] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [activeTab, setActiveTab] = useState('archive');

  const handleSetSelected = useCallback((char) => setSelected(char), []);
  const handleSetSelectedBanner = useCallback((banner) => setSelectedBanner(banner), []);

  const characterCards = useMemo(() =>
    characters.map((char, i) => (
      <CharacterCard
        key={char.id}
        character={char}
        index={i}
        onClick={handleSetSelected}
      />
    )), [handleSetSelected]);

  const bannerCards = useMemo(() =>
    banners.map((banner, i) => (
      <BannerCard
        key={banner.id}
        banner={banner}
        index={i}
        onClick={handleSetSelectedBanner}
      />
    )), [handleSetSelectedBanner]);

  return (
    <main className="archive page-enter">

      {/* ── Header section ── */}
      <header className="archive__header">

        {/* Top rule with issue info */}
        <div className="archive__top">
          <div className="archive__top-rule" />
          <div className="archive__issue-info">
            <span className="archive__issue-vol">Vol. I</span>
            <span className="archive__issue-sep" />
            <span className="archive__issue-label">The Archive</span>
          </div>
        </div>

        {/* Main header block */}
        <div className="archive__header-main">

          {/* Left: vertical rule + vol */}
          <div className="archive__meta-col">
            <div className="archive__vert-rule" />
            <span className="archive__vol">Issue 01</span>
          </div>

          {/* Center: title */}
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

          {/* Right: tabs + count */}
          <div className="archive__control-block">
            <div className="archive__count-block">
              <span className="archive__count-num">
                {activeTab === 'archive' ? characters.length : banners.length}
              </span>
              <span className="archive__count-label">
                {activeTab === 'archive' ? 'Characters' : 'Banners'}
              </span>
            </div>

            {/* Tabs */}
            <div className="archive__tabs">
              <button
                className={`archive__tab ${activeTab === 'archive' ? 'archive__tab--active' : ''}`}
                onClick={() => setActiveTab('archive')}
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
                className={`archive__tab ${activeTab === 'banner' ? 'archive__tab--active' : ''}`}
                onClick={() => setActiveTab('banner')}
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

        {/* Bottom rule */}
        <div className="archive__bottom-rule" />
      </header>

      {/* ── Grid section ── */}
      <section className="archive__section">
        {/* Section label */}
        <div className="archive__section-label">
          <span className="archive__section-text">
            {activeTab === 'archive' ? 'Character Entries' : 'Banner Collection'}
          </span>
          <div className="archive__section-line" />
        </div>

        {/* Character grid */}
        <div
          className={`archive__grid ${activeTab === 'banner' ? 'archive__grid--hidden' : ''}`}
        >
          {characterCards}
        </div>

        {/* Banner grid */}
        <div
          className={`archive__grid archive__grid--banner ${activeTab === 'archive' ? 'archive__grid--hidden' : ''}`}
        >
          {bannerCards}
        </div>
      </section>

      {/* ── Ghost watermark ── */}
      <div className="archive__watermark" aria-hidden="true">
        <span>{activeTab === 'archive' ? 'ENTRIES' : 'BANNERS'}</span>
      </div>

      {/* ── Modals ── */}
      {selected && (
        <CharacterModal character={selected} onClose={() => setSelected(null)} />
      )}
      {selectedBanner && (
        <BannerModal banner={selectedBanner} onClose={() => setSelectedBanner(null)} />
      )}
    </main>
  );
}
