import { useState, useEffect } from 'react';
import { Crosshair } from './lines';
import './PageFrame.css';

export default function PageFrame() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <aside className="console-rail" aria-hidden="true">
        <div className="console-rail__top">
          <Crosshair />
          <span className="console-rail__line" />
        </div>
        <div className="console-rail__middle">
          <span className="console-rail__rot">THE ARCHIVE // TERMINAL</span>
        </div>
        <div className="console-rail__bottom">
          <span className="console-rail__dot" />
        </div>
      </aside>

      <footer className="console-bottom-bar" aria-hidden="true">
        <div className="console-bottom-bar__left">
          <span>© 2026 CHELO</span>
          <span className="console-bottom-bar__sep">/</span>
          <span>SYS.ONLINE</span>
        </div>
        <div className="console-bottom-bar__right">
          <span>SCROLL: {Math.round(scrollY)}PX</span>
          <span className="console-bottom-bar__cell">ARCHIVE STAGE v2.4</span>
        </div>
      </footer>
    </>
  );
}
