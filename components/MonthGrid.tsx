'use client';

import React from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { getDaysArray, isInRange, isWeekend, isSameDay } from '@/lib/calendarUtils';
import { isSameMonth } from 'date-fns';
import { DayCell } from './DayCell';
import { motion, AnimatePresence } from 'framer-motion';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function MonthGrid() {
  const { state, dispatch } = useCalendar();
  const days = getDaysArray(state.currentMonth);

  const handleDayClick = (day: Date) => {
    // Single click explicitly sets it as a SINGLE selection.
    dispatch({ type: 'SET_SINGLE', payload: day });
  };

  const handleDayDoubleClick = (day: Date) => {
    // Double click handles range selection
    if (!state.rangeStart || (state.rangeStart && state.rangeEnd)) {
      dispatch({ type: 'SET_RANGE_START', payload: day });
    } else {
      dispatch({ type: 'SET_RANGE_END', payload: day });
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
        dispatch({ type: 'CLEAR_SELECTION' });
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
            const isSelectedSingle = isSameDay(day, state.selectedSingle);
            const isRangeStart = isSameDay(day, state.rangeStart);
            const isRangeEnd = isSameDay(day, state.rangeEnd);
            
            let inRange = false;
            if (state.rangeStart && state.rangeEnd) {
               inRange = isInRange(day, state.rangeStart, state.rangeEnd);
            }

            return (
              <DayCell
                key={idx}
                day={day}
                isWeekend={isWeekend(day)}
                isOtherMonth={isOtherMonth}
                isToday={isSameDay(day, new Date())}
                isSelectedSingle={isSelectedSingle}
                isRangeStart={isRangeStart}
                isRangeEnd={isRangeEnd}
                isInRange={inRange}
                onClick={() => handleDayClick(day)}
                onDoubleClick={() => handleDayDoubleClick(day)}
                onKeyDown={(e) => handleKeyDown(e, day, idx)}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
