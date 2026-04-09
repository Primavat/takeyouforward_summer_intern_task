// Holiday data structure for the calendar
// Format: month (0-indexed), day, name, type

export interface Holiday {
  month: number; // 0-11 (Jan-Dec)
  day: number;
  name: string;
  type: 'global' | 'india' | 'cultural';
}

// Fixed-date holidays
export const FIXED_HOLIDAYS: Holiday[] = [
  // January
  { month: 0, day: 1, name: "New Year's Day", type: 'global' },
  { month: 0, day: 14, name: 'Makar Sankranti', type: 'india' },
  { month: 0, day: 15, name: 'Pongal', type: 'india' },
  { month: 0, day: 26, name: 'Republic Day', type: 'india' },
  
  // February
  { month: 1, day: 14, name: "Valentine's Day", type: 'cultural' },
  { month: 1, day: 23, name: 'Maha Shivaratri', type: 'india' },
  
  // March
  { month: 2, day: 8, name: "International Women's Day", type: 'global' },
  { month: 2, day: 25, name: 'Holi', type: 'india' },
  
  // April
  { month: 3, day: 17, name: 'Ram Navami', type: 'india' },
  { month: 3, day: 18, name: 'Good Friday', type: 'global' },
  { month: 3, day: 20, name: 'Easter', type: 'global' },
  { month: 3, day: 13, name: 'Baisakhi', type: 'india' },
  
  // May
  { month: 4, day: 1, name: 'Labour Day', type: 'global' },
  { month: 4, day: 10, name: 'Eid al-Fitr', type: 'india' },
  { month: 4, day: 23, name: 'Buddha Purnima', type: 'india' },
  
  // June
  { month: 5, day: 16, name: 'Eid al-Adha', type: 'india' },
  { month: 5, day: 16, name: "Father's Day", type: 'cultural' },
  
  // August
  { month: 7, day: 15, name: 'Independence Day', type: 'india' },
  { month: 7, day: 19, name: 'Raksha Bandhan', type: 'india' },
  { month: 7, day: 26, name: 'Janmashtami', type: 'india' },
  
  // September
  { month: 8, day: 5, name: "Teachers' Day", type: 'india' },
  { month: 8, day: 7, name: 'Ganesh Chaturthi', type: 'india' },
  
  // October
  { month: 9, day: 2, name: 'Gandhi Jayanti', type: 'india' },
  { month: 9, day: 3, name: 'Navratri', type: 'india' },
  { month: 9, day: 12, name: 'Dussehra', type: 'india' },
  
  // November
  { month: 10, day: 1, name: 'Diwali', type: 'india' },
  { month: 10, day: 14, name: "Children's Day", type: 'india' },
  { month: 10, day: 28, name: 'Thanksgiving', type: 'global' },
  
  // December
  { month: 11, day: 25, name: 'Christmas', type: 'global' },
  { month: 11, day: 31, name: "New Year's Eve", type: 'cultural' },
];

// Get holiday for a specific date
export function getHoliday(date: Date): Holiday | undefined {
  const month = date.getMonth();
  const day = date.getDate();
  return FIXED_HOLIDAYS.find((h) => h.month === month && h.day === day);
}

// Check if date is a holiday
export function isHoliday(date: Date): boolean {
  return !!getHoliday(date);
}

// Check if date is a holiday on a weekday (Mon-Fri)
export function isHolidayOnWeekday(date: Date): boolean {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return false;
  return isHoliday(date);
}

// Get holiday info for display
export function getHolidayInfo(date: Date): { 
  isHoliday: boolean; 
  name?: string; 
  isWeekdayHoliday: boolean;
  type?: 'global' | 'india' | 'cultural';
} {
  const holiday = getHoliday(date);
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  return {
    isHoliday: !!holiday,
    name: holiday?.name,
    isWeekdayHoliday: !!holiday && !isWeekend,
    type: holiday?.type
  };
}

// Check if should show holiday indicator (only on weekdays)
export function shouldShowHolidayIndicator(date: Date): boolean {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return false;
  return isHoliday(date);
}

// Get holiday tooltip content
export function getHolidayTooltipContent(date: Date): string | null {
  const holiday = getHoliday(date);
  return holiday?.name ?? null;
}

// Weekend check functions
export function isSaturday(date: Date): boolean {
  return date.getDay() === 6;
}

export function isSunday(date: Date): boolean {
  return date.getDay() === 0;
}

export function isWeekendDay(date: Date): boolean {
  return isSaturday(date) || isSunday(date);
}

// Holiday display constants
export const HOLIDAY_INDICATOR_COLOR = '#f59e0b'; // amber-500

export const HOLIDAY_TYPE_COLORS = {
  global: '#3b82f6',    // blue-500
  india: '#f59e0b',     // amber-500
  cultural: '#ec4899',   // pink-500
};

// Default export
export default FIXED_HOLIDAYS;
