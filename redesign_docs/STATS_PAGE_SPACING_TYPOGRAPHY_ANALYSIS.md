# Stats Page: Spacing, Typography & Layout Comparison

**Date**: Nov 12, 2025
**Figma Designs**: Desktop (2014:1801) vs Mobile (2082:12695)
**Purpose**: Detailed analysis ensuring consistency between desktop and mobile layouts

---

## Typography Comparison

### Hero Title: "SENTRYNODES STATS"

| Property | Desktop | Mobile | Notes |
|----------|---------|--------|-------|
| Font Size | 38px / 2.375rem | 28px / 1.75rem | Smaller on mobile, still readable |
| Font Weight | 600 (Semi-bold) | 600 (Semi-bold) | Consistent weight |
| Line Height | 1.3 (49.4px) | 1.3 (36.4px) | Proportional |
| Text Transform | UPPERCASE | UPPERCASE | Consistent |
| Letter Spacing | Normal | Normal | Consistent |
| Color | #FFFFFF (white) | #FFFFFF (white) | Consistent |
| Text Align | Center | Center | Consistent |

---

## Stat Card Typography

### Card Label (e.g., "Total SYS", "Daily Rate")

| Property | Desktop | Mobile | Notes |
|----------|---------|--------|-------|
| Font Size | 14px / 0.875rem | 12px / 0.75rem | Smaller on mobile |
| Font Weight | 400 (Regular) | 400 (Regular) | Consistent |
| Color | #CCCCCC (light gray) | #CCCCCC (light gray) | Consistent |
| Case | Sentence | Sentence | Consistent |

### Card Value (e.g., "100,000", "23.64%")

| Property | Desktop | Mobile | Notes |
|----------|---------|--------|-------|
| Font Size | 24px / 1.5rem | 18px / 1.125rem | Reduces proportionally |
| Font Weight | 600 (Semi-bold) | 600 (Semi-bold) | Consistent weight |
| Color | #FFFFFF (white) or #FBB03B (gold) | Same | Consistent |
| Line Height | 1.3 | 1.3 | Consistent |

### Card Unit (e.g., "SYS", "BTC")

| Property | Desktop | Mobile | Notes |
|----------|---------|--------|-------|
| Font Size | 12px / 0.75rem | 10px / 0.625rem | Smaller on mobile |
| Font Weight | 400 (Regular) | 400 (Regular) | Consistent |
| Color | #FBB03B (gold) | #FBB03B (gold) | Consistent |

### Sub-Value/Secondary Text (e.g., prices)

| Property | Desktop | Mobile | Notes |
|----------|---------|--------|-------|
| Font Size | 14px / 0.875rem | 12px / 0.75rem | Scales down |
| Font Weight | 400 (Regular) | 400 (Regular) | Consistent |
| Color | #FBB03B (gold) | #FBB03B (gold) | Consistent |

---

## Spacing & Padding Analysis

### Section Padding (Top/Bottom)

| Section | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| Hero Section | 60px vertical | 40px vertical | Reduced on mobile |
| Stat Cards Container | 60px top, 60px bottom | 40px top, 40px bottom | Proportional reduction |
| Charts Section | 60px vertical | 40px vertical | Consistent |
| Table Sections | 60px vertical | 40px vertical | Consistent |
| Footer | 60px vertical | 40px vertical | Consistent |

### Horizontal Padding (Left/Right)

| Section | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| Main Container | 180px | 16px | Large reduction to account for smaller screens |
| Card Padding | 20px | 16px | Slightly reduced |
| Section Padding | 24px | 16px | Reduced for touch |

### Gap Between Elements

| Element | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| Between Stat Cards (horizontal) | 24px | 16px | Reduced for dense mobile layout |
| Between Stat Cards (vertical) | 24px | 24px | Same (stacked on mobile anyway) |
| Between Chart & Title | 20px | 16px | Slightly reduced |
| Between Sections | 60px | 40px | Large sections spaced out |
| Between Rows in Table | 16px | 12px | Tighter on mobile |

---

## Layout Grid Comparison

### Stat Cards Container

#### Desktop Layout
```
[Stat 1]  [Stat 2]  [Stat 3]  [Stat 4]    (Row 1: 4 columns)
   ↓          ↓          ↓         ↓
   24px gap between each

[Stat 5]  [Stat 6]  [Stat 7]  [Stat 8]    (Row 2: 4 columns)
```

**Column Width Calculation (Desktop)**:
- Container width: 1200px - 360px padding (180px × 2) = 840px
- 4 columns with 24px gaps: (840 - 72px) / 4 = ~192px per card

#### Tablet Layout (768px)
```
[Stat 1]  [Stat 2]                        (Row 1: 2 columns)
   ↓          ↓
   16px gap

[Stat 3]  [Stat 4]                        (Row 2: 2 columns)
   ↓          ↓
   16px gap

[Stat 5]  [Stat 6]                        (Row 3: 2 columns)
   ↓          ↓
   16px gap

[Stat 7]  [Stat 8]                        (Row 4: 2 columns)
```

**Column Width Calculation (Tablet)**:
- Container width: 768px - 32px padding (16px × 2) = 736px
- 2 columns with 16px gap: (736 - 16px) / 2 = 360px per card

#### Mobile Layout (< 768px)
```
[Stat 1]
[Stat 2]
[Stat 3]
[Stat 4]
[Stat 5]
[Stat 6]
[Stat 7]
[Stat 8]
```

**Column Width Calculation (Mobile)**:
- Container width: 375px - 32px padding (16px × 2) = 343px
- 1 column = 343px per card (full width minus padding)

---

## Chart Dimensions

### Total Sentrynodes Chart

| Property | Desktop | Mobile | Notes |
|----------|---------|--------|-------|
| Width | ~840px (container width) | Full width (343px) | Responsive to container |
| Height | 200px | 200px | Same height for clarity |
| Title Size | 18px | 16px | Reduced on mobile |
| Legend Size | 12px | 10px | Smaller on mobile |
| Bar Height | ~160px | ~160px | Proportional |

### Coins Collateralized Chart

Same proportions as above (both charts use consistent dimensions)

---

## Table Layouts

### Income Stats Table

#### Desktop
```
┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│Seniority │  Min SYS │  Max SYS │ Daily    │ Monthly  │ Yearly   │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ None     │    123   │    456   │   1.23   │   37     │   450    │
│ 1 Year   │    200   │    789   │   2.15   │   65     │   780    │
│ 2.5 Yrs  │    400   │   1200   │   4.30   │  129     │  1560    │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘

Cell Padding: 16px horizontal, 12px vertical
Font Size: 14px (labels), 16px (values)
```

#### Mobile (Card-based)
```
┌─────────────────────┐
│ SENIORITY: None     │
│ Min: 123 SYS        │
│ Max: 456 SYS        │
│ Daily: 1.23 SYS     │
│ Monthly: 37 SYS     │
│ Yearly: 450 SYS     │
└─────────────────────┘

Cell Padding: 12px horizontal, 10px vertical
Font Size: 12px (labels), 14px (values)
Line Gap: 12px between rows
Card Gap: 16px between cards
```

---

## Price Stats Card Layout

### Desktop
```
┌──────────────────────────────────────┐
│ PRICE STATS                          │
├──────────────────────────────────────┤
│ Price in SYS        Price in BTC     │
│ $99.01              0.002 BTC        │
│                                      │
│ 24h High            24h Low          │
│ $100.50             $98.50           │
│                                      │
│ Change (24h)                         │
│ +2.5%                                │
└──────────────────────────────────────┘

Width: calc(25% - 6px) per stat card pattern
Height: Auto (content-driven)
Padding: 20px
Gap between items: 24px
```

### Mobile
```
┌──────────────────────┐
│ PRICE STATS          │
├──────────────────────┤
│ Price in SYS         │
│ $99.01               │
│                      │
│ Price in BTC         │
│ 0.002 BTC            │
│                      │
│ 24h High             │
│ $100.50              │
│                      │
│ 24h Low              │
│ $98.50               │
│                      │
│ Change (24h)         │
│ +2.5%                │
└──────────────────────┘

Width: Full width (343px)
Padding: 16px
Gap: 12px between items
```

---

## Investment Stats Section

### Desktop
```
┌────────────────────────────────────────────────────────────┐
│                  INVESTMENT STATS                          │ ← Orange Background
├────────────────────────────────────────────────────────────┤
│ [Stat] [Stat] [Stat] [Stat]                                │ ← 4 column layout
│                                                             │
│ [Additional data row]                                      │
└────────────────────────────────────────────────────────────┘

Background Color: #FBB03B (Gold/Orange) with ~20% transparency or solid
Padding: 60px vertical, 180px horizontal
Text Color: #000000 (black text on orange bg) or #FFFFFF (white)
```

### Mobile
```
┌─────────────────────┐
│INVESTMENT STATS     │  ← Orange Background
├─────────────────────┤
│ [Stat 1]            │
│ [Stat 2]            │
│ [Stat 3]            │
│ [Stat 4]            │
│ [Additional info]    │
└─────────────────────┘

Background Color: Same as desktop
Padding: 40px vertical, 16px horizontal
Text Color: Same as desktop
Full width layout
```

---

## Blockchain Stats Section

### Desktop
```
┌────────────────────────────────────────────────────────────┐
│                 BLOCKCHAIN STATS                           │ ← Dark/Black BG
├────────────────────────────────────────────────────────────┤
│ [Difficulty] [Hash Rate] [Block Height] [Block Time]      │ ← 4 cols
└────────────────────────────────────────────────────────────┘

Background: #1a1a1a or #000000 (dark/black)
Padding: 60px vertical, 180px horizontal
Text: #FFFFFF (white)
```

### Mobile
```
┌─────────────────────┐
│BLOCKCHAIN STATS     │ ← Dark/Black BG
├─────────────────────┤
│ [Difficulty]        │
│ [Hash Rate]         │
│ [Block Height]      │
│ [Block Time]        │
└─────────────────────┘

Same background
Padding: 40px vertical, 16px horizontal
Full width, stacked layout
```

---

## World Map Section

### Desktop
```
┌────────────────────────────────────────────────────────────┐
│              SENTRYNODES LOCATIONS                         │
├────────────────────────────────────────────────────────────┤
│                                                             │
│         [World Map - Full Width]                           │
│         Height: ~400-500px                                │
│         Aspect Ratio: 16:9                                │
│                                                             │
└────────────────────────────────────────────────────────────┘

Padding: 60px top/bottom, 180px left/right
Map Height: 450px (fixed or responsive)
Width: Full container width
```

### Mobile
```
┌─────────────────────┐
│SENTRYNODES          │
│LOCATIONS            │
├─────────────────────┤
│                     │
│ [World Map]         │
│ Height: ~250px      │
│ Aspect Ratio: 4:3   │
│                     │
└─────────────────────┘

Padding: 40px top/bottom, 16px left/right
Map Height: 250px or aspect-ratio: 4/3
Width: Full width
```

---

## Font Stack & Colors

### Typography
```scss
$font-family-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

// Hero
$font-size-hero: 2.375rem (38px)   // desktop
$font-size-hero-mobile: 1.75rem (28px)

// Headings
$font-size-h2: 1.5rem (24px)      // section titles
$font-size-h3: 1.25rem (20px)     // subsections

// Body
$font-size-body: 1rem (16px)      // desktop body
$font-size-body-sm: 0.875rem (14px) // card labels
$font-size-body-xs: 0.75rem (12px)  // small text

// Mobile reductions (all -2-4px typically)
// Headers reduce more than body text
```

### Color Palette
```scss
// Primary
$color-brand-gold: #FBB03B         // Charts, highlights, investment bg
$color-brand-blue: #1F5EFF         // Charts, stats

// Neutral
$color-neutral-white: #FFFFFF      // Text, backgrounds
$color-neutral-black: #000000      // Dark backgrounds
$color-neutral-gray: #424242       // Medium gray
$color-neutral-gray-light: #CCCCCC // Light text

// Backgrounds
$color-bg-dark: #1a1a1a           // Dark sections
$color-bg-darkest: #0a0a0a        // Darkest sections

// Status (if used)
$color-positive: #00C851           // Green (positive change)
$color-negative: #FF4444           // Red (negative change)
```

---

## Key Observations & Implementation Notes

### 1. Responsive Font Scaling
- Don't just scale everything linearly
- Headlines scale more (38px → 28px = -26%)
- Body text scales less (16px → 14px = -12%)
- Maintains visual hierarchy on mobile

### 2. Spacing Reduction Pattern
- Desktop horizontal padding: 180px → Mobile: 16px (massive reduction)
- Vertical padding: 60px → 40px (33% reduction)
- Gaps: 24px → 16px (33% reduction)
- Maintains breathing room while optimizing mobile space

### 3. Card Layout Changes
- Desktop: 4 columns in single row
- Tablet: 2 columns, 2 rows
- Mobile: 1 column, 8 rows (stacked)
- Cards maintain consistent height, scale width proportionally

### 4. Section Background Treatment
- Investment Stats: Orange background consistent across breakpoints
- Blockchain Stats: Dark background consistent across breakpoints
- Maintains color identity while adjusting padding/spacing

### 5. Table Responsive Strategy
- Desktop: Traditional HTML table
- Tablet: Mixed layout (still table-like)
- Mobile: Complete card-based layout with labels
- No horizontal scrolling on mobile

### 6. Map Aspect Ratio
- Desktop: 16:9 (landscape cinema)
- Mobile: 4:3 (more square for mobile width)
- Helps fit better on narrow screens

---

## Bootstrap Utility Classes to Use

```jsx
// Container
.container              // 1200px max-width on desktop, full-width on mobile
.container-fluid       // Not needed, .container is responsive

// Spacing - Desktop first approach
.p-5                   // Padding: 3rem (48px) - for large sections
.p-4                   // Padding: 1.5rem (24px) - for standard padding
.p-3                   // Padding: 1rem (16px) - for cards
.gap-4                 // Gap: 1.5rem (24px) - between flex items

// Mobile overrides with breakpoints
.p-md-4                // @media md: padding: 1.5rem
.p-lg-5                // @media lg: padding: 3rem
.gap-md-3              // @media md: gap: 1rem

// Responsive text sizing (using CSS classes)
.fs-1                  // font-size: 2.5rem (40px)
.fs-2                  // font-size: 2rem (32px)
.fs-3                  // font-size: 1.75rem (28px)
.fs-4                  // font-size: 1.5rem (24px)
.fs-5                  // font-size: 1.25rem (20px)
.fs-6                  // font-size: 1rem (16px)

// Flexbox
.d-flex                // display: flex
.flex-column          // flex-direction: column (mobile default)
.flex-md-row          // @media md: flex-direction: row
.flex-wrap            // flex-wrap: wrap (for stat cards)
.gap-3                // gap: 1rem
.gap-md-4             // @media md: gap: 1.5rem
.align-items-center   // align-items: center
.justify-content-between // justify-content: space-between

// Alignment & Sizing
.w-100                // width: 100%
.mx-auto              // margin-left: auto; margin-right: auto (center)
.text-center          // text-align: center

// Display utilities
.d-none               // display: none
.d-md-block          // @media md: display: block
.d-lg-flex           // @media lg: display: flex
```

---

## Checklist for Desktop vs Mobile Consistency

- [ ] Title font sizes scale appropriately (38px → 28px)
- [ ] Card values scale proportionally (24px → 18px)
- [ ] Padding reduces significantly for mobile (180px → 16px horizontal)
- [ ] Gaps reduce proportionally (24px → 16px)
- [ ] Cards layout changes: 4 cols → 2 cols → 1 col
- [ ] Charts maintain aspect ratios (16:9 → 4:3 on mobile)
- [ ] Tables convert to cards on mobile
- [ ] Section backgrounds remain consistent
- [ ] Colors match across breakpoints
- [ ] No horizontal scrolling on mobile
- [ ] Touch-friendly spacing (minimum 40px tap target)
- [ ] Line heights remain consistent (1.3 throughout)

