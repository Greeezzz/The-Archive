import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Archive from './pages/Archive';
import About from './pages/About';
import NotFound from './pages/NotFound';
import PageTransition from './components/PageTransition';
import Cursor from './components/Cursor';
import BackToTop from './components/BackToTop';
import './index.css';
import Projects from './pages/Projects';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BrowserRouter>
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Global Effects */}
      <div className="grain" aria-hidden="true" />
      <div className="ambient-glow ambient-glow--1" aria-hidden="true" />
      <div className="ambient-glow ambient-glow--2" aria-hidden="true" />
      <div className="ambient-glow ambient-glow--3" aria-hidden="true" />
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      <Cursor />
      <Navbar />
      <main id="main-content">
      <PageTransition>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/about"   element={<About />} />
          <Route path="*"        element={<NotFound />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </PageTransition>
      </main>
      <BackToTop />
    </BrowserRouter>
  );
}