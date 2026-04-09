export type CalendarState = {
  currentMonth: Date;
  selectedSingle: Date | null;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  notes: Record<string, string>;
  monthImages: Record<string, string>; // monthKey (YYYY-MM) -> imageUrl
  heroImageUrl: string | null; // fallback for backward compatibility
  accentColor: string;
};
