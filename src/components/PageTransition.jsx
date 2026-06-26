import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [stage, setStage] = useState('enter'); // enter | idle | exit
  const [isAnimating, setIsAnimating] = useState(false);
  const prevLocation = useRef(location);

  useEffect(() => {
    if (location.pathname !== prevLocation.current.pathname) {
      // Exit animation
      setStage('exit');
      setIsAnimating(true);

      const exitTimer = setTimeout(() => {
        setDisplayLocation(location);
        setStage('enter');
        prevLocation.current = location;
      }, 300); // exit duration

      const enterTimer = setTimeout(() => {
        setStage('idle');
        setIsAnimating(false);
      }, 500); // enter duration

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(enterTimer);
      };
    }
  }, [location]);

  return (
    <div
      className={`pt-wrapper pt-wrapper--${stage}`}
      style={{ '--is-animating': isAnimating ? 1 : 0 }}
    >
      <div className="pt-content">
        {children}
      </div>
    </div>
  );
}
