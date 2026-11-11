import './Projects.css';

const deployedProjects = [
  {
    id: 'gacha-istri',
    number: '001',
    name: 'Gacha Legends',
    description: 'Sistem gacha berbasis probabilitas dengan pity system, rarity tier SSR/SR/R, dan koleksi karakter anime. Dibangun murni dari vanilla JS.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Greeezzz/Gacha-Istri',
    demo: 'https://greeezzz.github.io/Gacha-Istri/',
    image: '/projects/gacha.webp',
    color: '#F4B8CC',
    sysRef: 'GACHA_001',
    env: 'PROD_CLOUD',
  },
  {
    id: 'waifu-card',
    number: '002',
    name: 'Waifu Card Battle',
    description: 'Turn-based card battle game dengan karakter anime, sistem DPS/SUB/BUF, battle log real-time, dan AI musuh. Vanilla JS murni.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Greeezzz/Waifu-Card',
    demo: 'https://greeezzz.github.io/Waifu-Card/',
    image: '/projects/turnbase.webp',
    color: '#7091F0',
    sysRef: 'CARD_002',
    env: 'PROD_CLOUD',
  },
];

const unreleasedProjects = [
  {
    id: 'neera',
    number: '003',
    name: 'Neera',
    description: 'Platform sosial media buatan sendiri karena bosen. Fitur post, follow, feed, dan interaksi antar user.',
    tech: ['Laravel', 'MySQL', 'Blade', 'Tailwind'],
    github: 'https://github.com/Greeezzz/Neera',
    color: '#F4B8CC',
    sysRef: 'SOCIAL_003',
    env: 'LOCAL_DEV',
  },
  {
    id: 'parkir-area-51',
    number: '004',
    name: 'Parkir Area 51',
    description: 'Sistem manajemen parkir — originally projek UKK sekolah. Fitur check-in/out kendaraan, laporan, dan manajemen slot.',
    tech: ['Laravel', 'MySQL', 'Blade'],
    github: 'https://github.com/Greeezzz/Parkir-Area-51',
    color: '#7091F0',
    sysRef: 'PARK_004',
    env: 'LOCAL_DEV',
  },
];

export default function Projects() {
  return (
    <main className="projects page-enter">
      {/* Background decoration layers */}
      <div className="projects__bg-grid" aria-hidden="true" />
      <div className="projects__bg-accent" aria-hidden="true" />
      <div className="projects__scanline" aria-hidden="true" />
      
      {/* Floating decorative elements */}
      <div className="projects__float projects__float--1" aria-hidden="true" />
      <div className="projects__float projects__float--2" aria-hidden="true" />

      {/* ── Topbar ── */}
      <div className="projects__topbar">
        <div className="projects__topbar-rule" />
        <div className="projects__topbar-inner">
          <span className="projects__topbar-label">— Database</span>
          <span className="projects__topbar-tag">sys.status: online // ver 1.0.4</span>
        </div>
        <div className="projects__topbar-rule" />
      </div>

      {/* ── Header ── */}
      <div className="projects__header">
        <div className="projects__vol-col">
          <span className="projects__vol">Vol. I</span>
          <div className="projects__vol-rule" />
        </div>
        
        <div className="projects__header-main">
          <div className="projects__header-content">
            <p className="projects__eyebrow">— Collection</p>
            <h1 className="projects__title">
              <span className="projects__title-serif">What I</span>
              <span className="projects__title-bold">Built<span className="projects__title-accent">.</span></span>
            </h1>
            <p className="projects__subtitle">
              Mostly bikin karena penasaran, bosen, atau kena deadline sekolah.
            </p>
          </div>

          {/* Diagnostic Console Box */}
          <div className="projects__diag-box">
            <div className="projects__diag-line">
              <span className="projects__diag-key">SYSTEM:</span>
              <span className="projects__diag-val projects__diag-val--active">ACTIVE</span>
            </div>
            <div className="projects__diag-line">
              <span className="projects__diag-key">DB_CONN:</span>
              <span className="projects__diag-val">STABLE</span>
            </div>
            <div className="projects__diag-line">
              <span className="projects__diag-key">RECORDS:</span>
              <span className="projects__diag-val">{deployedProjects.length + unreleasedProjects.length} ENTS</span>
            </div>
            <div className="projects__diag-line">
              <span className="projects__diag-key">LOC_IP:</span>
              <span className="projects__diag-val">127.0.0.1</span>
            </div>
            <div className="projects__diag-border" />
          </div>
        </div>
      </div>

      {/* ── Deployed Projects ── */}
      <div className="projects__section">
        <div className="projects__section-header">
          <span className="projects__section-label">Deployed [Public_Apps]</span>
          <div className="projects__section-rule" />
          <span className="projects__section-count">{deployedProjects.length}</span>
        </div>

        <div className="projects__grid">
          {deployedProjects.map((p) => (
            <div key={p.id} className="pcard" style={{ '--accent': p.color }}>
              {/* Glow effect layer */}
              <div className="pcard__glow" />

              {/* HUD Corner brackets */}
              <div className="pcard__bracket pcard__bracket--tl" />
              <div className="pcard__bracket pcard__bracket--tr" />
              <div className="pcard__bracket pcard__bracket--bl" />
              <div className="pcard__bracket pcard__bracket--br" />

              {/* Image */}
              <div className="pcard__image-wrap">
                <img
                  src={p.image}
                  alt={p.name}
                  className="pcard__image"
                  loading="lazy"
                />
                <div className="pcard__image-overlay" />
                <div className="pcard__scan" />
                <span className="pcard__badge">{p.env}</span>
              </div>

              {/* Info */}
              <div className="pcard__info">
                <div className="pcard__meta-bar">
                  <span className="pcard__sysref">[{p.sysRef}]</span>
                  <span className="pcard__status-indicator">ONLINE</span>
                </div>

                <div className="pcard__top">
                  <span className="pcard__number" style={{ color: p.color }}>#{p.number}</span>
                  <div className="pcard__links">
                    <a href={p.github} target="_blank" rel="noreferrer" className="pcard__link pcard__link--gh">
                      [github]
                    </a>
                    <a href={p.demo} target="_blank" rel="noreferrer" className="pcard__link pcard__link--demo" style={{ color: p.color }}>
                      [live_demo] ↗
                    </a>
                  </div>
                </div>

                <h2 className="pcard__name">{p.name}</h2>
                <p className="pcard__desc">{p.description}</p>

                <div className="pcard__tech">
                  {p.tech.map((t) => (
                    <span key={t} className="pcard__tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Unreleased Projects ── */}
      <div className="projects__section">
        <div className="projects__section-header">
          <span className="projects__section-label">Unreleased [Offline_Archive]</span>
          <div className="projects__section-rule" />
          <span className="projects__section-count">{unreleasedProjects.length}</span>
        </div>

        <div className="projects__list">
          {unreleasedProjects.map((p) => (
            <div key={p.id} className="prow" style={{ '--accent': p.color }}>
              <div className="prow__left">
                <span className="prow__number" style={{ color: p.color }}>#{p.number}</span>
                <div className="prow__main">
                  <div className="prow__meta">
                    <span className="prow__sysref">{p.sysRef}</span>
                    <span className="prow__env">[{p.env}]</span>
                  </div>
                  <h3 className="prow__name">{p.name}</h3>
                  <p className="prow__desc">{p.description}</p>
                  <div className="prow__tech">
                    {p.tech.map((t) => (
                      <span key={t} className="prow__tech-badge">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="prow__right">
                <span className="prow__status">
                  <span className="prow__status-dot" style={{ backgroundColor: p.color }} />
                  STANDBY
                </span>
                <a href={p.github} target="_blank" rel="noreferrer" className="prow__link">
                  [source_code]
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ghost watermark */}
      <div className="projects__watermark" aria-hidden="true">
        PROJECTS
      </div>
    </main>
  );
}