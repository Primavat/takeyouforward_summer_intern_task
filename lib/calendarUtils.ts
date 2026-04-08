// lib/calendarUtils.ts
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay as dateFnsIsSameDay,
  isWeekend as dateFnsIsWeekend,
  isWithinInterval,
  isBefore,
  format,
  addDays
} from 'date-fns';

/**
 * Returns an array of dates to render the calendar grid.
 * It includes days from the previous and next month to fill a complete 7-day grid.
 * @param {Date} currentMonth - The month currently in view.
 * @returns {Date[]} Array of Date objects for the grid.
 */
export function getDaysArray(currentMonth: Date): Date[] {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  while (days.length < 42) {
    const lastDay = days[days.length - 1];
    days.push(addDays(lastDay, 1));
  }

  return days;
}

/**
 * Checks if a given date is within the selected range block.
 * @param {Date} date - The date to check.
 * @param {Date | null} start - Range start date.
 * @param {Date | null} end - Range end date.
 * @returns {boolean} True if within range, false otherwise.
 */
export function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const startToUse = isBefore(end, start) ? end : start;
  const endToUse = isBefore(end, start) ? start : end;
  return isWithinInterval(date, { start: startToUse, end: endToUse });
}

/**
 * Checks if a given date falls on a weekend.
 * @param {Date} date - The date to check.
 * @returns {boolean} True if weekend, false otherwise.
 */
export function isWeekend(date: Date): boolean {
  return dateFnsIsWeekend(date);
}

/**
 * Checks if two dates refer to the exact same calendar day.
 * @param {Date} dateLeft - First date.
 * @param {Date | null} dateRight - Second date (can be null).
 * @returns {boolean} True if they refer to the same day, false otherwise.
 */
export function isSameDay(dateLeft: Date, dateRight: Date | null): boolean {
  if (!dateRight) return false;
  return dateFnsIsSameDay(dateLeft, dateRight);
}

/**
 * Generates a unique string key based on a selected start and end date for indexing notes.
 * @param {Date | null} start - Range start date.
 * @param {Date | null} end - Range end date.
 * @returns {string} The storage key (e.g. "2024-01-01_2024-01-05").
 */
export function formatNoteKey(isGlobal: boolean, single: Date | null, start: Date | null, end: Date | null): string {
  if (isGlobal || (!single && !start && !end)) return 'global';
  if (single) return `single_${format(single, 'yyyy-MM-dd')}`;
  
  const startToUse = (start && end && isBefore(end, start)) ? end : start;
  const endToUse = (start && end && isBefore(end, start)) ? start : end;
  
  if (startToUse && endToUse) {
    return `range_${format(startToUse, 'yyyy-MM-dd')}_${format(endToUse, 'yyyy-MM-dd')}`;
  } else if (startToUse) {
    return `range_${format(startToUse, 'yyyy-MM-dd')}_pending`;
  }
  return 'global';
}
