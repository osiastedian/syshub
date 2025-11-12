# Stats Page Redesign Implementation Plan

**Status**: Planning
**Branch**: stats-page-redesign
**Based on**: Figma designs (2082:12308 desktop, 2082:12695 mobile)
**Reference**: About page redesign patterns

---

## Design Vision

The stats page redesign modernizes the stats dashboard with:
- **Mobile-first responsive layout** using Bootstrap 5 utilities
- **Consistent card-based design** with clear data hierarchy
- **Improved visual hierarchy** with section headers and organized stat groupings
- **Color-coded metrics** (blue for positive, orange for financial data)
- **Interactive elements** like the world map for location visualization

---

## Current State Assessment

### Existing Architecture
- Location: `src/pages/Stats.js`
- Components: 7 existing stats components (StatsShow, LinearChart, Income, Price, Investment, Blockchain, WorldMap)
- Layout: Legacy grid system (shell-large, article, cols, col--size-12)
- State: API-driven with async data loading from `/stats` endpoint

### Current Issues
- Legacy layout system doesn't match modern Bootstrap pattern
- No mobile-specific responsive design
- Inconsistent spacing and alignment
- Missing visual hierarchy from design spec
- No component-level SCSS files with design tokens

---

## Figma Design Specifications

### Desktop Layout (2082:12308)
Comprehensive view showing:
1. **Hero/Header Section**: "SentryNodes Stats" title with intro text
2. **Coin Statistics**: Total coins, circulation, max supply
3. **Network Data**: Transactions, block height, average block time
4. **Total Sentry Nodes**: Large stat card with count
5. **Decentralized Governance**: Section with explanation
6. **Rewards**: Section with reward details
7. **Sentry Node Cost Analysis**: Detailed financial breakdown
8. **Income Stats**: Income breakdown table
9. **Price Stats**: High/low/change data
10. **Investment Stats**: ROI and investment metrics
11. **Blockchain Stats**: Chain-specific data
12. **Sentry Nodes Locations**: World map visualization

### Mobile Layout (2082:12695)
Optimized vertical stack:
1. **Header**: SentryNodes Stats title
2. **Total Stats**: Stacked stat cards in column layout
   - Coins Circulating
   - Max Supply
   - Transactions
   - Block Height
   - Total Sentry Nodes
   - Avg Block Time

3. **Coins Collateralized**: Card with values
4. **Income Stats**: Table-style cards stacked vertically
5. **Price Stats**: Card with pricing data
6. **Investment Stats**: Card with investment metrics
7. **Blockchain Stats**: Card with blockchain info
8. **Sentry Nodes Locations**: Map visualization (responsive)
9. **Support Footer**: Contact/support information

---

## Implementation Plan

### Phase 1: Page Structure & Layout (Effort: 3-4 hours)

#### 1.1 Update Stats.js Page Layout
**File**: `src/pages/Stats.js`

Changes:
- Remove legacy classes (shell-large, article, cols, col--size-12)
- Add `main className="statspage container"` (following About pattern)
- Wrap sections appropriately for Bootstrap grid
- Keep API data loading logic intact

**Before**:
```jsx
<main className="section statsPage">
  <div className="shell-large">
    <div className="section__body">
      <div className="articles">
        <section className="article article--revirse">
          {/* old structure */}
        </section>
```

**After**:
```jsx
<main className="statspage container">
  <MetaTags>...</MetaTags>
  <HeroSection />
  <StatsShow statsData={...} />
  <LinearChart chartData={...} />
  {/* more sections */}
```

#### 1.2 Create Stats Components Directory
**Directory**: `src/components/Stats/`

New structure:
```
src/components/Stats/
├── index.js (barrel export)
├── HeroSection.jsx
├── HeroSection.scss
├── StatsCard.jsx
├── StatsCard.scss
├── StatsGrid.jsx
├── StatsGrid.scss
├── (refactor existing components)
└── ...
```

---

### Phase 2: Hero Section (Effort: 2 hours)

#### 2.1 Create HeroSection Component
**File**: `src/components/Stats/HeroSection.jsx`

Features:
- "SentryNodes Stats" heading (38px, semi-bold, uppercase)
- Subtitle/description text (18px, regular)
- Optional background image or accent color
- Mobile: 32px heading, 16px text

**Structure**:
```jsx
<section className="stats-hero d-flex flex-column align-items-center text-center">
  <h1 className="stats-hero__title">SentryNodes Stats</h1>
  <p className="stats-hero__description">Network statistics and analytics</p>
</section>
```

**SCSS File**: `src/components/Stats/HeroSection.scss`
- Padding: 100px vertical (desktop), 60px (mobile)
- Design tokens for typography
- Responsive breakpoint behavior

---

### Phase 3: Stats Display Components (Effort: 8-10 hours)

#### 3.1 StatsCard Component
**Purpose**: Reusable card for displaying individual stats

**File**: `src/components/Stats/StatsCard.jsx`

**Props**:
```javascript
{
  label: string,              // "Total Coins"
  value: string|number,       // "21,000,000"
  unit?: string,              // "SYS"
  change?: {
    value: number,            // 0.5
    direction: 'up'|'down',   // 'up'
    percentage: boolean       // true
  },
  variant?: 'default'|'highlight'|'accent'
}
```

**Styling**:
- Base: Transparent background with border (color-brand-gold)
- Highlight: Larger stat value (2.5rem font)
- Accent: Gold/orange background for financial data
- Mobile: Full-width, stacked layout

**Structure**:
```jsx
<div className="stats-card">
  <p className="stats-card__label">{label}</p>
  <p className="stats-card__value">{value}</p>
  {unit && <span className="stats-card__unit">{unit}</span>}
  {change && <span className="stats-card__change">{change}</span>}
</div>
```

#### 3.2 StatsGrid Component
**Purpose**: Container for multiple stats cards with responsive layout

**File**: `src/components/Stats/StatsGrid.jsx`

**Features**:
- Mobile: 1 column (flex-column)
- Tablet (768px+): 2 columns (flex-md-row with 2-up layout)
- Desktop (992px+): 4 columns (flex-lg-row with 4-up layout)
- Gap: 1.5rem between items

**Structure**:
```jsx
<div className="stats-grid d-flex flex-column flex-md-row gap-3 flex-wrap">
  {stats.map(stat => <StatsCard {...stat} />)}
</div>
```

#### 3.3 Refactor Existing Components
Modernize these components using Bootstrap utilities:

**Components to Update**:
1. **StatsShow** → Extract stat cards to StatsGrid + StatsCard
2. **Income** → Table-based layout with responsive cards
3. **Price** → StatsCard variants for price data
4. **Investment** → Stat cards with financial styling
5. **Blockchain** → Stat cards for blockchain metrics
6. **LinearChart** → Keep chart library, update wrapper styles
7. **WorldMap** → Responsive container with aspect ratio

---

### Phase 4: Section Styling (Effort: 6-8 hours)

#### 4.1 Create Section SCSS Files

Create individual SCSS files for each major section:

**Files**:
- `src/components/Stats/HeroSection.scss` (2-3 hours completed in Phase 2)
- `src/components/Stats/StatsCard.scss` (1 hour)
- `src/components/Stats/StatsGrid.scss` (0.5 hour)
- `src/scss/_stats.scss` (2 hours) - Import all stats components

#### 4.2 Design Tokens Integration

Use existing tokens from `src/scss/design-tokens`:
```scss
// Colors
$color-brand-gold: #FBB03B
$color-brand-blue: #1F5EFF
$color-neutral-white: #FFFFFF
$color-neutral-black: #000000

// Spacing (for gaps, padding, margins)
$space-lg: 1.5rem   // 24px
$space-xl: 2.25rem  // 36px
$space-2xl: 3rem    // 48px

// Typography
$font-family-body
$font-size-h2: 2.375rem  // 38px
$font-weight-semi-bold: 600
```

#### 4.3 Responsive Patterns

**Mobile-first approach**:
```scss
.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  // Tablet: 2-column layout
  @media (min-width: $breakpoint-md) {
    flex-direction: row;
    flex-wrap: wrap;

    > * {
      flex: 0 1 calc(50% - 0.75rem);
    }
  }

  // Desktop: 4-column layout
  @media (min-width: $breakpoint-lg) {
    > * {
      flex: 0 1 calc(25% - 1.125rem);
    }
  }
}
```

---

### Phase 5: Data Display & Tables (Effort: 4-5 hours)

#### 5.1 Table Component for Income/Price Data
**File**: `src/components/Stats/StatsTable.jsx`

**Features**:
- Desktop: Traditional table layout
- Mobile: Card-based stacked layout with data labels

**Structure**:
```jsx
<div className="stats-table">
  {isMobile ? (
    <div className="stats-table__mobile">
      {data.map(row => <StatsTableRow {...row} />)}
    </div>
  ) : (
    <table className="stats-table__desktop">
      {/* traditional table */}
    </table>
  )}
</div>
```

#### 5.2 Color-Coding for Values
- **Blue** (#1F5EFF): Network health, positive metrics
- **Orange/Gold** (#FBB03B): Financial data, rewards
- **Green** (if needed): Positive change indicators
- **Red** (if needed): Negative change indicators

---

### Phase 6: Responsive Map & Complex Components (Effort: 3-4 hours)

#### 6.1 WorldMap Component Update
- Keep existing map library
- Update wrapper with responsive container
- Add aspect ratio for mobile preservation

**Structure**:
```jsx
<div className="stats-map d-flex align-items-center justify-content-center">
  <div className="stats-map__container">
    {/* map component */}
  </div>
</div>
```

**SCSS**:
```scss
.stats-map {
  padding: 3rem 0;

  &__container {
    width: 100%;
    aspect-ratio: 16 / 9;

    @media (max-width: $breakpoint-md) {
      aspect-ratio: 4 / 3;
    }
  }
}
```

---

## Component Architecture Summary

### New Component Tree
```
StatsPage (Stats.js)
├── HeroSection
├── StatsSection (wrapper with title)
│   ├── StatsGrid
│   │   ├── StatsCard (Total Coins)
│   │   ├── StatsCard (Circulation)
│   │   ├── StatsCard (Max Supply)
│   │   └── ...
├── LinearChartSection
│   └── LinearChart (refactored wrapper)
├── IncomeSection
│   └── StatsTable (refactored from Income)
├── PriceSection
│   └── StatsTable (refactored from Price)
├── InvestmentSection
│   └── StatsGrid (refactored from Investment)
├── BlockchainSection
│   └── StatsGrid (refactored from Blockchain)
└── LocationsSection
    └── WorldMap (refactored wrapper)
```

---

## Responsive Breakpoints

Following About page pattern:
- **Mobile**: Default (< 768px) - `flex-column`, full-width stacking
- **Tablet**: md breakpoint (768px - 991px) - 2-column layouts, `flex-md-row`
- **Desktop**: lg breakpoint (992px+) - 4-column layouts, full-width

**Key utilities**:
- `d-flex`, `flex-column`, `flex-md-row`
- `align-items-center`, `align-items-md-start`
- `justify-content-between`, `justify-content-md-between`
- `gap-*` utilities for spacing
- `mx-auto` for centering containers

---

## Bootstrap Utility Classes Reference

Common classes to use:
```jsx
// Flexbox layout
d-flex                    // display: flex
flex-column              // flex-direction: column
flex-md-row              // @media md: flex-direction: row
flex-wrap                // flex-wrap: wrap

// Alignment
align-items-center       // align-items: center
align-items-md-start     // @media md: align-items: flex-start
justify-content-between  // justify-content: space-between
justify-content-md-around// @media md: justify-content: space-around

// Spacing
gap-3                    // gap: 1rem
mx-auto                  // margin-left: auto; margin-right: auto
text-center              // text-align: center

// Display
d-none                   // display: none
d-md-flex                // @media md: display: flex
```

---

## Implementation Roadmap

### Week 1
- **Day 1-2**: Phase 1 - Page structure update
- **Day 2-3**: Phase 2 - Hero section
- **Day 3-4**: Phase 3a - StatsCard & StatsGrid components
- **Day 4-5**: Phase 4 - Section styling and SCSS files

### Week 2
- **Day 1-2**: Phase 3b - Refactor existing components
- **Day 2-3**: Phase 5 - Tables and complex layouts
- **Day 3-4**: Phase 6 - Map and responsive components
- **Day 4-5**: Testing, polish, responsive validation

### Testing Checklist
- [ ] Mobile (320px, 375px, 480px)
- [ ] Tablet (768px)
- [ ] Desktop (992px, 1200px)
- [ ] Stat cards responsive layout at each breakpoint
- [ ] Table responsive behavior (card layout on mobile)
- [ ] Map maintains aspect ratio on all sizes
- [ ] Touch-friendly spacing on mobile
- [ ] No overflow or layout breaking
- [ ] API data loads and displays correctly
- [ ] Colors match design spec (gold, blue, white, black)

---

## Design Token Values

Based on Figma spec and existing design system:

### Spacing
```scss
$breakpoint-md: 768px
$breakpoint-lg: 992px
$space-lg: 1.5rem     // 24px
$space-xl: 2.25rem    // 36px
$space-2xl: 3rem      // 48px
$space-3xl: 4.75rem   // 76px
```

### Colors
```scss
$color-brand-gold: #FBB03B
$color-brand-blue: #1F5EFF
$color-neutral-white: #FFFFFF
$color-neutral-black: #000000
```

### Typography
```scss
$font-family-body: /* existing font stack */
$font-size-h2: 2.375rem    // 38px
$font-size-h3: 2rem        // 32px (mobile)
$font-size-body: 1.125rem  // 18px
$font-weight-semi-bold: 600
$font-weight-regular: 400
$line-height-base: 1.3
```

---

## Notes & Considerations

1. **API Compatibility**: Keep existing data loading logic, only update presentation layer
2. **Performance**: Chart library (LinearChart) - verify performance on mobile
3. **Accessibility**: Ensure color contrast meets WCAG standards
4. **Mobile-first**: Design assumes mobile-first, then enhances at breakpoints
5. **Bootstrap5**: This project uses Bootstrap 5, leverage utility classes throughout
6. **Design Tokens**: Use existing tokens from `src/scss/design-tokens` - no hard-coded values
7. **Component Reusability**: StatsCard should be generic for any stat display
8. **Data Formatting**: Keep API response structure, format display in components

---

## Estimated Effort

| Phase | Task | Hours | Priority |
|-------|------|-------|----------|
| 1 | Page structure & layout | 4 | Critical |
| 2 | Hero section | 2 | High |
| 3a | StatsCard & StatsGrid | 5 | Critical |
| 3b | Refactor existing components | 5 | High |
| 4 | Section styling | 6 | Critical |
| 5 | Tables & complex layouts | 5 | High |
| 6 | Map & responsive components | 4 | Medium |
| Testing & Polish | Testing across devices | 4 | Critical |
| **Total** | | **35 hours** | |

---

## Next Steps

1. ✅ Review this plan
2. ⏭️ Create component structure
3. ⏭️ Update Stats.js page layout
4. ⏭️ Build StatsCard component
5. ⏭️ Build StatsGrid component
6. ⏭️ Refactor existing components one by one
7. ⏭️ Test responsive behavior
8. ⏭️ Commit and push to stats-page-redesign branch
