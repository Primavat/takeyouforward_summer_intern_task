'use client';

import React, { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import { useCalendar } from '@/context/CalendarContext';

// Stable seeded random number generator to avoid re-randomization on renders
class StableRNG {
  private seed: number;
  
  constructor(seed: number) {
    this.seed = seed;
  }
  
  next(): number {
    // Linear congruential generator for stable pseudo-random numbers
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  
  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
}

// Spring flower state
interface FlowerState {
  currentIndex: number;
  isVisible: boolean;
  lastSpawnTime: number;
}

export function LiveThemeEffects() {
  const { state } = useCalendar();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Extract currentMonth to avoid complex expressions in dependency arrays
  const currentMonth = state.currentMonth;
  
  // Stable RNG initialized once per month
  const monthSeed = useMemo(() => currentMonth.getMonth() + 1, [currentMonth]);
  
  // Generate stable configurations once per mount/month
  const stableConfigs = useMemo(() => {
    const rngInstance = new StableRNG(monthSeed * 1000);

    // Helper for balanced left/right distribution
    const getBalancedPosition = (index: number, total: number, min: number, max: number): number => {
      // Split into left and right halves with staggered distribution
      const half = Math.ceil(total / 2);
      const isLeft = index % 2 === 0;
      const halfIndex = Math.floor(index / 2);
      const range = (max - min) / half;
      const base = isLeft ? min : (min + max) / 2;
      return base + (halfIndex * range) + rngInstance.range(-5, 5);
    };

    return {
      // Jan-Feb: Frost particles with balanced distribution + gentle drift
      sparkles: Array.from({ length: 30 }, (_, i) => {
        const left = getBalancedPosition(i, 30, 5, 95);
        return {
          id: i,
          left: `${Math.max(5, Math.min(95, left))}%`,
          top: `-10px`, // Start above viewport for drift-in
          delay: `-${rngInstance.range(0, 30)}s`,
          duration: `${rngInstance.range(10, 18)}s` // Slow gentle drift
        };
      }),

      flowers: Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${rngInstance.range(8, 92)}%`,
        // Restrict to grid area (25-90% from top, avoiding header)
        top: `${rngInstance.range(25, 90)}%`,
        icon: ['🌸', '🌺', '🌼', '🌷', '🌻'][Math.floor(rngInstance.range(0, 5))]
      })),

      rays: Array.from({ length: 5 }, (_, i) => ({
        id: i,
        rotate: `${-15 - (i * 12)}deg`,
        delay: `-${rngInstance.range(0, 20)}s`,
        duration: `${rngInstance.range(6, 12)}s`
      })),

      rain: Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${rngInstance.range(0, 100)}%`,
        height: `${rngInstance.range(10, 25)}px`,
        delay: `-${rngInstance.range(0, 15)}s`,
        duration: `${rngInstance.range(0.5, 0.9)}s`
      })),

      // Sept-Oct: Leaves with balanced left/right distribution
      leaves: Array.from({ length: 24 }, (_, i) => {
        const left = getBalancedPosition(i, 24, 0, 100);
        return {
          id: i,
          left: `${Math.max(0, Math.min(100, left))}%`,
          delay: `-${rngInstance.range(0, 20)}s`, // Reduced spread for more continuous flow
          duration: `${rngInstance.range(6, 10)}s`,
          icon: ['🍁', '🍂', '🍃'][Math.floor(rngInstance.range(0, 3))]
        };
      }),

      snow: Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${rngInstance.range(0, 100)}%`,
        size: `${rngInstance.range(3, 8)}px`,
        delay: `-${rngInstance.range(0, 30)}s`,
        duration: `${rngInstance.range(6, 10)}s`,
        opacity: `${rngInstance.range(0.5, 0.9)}`
      }))
    };
  }, [monthSeed]);

  // Sequential flower animation controller
  const flowerControllerRef = useRef<FlowerState>({
    currentIndex: 0,
    isVisible: false,
    lastSpawnTime: 0
  });
  const [activeFlowerIndex, setActiveFlowerIndex] = useState(-1);
  const flowerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bloomTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset controller state - used when month changes
  const resetFlowerState = useCallback(() => {
    // Clear all pending timeouts
    if (flowerTimeoutRef.current) {
      clearTimeout(flowerTimeoutRef.current);
      flowerTimeoutRef.current = null;
    }
    if (bloomTimeoutRef.current) {
      clearTimeout(bloomTimeoutRef.current);
      bloomTimeoutRef.current = null;
    }
    // Reset controller
    flowerControllerRef.current = {
      currentIndex: 0,
      isVisible: false,
      lastSpawnTime: 0
    };
    // Reset UI state
    setActiveFlowerIndex(-1);
  }, []);

  const spawnNextFlower = useCallback(() => {
    const controller = flowerControllerRef.current;
    const now = Date.now();

    // Reduced delay between flowers by 60%: 0.8-1.6 seconds (was 2-4s)
    const nextDelay = 800 + Math.random() * 800;

    controller.currentIndex = (controller.currentIndex + 1) % stableConfigs.flowers.length;
    controller.isVisible = true;
    controller.lastSpawnTime = now;

    setActiveFlowerIndex(controller.currentIndex);

    // Bloom duration: 2 seconds (matching CSS animation)
    bloomTimeoutRef.current = setTimeout(() => {
      controller.isVisible = false;
      // Ensure clean exit by clearing flower immediately
      setActiveFlowerIndex(-1);

      // Schedule next flower spawn with reduced delay
      flowerTimeoutRef.current = setTimeout(() => {
        spawnNextFlower();
      }, nextDelay);
    }, 2000);
  }, [stableConfigs.flowers.length]);

  // Initialize sequential flower animation
  useEffect(() => {
    const monthIndex = currentMonth.getMonth();
    const isSpring = monthIndex === 2 || monthIndex === 3;

    if (!isSpring || !mounted) {
      resetFlowerState();
      return;
    }

    // FULL RESET when entering spring (handles March->April transition)
    resetFlowerState();

    // Start the sequence after a brief delay
    const initialDelay = setTimeout(() => {
      spawnNextFlower();
    }, 500);

    return () => {
      clearTimeout(initialDelay);
      resetFlowerState();
    };
  }, [currentMonth, mounted, spawnNextFlower, resetFlowerState]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const monthIndex = state.currentMonth.getMonth();

  // Season flags
  const isSpring = monthIndex === 2 || monthIndex === 3;
  const isSummer = monthIndex === 4 || monthIndex === 5;
  const isMonsoon = monthIndex === 6 || monthIndex === 7;
  const isAutumn = monthIndex === 8 || monthIndex === 9;
  const isWinterHeavy = monthIndex === 10 || monthIndex === 11;
  const isWinterLight = monthIndex === 0 || monthIndex === 1;
  
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-100 transition-opacity duration-1000">
      
      {/* 1. Winter Light (Jan/Feb) - Frost Sparkles with Gentle Drift (STABLE) */}
      {isWinterLight && (
        <div className="winter-light-container absolute inset-0">
          {stableConfigs.sparkles.map((config) => (
            <div
              key={`sparkle-${config.id}`}
              className="absolute text-cyan-500/30 text-xs sm:text-sm animate-frost-drift pointer-events-none"
              style={{
                left: config.left,
                top: config.top,
                animationDelay: config.delay,
                animationDuration: config.duration,
                filter: 'blur(0.5px)'
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      {/* 2. Spring (Vasanta) - Sequential Single Flower Blooming (2s cycle, reduced delays) */}
      {/* Key forces remount when month changes within spring (March <-> April) */}
      {isSpring && (
        <div
          className="spring-container absolute inset-0"
          ref={containerRef}
          key={`spring-${monthIndex}`}
        >
          {stableConfigs.flowers.map((config, index) => (
            <div
              key={`flower-${config.id}`}
              className={`absolute text-lg sm:text-xl drop-shadow-sm ${
                index === activeFlowerIndex ? 'animate-bloom' : 'opacity-0'
              }`}
              style={{
                left: config.left,
                top: config.top,
                pointerEvents: 'none',
                zIndex: 1,
                // Ensure element stays hidden when not active
                visibility: index === activeFlowerIndex ? 'visible' : 'hidden'
              }}
            >
              {config.icon}
            </div>
          ))}
        </div>
      )}

      {/* 3. Summer (Grishma) - Top-right Sun element + extended dim rays (STABLE) */}
      {isSummer && (
        <div className="summer-container absolute inset-0 overflow-hidden">
          <div className="absolute top-[-30px] right-[-30px] w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-yellow-400/20 blur-[40px] animate-pulse-slow mix-blend-overlay pointer-events-none"></div>

          {/* Stable Sun Rays stretching down diagonally */}
          {stableConfigs.rays.map((config) => (
            <div
              key={`ray-${config.id}`}
              className="absolute top-[-10%] right-[-5%] w-[150px] h-screen bg-gradient-to-b from-yellow-500/10 to-transparent mix-blend-overlay transform origin-top-right animate-pulse pointer-events-none"
              style={{
                rotate: config.rotate,
                animationDelay: config.delay,
                animationDuration: config.duration
              }}
            />
          ))}
        </div>
      )}

      {/* 4. Monsoon (Varsha) - Falling Rain Droplets (STABLE) */}
      {isMonsoon && (
        <div className="monsoon-container absolute inset-0 opacity-80">
          {stableConfigs.rain.map((config) => (
            <div
              key={`rain-${config.id}`}
              className="absolute bg-blue-300 opacity-60 animate-rain pointer-events-none"
              style={{
                width: '1px',
                height: config.height,
                left: config.left,
                top: '-20px',
                animationDelay: config.delay,
                animationDuration: config.duration
              }}
            />
          ))}
        </div>
      )}

      {/* 5. Autumn (Sharad) - Continuous Medium Leaves (STABLE) */}
      {isAutumn && (
        <div className="autumn-container absolute inset-0">
          {stableConfigs.leaves.map((config) => (
            <div
              key={`leaf-${config.id}`}
              className="absolute text-lg sm:text-xl drop-shadow-sm opacity-80 animate-fall pointer-events-none"
              style={{
                left: config.left,
                top: '-30px',
                animationDelay: config.delay,
                animationDuration: config.duration
              }}
            >
              {config.icon}
            </div>
          ))}
        </div>
      )}

      {/* 6. Winter Heavy (Hemanta) - Continuous Snowfall (STABLE) */}
      {isWinterHeavy && (
        <div className="winter-heavy-container absolute inset-0">
          {stableConfigs.snow.map((config) => (
            <div
              key={`snow-${config.id}`}
              className="absolute bg-white rounded-full animate-snowfall pointer-events-none"
              style={{
                width: config.size,
                height: config.size,
                left: config.left,
                top: '-10px',
                opacity: config.opacity,
                filter: 'blur(0.5px)',
                boxShadow: '0 0 6px 1px rgba(255,255,255,0.6)',
                animationDelay: config.delay,
                animationDuration: config.duration
              }}
            />
          ))}
        </div>
      )}
      
    </div>
  );
}
