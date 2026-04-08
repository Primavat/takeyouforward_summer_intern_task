'use client';

import React from 'react';
import { CalendarProvider, useCalendar } from '@/context/CalendarContext';
import { HeroPanel } from '@/components/HeroPanel';
import { CalendarPanel } from '@/components/CalendarPanel';

function AppContent() {
  const { state } = useCalendar();

  return (
    <div 
      className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8"
      style={{ '--accent': state.accentColor } as React.CSSProperties}
    >
      <main className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:grid md:grid-cols-5 relative">
        <div className="md:col-span-2 relative">
          <HeroPanel />
        </div>
        
        {/* Spiral Binding SVG - visible on desktop to simulate a notebook */}
        <div aria-hidden="true" className="hidden md:flex absolute left-[40%] top-0 bottom-0 flex-col justify-between py-12 -translate-x-1/2 pointer-events-none z-20">
          {[...Array(12)].map((_, i) => (
            <svg key={i} width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
              <rect x="0" y="8" width="12" height="4" rx="2" fill="#d1d5db" />
              <rect x="28" y="8" width="12" height="4" rx="2" fill="#d1d5db" />
              <path d="M10 10 Q 20 -5 30 10" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M10 10 Q 20 25 30 10" stroke="#f3f4f6" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          ))}
        </div>

        <div className="md:col-span-3">
          <CalendarPanel />
        </div>
      </main>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <CalendarProvider>
      <AppContent />
    </CalendarProvider>
  );
}
