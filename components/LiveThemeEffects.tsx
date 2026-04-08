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
  // 4. Sharad (Autumn - Snowballs requested by user): Sep (8), Oct (9)
  const isAutumn = monthIndex === 8 || monthIndex === 9;
  // 5. Hemanta (Pre-Winter): Nov (10), Dec (11)
  const isPreWinter = monthIndex === 10 || monthIndex === 11;
  // 6. Shishira (Winter): Jan (0), Feb (1)
  const isWinter = monthIndex === 0 || monthIndex === 1;
  
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-100 transition-opacity duration-1000">
      
      {/* 1. Spring (Vasanta) - Pollen & Light Particles */}
      {isSpring && (
        <div className="spring-container absolute inset-0 mix-blend-screen opacity-70">
          {[...Array(20)].map((_, i) => (
            <div 
              key={`spring-${monthIndex}-${i}`} 
              className="absolute bg-green-200 rounded-full opacity-60 animate-drift"
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

      {/* 2. Summer (Grishma) - Dramatic Heat Shimmer */}
      {isSummer && (
        <div className="summer-container absolute inset-0 mix-blend-overlay flex justify-center items-center pointer-events-none">
          {/* Central sun flare massively increased visibility */}
          <div className="w-[140%] h-[140%] rounded-full bg-yellow-400/40 blur-[80px] animate-blob relative" style={{ animationDuration: '4s' }} />
          <div className="w-[90%] h-[90%] absolute bottom-0 rounded-full bg-orange-500/30 blur-[90px] animate-blob" style={{ animationDelay: '2s', animationDuration: '6s' }} />
        </div>
      )}

      {/* 3. Monsoon (Varsha) - Falling Rain Droplets (Left exactly untouched as requested) */}
      {isMonsoon && (
        <div className="monsoon-container absolute inset-0 opacity-70">
          {[...Array(35)].map((_, i) => (
            <div 
              key={`rain-${monthIndex}-${i}`} 
              className="absolute bg-blue-300 opacity-60 animate-rain"
              style={{
                width: '1px',
                height: `${Math.random() * 15 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 0.5 + 0.6}s`
              }}
            />
          ))}
        </div>
      )}

      {/* 4. Autumn (Sharad) - Replaces leaves with highly realistic Snowballs over Dark Themes */}
      {isAutumn && (
        <div className="autumn-snow-container absolute inset-0">
          {[...Array(45)].map((_, i) => (
            <div 
              key={`snowball-${monthIndex}-${i}`} 
              className="absolute bg-white rounded-full animate-snowfall"
              style={{
                width: `${Math.random() * 6 + 4}px`, // Large, visible chunks
                height: `${Math.random() * 6 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                opacity: Math.random() * 0.5 + 0.4, // Rich bright opacities 40-90%
                filter: 'blur(1px)', // Soft snow edges
                boxShadow: '0 0 8px 2px rgba(255,255,255,0.7)', // Gives them a glow
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 5 + 6}s` // Gentle speed
              }}
            />
          ))}
        </div>
      )}

      {/* 5. Pre-Winter (Hemanta) - Upgraded Vivid Deep Fog / Frost Orbs */}
      {isPreWinter && (
        <div className="prewinter-container absolute inset-0 bg-transparent mix-blend-multiply flex justify-end items-start pointer-events-none">
          <div className="w-[180%] h-[180%] absolute top-[-20%] rounded-full bg-cyan-600/30 blur-[100px] animate-blob" style={{ animationDuration: '8s' }} />
          <div className="w-[120%] h-[120%] absolute bottom-[-10%] right-[-10%] rounded-full bg-slate-500/40 blur-[120px] animate-blob" style={{ animationDelay: '1s', animationDuration: '10s' }} />
        </div>
      )}

      {/* 6. Winter (Shishira) - Icy Cyan Frost (Replaces invisible white snow on white backgrounds) */}
      {isWinter && (
        <div className="winter-container absolute inset-0">
          {[...Array(60)].map((_, i) => ( // Massive density bump
            <div 
              key={`frost-${monthIndex}-${i}`} 
              className="absolute bg-cyan-500 rounded-sm opacity-80 animate-snowfall"
              style={{
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 5 + 2}px`, // Slight rectangle shape like frost shards
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                transform: `rotate(${Math.random() * 45}deg)`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 4}s` // Speeds down fast
              }}
            />
          ))}
        </div>
      )}
      
    </div>
  );
}
