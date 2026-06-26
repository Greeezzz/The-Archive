import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Archive from './pages/Archive';
import About from './pages/About';
import NotFound from './pages/NotFound';
import PageTransition from './components/PageTransition';
import Cursor from './components/Cursor';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <Navbar />
      <PageTransition>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/about"   element={<About />} />
          <Route path="*"        element={<NotFound />} />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  );
}