# Interactive Wall Calendar

## Overview
A modern, interactive Next.js 14 wall calendar built with Tailwind CSS, `date-fns`, and Framer Motion. 

## Tech Decisions
- Next.js 14 App Router for modern architecture.
- Full client-side state (`useReducer`) for handling complex calendar logic.
- Framer Motion for elegant page-flip animations.

## How to Run Locally
1. `npm install`
2. `npm run dev`
3. Visit `http://localhost:3000`

## Creative Extras
- **Holiday Indicators:** Built-in tooltips and orange dots for major holidays.
- **Dynamic Theming:** Upload a cover image and the calendar will auto-extract a matching accent color.
- **Print Styles:** Hidden UI elements like upload buttons for perfect physical printing.
- **Page Flip Animation:** A 3D flip effect between month changes.

## Known Limitations
- Notes auto-saving scales okay locally, but requires server synchronization for larger setups.
- Image extraction checks cross-origin images, which may fail if user uploads remote images that don't allow CORS.
