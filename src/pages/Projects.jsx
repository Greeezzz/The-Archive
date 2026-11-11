import DecodeText from '../components/motion/DecodeText';
import Reveal from '../components/motion/Reveal';
import Tag from '../components/ui/Tag';
import Button from '../components/ui/Button';
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
    <div className="projects-wrapper">
      <main className="projects">
        {/* Header */}
        <header className="projects__header">
          <div className="projects__top-meta">
            <span className="projects__status-label">
              <span className="projects__status-dot" />
              DATABASE // SEC-02 // DEPLOYMENT_INDEX
            </span>
            <span>VER: 1.0.4 // STABLE</span>
          </div>

          <div className="projects__header-main">
            <div className="projects__title-block">
              <span className="projects__eyebrow">// PROJECT REGISTRY</span>
              <h1 className="projects__title">
                <DecodeText text="WHAT I BUILT" duration={550} />
                <span className="projects__title-signal">.</span>
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
                <span className="projects__diag-val">
                  {deployedProjects.length + unreleasedProjects.length} ENTS
                </span>
              </div>
              <div className="projects__diag-line">
                <span className="projects__diag-key">LOC_IP:</span>
                <span className="projects__diag-val">127.0.0.1</span>
              </div>
            </div>
          </div>
        </header>

        {/* Deployed Projects */}
        <section className="projects__section">
          <div className="projects__section-header">
            <span className="projects__section-label">DEPLOYED [PUBLIC_APPS]</span>
            <span className="projects__section-count">[{deployedProjects.length}]</span>
          </div>

          <div className="projects__grid">
            {deployedProjects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <article className="pcard">
                  {/* Corner Brackets */}
                  <span className="pcard__bracket pcard__bracket--tl" aria-hidden="true" />
                  <span className="pcard__bracket pcard__bracket--tr" aria-hidden="true" />
                  <span className="pcard__bracket pcard__bracket--bl" aria-hidden="true" />
                  <span className="pcard__bracket pcard__bracket--br" aria-hidden="true" />

                  <div className="pcard__image-wrap">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="pcard__image"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="pcard__badge">
                      <Tag variant="signal">{p.env}</Tag>
                    </div>
                  </div>

                  <div className="pcard__info">
                    <div className="pcard__meta-bar">
                      <span className="pcard__sysref">REF: {p.sysRef}</span>
                      <div className="pcard__links">
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="pcard__link"
                        >
                          [GITHUB]
                        </a>
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="pcard__link"
                          style={{ color: 'var(--signal)' }}
                        >
                          [LIVE_DEMO ↗]
                        </a>
                      </div>
                    </div>

                    <h2 className="pcard__name">{p.name}</h2>
                    <p className="pcard__desc">{p.description}</p>

                    <div className="pcard__tech">
                      {p.tech.map((t) => (
                        <Tag key={t} variant="default">
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Unreleased Projects */}
        <section className="projects__section">
          <div className="projects__section-header">
            <span className="projects__section-label">UNRELEASED [INTERNAL_ARCHIVE]</span>
            <span className="projects__section-count">[{unreleasedProjects.length}]</span>
          </div>

          <div className="projects__list">
            {unreleasedProjects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div className="prow">
                  <div className="prow__left">
                    <div className="prow__meta">
                      <Tag variant="data">{p.env}</Tag>
                      <span className="prow__sysref">REF: {p.sysRef}</span>
                    </div>

                    <h3 className="prow__name">{p.name}</h3>
                    <p className="prow__desc">{p.description}</p>

                    <div className="prow__tech">
                      {p.tech.map((t) => (
                        <Tag key={t} variant="default">
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  <div className="prow__right">
                    <Button href={p.github} variant="secondary">
                      Source Code <span>↗</span>
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}