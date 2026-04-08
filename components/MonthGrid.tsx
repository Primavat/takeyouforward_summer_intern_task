'use client';
import React from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { getDaysArray, isInRange, isWeekend, isSameDay } from '@/lib/calendarUtils';
import { isSameMonth, isBefore, isToday } from 'date-fns';
import { DayCell } from './DayCell';
import { motion, AnimatePresence } from 'framer-motion';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function MonthGrid() {
  const { state, dispatch } = useCalendar();
  const days = getDaysArray(state.currentMonth);

  const handleDayClick = (day: Date) => {
    if (!state.selectedStart || (state.selectedStart && state.selectedEnd)) {
      dispatch({ type: 'SET_START', payload: day });
      dispatch({ type: 'SET_END', payload: null });
    } else {
      if (isBefore(day, state.selectedStart)) {
        dispatch({ type: 'SET_END', payload: state.selectedStart });
        dispatch({ type: 'SET_START', payload: day });
      } else {
        dispatch({ type: 'SET_END', payload: day });
      }
    }
  };

  const handleDayHover = (day: Date) => {
    if (state.selectedStart && !state.selectedEnd) {
      dispatch({ type: 'SET_HOVER', payload: day });
    } else if (state.hoverDate !== null) {
      dispatch({ type: 'SET_HOVER', payload: null });
    }
  };

  const handleTouchStart = (day: Date) => {
    if (state.selectedStart && !state.selectedEnd) {
      dispatch({ type: 'SET_HOVER', payload: day });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, day: Date, index: number) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleDayClick(day);
        break;
      case 'Escape':
        dispatch({ type: 'SET_START', payload: null });
        dispatch({ type: 'SET_END', payload: null });
        dispatch({ type: 'SET_HOVER', payload: null });
        break;
      case 'ArrowRight':
        e.preventDefault();
        focusCell(index + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        focusCell(index - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        focusCell(index + 7);
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusCell(index - 7);
        break;
    }
  };

  const focusCell = (index: number) => {
    const cells = document.querySelectorAll('[role="gridcell"]');
    if (cells[index]) {
      (cells[index] as HTMLElement).focus();
    }
  };

  return (
    <div className="w-full select-none mt-4 overflow-hidden" style={{ perspective: '800px' }}>
      <div className="grid grid-cols-7 mb-2">
        {DAYS_OF_WEEK.map((dayName) => (
          <div key={dayName} className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider" aria-hidden="true">
            {dayName}
          </div>
        ))}
      </div>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div 
          key={state.currentMonth.toISOString()}
          role="grid" 
          className="grid grid-cols-7 gap-y-1"
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {days.map((day, idx) => {
          const isOtherMonth = !isSameMonth(day, state.currentMonth);
          const isSelectedStart = isSameDay(day, state.selectedStart);
          const isSelectedEnd = isSameDay(day, state.selectedEnd);
          
          let inRange = false;
          let isHoverPreview = false;
          
          if (state.selectedStart && state.selectedEnd) {
             inRange = isInRange(day, state.selectedStart, state.selectedEnd);
          } else if (state.selectedStart && state.hoverDate) {
             isHoverPreview = isInRange(day, state.selectedStart, state.hoverDate);
          }

          return (
            <DayCell
              key={idx}
              day={day}
              isWeekend={isWeekend(day)}
              isOtherMonth={isOtherMonth}
              isToday={isToday(day)}
              isSelectedStart={isSelectedStart}
              isSelectedEnd={isSelectedEnd}
              isInRange={inRange}
              isHoverPreview={isHoverPreview}
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => handleDayHover(day)}
              onTouchStart={() => handleTouchStart(day)}
              onTouchEnd={() => {}}
              onKeyDown={(e) => handleKeyDown(e, day, idx)}
            />
          );
        })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
