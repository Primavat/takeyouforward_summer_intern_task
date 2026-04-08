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
  // January - Minimal / Productivity
  0: { primary: '#60a5fa', background: '#f3f4f6', surface: '#ffffff', text: '#1f2937', textMuted: '#9ca3af', radius: '4px', shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' },
  // February - Romantic / Soft
  1: { primary: '#f43f5e', background: '#fff1f2', surface: '#ffffff', text: '#881337', textMuted: '#fda4af', radius: '24px', shadow: '0 10px 25px -3px rgba(244, 63, 94, 0.15)' },
  // March - Vibrant / Playful
  2: { primary: '#a855f7', background: '#faf5ff', surface: '#ffffff', text: '#581c87', textMuted: '#d8b4fe', radius: '16px', shadow: '0 8px 20px -3px rgba(168, 85, 247, 0.15)' },
  // April - Sunny / Bright
  3: { primary: '#eab308', background: '#fefce8', surface: '#ffffff', text: '#713f12', textMuted: '#fde047', radius: '12px', shadow: '0 10px 15px -3px rgba(234, 179, 8, 0.1)' },
  // May - Natural / Grounded
  4: { primary: '#22c55e', background: '#f0fdf4', surface: '#ffffff', text: '#14532d', textMuted: '#86efac', radius: '8px', shadow: '0 4px 6px -1px rgba(34, 197, 94, 0.1)' },
  // June - Freedom / Open
  5: { primary: '#06b6d4', background: '#ecfeff', surface: '#ffffff', text: '#164e63', textMuted: '#67e8f9', radius: '20px', shadow: '0 12px 20px -3px rgba(6, 182, 212, 0.12)' },
  // July - Energy / Festive
  6: { primary: '#ef4444', background: '#fef2f2', surface: '#ffffff', text: '#7f1d1d', textMuted: '#fca5a5', radius: '0px', shadow: '0 6px 12px -3px rgba(239, 68, 68, 0.2)' },
  // August - Reflection / Deep
  7: { primary: '#d97706', background: '#fffbeb', surface: '#ffffff', text: '#78350f', textMuted: '#fcd34d', radius: '12px', shadow: '0 4px 6px -1px rgba(217, 119, 6, 0.1)' },
  // September - Focus / Clean
  8: { primary: '#3b82f6', background: '#eff6ff', surface: '#ffffff', text: '#1e3a8a', textMuted: '#93c5fd', radius: '2px', shadow: '0 2px 4px -1px rgba(59, 130, 246, 0.1)' },
  // October - Mystery (Dark Theme)
  9: { primary: '#f97316', background: '#111827', surface: '#1f2937', text: '#f9fafb', textMuted: '#9ca3af', radius: '16px', shadow: '0 15px 30px -5px rgba(0, 0, 0, 0.5)' },
  // November - Cozy / Warm
  10: { primary: '#b45309', background: '#fef3c7', surface: '#fffbeb', text: '#78350f', textMuted: '#fcd34d', radius: '12px', shadow: '0 8px 15px -3px rgba(180, 83, 9, 0.15)' },
  // December - Celebration / Rich
  11: { primary: '#dc2626', background: '#fef2f2', surface: '#ffffff', text: '#7f1d1d', textMuted: '#fca5a5', radius: '20px', shadow: '0 12px 25px -5px rgba(220, 38, 38, 0.2)' },
};
