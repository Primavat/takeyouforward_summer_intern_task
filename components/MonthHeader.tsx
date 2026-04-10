'use client';

import React from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { format, addMonths, subMonths } from 'date-fns';

export function MonthHeader() {
  const { state, dispatch } = useCalendar();

  return (
    <div className="flex items-center justify-between px-4 py-3 transition-colors duration-500">
      <button 
        onClick={() => dispatch({ type: 'SET_MONTH', payload: subMonths(state.currentMonth, 1) })}
        className="group p-2.5 rounded-full transition-all duration-300 flex items-center justify-center w-11 h-11 hover:scale-110 hover:shadow-lg active:scale-95"
        style={{ 
          color: 'var(--theme-text-muted)',
          backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--theme-primary)';
          e.currentTarget.style.color = 'var(--theme-surface)';
          e.currentTarget.style.boxShadow = '0 4px 15px -3px rgba(var(--theme-primary-rgb, 99, 102, 241), 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--theme-text-muted)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        aria-label="Previous month"
      >
        <svg className="transition-transform duration-200 group-hover:-translate-x-0.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <h2 className="text-xl font-bold transition-all duration-500 tracking-tight hover:scale-105 cursor-default" style={{ color: 'var(--theme-text)' }}>
        {format(state.currentMonth, 'MMMM yyyy')}
      </h2>
      <button 
        onClick={() => dispatch({ type: 'SET_MONTH', payload: addMonths(state.currentMonth, 1) })}
        className="group p-2.5 rounded-full transition-all duration-300 flex items-center justify-center w-11 h-11 hover:scale-110 hover:shadow-lg active:scale-95"
        style={{ 
          color: 'var(--theme-text-muted)',
          backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--theme-primary)';
          e.currentTarget.style.color = 'var(--theme-surface)';
          e.currentTarget.style.boxShadow = '0 4px 15px -3px rgba(var(--theme-primary-rgb, 99, 102, 241), 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--theme-text-muted)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        aria-label="Next month"
      >
        <svg className="transition-transform duration-200 group-hover:translate-x-0.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  );
}
