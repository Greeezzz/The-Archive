import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="notfound page-enter">
      <div className="notfound__bg-lines" />

      <div className="notfound__layout">

        <div className="notfound__vol-col">
          <span className="notfound__vol">404</span>
          <div className="notfound__vol-rule" />
        </div>

        <div className="notfound__content">
          <p className="notfound__eyebrow">— Entry not found</p>

          <h1 className="notfound__title">
            <span className="notfound__title-serif">This page</span>
            <span className="notfound__title-bold">
              doesn't<span className="notfound__title-accent">.</span>
            </span>
            <span className="notfound__title-serif notfound__title-serif--indent">exist</span>
          </h1>

          <p className="notfound__desc">
            Karakter ini belum diarsipkan — atau mungkin aldah dihapus dari koleksi.
          </p>

          <div className="notfound__actions">
            <Link to="/" className="notfound__btn">
              Back to home
              <span className="notfound__btn-arrow">→</span>
            </Link>
            <Link to="/archive" className="notfound__btn notfound__btn--ghost">
              Browse Archive
            </Link>
          </div>
        </div>
      </div>

      <div className="notfound__watermark" aria-hidden="true">
        <span>404</span>
      </div>
    </main>
  );
}