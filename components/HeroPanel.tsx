'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { ChevronDivider } from './ChevronDivider';
import { format } from 'date-fns';
import { useThemeExtract } from '@/hooks/useThemeExtract';

// Monthly images mapping (public folder paths)
const MONTHLY_IMAGES: string[] = [
  '/images/jan.jpg',        // January (0)
  '/images/feb.jpg',        // February (1)
  '/images/march.avif',     // March (2)
  '/images/april.jpg',      // April (3)
  '/images/may.jpg',        // May (4)
  '/images/june.jpg',       // June (5)
  '/images/july.jpg',       // July (6)
  '/images/august.jpg',     // August (7)
  '/images/september.avif', // September (8)
  '/images/october.jpg',    // October (9)
  '/images/november.jpg',   // November (10)
  '/images/december.jpg',   // December (11)
];

export function HeroPanel() {
  const { state, dispatch } = useCalendar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const extractTheme = useThemeExtract();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Get current month key for per-month images
  const monthKey = format(state.currentMonth, 'yyyy-MM');
  const userUploadedImage = state.monthImages[monthKey];
  
  // Get default image for current month (0-11)
  const monthIndex = state.currentMonth.getMonth();
  const defaultMonthImage = MONTHLY_IMAGES[monthIndex];
  
  // Use uploaded image if available, otherwise use default monthly image
  const currentMonthImage = userUploadedImage || defaultMonthImage;
  const hasImage = !!currentMonthImage;
  
  // Reset loaded state when image changes
  useEffect(() => {
    setIsLoaded(false);
  }, [currentMonthImage]);
  
  // Preload adjacent month images for faster switching
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };
    
    // Preload prev and next month images
    const prevIndex = (monthIndex - 1 + 12) % 12;
    const nextIndex = (monthIndex + 1) % 12;
    
    preloadImage(MONTHLY_IMAGES[prevIndex]);
    preloadImage(MONTHLY_IMAGES[nextIndex]);
  }, [monthIndex]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        // Use new per-month image action
        dispatch({ type: 'SET_MONTH_IMAGE', payload: { monthKey, imageUrl: result } });
        extractTheme(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className={`relative flex flex-col items-center justify-center p-8 text-white min-h-[200px] sm:min-h-[300px] md:min-h-full overflow-hidden shrink-0 transition-colors duration-500 ease-in-out group ${
        hasImage ? 'bg-gray-800' : 'bg-gradient-to-br from-indigo-500 to-purple-600'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasImage && (
        <>
          {/* Blurred background - fills container */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-lg scale-125"
            style={{ backgroundImage: `url('${currentMonthImage}')` }}
          />
          {/* Main image - centered and contained */}
          <img
            src={currentMonthImage}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-contain z-10"
            onLoad={() => setIsLoaded(true)}
          />
        </>
      )}
      <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
      
      {/* Month & Year - positioned top-right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 text-right">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold capitalize drop-shadow-md leading-tight">
          {format(state.currentMonth, 'MMMM')}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-medium opacity-90 drop-shadow-sm">
          {format(state.currentMonth, 'yyyy')}
        </p>
      </div>
      
      {/* Upload/Change Image button - top left corner */}
      {hasImage ? (
        <div className={`absolute top-4 left-4 sm:top-6 sm:left-6 z-30 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 bg-white/95 hover:bg-white text-gray-800 backdrop-blur-sm border border-white/80 rounded-xl shadow-2xl transition-all text-sm font-semibold flex items-center gap-2 print:hidden"
            title="Change cover image for this month"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Change Image
          </button>
        </div>
      ) : (
        <div className="relative z-10 text-center">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/50 rounded-xl shadow-xl transition-all text-sm font-medium flex items-center gap-2 print:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            Upload Cover Image
          </button>
        </div>
      )}
      
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <ChevronDivider />
    </div>
  );
}
