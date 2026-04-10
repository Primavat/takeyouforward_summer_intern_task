'use client';

import React, { useState } from 'react';
import { MonthHeader } from './MonthHeader';
import { MonthGrid } from './MonthGrid';
import { NotesSection } from './NotesSection';
import { useCalendar } from '@/context/CalendarContext';
import { formatNoteKey } from '@/lib/calendarUtils';
import { AnimatePresence } from 'framer-motion';
import { LiveThemeEffects } from './LiveThemeEffects';

export function CalendarPanel() {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const { state } = useCalendar();

  const isGlobal = !state.selectedSingle && !state.rangeStart && !state.rangeEnd;
  const noteKey = formatNoteKey(isGlobal, state.selectedSingle, state.rangeStart, state.rangeEnd);
    
  const hasNotes = noteKey !== 'global' 
    ? (state.notes[noteKey] && state.notes[noteKey].trim() !== '')
    : (state.notes['global'] && state.notes['global'].trim() !== '');

  // Determine button text context
  let buttonLabel = hasNotes ? "Edit Note" : "Add Note";
  if (isGlobal) {
    buttonLabel = hasNotes ? "Edit General Month Note" : "Add General Month Note";
  } else if (state.rangeStart && state.rangeEnd) {
    buttonLabel = `Edit Range Note`;
  } else if (state.selectedSingle) {
    buttonLabel = `Edit Day Note`;
  }
  
  if (!hasNotes) buttonLabel = buttonLabel.replace('Edit', 'Add');

  return (
    <div className="flex flex-col md:p-6 p-4 h-full relative transition-colors duration-500" style={{ backgroundColor: 'var(--theme-surface)', color: 'var(--theme-text)', overflow: 'hidden' }}>
      <MonthHeader />
      
      {/* Scrollable Container for grid & restricted overlay */}
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden min-h-[300px]">
        <LiveThemeEffects />
        <MonthGrid />
        
        <AnimatePresence>
          {isNotesOpen && <NotesSection onClose={() => setIsNotesOpen(false)} />}
        </AnimatePresence>
      </div>
      
      {/* Floating Action Area for Notes */}
      <div className="mt-4 mb-4 flex justify-center items-center shrink-0">
        <button
          onClick={() => setIsNotesOpen(true)}
          className="group px-6 py-3 rounded-full flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
          style={{ 
            backgroundColor: 'var(--theme-primary)', 
            color: 'var(--theme-surface)',
            boxShadow: '0 4px 15px -3px rgba(var(--theme-primary-rgb, 99, 102, 241), 0.4)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'brightness(1.1)';
            e.currentTarget.style.boxShadow = '0 8px 25px -5px rgba(var(--theme-primary-rgb, 99, 102, 241), 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'brightness(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px -3px rgba(var(--theme-primary-rgb, 99, 102, 241), 0.4)';
          }}
        >
          <svg className="transition-transform duration-200 group-hover:rotate-12" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
