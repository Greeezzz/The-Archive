import DecodeText from '../components/motion/DecodeText';
import Button from '../components/ui/Button';
import GhostText from '../components/lines/GhostText';
import { BracketTitle, SlabLabel, MicroTextBand, GlitchSlivers } from '../components/poster';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-wrapper">
      <main className="notfound">
        <MicroTextBand
          text="SIGNAL LOST · 404 · SIGNAL LOST"
          repeat={9}
          className="notfound__band"
        />

        <div className="notfound__meta">
          <span className="notfound__alert-dot" aria-hidden="true" />
          <span>STATUS: ERROR_404 // SIGNAL_TERMINATED</span>
          <GlitchSlivers />
        </div>

        <div className="notfound__headline">
          <GhostText size="clamp(120px, 30vw, 340px)" className="notfound__ghost">
            404
          </GhostText>

          <SlabLabel className="notfound__slab">// ERROR 404</SlabLabel>

          <BracketTitle className="notfound__title">
            <DecodeText text="SIGNAL LOST" duration={600} />
          </BracketTitle>
        </div>

        <div className="notfound__desc-box">
          <p>
            Dossier ini belum diarsipkan — atau sinyal transmisi terputus di sektor ini. Periksa
            kembali rute koordinat Anda.
          </p>
        </div>

        <div className="notfound__actions">
          <Button to="/" variant="primary">
            Return Home <span aria-hidden="true">→</span>
          </Button>
          <Button to="/archive" variant="secondary">
            Browse Archive <span aria-hidden="true">↗</span>
          </Button>
        </div>

        <MicroTextBand
          text="SECTOR UNREACHABLE · NO CARRIER ·"
          repeat={9}
          className="notfound__band notfound__band--bottom"
          reverse
        />
      </main>
    </div>
  );
}
