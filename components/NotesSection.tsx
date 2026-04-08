'use client';

import React, { useEffect, useState } from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { formatNoteKey } from '@/lib/calendarUtils';

export function NotesSection() {
  const { state, dispatch } = useCalendar();
  const [localNote, setLocalNote] = useState('');

  const noteKey = state.selectedStart && state.selectedEnd 
    ? formatNoteKey(state.selectedStart, state.selectedEnd)
    : null;

  useEffect(() => {
    if (noteKey) {
      setLocalNote(state.notes[noteKey] || '');
    } else {
      setLocalNote('');
    }
  }, [noteKey, state.notes]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalNote(val);
    if (noteKey) {
      dispatch({ type: 'SET_NOTE', payload: { key: noteKey, note: val } });
    }
  };

  if (!noteKey) {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-xl text-gray-400 text-sm italic text-center">
        Select a date range to add notes.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Notes for selected range
      </label>
      <textarea
        value={localNote}
        onChange={handleChange}
        placeholder="Type your notes here..."
        className="w-full h-32 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none resize-none transition-shadow"
      />
    </div>
  );
}
