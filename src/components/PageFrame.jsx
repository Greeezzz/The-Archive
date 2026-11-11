import './PageFrame.css';

export default function PageFrame() {
  return (
    <div className="page-frame" aria-hidden="true">
      <div className="page-frame__top">
        <div className="page-frame__status">
          <span className="page-frame__indicator" />
          <span>THE ARCHIVE // SYS.ONLINE // 2026</span>
        </div>
        <div className="page-frame__coords">
          <span>SEC: ARCHIVE // LAT: 07.24°S</span>
        </div>
      </div>

      <span className="page-frame__corner page-frame__corner--tl" />
      <span className="page-frame__corner page-frame__corner--tr" />
      <span className="page-frame__corner page-frame__corner--bl" />
      <span className="page-frame__corner page-frame__corner--br" />
    </div>
  );
}
