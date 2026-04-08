import React from 'react';
import { format } from 'date-fns';
import { holidays } from '@/data/holidays';

interface DayCellProps {
  day: Date;
  isWeekend: boolean;
  isOtherMonth: boolean;
  isToday: boolean;
  isSelectedStart: boolean;
  isSelectedEnd: boolean;
  isInRange: boolean;
  isHoverPreview: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function DayCell({
  day,
  isWeekend,
  isOtherMonth,
  isToday,
  isSelectedStart,
  isSelectedEnd,
  isInRange,
  isHoverPreview,
  onClick,
  onMouseEnter,
  onTouchStart,
  onTouchEnd,
  onKeyDown
}: DayCellProps) {
  const isSelected = isSelectedStart || isSelectedEnd;
  const isStartAndEnd = isSelectedStart && isSelectedEnd;
  
  const dateKey = format(day, 'yyyy-MM-dd');
  const holidayName = holidays[dateKey];

  const baseClasses = "relative w-full h-12 flex items-center justify-center text-sm transition-colors cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent)]";
  
  let conditionalClasses = "";
  let textClasses = "text-gray-700";

  if (isOtherMonth) {
    textClasses = "text-gray-300";
    conditionalClasses = "bg-white hover:bg-gray-50";
  } else if (isStartAndEnd) {
    conditionalClasses = "bg-[var(--accent)] rounded-full";
    textClasses = "text-white font-semibold";
  } else if (isSelectedStart) {
    conditionalClasses = "bg-[var(--accent)] rounded-l-full";
    textClasses = "text-white font-semibold flex-1 z-10";
  } else if (isSelectedEnd) {
    conditionalClasses = "bg-[var(--accent)] rounded-r-full";
    textClasses = "text-white font-semibold flex-1 z-10";
  } else if (isInRange) {
    conditionalClasses = "bg-[var(--accent)] bg-opacity-20";
    if (isHoverPreview && !isSelectedStart) conditionalClasses += " hover:bg-opacity-30";
  } else if (isHoverPreview) {
    conditionalClasses = "bg-[var(--accent)] bg-opacity-10 rounded-full";
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
      onMouseEnter={onMouseEnter}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
      tabIndex={isOtherMonth ? -1 : 0}
      data-date={dateKey}
    >
      <span className={textClasses}>{format(day, 'd')}</span>
      <div className="absolute bottom-1 flex gap-1">
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
