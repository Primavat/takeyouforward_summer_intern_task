'use client';

import React, { useEffect, useState } from 'react';
import { useCalendar } from '@/context/CalendarContext';

export function LiveThemeEffects() {
  const { state } = useCalendar();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration errors by waiting until mounted to generate random particles
  useEffect(() => {
    setMounted(true);
  }, []);

  const monthIndex = state.currentMonth.getMonth();

  // 11 = Dec, 0 = Jan (Snow)
  const isSnowTheme = monthIndex === 11 || monthIndex === 0;
  // 3 = Apr, 4 = May (Pollen/Leaves)
  const isSpringTheme = monthIndex === 3 || monthIndex === 4;
  // 9 = Oct (Fog/Ambient)
  const isMysteryTheme = monthIndex === 9;
  
  if (!mounted || (!isSnowTheme && !isSpringTheme && !isMysteryTheme)) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-70 transition-opacity duration-1000">
      {isSnowTheme && (
        <div className="snow-container absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div 
              key={`snow-${monthIndex}-${i}`} 
              className="absolute bg-white rounded-full opacity-80 animate-snowfall"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 4 + 5}s`
              }}
            />
          ))}
        </div>
      )}
      
      {isSpringTheme && (
        <div className="spring-container absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={`pollen-${monthIndex}-${i}`} 
              className="absolute bg-green-200 rounded-full opacity-50 animate-drift"
              style={{
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
                top: `${Math.random() * 100}%`,
                left: `-20px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 8 + 10}s`
              }}
            />
          ))}
        </div>
      )}

      {isMysteryTheme && (
        <div className="mystery-container absolute inset-0 bg-black/10 mix-blend-multiply flex justify-center items-center pointer-events-none">
            <div className="w-[120%] h-[120%] rounded-full bg-purple-900/10 blur-[80px] animate-blob relative" />
            <div className="w-[80%] h-[80%] absolute top-0 right-0 rounded-full bg-orange-500/5 blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />
        </div>
      )}
    </div>
  );
}
