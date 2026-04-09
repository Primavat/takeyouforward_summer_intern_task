# Interactive Wall Calendar — Summer Intern Task

## Project Overview

This is a **modern, visually dynamic wall calendar application** built with React and Next.js. It combines functional calendar features with immersive seasonal aesthetics, creating an engaging user experience that goes beyond traditional calendar apps.

### Purpose
The application serves as an **interactive, visually appealing calendar** that:
- Provides intuitive date navigation and selection
- Adapts its visual identity to match the current season
- Allows personalized image customization per month
- Delights users with subtle background animations

### Key Highlights
- **Seasonal Visual System**: Dynamic themes and animations that change with each season
- **Independent Month Images**: Each month can have its own cover image (user-uploaded or hardcoded)
- **Color-Coded Day Grid**: Vibrant, month-specific color themes for the functional calendar grid
- **Holiday Integration**: Visual indicators for major holidays and festivals
- **Smooth UI/UX**: Polished transitions, hover effects, and responsive design

---

## Features (Comprehensive)

### 1. Calendar Navigation
**What it does:**
- Navigate between months using intuitive previous/next arrow buttons
- Smooth 3D page-flip animation when changing months
- Displays current month and year prominently

**Why implemented:**
- Provides familiar calendar navigation patterns
- The flip animation adds a tactile, premium feel to the experience

### 2. Day Grid with Color Themes (Right Section)
**What it does:**
- Functional 7-column grid showing all days of the month
- Each month has a **distinctive color palette** applied to the grid:
  - Background colors
  - Primary accent colors
  - Text colors
  - Hover states
- Visual indicators for:
  - Selected dates
  - Date ranges (start/end)
  - Today's date
  - Weekends
  - Holidays

**Why implemented:**
- Creates visual distinction between months
- Enhances seasonal connection (warm colors for summer, cool for winter)
- Makes the calendar feel alive and dynamic

### 3. Month Cover Panel (Left Section)
**What it does:**
- Large hero panel displaying the current month
- Can display:
  - **Hardcoded images** (for year 2026)
  - **User-uploaded images** (independent per month)
  - **Gradient fallback** (when no image exists)
- Month and year displayed in top-right corner
- Upload/Change Image button (context-aware)

**Why implemented:**
- Creates a "magazine cover" aesthetic
- Personalization through custom images
- Visual separation between decorative (left) and functional (right) sections

### 4. Hardcoded Images for 2026
**What it does:**
- Predefined images automatically display for each month **only in year 2026**
- Priority system:
  1. Hardcoded 2026 images (if year === 2026)
  2. User-uploaded images (fallback)
  3. Default gradient (no image)
- "2026 Collection" badge appears for hardcoded images

**Why implemented:**
- Demonstrates year-specific customization capability
- Provides polished default imagery for demo purposes
- Shows conditional rendering based on year state

### 5. Independent Image Upload Per Month
**What it does:**
- Users can upload a unique cover image for each month
- Images persist via localStorage
- Each month maintains its own image state
- No shared state across months

**Why implemented:**
- Full personalization for users
- Demonstrates complex state management
- Creates emotional connection to the calendar

### 6. Improved "Change Image" Button
**What it does:**
- **Positioned at top-left** of cover panel (not center)
- **Only appears on hover** for user-uploaded images
- **White background with shadow** for high contrast
- **Upload icon + text** for clarity
- **"2026 Collection" badge** shown instead for hardcoded images

**Why implemented:**
- Non-intrusive design that doesn't block the image
- High visibility when needed, invisible when not
- Clear distinction between user and system images

### 7. Holiday Indicators
**What it does:**
- Detects holidays (global and Indian festivals)
- Shows **amber dot indicator** on weekday holidays
- **Bottom border accent** on holiday dates
- **Hover tooltip** displaying holiday name
- Weekends with holidays don't get redundant indicators

**Why implemented:**
- Practical utility for users
- Maintains minimal, non-cluttered design
- Respects weekend/holiday distinction logic

### 8. Print Styles
**What it does:**
- Upload/Change buttons hidden when printing
- Clean, professional print output
- All decorative elements optimized for physical printing

**Why implemented:**
- Many users want physical calendar copies
- Ensures buttons don't appear on printed pages

---

## Seasonal Theme System

The application features a **six-season visual system** that automatically adapts background animations, colors, and mood based on the current month.

### Season Mapping

| Months | Season (Indian) | Visual Effect | Description |
|--------|-----------------|---------------|-------------|
| **January–February** | Shishira (Winter) | Frost particles, cool blue tones | Gentle frost particles drift downward with subtle sparkle |
| **March–April** | Vasanta (Spring) | Blooming flowers | Flowers bloom sequentially across the screen |
| **May–June** | Grishma (Summer) | Warm gradient, subtle glow | Warm color palette with sun-inspired tones |
| **July–August** | Varsha (Monsoon) | Rain drops | Animated rain falling across the screen |
| **September–October** | Sharad (Autumn) | Falling leaves | Leaves drift down with natural rotation |
| **November–December** | Hemanta (Winter/Festive) | Snowfall | Snowflakes fall with gentle rotation |

### Implementation Details
- Effects are rendered using **CSS animations** and **Canvas-free DOM elements**
- Uses **stable seeded randomization** for consistent element positioning across renders
- **Minimal and non-intrusive** — effects stay in the background
- **Performance optimized** with `will-change` and `transform` properties
- **Pointer-events disabled** — effects don't interfere with user interactions

### User Experience Benefit
- Creates immediate emotional connection to the time of year
- Adds "delight" factor without distracting from functionality
- Demonstrates attention to detail and polish

---

## Design Architecture & Implementation

### Panel Separation Philosophy

The calendar uses a **clear visual separation** between two distinct zones:

```
┌─────────────────────────────────────────────────────────────┐
│  LEFT PANEL (2/5 width)      │  RIGHT PANEL (3/5 width)     │
│  ─────────────────────────   │  ───────────────────────────   │
│  • Image-based               │  • Functional day grid         │
│  • Decorative hero section     │  • Color themes per month      │
│  • Month/Year display         │  • Date selection & notes      │
│  • Upload/Change controls     │  • Holiday indicators          │
│                              │                                │
│  NO theme colors here         │  Theme colors applied here      │
│  (neutral or image-driven)   │  (vibrant seasonal palettes)    │
└─────────────────────────────────────────────────────────────┘
```

### Technical Implementation

#### State Management Structure
```typescript
// Per-month image storage
monthImages: Record<string, string>  // "2024-01" -> "data:image/jpeg;base64,..."

// Year detection for 2026 hardcoded images
if (year === 2026 && IMAGES_2026[month]) {
  return IMAGES_2026[month];  // Hardcoded path
}
```

#### Theme Application Strategy
- **CSS Custom Properties** (`--theme-primary`, `--theme-surface`, etc.) are applied **only** to the CalendarPanel (right section)
- **Left panel** remains neutral (`bg-gray-800` with image or `bg-gradient` fallback)
- **No theme variables** leak into the HeroPanel styling

#### Conditional Rendering Logic
```typescript
// Image display priority
const displayImage = useMemo(() => {
  // Priority 1: Hardcoded 2026 images
  if (year === 2026 && IMAGES_2026[month]) return IMAGES_2026[month];
  
  // Priority 2: User-uploaded image
  if (userUploadedImage) return userUploadedImage;
  
  // Priority 3: No image (default gradient)
  return null;
}, [state.currentMonth, userUploadedImage]);
```

---

## Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Git** for cloning

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Primavat/takeyouforward_summer_intern_task.git
   cd takeyouforward_summer_intern_task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure 2026 images (optional)**
   - Create folder: `public/images/2026/`
   - Add 12 month images named:
     - `january.jpg`
     - `february.jpg`
     - `march.jpg`
     - ... (through `december.jpg`)
   - Or update paths in `components/HeroPanel.tsx` → `IMAGES_2026` object

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open browser to: `http://localhost:3000`
   - Calendar will load with current month

---

## Project Structure

```
takeyouforward_summer_intern_task/
├── app/
│   ├── page.tsx                 # Main page with theme separation
│   ├── globals.css              # Global styles & animations
│   └── layout.tsx               # Root layout
├── components/
│   ├── HeroPanel.tsx            # Left cover panel (images)
│   ├── CalendarPanel.tsx        # Right functional panel
│   ├── MonthHeader.tsx          # Navigation header
│   ├── MonthGrid.tsx            # Day grid component
│   ├── DayCell.tsx              # Individual day cells
│   ├── LiveThemeEffects.tsx     # Seasonal animations
│   ├── NotesSection.tsx         # Note editing modal
│   └── ChevronDivider.tsx       # Visual divider
├── context/
│   └── CalendarContext.tsx      # Global state management
├── lib/
│   ├── themes.ts                # Month color themes
│   ├── holidays.ts              # Holiday definitions
│   └── calendarUtils.ts         # Date utility functions
├── types/
│   └── calendar.ts              # TypeScript interfaces
├── public/
│   └── images/
│       └── 2026/                # Hardcoded month images
│           ├── january.jpg
│           ├── february.jpg
│           └── ...
└── README.md
```

---

## Usage Guide

### Navigating the Calendar
1. Use **left/right arrow buttons** in the header to change months
2. Watch the **3D flip animation** as months transition
3. Observe **background animations** change with seasons

### Viewing Seasonal Changes
1. Navigate through different months
2. Notice **color themes** in the day grid (right side)
3. Watch **background effects** in the calendar area:
   - January: Frost particles
   - March: Blooming flowers
   - July: Rain drops
   - November: Snowfall

### Working with Images

#### For Year 2026 (Hardcoded)
1. Navigate to any month in **2026**
2. See the **predefined image** automatically load
3. "2026 Collection" badge appears at bottom-left
4. No upload button (images are fixed)

#### Uploading Custom Images
1. Navigate to any month (non-2026)
2. Click **"Upload Cover Image"** button (center, when no image)
3. Select image file from computer
4. Image displays immediately
5. **"Change Image"** button appears on hover (top-left)

#### Changing Images
1. Hover over cover panel with existing user image
2. Click **"Change Image"** button (top-left)
3. Select new image
4. New image replaces old one

### Observing Color Themes
1. Navigate to **January** — cool blue tones
2. Navigate to **May** — vibrant green tones
3. Navigate to **November** — dark blue winter theme
4. Each month has **distinctive colors** in the day grid

### Date Selection & Notes
1. **Single click** a date to select it
2. **Double click** to start/end a range selection
3. Click **"Add Note"** button to add notes
4. Notes are saved per date/range/month

---

## Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, CSS Keyframes
- **Date Handling**: date-fns
- **State**: React useReducer + Context API
- **Storage**: localStorage for persistence

---

## Design Decisions

### Why Split Theme Between Panels?
- **Left panel** focuses on emotional/visual impact (images)
- **Right panel** focuses on usability (functional grid with clear colors)
- Prevents visual clutter and competing aesthetics

### Why Per-Month Image Independence?
- Users may want different seasonal imagery for different months
- Prevents "one image fits all" limitation
- Demonstrates sophisticated state architecture

### Why 2026 Hardcoded Images?
- Shows year-conditional functionality
- Provides polished defaults for demonstration
- Validates the priority logic (hardcoded > user > default)

### Why Minimal Seasonal Effects?
- Background animations shouldn't distract from calendar functionality
- Subtlety is key to professional polish
- CSS-based animations ensure performance

---

## Conclusion

This calendar application represents a **thoughtful blend of functionality and visual design**. It demonstrates:

- **Technical proficiency**: Complex state management, conditional rendering, animation systems
- **Design thinking**: Clear information hierarchy, seasonal storytelling, user personalization
- **UX focus**: Intuitive navigation, visual feedback, accessible interactions
- **Attention to detail**: Print styles, holiday indicators, hover states, responsive design

The result is a calendar that doesn't just track dates — it **celebrates the passage of time** through color, imagery, and motion.

---

## Known Limitations

- **Notes synchronization**: Currently localStorage-based; server sync would be needed for multi-device access
- **CORS for external images**: Cross-origin image extraction may fail for remote URLs without proper headers
- **Image storage**: Large images in localStorage may hit browser storage limits

---

**Built with care for the Summer Intern Task.**
