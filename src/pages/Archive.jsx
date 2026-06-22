import React, { useState } from 'react';
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

  return (
    <main className="archive page-enter">
      <div className="archive__header">
        <p className="archive__label">— Collection</p>
        <h1 className="archive__title">The Archive</h1>
        <p className="archive__desc">
          {activeTab === 'archive'
            ? `${characters.length} characters & counting.`
            : `${banners.length} banner${banners.length !== 1 ? 's' : ''} designed.`
          }
        </p>

        {/* Segment tabs */}
        <div className="archive__tabs">
          <button
            className={`archive__tab ${activeTab === 'archive' ? 'archive__tab--active' : ''}`}
            onClick={() => setActiveTab('archive')}
          >
            <span className="archive__tab-icon">◈</span>
            Archive
            <span className="archive__tab-count">{characters.length}</span>
          </button>
          <button
            className={`archive__tab ${activeTab === 'banner' ? 'archive__tab--active' : ''}`}
            onClick={() => setActiveTab('banner')}
          >
            <span className="archive__tab-icon">▬</span>
            Banner
            <span className="archive__tab-count">{banners.length}</span>
          </button>
        </div>
      </div>

      {/* Archive Grid */}
      {activeTab === 'archive' && (
        <div className="archive__grid" key="archive">
          {characters.map((char, i) => (
            <CharacterCard
              key={char.id}
              character={char}
              index={i}
              onClick={setSelected}
            />
          ))}
        </div>
      )}

      {/* Banner Grid */}
      {activeTab === 'banner' && (
        <div className="archive__grid archive__grid--banner" key="banner">
          {banners.map((banner, i) => (
            <BannerCard
              key={banner.id}
              banner={banner}
              index={i}
              onClick={setSelectedBanner}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {selected && (
        <CharacterModal
          character={selected}
          onClose={() => setSelected(null)}
        />
      )}
      {selectedBanner && (
        <BannerModal
          banner={selectedBanner}
          onClose={() => setSelectedBanner(null)}
        />
      )}
    </main>
  );
}
