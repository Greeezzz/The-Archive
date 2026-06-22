import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Archive from './pages/Archive';
import About from './pages/About';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/about"   element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
