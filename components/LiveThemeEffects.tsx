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
  // 5. Hemanta (Pre-Winter): Nov (10), Dec (11)
  const isPreWinter = monthIndex === 10 || monthIndex === 11;
  // 6. Shishira (Winter): Jan (0), Feb (1)
  const isWinter = monthIndex === 0 || monthIndex === 1;
  
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-70 transition-opacity duration-1000">
      
      {/* 1. Spring (Vasanta) - Pollen & Light Particles */}
      {isSpring && (
        <div className="spring-container absolute inset-0 mix-blend-screen">
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

      {/* 2. Summer (Grishma) - Heat Shimmers / Light Rays */}
      {isSummer && (
        <div className="summer-container absolute inset-0 mix-blend-overlay flex justify-center items-center pointer-events-none">
          <div className="w-[120%] h-[120%] rounded-full bg-yellow-400/20 blur-[60px] animate-blob relative" style={{ animationDuration: '6s' }} />
          <div className="w-[80%] h-[80%] absolute bottom-0 rounded-full bg-orange-400/10 blur-[80px] animate-blob" style={{ animationDelay: '3s', animationDuration: '8s' }} />
        </div>
      )}

      {/* 3. Monsoon (Varsha) - Falling Rain Droplets */}
      {isMonsoon && (
        <div className="monsoon-container absolute inset-0">
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

      {/* 4. Autumn (Sharad) - Falling Leaves / Warm tones */}
      {isAutumn && (
        <div className="autumn-container absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div 
              key={`leaf-${monthIndex}-${i}`} 
              className="absolute bg-orange-400 rounded-sm opacity-50 animate-fall"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 4 + 3}px`,
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 5 + 6}s`
              }}
            />
          ))}
        </div>
      )}

      {/* 5. Pre-Winter (Hemanta) - Thick Fog / Cool Tones */}
      {isPreWinter && (
        <div className="prewinter-container absolute inset-0 bg-transparent mix-blend-multiply flex justify-end items-start pointer-events-none">
          <div className="w-[150%] h-[150%] absolute top-0 rounded-full bg-cyan-900/5 blur-[90px] animate-blob" style={{ animationDuration: '10s' }} />
          <div className="w-[100%] h-[100%] absolute bottom-0 right-0 rounded-full bg-gray-500/10 blur-[100px] animate-blob" style={{ animationDelay: '2s', animationDuration: '12s' }} />
        </div>
      )}

      {/* 6. Winter (Shishira) - Snow */}
      {isWinter && (
        <div className="winter-container absolute inset-0">
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
      
    </div>
  );
}
