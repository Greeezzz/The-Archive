import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Archive from './pages/Archive';
import About from './pages/About';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';
import PageTransition from './components/PageTransition';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Global Effects */}
      <div className="ambient-grid" aria-hidden="true" />
      <ScrollProgress />

      <Cursor />
      <Navbar />
      <main id="main-content">
        <PageTransition>
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/about"   element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="*"        element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>
      <BackToTop />
    </BrowserRouter>
  );
}
