import React from 'react';
import { format } from 'date-fns';
import { holidays } from '@/data/holidays';

interface DayCellProps {
  day: Date;
  isWeekend: boolean;
  isOtherMonth: boolean;
  isToday: boolean;
  isSelectedSingle: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  onClick: () => void;
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
  const isSelected = isSelectedSingle || isRangeStart || isRangeEnd;
  const isStartAndEnd = isRangeStart && isRangeEnd;
  
  const dateKey = format(day, 'yyyy-MM-dd');
  const holidayName = holidays[dateKey];

  const baseClasses = "relative w-full aspect-square sm:h-12 sm:aspect-auto flex flex-col items-center justify-center text-xs sm:text-sm transition-colors cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent)]";
  
  let conditionalClasses = "";
  let textClasses = "text-gray-700";

  if (isOtherMonth) {
    textClasses = "text-gray-300";
    conditionalClasses = "bg-white hover:bg-gray-50";
  } else if (isStartAndEnd) {
    conditionalClasses = "bg-[var(--accent)] rounded-full text-white";
    textClasses = "text-white font-semibold";
  } else if (isRangeStart) {
    conditionalClasses = "bg-[var(--accent)] rounded-l-full text-white";
    textClasses = "text-white font-semibold flex-1 z-10 flex flex-col justify-center";
  } else if (isRangeEnd) {
    conditionalClasses = "bg-[var(--accent)] rounded-r-full text-white";
    textClasses = "text-white font-semibold flex-1 z-10 flex flex-col justify-center";
  } else if (isSelectedSingle) {
    conditionalClasses = "bg-[var(--accent)] rounded-full text-white";
    textClasses = "text-white font-semibold flex-1 z-10 flex flex-col justify-center";
  } else if (isInRange) {
    conditionalClasses = "bg-[var(--accent)] bg-opacity-20";
  } else {
    conditionalClasses = "bg-white hover:bg-gray-100 rounded-full";
    if (isWeekend) textClasses = "text-red-500 font-medium";
    if (isToday) textClasses += " !font-bold";
  }

  return (
    <div
      role="gridcell"
      aria-label={`${format(day, 'PP')}${holidayName ? `, Holiday: ${holidayName}` : ''}${isSelected ? ' (Selected)' : ''}`}
      title={holidayName || format(day, 'PPPP')}
      className={`${baseClasses} ${conditionalClasses}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      tabIndex={isOtherMonth ? -1 : 0}
      data-date={dateKey}
    >
      <span className={textClasses}>{format(day, 'd')}</span>
      
      {/* Range Labels UI Badge */}
      {(isRangeStart || isRangeEnd) && !isStartAndEnd && (
        <span className="text-[9px] leading-none absolute bottom-0.5 sm:bottom-1 font-medium opacity-80 pointer-events-none">
          {isRangeStart ? 'Start' : 'End'}
        </span>
      )}
      
      <div className={`absolute ${isRangeStart || isRangeEnd ? 'top-1' : 'bottom-1'} flex gap-1 pointer-events-none`}>
        {isToday && !isSelected && (
          <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
        )}
        {holidayName && !isSelected && (
          <span className="w-1 h-1 rounded-full bg-orange-400" />
        )}
      </div>
    </div>
  );
}
