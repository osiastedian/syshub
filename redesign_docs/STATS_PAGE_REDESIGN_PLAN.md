# Stats Page Redesign Implementation Plan

**Status**: Planning
**Branch**: stats-page-redesign
**Based on**: Figma designs (2014:1801 desktop, 2082:12695 mobile)
**Reference**: About page redesign patterns

---

## Design Vision

The stats page redesign modernizes the stats dashboard with:
- **Mobile-first responsive layout** using Bootstrap 5 utilities
- **Consistent card-based design** with clear data hierarchy
- **Improved visual hierarchy** with section headers and organized stat groupings
- **Color-coded metrics** (blue for network data, orange for financial data)
- **Interactive elements** like the world map for location visualization
- **Clean, compact desktop layout** showing key metrics upfront
- **Progressive disclosure** with detailed tables and metrics below

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

### Desktop Layout (2014:1801)
Compact, dashboard-style view showing:

1. **Header**: "SENTRYNODES STATS" title (uppercase, centered)

2. **Primary Stats Row** (4 cards):
   - **Card 1**: 100,000 SYS (primary stat, large value)
   - **Card 2**: 3,978,70 (secondary metric)
   - **Card 3**: 23.64% (percentage stat)
   - **Card 4**: $99.01 / $330.16 (price range)

3. **Secondary Stats Row** (4 cards):
   - **Card 5**: 1d 1h 48m (time duration)
   - **Card 6**: 1d 20 58m (time duration)
   - **Card 7**: 458 / 1,337 (ratio/count)
   - **Card 8**: 35.87% (percentage stat)

4. **Total Sentrynodes (ASA)**: Blue bar chart with legend (showing distribution)

5. **Coins Collateralized**: Orange bar chart with legend

6. **Income Stats**: Table-style layout with columns:
   - Seniority levels (None, 1 Year, 2.5 Years)
   - Min/Max income values
   - Daily/Monthly/Yearly calculations

7. **Price Stats**: Card layout showing:
   - Price in SYS and BTC
   - High/Low prices
   - Price change percentage

8. **Investment Stats** (Orange section):
   - ROI metrics
   - Break-even analysis
   - Time-to-ROI calculations

9. **Blockchain Stats**: Network statistics:
   - Difficulty
   - Hash rate
   - Block height/time
   - Supply info

10. **Sentrynodes Locations**: World map with node distribution (orange highlighted regions)

11. **Footer**: Syscoin branding and support links

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
- Remove `.section` class that conflicts with `.container`
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
  <IncomeStats data={...} />
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
├── StatsChart.jsx
├── StatsChart.scss
├── (refactor existing components with .scss files)
└── ...
```

---

### Phase 2: Hero Section (Effort: 2 hours)

#### 2.1 Create HeroSection Component
**File**: `src/components/Stats/HeroSection.jsx`

Features:
- "SENTRYNODES STATS" heading (38px, semi-bold, uppercase, centered)
- Optional description text (18px, regular)
- Mobile: 32px heading, 16px text

**Structure**:
```jsx
<section className="stats-hero d-flex flex-column align-items-center text-center">
  <h1 className="stats-hero__title">SENTRYNODES STATS</h1>
</section>
```

**SCSS File**: `src/components/Stats/HeroSection.scss`
- Padding: 60px vertical (desktop), 60px (mobile)
- Design tokens for typography
- Responsive breakpoint behavior

---

### Phase 3: Stats Display Components (Effort: 8-10 hours)

#### 3.1 StatsCard Component
**Purpose**: Reusable card for displaying individual stats (primary dashboard cards)

**File**: `src/components/Stats/StatsCard.jsx`

**Props**:
```javascript
{
  label: string,              // "Total SYS"
  value: string|number,       // "100,000"
  unit?: string,              // "SYS"
  subValue?: string,          // secondary value
  change?: {
    value: number,            // 0.5
    direction: 'up'|'down',   // 'up'
    percentage: boolean       // true
  },
  size?: 'small'|'medium'|'large'  // card size variants
}
```

**Styling**:
- Base: Transparent/subtle background with minimal border
- Large: Prominent stat value (2.5rem+ font) for key metrics
- Mobile: Full-width, stacked layout
- Colors: Dark theme with gold/white text per design

**Structure**:
```jsx
<div className="stats-card">
  <p className="stats-card__label">{label}</p>
  <p className="stats-card__value">{value}</p>
  {unit && <span className="stats-card__unit">{unit}</span>}
  {subValue && <p className="stats-card__subvalue">{subValue}</p>}
  {change && <span className="stats-card__change">{change}</span>}
</div>
```

#### 3.2 StatsGrid Component
**Purpose**: Container for multiple stats cards with responsive layout (2x4 on desktop)

**File**: `src/components/Stats/StatsGrid.jsx`

**Features**:
- Desktop: 4 columns (2 rows of 4 cards)
- Tablet (768px+): 2 columns
- Mobile: 1 column (full-width stacking)
- Gap: 1.5rem between items

**Structure**:
```jsx
<div className="stats-grid d-flex flex-column flex-md-row flex-wrap gap-3 justify-content-between">
  {stats.map(stat => <StatsCard {...stat} />)}
</div>
```

**SCSS**:
```scss
.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  // Tablet: 2-column layout
  @media (min-width: $breakpoint-md) {
    flex-direction: row;
    flex-wrap: wrap;

    > .stats-card {
      flex: 0 1 calc(50% - 0.75rem);
    }
  }

  // Desktop: 4-column layout
  @media (min-width: $breakpoint-lg) {
    > .stats-card {
      flex: 0 1 calc(25% - 1.125rem);
    }
  }
}
```

#### 3.3 StatsChart Component
**Purpose**: Wrapper for bar/line charts with responsive container

**File**: `src/components/Stats/StatsChart.jsx`

**Props**:
```javascript
{
  title: string,              // "Total Sentrynodes (ASA)"
  chartData: object,          // chart library data
  type: 'bar'|'line',        // chart type
  chartColor?: string         // 'blue' | 'orange'
}
```

**Structure**:
```jsx
<div className="stats-chart">
  <h3 className="stats-chart__title">{title}</h3>
  <div className="stats-chart__container">
    {/* chart component */}
  </div>
</div>
```

#### 3.4 Refactor Existing Components
Modernize these components using Bootstrap utilities:

**Components to Update**:
1. **StatsShow** → Extract stat cards to StatsGrid + StatsCard
2. **LinearChart** → Wrap with StatsChart component
3. **Income** → Table-based layout with responsive cards
4. **Price** → StatsCard variants for price data
5. **Investment** → Section with stat cards + orange background
6. **Blockchain** → Stat cards for blockchain metrics
7. **WorldMap** → Responsive container with aspect ratio

---

### Phase 4: Section Styling (Effort: 6-8 hours)

#### 4.1 Create Section SCSS Files

Create individual SCSS files for each major section:

**Files**:
- `src/components/Stats/HeroSection.scss`
- `src/components/Stats/StatsCard.scss`
- `src/components/Stats/StatsGrid.scss`
- `src/components/Stats/StatsChart.scss`
- `src/components/Stats/sections/IncomeStats.scss`
- `src/components/Stats/sections/PriceStats.scss`
- `src/components/Stats/sections/InvestmentStats.scss`
- `src/components/Stats/sections/BlockchainStats.scss`
- `src/scss/_stats.scss` - Main import file

#### 4.2 Design Tokens Integration

Use existing tokens from `src/scss/design-tokens`:
```scss
// Colors
$color-brand-gold: #FBB03B
$color-brand-blue: #1F5EFF
$color-neutral-white: #FFFFFF
$color-neutral-black: #000000
$color-neutral-gray: #424242

// Spacing
$space-md: 1rem      // 16px
$space-lg: 1.5rem    // 24px
$space-xl: 2.25rem   // 36px
$space-2xl: 3rem     // 48px
$space-3xl: 4.75rem  // 76px

// Typography
$font-family-body
$font-size-h2: 2.375rem  // 38px
$font-size-h3: 2rem      // 32px
$font-size-body: 1.125rem // 18px
$font-weight-semi-bold: 600
$font-weight-regular: 400
$line-height-base: 1.3
```

#### 4.3 Responsive Patterns

**Mobile-first approach**:
- Default: `flex-column`, `align-items-center`, single column
- Tablet (768px): 2-column layouts with `flex-md-row`
- Desktop (992px+): 4-column layouts, full-width display

---

### Phase 5: Data Display & Tables (Effort: 4-5 hours)

#### 5.1 Income Stats Table Component
**File**: `src/components/Stats/sections/IncomeStats.jsx`

**Desktop Layout**: Traditional HTML table with columns:
- Seniority Level
- Min (SYS)
- Max (SYS)
- Daily Rate
- Monthly Rate
- Yearly Rate

**Mobile Layout**: Card-based with data labels stacked vertically

#### 5.2 Price Stats Component
**File**: `src/components/Stats/sections/PriceStats.jsx`

**Layout**: Cards showing:
- Current Price (SYS)
- 24h High/Low (BTC)
- 24h Change (%)

#### 5.3 Color-Coding for Values
- **Blue** (#1F5EFF): Network health, performance metrics, positive stats
- **Orange/Gold** (#FBB03B): Financial data, rewards, investment metrics
- **Green** (if added): Positive change indicators
- **Red** (if added): Negative change indicators

---

### Phase 6: Complex Sections & Map (Effort: 3-4 hours)

#### 6.1 Investment Stats Section
**File**: `src/components/Stats/sections/InvestmentStats.jsx`

Features:
- Orange background section (matching design spec)
- Stat cards for ROI metrics
- Time-to-ROI calculations
- Break-even analysis

#### 6.2 Blockchain Stats Section
**File**: `src/components/Stats/sections/BlockchainStats.jsx`

Features:
- Dark background (matches design)
- Key blockchain metrics (difficulty, hash rate, block height)
- Supply information

#### 6.3 WorldMap Component Update
- Keep existing map library
- Update wrapper with responsive container
- Add aspect ratio for mobile preservation

**Structure**:
```jsx
<section className="stats-locations d-flex flex-column align-items-center">
  <h2 className="stats-locations__title">SENTRYNODES LOCATIONS</h2>
  <div className="stats-map d-flex align-items-center justify-content-center">
    <div className="stats-map__container">
      {/* map component */}
    </div>
  </div>
</section>
```

---

## Component Architecture Summary

### New Component Tree
```
StatsPage (Stats.js)
├── HeroSection
├── StatsGridSection (Primary & Secondary stat cards)
│   ├── StatsGrid
│   │   ├── StatsCard (100,000 SYS)
│   │   ├── StatsCard (3,978,70)
│   │   ├── StatsCard (23.64%)
│   │   ├── StatsCard ($99.01/$330.16)
│   │   ├── StatsCard (1d 1h 48m)
│   │   ├── StatsCard (1d 20 58m)
│   │   ├── StatsCard (458/1,337)
│   │   └── StatsCard (35.87%)
├── ChartsSection
│   ├── StatsChart (Total Sentrynodes - Blue)
│   └── StatsChart (Coins Collateralized - Orange)
├── IncomeStatsSection
│   └── IncomeStats (Table layout)
├── PriceStatsSection
│   └── PriceStats
├── InvestmentStatsSection
│   └── InvestmentStats
├── BlockchainStatsSection
│   └── BlockchainStats
└── LocationsSection
    └── WorldMap
```

---

## Responsive Breakpoints

Following About page pattern:
- **Mobile**: Default (< 768px) - `flex-column`, full-width stacking, single column
- **Tablet**: md breakpoint (768px - 991px) - 2-column layouts, `flex-md-row`
- **Desktop**: lg breakpoint (992px+) - 4-column grids for stats, full-width tables

**Key utilities**:
- `d-flex`, `flex-column`, `flex-md-row`, `flex-wrap`
- `align-items-center`, `align-items-md-start`, `justify-content-between`
- `gap-*` utilities for spacing
- `text-center`, `mx-auto` for centering

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
- **Day 2-3**: Phase 5 - Tables and data display
- **Day 3-4**: Phase 6 - Investment, Blockchain, Map sections
- **Day 4-5**: Testing, polish, responsive validation

### Testing Checklist
- [ ] Mobile (320px, 375px, 480px)
- [ ] Tablet (768px)
- [ ] Desktop (992px, 1200px)
- [ ] Stat cards responsive layout (1→2→4 columns)
- [ ] Table responsive behavior (card layout on mobile)
- [ ] Charts scale properly on mobile
- [ ] Map maintains aspect ratio on all sizes
- [ ] Touch-friendly spacing on mobile
- [ ] No overflow or layout breaking
- [ ] API data loads and displays correctly
- [ ] Colors match design spec (gold, blue, white, gray, black)
- [ ] Typography sizes scale appropriately
- [ ] Section backgrounds (orange for investment, dark for blockchain)

---

## Design Token Values

Based on Figma spec (2014:1801) and existing design system:

### Spacing
```scss
$breakpoint-md: 768px
$breakpoint-lg: 992px
$space-md: 1rem       // 16px
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
$color-neutral-gray: #424242
$color-bg-dark: #1a1a1a
```

### Typography
```scss
$font-family-body: /* existing font stack */
$font-size-h1: 2.5rem      // 40px
$font-size-h2: 2.375rem    // 38px
$font-size-h3: 2rem        // 32px (mobile)
$font-size-body: 1.125rem  // 18px
$font-size-small: 1rem     // 16px
$font-weight-semi-bold: 600
$font-weight-regular: 400
$line-height-base: 1.3
```

---

## Notes & Considerations

1. **API Compatibility**: Keep existing data loading logic, only update presentation layer
2. **Performance**: Chart libraries (LinearChart) - verify performance on mobile, consider lazy loading
3. **Accessibility**: Ensure color contrast meets WCAG standards
4. **Mobile-first**: Design assumes mobile-first, then enhances at breakpoints
5. **Bootstrap5**: This project uses Bootstrap 5, leverage utility classes throughout
6. **Design Tokens**: Use existing tokens from `src/scss/design-tokens` - no hard-coded values
7. **Component Reusability**: StatsCard should be generic for any stat display
8. **Data Formatting**: Keep API response structure, format display in components
9. **Dark Theme**: Stats page uses dark background (matches Figma design)
10. **Section Separation**: Clear visual separation between sections (spacing, background colors)

---

## Estimated Effort

| Phase | Task | Hours | Priority |
|-------|------|-------|----------|
| 1 | Page structure & layout | 4 | Critical |
| 2 | Hero section | 2 | High |
| 3a | StatsCard, StatsGrid, StatsChart | 6 | Critical |
| 3b | Refactor existing components | 5 | High |
| 4 | Section styling & design tokens | 7 | Critical |
| 5 | Tables & data display components | 5 | High |
| 6 | Investment, Blockchain, Map sections | 4 | High |
| Testing & Polish | Testing across devices | 5 | Critical |
| **Total** | | **38 hours** | |

---

## Next Steps

1. ✅ Create comprehensive implementation plan
2. ⏭️ Set up Stats component directory structure
3. ⏭️ Update Stats.js page layout (remove legacy classes)
4. ⏭️ Build HeroSection component
5. ⏭️ Build StatsCard component
6. ⏭️ Build StatsGrid component
7. ⏭️ Build StatsChart component wrapper
8. ⏭️ Refactor existing components one by one
9. ⏭️ Create section SCSS files with design tokens
10. ⏭️ Test responsive behavior at all breakpoints
11. ⏭️ Commit and push to stats-page-redesign branch
