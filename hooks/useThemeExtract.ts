'use client';

import { useCalendar } from '@/context/CalendarContext';

export function useThemeExtract() {
  const { dispatch } = useCalendar();

  const extractTheme = (imageUrl: string) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 10;
      canvas.height = 10;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0, 10, 10);
      const data = ctx.getImageData(0, 0, 10, 10).data;
      
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i+1];
        b += data[i+2];
      }
      
      const count = data.length / 4;
      const rgb = `rgb(${Math.round(r/count)}, ${Math.round(g/count)}, ${Math.round(b/count)})`;
      dispatch({ type: 'SET_ACCENT', payload: rgb });
    };
    img.src = imageUrl;
  };

  return extractTheme;
}
