export type CalendarState = {
  currentMonth: Date;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  hoverDate: Date | null;
  notes: Record<string, string>;
  heroImageUrl: string | null;
  accentColor: string;
};
