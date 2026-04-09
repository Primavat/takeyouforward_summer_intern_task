import React, { useState } from 'react';
import { format } from 'date-fns';
import { getHolidayInfo, shouldShowHolidayIndicator, HOLIDAY_INDICATOR_COLOR } from '@/lib/holidays';

interface DayCellProps {
  day: Date;
  isWeekend: boolean;
  isOtherMonth: boolean;
  isToday: boolean;
  isSelectedSingle: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  onClick: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function DayCell({
  day,
  isWeekend,
  isOtherMonth,
  isToday,
  isSelectedSingle,
  isRangeStart,
  isRangeEnd,
  isInRange,
  onClick,
  onDoubleClick,
  onKeyDown
}: DayCellProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const isSelected = isSelectedSingle || isRangeStart || isRangeEnd;
  const isStartAndEnd = isRangeStart && isRangeEnd;
  
  // Get holiday information
  const holidayInfo = getHolidayInfo(day);
  const holidayName = holidayInfo.name;
  const isWeekdayHoliday = holidayInfo.isWeekdayHoliday;
  const shouldHighlight = shouldShowHolidayIndicator(day);

  const baseClasses = "relative w-full aspect-square sm:h-12 sm:aspect-auto flex flex-col items-center justify-center text-xs sm:text-sm transition-colors cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--theme-primary)]";
  
  let conditionalClasses = "";
  let textClasses = "text-[var(--theme-text)]";

  if (isOtherMonth) {
    textClasses = "text-[var(--theme-text-muted)] opacity-70";
    conditionalClasses = "hover:bg-black/5";
  } else if (isStartAndEnd) {
    conditionalClasses = "bg-[var(--theme-primary)] rounded-[var(--theme-radius)] text-white shadow-md";
    textClasses = "text-white font-semibold";
  } else if (isRangeStart) {
    conditionalClasses = "bg-[var(--theme-primary)] rounded-l-[var(--theme-radius)] text-white shadow-md";
    textClasses = "text-white font-semibold flex-1 z-10 flex flex-col justify-center";
  } else if (isRangeEnd) {
    conditionalClasses = "bg-[var(--theme-primary)] rounded-r-[var(--theme-radius)] text-white shadow-md";
    textClasses = "text-white font-semibold flex-1 z-10 flex flex-col justify-center";
  } else if (isSelectedSingle) {
    conditionalClasses = "bg-[var(--theme-primary)] rounded-[var(--theme-radius)] text-white shadow-md";
    textClasses = "text-white font-semibold flex-1 z-10 flex flex-col justify-center";
  } else if (isInRange) {
    conditionalClasses = "bg-[var(--theme-primary)] opacity-20";
  } else {
    conditionalClasses = "hover:bg-black/5 rounded-[var(--theme-radius)]";
    if (isWeekend) textClasses = "text-red-500 font-medium";
    if (isToday) textClasses += " !font-bold";
    // Add subtle background tint for weekday holidays
    if (shouldHighlight) {
      conditionalClasses += " bg-amber-500/10";
    }
  }

  return (
    <div
      role="gridcell"
      aria-label={`${format(day, 'PP')}${holidayName ? `, Holiday: ${holidayName}` : ''}${isSelected ? ' (Selected)' : ''}`}
      className={`${baseClasses} ${conditionalClasses}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      tabIndex={isOtherMonth ? -1 : 0}
      data-date={format(day, 'yyyy-MM-dd')}
    >
      {/* Holiday Tooltip */}
      {showTooltip && holidayName && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-50 px-2 py-1 bg-gray-800 text-white text-[10px] rounded whitespace-nowrap shadow-lg pointer-events-none animate-fade-in">
          {holidayName}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}
      
      <span className={textClasses}>{format(day, 'd')}</span>
      
      {/* Range Labels UI Badge */}
      {(isRangeStart || isRangeEnd) && !isStartAndEnd && (
        <span className="text-[9px] leading-none absolute bottom-0.5 sm:bottom-1 font-medium opacity-80 pointer-events-none">
          {isRangeStart ? 'Start' : 'End'}
        </span>
      )}
      
      {/* Indicator dots */}
      <div className={`absolute ${isRangeStart || isRangeEnd ? 'top-1' : 'bottom-1'} flex gap-1 pointer-events-none`}>
        {/* Today indicator */}
        {isToday && !isSelected && (
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--theme-primary)' }} />
        )}
        
        {/* Holiday indicator - only for weekday holidays */}
        {isWeekdayHoliday && !isSelected && (
          <span 
            className="w-1.5 h-1.5 rounded-full animate-pulse-subtle"
            style={{ backgroundColor: HOLIDAY_INDICATOR_COLOR }}
          />
        )}
      </div>
      
      {/* Holiday border accent for weekday holidays */}
      {isWeekdayHoliday && !isSelected && (
        <div 
          className="absolute inset-x-1 bottom-0 h-0.5 rounded-full opacity-60"
          style={{ backgroundColor: HOLIDAY_INDICATOR_COLOR }}
        />
      )}
    </div>
  );
}
