'use client';

import React, { useEffect, useState } from 'react';
import { useCalendar } from '@/context/CalendarContext';

export function LiveThemeEffects() {
  const { state } = useCalendar();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const monthIndex = state.currentMonth.getMonth();

  // 1. Vasanta (Spring): Mar (2), Apr (3)
  const isSpring = monthIndex === 2 || monthIndex === 3;
  // 2. Grishma (Summer): May (4), Jun (5)
  const isSummer = monthIndex === 4 || monthIndex === 5;
  // 3. Varsha (Monsoon): Jul (6), Aug (7)
  const isMonsoon = monthIndex === 6 || monthIndex === 7;
  // 4. Sharad (Autumn): Sep (8), Oct (9)
  const isAutumn = monthIndex === 8 || monthIndex === 9;
  // 5. Hemanta (Pre-Winter / Heavy Winter): Nov (10), Dec (11) (Old Sept/Oct Dark Snow)
  const isWinterHeavy = monthIndex === 10 || monthIndex === 11;
  // 6. Shishira (Winter Light): Jan (0), Feb (1)
  const isWinterLight = monthIndex === 0 || monthIndex === 1;
  
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-100 transition-opacity duration-1000">
      
      {/* 1. Winter Light (Jan/Feb) - Subtle Frost Sparkles */}
      {isWinterLight && (
        <div className="winter-light-container absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div 
              key={`sparkle-${monthIndex}-${i}`} 
              className="absolute text-cyan-500/30 text-xs sm:text-sm animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `-${Math.random() * 20}s`,
                animationDuration: `${Math.random() * 8 + 6}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      {/* 2. Spring (Vasanta) - Random Blooming Flowers within Date Grid */}
      {isSpring && (
        <div className="spring-container absolute inset-0">
          {[...Array(20)].map((_, i) => {
            const icons = ['🌸', '🌺', '🌼', '🌷', '🌻'];
            // Flowers bloom within the date grid area (lower 75% where day cells are)
            const gridTop = 25 + Math.random() * 70; // 25% to 95% from top
            const gridLeft = 5 + Math.random() * 90; // 5% to 95% from left
            return (
              <div
                key={`bloom-${monthIndex}-${i}`}
                className="absolute text-lg sm:text-xl animate-bloom drop-shadow-sm"
                style={{
                  left: `${gridLeft}%`,
                  top: `${gridTop}%`,
                  animationDelay: `-${Math.random() * 30}s`,
                  animationDuration: `${Math.random() * 8 + 12}s`
                }}
              >
                {icons[i % icons.length]}
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Summer (Grishma) - Top-right Sun element + extended dim rays */}
      {isSummer && (
        <div className="summer-container absolute inset-0 overflow-hidden">
          <div className="absolute top-[-30px] right-[-30px] w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-yellow-400/20 blur-[40px] animate-pulse-slow mix-blend-overlay"></div>
          
          {/* Extremely subtle Sun Rays stretching down diagonally */}
          {[...Array(5)].map((_, i) => (
            <div 
              key={`ray-${monthIndex}-${i}`}
              className="absolute top-[-10%] right-[-5%] w-[150px] h-screen bg-gradient-to-b from-yellow-500/10 to-transparent mix-blend-overlay transform origin-top-right animate-pulse"
              style={{
                rotate: `${-15 - (i * 12)}deg`,
                animationDelay: `-${Math.random() * 20}s`,
                animationDuration: `${Math.random() * 6 + 6}s`
              }}
            />
          ))}
        </div>
      )}

      {/* 4. Monsoon (Varsha) - Falling Rain Droplets (UNCHANGED - already perfect) */}
      {isMonsoon && (
        <div className="monsoon-container absolute inset-0 opacity-80">
          {[...Array(40)].map((_, i) => (
            <div
              key={`rain-${monthIndex}-${i}`}
              className="absolute bg-blue-300 opacity-60 animate-rain"
              style={{
                width: '1px',
                height: `${Math.random() * 15 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `-${Math.random() * 15}s`,
                animationDuration: `${Math.random() * 0.4 + 0.5}s`
              }}
            />
          ))}
        </div>
      )}

      {/* 5. Autumn (Sharad) - Continuous Medium Leaves with Natural Motion */}
      {isAutumn && (
        <div className="autumn-container absolute inset-0">
          {[...Array(22)].map((_, i) => {
            const leaves = ['🍁', '🍂', '🍃'];
            return (
              <div
                key={`leaf-${monthIndex}-${i}`}
                className="absolute text-lg sm:text-xl drop-shadow-sm opacity-80 animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-30px`,
                  animationDelay: `-${Math.random() * 25}s`,
                  animationDuration: `${Math.random() * 5 + 7}s`
                }}
              >
                {leaves[i % leaves.length]}
              </div>
            );
          })}
        </div>
      )}

      {/* 6. Winter Heavy (Hemanta) - Continuous Snowfall (Old Sept-Oct Dark Theme Snow) */}
      {isWinterHeavy && (
        <div className="winter-heavy-container absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`snowball-${monthIndex}-${i}`}
              className="absolute bg-white rounded-full animate-snowfall"
              style={{
                width: `${Math.random() * 5 + 3}px`,
                height: `${Math.random() * 5 + 3}px`,
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                opacity: Math.random() * 0.4 + 0.5,
                filter: 'blur(0.5px)',
                boxShadow: '0 0 6px 1px rgba(255,255,255,0.6)',
                animationDelay: `-${Math.random() * 30}s`,
                animationDuration: `${Math.random() * 4 + 6}s`
              }}
            />
          ))}
        </div>
      )}
      
    </div>
  );
}
