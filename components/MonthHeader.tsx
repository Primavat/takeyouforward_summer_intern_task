'use client';

import React from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { format, addMonths, subMonths } from 'date-fns';

export function MonthHeader() {
  const { state, dispatch } = useCalendar();

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <button 
        onClick={() => dispatch({ type: 'SET_MONTH', payload: subMonths(state.currentMonth, 1) })}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center w-10 h-10"
        aria-label="Previous month"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <h2 className="text-xl font-bold text-gray-800">
        {format(state.currentMonth, 'MMMM yyyy')}
      </h2>
      <button 
        onClick={() => dispatch({ type: 'SET_MONTH', payload: addMonths(state.currentMonth, 1) })}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center w-10 h-10"
        aria-label="Next month"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  );
}
