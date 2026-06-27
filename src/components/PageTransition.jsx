import React from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <div className="pt-wrapper" key={location.pathname}>
      {children}
    </div>
  );
}