# Current Stats Page State Analysis

**Date**: Nov 12, 2025
**Current Location**: http://localhost:3000/stats
**Current Code**: `src/pages/Stats.js`
**Purpose**: Document existing implementation structure before redesign

---

## Current Implementation Structure

### Page-Level Component (Stats.js)

```jsx
class Stats extends Component {
  state = {
    dataload: 0,
    api_data: []
  }

  componentDidMount() {
    this.getStats()  // Fetches from /stats API endpoint
  }

  render() {
    if (this.state.dataload === 1) {
      return (
        <Background>
          <BackgroundInner type="B" />
          <main className="section statsPage">
            <div className="shell-large">
              <div className="section__body">
                <div className="articles">
                  {/* Section components */}
                </div>
              </div>
            </div>
          </main>
        </Background>
      )
    }
  }
}
```

### Current HTML Structure

```
Background
├── BackgroundInner (type="B")
└── <main class="section statsPage">
    └── <div class="shell-large">
        └── <div class="section__body">
            └── <div class="articles">
                ├── <section class="article article--revirse">
                │   ├── Title (SentryNodes Stats)
                │   ├── StatsShow component
                │   └── LinearChart component
                ├── <section class="article article--revirse">
                │   └── Income component
                ├── <section class="article article--revirse">
                │   └── Price component
                ├── <section class="article">
                │   └── Investment component
                ├── <section class="article article--revirse">
                │   └── Blockchain component
                └── <section class="article article--revirse">
                    └── WorldMap component
```

### Current CSS Classes Used

**Legacy Classes** (to be removed):
- `.section` - Adds padding ($space-2xl 0)
- `.statsPage` - Custom stats page styling
- `.shell-large` - Old container wrapper
- `.section__body` - Legacy structure
- `.articles` - Legacy container
- `.article` - Legacy section styling
- `.article--revirse` - Style variant
- `.article--offsets-bottom` - Spacing variant
- `.cols` - Legacy grid
- `.col` - Legacy grid column
- `.col--size-12` - Full-width column

---

## Current Components (7 Total)

### 1. **Title** Component
**Location**: `src/components/global/Title.js`
**Usage**: `<Title heading="SentryNodes Stats" />`
**Current Function**: Displays page title

**To Change**:
- Keep title component but wrap in HeroSection
- Update to use design tokens
- Add responsive font sizes

---

### 2. **StatsShow** Component
**Location**: `src/components/stats/StatsShow.js`
**Props**: `statsData={this.state.api_data.stats}`
**Current Function**: Displays primary statistics

**Data Expected**:
```javascript
stats: {
  mn_stats: {
    enabled: "100,000",
    // other properties...
  }
}
```

**To Change**:
- Refactor to use StatsCard components
- Implement StatsGrid for responsive layout
- Use design tokens for styling

---

### 3. **LinearChart** Component (aka LinearCharts)
**Location**: `src/components/stats/LinearCharts.js`
**Props**: `chartData={this.state.api_data.stats.mn_stats}`
**Current Function**: Displays chart data

**To Change**:
- Keep chart library, wrap with StatsChart component
- Update responsive sizing
- Ensure mobile performance

---

### 4. **Income** Component
**Location**: `src/components/stats/Income.js`
**Props**:
```javascript
incomeData={this.state.api_data.stats.income_stats}
incomeSenOneYrData={this.state.api_data.stats.income_stats_seniority_one_year}
incomeSenTwoYrData={this.state.api_data.stats.income_stats_seniority_two_year}
```
**Current Function**: Displays income statistics table

**To Change**:
- Refactor to IncomeStats component
- Implement responsive table → card conversion for mobile
- Use new styling system

---

### 5. **Price** Component
**Location**: `src/components/stats/Price.js`
**Props**: `priceData={this.state.api_data.stats.price_stats}`
**Current Function**: Displays price information

**To Change**:
- Refactor to PriceStats component
- Convert to card-based layout
- Update typography and spacing

---

### 6. **Investment** Component
**Location**: `src/components/stats/Investment.js`
**Props**: `investData={this.state.api_data.stats.mn_stats}`
**Current Function**: Displays investment statistics

**To Change**:
- Refactor to InvestmentStats component
- Add orange background section
- Use StatsCard variants

---

### 7. **Blockchain** Component
**Location**: `src/components/stats/Blockchain.js`
**Props**: `blockchainData={this.state.api_data.stats.blockchain_stats}`
**Current Function**: Displays blockchain statistics

**To Change**:
- Refactor to BlockchainStats component
- Add dark background section
- Use consistent styling

---

### 8. **WorldMap** Component
**Location**: `src/components/stats/WorldMap.js`
**Props**: `mapData={this.state.api_data.mapData} mapFills={this.state.api_data.mapFills}`
**Current Function**: Displays world map visualization

**To Change**:
- Keep map library
- Update responsive container
- Add aspect ratio for mobile

---

## Current Data Flow

```
Stats.js (Page Component)
  ↓
  getStats() API call
    ↓
    Fetches from: https://syscoin.dev/mnstats
    + Fetches from: ${API_URI}/statsInfo/mnStats
    ↓
    Updates state.api_data
    ↓
  Passes data to child components
    ├── StatsShow (stats)
    ├── LinearChart (stats.mn_stats)
    ├── Income (stats.income_stats)
    ├── Price (stats.price_stats)
    ├── Investment (stats.mn_stats)
    ├── Blockchain (stats.blockchain_stats)
    └── WorldMap (mapData, mapFills)
```

---

## Current Styling System

### SCSS Approach
- Inline styles on individual components
- Custom classes (not using Bootstrap utilities)
- Inconsistent spacing and sizing
- No design token integration

### Current Classes in Components
```scss
// Typical component structure
.component-name {
  padding: [custom values]
  gap: [custom values]

  &__title {
    font-size: [custom]
    font-weight: [custom]
  }

  &__item {
    display: flex
    // custom properties
  }
}
```

---

## Issues to Address in Redesign

### 1. **Layout Structure**
- ❌ Uses legacy class system (shell-large, articles, cols)
- ❌ Not using Bootstrap 5 utilities
- ✅ Change to: `.container` + `.d-flex` + responsive utilities

### 2. **Responsive Design**
- ❌ Limited mobile optimization
- ❌ No breakpoint-specific classes
- ✅ Change to: Mobile-first with md/lg breakpoints

### 3. **Typography**
- ❌ Custom font sizes, not using design tokens
- ❌ Inconsistent sizing across components
- ✅ Change to: Design token variables ($font-size-h2, etc.)

### 4. **Spacing**
- ❌ Hard-coded padding/margins
- ❌ Inconsistent gaps
- ✅ Change to: $space-* tokens + Bootstrap gap utilities

### 5. **Component Reusability**
- ❌ Each component has unique structure
- ❌ No reusable card component
- ✅ Change to: StatsCard + StatsGrid pattern

### 6. **Color System**
- ❌ Inline colors, not using design tokens
- ✅ Change to: $color-* variables from design-tokens

### 7. **Mobile Performance**
- ❌ Charts may not scale well on mobile
- ❌ Tables not optimized for mobile
- ✅ Change to: Responsive aspect ratios, card-based tables

---

## Migration Path

### Step 1: Update Page Structure
```jsx
// Before
<main className="section statsPage">
  <div className="shell-large">
    <div className="section__body">
      <div className="articles">

// After
<main className="statspage container">
  <MetaTags>...</MetaTags>
```

### Step 2: Add New Components
- Create: `StatsCard.jsx` + `StatsCard.scss`
- Create: `StatsGrid.jsx` + `StatsGrid.scss`
- Create: `StatsChart.jsx` + `StatsChart.scss`
- Create: `HeroSection.jsx` + `HeroSection.scss`

### Step 3: Refactor Existing Components
- Refactor: `StatsShow` → Use StatsCard + StatsGrid
- Refactor: `LinearCharts` → Wrap with StatsChart
- Refactor: `Income` → Create IncomeStats with responsive table
- Refactor: `Price` → Create PriceStats with card layout
- Refactor: `Investment` → Create InvestmentStats with orange bg
- Refactor: `Blockchain` → Create BlockchainStats with dark bg
- Refactor: `WorldMap` → Add responsive container

### Step 4: Remove Legacy Styles
- Remove: `.shell-large`, `.article`, `.articles`, `.cols`, etc.
- Update: All padding, gaps, fonts to use design tokens
- Update: All colors to use design tokens

### Step 5: Add SCSS Files
- Create: `src/scss/_stats.scss`
- Create: Component-level `.scss` files for each section
- Import all into main styles.scss

---

## API Data Structure (Current)

```javascript
{
  stats: {
    mn_stats: {
      enabled: "100,000",           // Total SentryNodes
      circulation: "21,000,000",    // Circulating coins
      max_supply: "21,000,000",     // Max supply
      transactions: "21,598,256",   // Total transactions
      block_height: "458,789",      // Current block height
      average_block_time: "60s",    // Avg block time
      first_pay: "1d 1h",          // Calculated
      reward_eligble: "4d 2h",     // Calculated (sic spelling in API)
      new_start_required: 0,
      sentinel_ping_expired: 0
    },
    income_stats: {
      // Income data by seniority level
    },
    income_stats_seniority_one_year: {
      // 1-year seniority data
    },
    income_stats_seniority_two_year: {
      // 2.5-year seniority data
    },
    price_stats: {
      price_sys: "$99.01",
      price_btc: "0.002 BTC",
      high_24h: "$100.50",
      low_24h: "$98.50",
      change_24h: "+2.5%"
    },
    blockchain_stats: {
      difficulty: "5000.0-0.4",
      hash_rate: "700TH",
      block_time: "June 20 2024 4:30:00PM",
      supply: "15,500,000 SYS"
    }
  },
  mapData: {
    // Node distribution data
  },
  mapFills: {
    // Map coloring data
  }
}
```

### Important Notes:
- `reward_eligble` has typo in API (should be `reward_eligible`)
- Data comes from two sources:
  - https://syscoin.dev/mnstats (primary)
  - ${API_URI}/statsInfo/mnStats (custom data)
- Keep API call logic intact, only update presentation

---

## Performance Considerations

### Current
- Chart library: AnyChart (via import)
- Map library: Likely Leaflet or Mapbox
- No code splitting or lazy loading
- All components load on page render

### After Redesign
- Keep same libraries (don't replace)
- Consider lazy loading for heavy components
- Optimize chart rendering for mobile
- Ensure map responsive on all devices
- Test performance on mobile devices

---

## Browser Compatibility

Current stack targets:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Bootstrap 5 compatible environments

No changes needed to compatibility layer - focus on responsive design.

---

## Next Implementation Steps

1. ✅ Analyze current state (this document)
2. ⏭️ Create new component structure
3. ⏭️ Update Stats.js page layout
4. ⏭️ Build reusable components (StatsCard, StatsGrid)
5. ⏭️ Create new section components
6. ⏭️ Refactor existing components one by one
7. ⏭️ Create SCSS files with design tokens
8. ⏭️ Test responsive behavior
9. ⏭️ Verify API data still works
10. ⏭️ Polish and optimize

---

## Files to Modify

**Create (New)**:
```
src/components/Stats/
├── index.js
├── HeroSection.jsx
├── HeroSection.scss
├── StatsCard.jsx
├── StatsCard.scss
├── StatsGrid.jsx
├── StatsGrid.scss
├── StatsChart.jsx
├── StatsChart.scss
├── sections/
│   ├── IncomeStats.jsx
│   ├── IncomeStats.scss
│   ├── PriceStats.jsx
│   ├── PriceStats.scss
│   ├── InvestmentStats.jsx
│   ├── InvestmentStats.scss
│   ├── BlockchainStats.jsx
│   └── BlockchainStats.scss
└── (refactored versions of existing components)

src/scss/
├── _stats.scss (NEW - main import)
└── (component-specific imports)
```

**Modify**:
```
src/pages/Stats.js              (restructure page layout)
src/components/stats/           (refactor existing components)
src/scss/styles.scss            (import _stats.scss)
```

**Remove**:
```
Legacy CSS classes from Stats page
```

---

## Verification Checklist

After implementation, verify:

- [ ] Page loads without errors at http://localhost:3000/stats
- [ ] All API data displays correctly
- [ ] Charts render on desktop
- [ ] Maps render and are interactive
- [ ] Mobile layout is responsive (<768px)
- [ ] Tablet layout is responsive (768px-991px)
- [ ] Desktop layout is responsive (≥992px)
- [ ] No horizontal scrolling on any device
- [ ] Colors match Figma design
- [ ] Typography sizes match design spec
- [ ] Spacing matches design token values
- [ ] No console errors
- [ ] Performance acceptable on mobile
