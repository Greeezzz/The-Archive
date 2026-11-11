import DecodeText from '../components/motion/DecodeText';
import Button from '../components/ui/Button';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-wrapper">
      <main className="notfound">
        <div className="notfound__meta">
          <span className="notfound__alert-dot" />
          <span>STATUS: ERROR_404 // SIGNAL_TERMINATED</span>
        </div>

        <div className="notfound__title-block">
          <span className="notfound__code">// ERROR 404</span>
          <h1 className="notfound__title">
            <DecodeText text="SIGNAL LOST" duration={600} />
          </h1>
        </div>

        <div className="notfound__desc-box">
          <p>
            Dossier ini belum diarsipkan — atau sinyal transmisi terputus di sektor ini. Periksa kembali
            rute koordinat Anda.
          </p>
        </div>

        <div className="notfound__actions">
          <Button to="/" variant="primary">
            Return Home <span>→</span>
          </Button>
          <Button to="/archive" variant="secondary">
            Browse Archive <span>↗</span>
          </Button>
        </div>
      </main>
    </div>
  );
}