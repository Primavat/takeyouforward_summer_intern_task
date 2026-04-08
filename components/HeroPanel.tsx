'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useCalendar } from '@/context/CalendarContext';
import { ChevronDivider } from './ChevronDivider';
import { format } from 'date-fns';
import { useThemeExtract } from '@/hooks/useThemeExtract';

export function HeroPanel() {
  const { state, dispatch } = useCalendar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const extractTheme = useThemeExtract();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        dispatch({ type: 'SET_IMAGE', payload: result });
        extractTheme(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center p-8 text-white min-h-[200px] sm:min-h-[300px] md:min-h-full overflow-hidden shrink-0"
      style={{ backgroundColor: 'var(--accent)' }}
    >
      {state.heroImageUrl && (
        <Image
          src={state.heroImageUrl}
          alt="Hero Background"
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8+Q8AAh4BSvM5rC8AAAAASUVORK5CYII="
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
      
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold capitalize drop-shadow-md">
          {format(state.currentMonth, 'MMMM')}
        </h1>
        <p className="text-2xl mt-2 font-medium opacity-90 drop-shadow-sm">
          {format(state.currentMonth, 'yyyy')}
        </p>

        <button 
          onClick={() => fileInputRef.current?.click()}
          className="mt-6 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/50 rounded-lg shadow-lg transition-all text-sm print:hidden"
        >
          Upload Cover Image
        </button>
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      <ChevronDivider />
    </div>
  );
}
