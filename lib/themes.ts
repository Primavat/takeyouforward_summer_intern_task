export interface MonthTheme {
  primary: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  radius: string;
  shadow: string;
}

export const MONTH_THEMES: Record<number, MonthTheme> = {
  // January - Winter (Shishira)
  0: { primary: '#60a5fa', background: '#f3f4f6', surface: '#ffffff', text: '#1f2937', textMuted: '#9ca3af', radius: '0px', shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' },
  // February - Winter (Shishira)
  1: { primary: '#f43f5e', background: '#fff1f2', surface: '#ffffff', text: '#881337', textMuted: '#fda4af', radius: '0px', shadow: '0 10px 25px -3px rgba(244, 63, 94, 0.15)' },
  // March - Spring (Vasanta)
  2: { primary: '#a855f7', background: '#faf5ff', surface: '#ffffff', text: '#581c87', textMuted: '#d8b4fe', radius: '0px', shadow: '0 8px 20px -3px rgba(168, 85, 247, 0.15)' },
  // April - Spring (Vasanta)
  3: { primary: '#eab308', background: '#fefce8', surface: '#ffffff', text: '#713f12', textMuted: '#fde047', radius: '0px', shadow: '0 10px 15px -3px rgba(234, 179, 8, 0.1)' },
  // May - Summer (Grishma)
  4: { primary: '#22c55e', background: '#f0fdf4', surface: '#ffffff', text: '#14532d', textMuted: '#86efac', radius: '0px', shadow: '0 4px 6px -1px rgba(34, 197, 94, 0.1)' },
  // June - Summer (Grishma)
  5: { primary: '#06b6d4', background: '#ecfeff', surface: '#ffffff', text: '#164e63', textMuted: '#67e8f9', radius: '0px', shadow: '0 12px 20px -3px rgba(6, 182, 212, 0.12)' },
  // July - Monsoon (Varsha)
  6: { primary: '#ef4444', background: '#fef2f2', surface: '#ffffff', text: '#7f1d1d', textMuted: '#fca5a5', radius: '0px', shadow: '0 6px 12px -3px rgba(239, 68, 68, 0.2)' },
  // August - Monsoon (Varsha)
  7: { primary: '#d97706', background: '#fffbeb', surface: '#ffffff', text: '#78350f', textMuted: '#fcd34d', radius: '0px', shadow: '0 4px 6px -1px rgba(217, 119, 6, 0.1)' },
  // September - Autumn (Sharad) (Light Theme)
  8: { primary: '#ea580c', background: '#fffbeb', surface: '#ffffff', text: '#78350f', textMuted: '#fcd34d', radius: '0px', shadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
  // October - Autumn (Sharad) (Light Theme)
  9: { primary: '#d97706', background: '#fef3c7', surface: '#fffef0', text: '#78350f', textMuted: '#fbbf24', radius: '0px', shadow: '0 8px 15px -3px rgba(0,0,0,0.1)' },
  // November - Winter Heavy (Hemanta) (Old Sept Dark Tone)
  10: { primary: '#3b82f6', background: '#1e293b', surface: '#0f172a', text: '#f1f5f9', textMuted: '#94a3b8', radius: '0px', shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)' },
  // December - Winter Heavy (Hemanta) (Old Oct Dark Tone)
  11: { primary: '#f97316', background: '#111827', surface: '#1f2937', text: '#f9fafb', textMuted: '#9ca3af', radius: '0px', shadow: '0 15px 30px -5px rgba(0, 0, 0, 0.5)' },
};
