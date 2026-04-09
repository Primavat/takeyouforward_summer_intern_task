'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useCalendar } from '@/context/CalendarContext';
import { ChevronDivider } from './ChevronDivider';
import { format } from 'date-fns';
import { useThemeExtract } from '@/hooks/useThemeExtract';

export function HeroPanel() {
  const { state, dispatch } = useCalendar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const extractTheme = useThemeExtract();
  const [isHovered, setIsHovered] = useState(false);
  
  // Get current month key for per-month images
  const monthKey = format(state.currentMonth, 'yyyy-MM');
  const currentMonthImage = state.monthImages[monthKey];
  const hasImage = !!currentMonthImage;

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
        <Image
          src={currentMonthImage}
          alt="Hero Background"
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8+Q8AAh4BSvM5rC8AAAAASUVORK5CYII="
          priority
        />
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
      
      {/* Center content - show upload button when no image */}
      {!hasImage && (
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
      
      {/* Change Image button - positioned top-right with improved visibility */}
      {hasImage && (
        <div className={`absolute top-4 left-4 sm:top-6 sm:left-6 z-30 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 bg-white/95 hover:bg-white text-gray-800 backdrop-blur-sm border border-white/80 rounded-xl shadow-2xl transition-all text-sm font-semibold flex items-center gap-2 print:hidden group-hover:shadow-xl"
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
      )}
      
      {/* Always visible hint for image presence */}
      {hasImage && !isHovered && (
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
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
