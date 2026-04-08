export type CalendarState = {
  currentMonth: Date;
  selectedSingle: Date | null;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  notes: Record<string, string>;
  heroImageUrl: string | null;
  accentColor: string;
};
