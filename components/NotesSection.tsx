'use client';

import React, { useEffect, useState } from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { formatNoteKey } from '@/lib/calendarUtils';
import { motion } from 'framer-motion';

interface NotesSectionProps {
  onClose: () => void;
}

export function NotesSection({ onClose }: NotesSectionProps) {
  const { state, dispatch } = useCalendar();
  const [localNote, setLocalNote] = useState('');

  const isGlobal = !state.selectedSingle && !state.rangeStart && !state.rangeEnd;
  const noteKey = formatNoteKey(isGlobal, state.selectedSingle, state.rangeStart, state.rangeEnd);

  useEffect(() => {
    if (noteKey) {
      setLocalNote(state.notes[noteKey] || '');
    } else {
      setLocalNote('');
    }
  }, [noteKey, state.notes]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNote(e.target.value);
  };

  const handleSave = () => {
    if (noteKey) {
      dispatch({ type: 'SET_NOTE', payload: { key: noteKey, note: localNote } });
    }
    onClose();
  };

  const handleDownload = () => {
    if (!noteKey) return;
    const blob = new Blob([localNote], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calendar_notes_${noteKey}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!noteKey) return null;

  let title = "General Month Note";
  if (!isGlobal) {
    if (state.rangeStart && state.rangeEnd) {
      title = "Note for Date Range";
    } else if (state.selectedSingle) {
      title = "Note for Selected Day";
    }
  }

  return (
    <>
      {/* Blurred Sub-overlay strictly covering dates */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-40 bg-white/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Side sliding panel */}
      <motion.div 
        initial={{ x: '100%', opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-0 right-0 bottom-0 w-full sm:w-2/3 md:w-1/2 z-50 shadow-[-10px_0_30px_-10px_rgba(0,0,0,0.1)] border-l border-b border-black/5 flex flex-col overflow-hidden"
        style={{ backgroundColor: 'var(--theme-surface)', color: 'var(--theme-text)', borderBottomRightRadius: 'var(--theme-radius)' }}
      >
        <div className="flex items-center justify-between p-4 border-b border-black/5 bg-black/5">
          <h3 className="text-base sm:text-lg font-semibold truncate pr-2" style={{ color: 'var(--theme-text)' }}>
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="p-1.5 shrink-0 rounded-[var(--theme-radius)] hover:bg-black/10 transition"
            aria-label="Close notes"
            style={{ color: 'var(--theme-text-muted)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <textarea
            value={localNote}
            onChange={handleChange}
            placeholder="Type your observations or tasks here..."
            className="w-full h-full min-h-[200px] p-4 text-sm sm:text-base border border-black/10 focus:ring-2 focus:border-transparent outline-none resize-none transition-shadow"
            style={{ 
              backgroundColor: 'var(--theme-surface)', 
              color: 'var(--theme-text)', 
              borderRadius: 'var(--theme-radius)',
              '--tw-ring-color': 'var(--theme-primary)'
            } as React.CSSProperties}
          />
        </div>

        <div className="p-4 border-t border-black/5 flex justify-end gap-3 items-center flex-wrap shrink-0 bg-black/5">
          <button
            onClick={handleDownload}
            disabled={!localNote.trim()}
            className="px-4 py-2.5 flex items-center gap-2 text-sm font-medium border border-black/10 hover:bg-black/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            style={{ backgroundColor: 'var(--theme-surface)', color: 'var(--theme-text)', borderRadius: 'var(--theme-radius)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download
          </button>
          
          <button
            onClick={handleSave}
            className="px-6 py-2.5 flex items-center gap-2 text-sm font-semibold transition-all hover:brightness-110 active:scale-[0.98] shadow-sm"
            style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-surface)', borderRadius: 'var(--theme-radius)' }}
          >
            Save Note
          </button>
        </div>
      </motion.div>
    </>
  );
}
