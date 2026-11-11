import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Archive from './pages/Archive';
import About from './pages/About';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';
import PageTransition from './components/PageTransition';
import PageFrame from './components/PageFrame';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import './index.css';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/archive" element={<PageTransition><Archive /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Global Effects & Frame */}
      <div className="ambient-grid" aria-hidden="true" />
      <ScrollProgress />
      <PageFrame />

      <Cursor />
      <Navbar />
      <main id="main-content">
        <AppRoutes />
      </main>
      <BackToTop />
    </BrowserRouter>
  );
}
