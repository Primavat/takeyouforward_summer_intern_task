'use client';

import React from 'react';
import { MonthHeader } from './MonthHeader';
import { MonthGrid } from './MonthGrid';
import { NotesSection } from './NotesSection';

export function CalendarPanel() {
  return (
    <div className="flex flex-col p-6 md:p-10 bg-white h-full overflow-y-auto">
      <MonthHeader />
      <MonthGrid />
      <NotesSection />
    </div>
  );
}
