'use client';

import React, { createContext, useContext, useReducer, ReactNode, Dispatch, useEffect, useRef } from 'react';
import { CalendarState } from '@/types/calendar';
import { parseISO } from 'date-fns';

type Action =
  | { type: 'SET_MONTH'; payload: Date }
  | { type: 'SET_START'; payload: Date | null }
  | { type: 'SET_END'; payload: Date | null }
  | { type: 'SET_HOVER'; payload: Date | null }
  | { type: 'SET_NOTE'; payload: { key: string; note: string } }
  | { type: 'SET_IMAGE'; payload: string | null }
  | { type: 'SET_ACCENT'; payload: string }
  | { type: 'HYDRATE'; payload: CalendarState };

const initialState: CalendarState = {
  currentMonth: new Date(),
  selectedStart: null,
  selectedEnd: null,
  hoverDate: null,
  notes: {},
  heroImageUrl: null,
  accentColor: '#3b82f6', // Default blue-500
};

function calendarReducer(state: CalendarState, action: Action): CalendarState {
  switch (action.type) {
    case 'SET_MONTH':
      return { ...state, currentMonth: action.payload };
    case 'SET_START':
      return { ...state, selectedStart: action.payload };
    case 'SET_END':
      return { ...state, selectedEnd: action.payload };
    case 'SET_HOVER':
      return { ...state, hoverDate: action.payload };
    case 'SET_NOTE':
      return { ...state, notes: { ...state.notes, [action.payload.key]: action.payload.note } };
    case 'SET_IMAGE':
      return { ...state, heroImageUrl: action.payload };
    case 'SET_ACCENT':
      return { ...state, accentColor: action.payload };
    case 'HYDRATE':
      return { ...action.payload };
    default:
      return state;
  }
}

const CalendarContext = createContext<{
  state: CalendarState;
  dispatch: Dispatch<Action>;
} | undefined>(undefined);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  const isHydrated = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('calendar_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({
          type: 'HYDRATE',
          payload: {
            currentMonth: parsed.currentMonth ? new Date(parsed.currentMonth) : new Date(),
            selectedStart: parsed.selectedStart ? new Date(parsed.selectedStart) : null,
            selectedEnd: parsed.selectedEnd ? new Date(parsed.selectedEnd) : null,
            hoverDate: null, // Don't persist hover
            notes: parsed.notes || {},
            heroImageUrl: parsed.heroImageUrl || null,
            accentColor: parsed.accentColor || '#3b82f6',
          }
        });
      }
    } catch (e) {
      console.error('Failed to parse calendar state', e);
    }
    isHydrated.current = true;
  }, []);

  useEffect(() => {
    if (!isHydrated.current) return;
    
    const t = setTimeout(() => {
      localStorage.setItem('calendar_state', JSON.stringify({
        ...state,
        hoverDate: null // Don't persist hover
      }));
    }, 500);

    return () => clearTimeout(t);
  }, [state]);

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}
