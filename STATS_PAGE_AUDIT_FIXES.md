# STATS PAGE REDESIGN - AUDIT FIXES (Developer Edition)

**Branch**: `claude/stats-page-redesign-phase1-2-011CV4D4ozR18KXiRrnnLRrk`
**Overall Status**: 70% Complete | 20 Issues Found | 8 CRITICAL

---

## PRIORITY 1: CRITICAL FIXES (Do First)

### 1. Fix Hero Title Font Size (CRITICAL)
**File**: `src/components/stats/HeroSection.scss`
**Issue**: Desktop: 38px (should be 32px), Mobile: 28px (should be 32px)
**Lines to Change**: 27, 40

**Fix**:
```scss
.stats-hero__title {
  font-size: 2rem; // 32px (currently 38px)

  @media (max-width: $breakpoint-md) {
    font-size: 2rem; // 32px (currently 28px)
  }
}
```

---

### 2. Fix Hero Title Two-Tone Color (CRITICAL)
**File**: `src/components/stats/HeroSection.jsx`
**Issue**: Title is all white, should be: "SENTRYNODES" = gold (#FBB03B), "STATS" = white
**Line**: 13

**Current**:
```jsx
<h1 className="stats-hero__title">SENTRYNODES STATS</h1>
```

**Replace With**:
```jsx
<h1 className="stats-hero__title">
  <span className="stats-hero__title-gold">SENTRYNODES </span>
  <span className="stats-hero__title-white">STATS</span>
</h1>
```

**Add to HeroSection.scss**:
```scss
.stats-hero__title-gold {
  color: $color-brand-gold;
}
.stats-hero__title-white {
  color: $color-neutral-white;
}
```

---

### 3. Fix Stat Card Mobile Value Size (CRITICAL)
**File**: `src/components/stats/StatsCard.scss`
**Issue**: Mobile values are 20px (should be 18px) - 2px too large
**Line**: 77

**Current**:
```scss
@media (max-width: $breakpoint-md) {
  font-size: 20px;
}
```

**Change to**:
```scss
@media (max-width: $breakpoint-md) {
  font-size: 1.125rem; // 18px
}
```

---

### 4. Fix Stat Card Mobile Label Size (CRITICAL)
**File**: `src/components/stats/StatsCard.scss`
**Issue**: Mobile labels are 14px (should be 12px) - 2px too large
**Line**: 47

**Current**:
```scss
@media (max-width: $breakpoint-md) {
  font-size: 14px;
}
```

**Change to**:
```scss
@media (max-width: $breakpoint-md) {
  font-size: 0.75rem; // 12px
}
```

---

### 5. Fix Stats Grid Mobile Gap (CRITICAL)
**File**: `src/components/stats/StatsGrid.scss`
**Issue**: Mobile gap is 24px (should be 16px) - 8px too large
**Line**: 15

**Current**:
```scss
.stats-grid {
  gap: $space-lg; // 24px everywhere
}
```

**Change to**:
```scss
.stats-grid {
  gap: $space-md; // 16px for mobile

  @media (min-width: $breakpoint-md) {
    gap: $space-lg; // 24px for tablet+
  }
}
```

---

### 6. Add Investment Section Orange Background (CRITICAL)
**File**: `src/scss/_stats.scss`
**Issue**: Investment section has no background color, should be full-width gold (#FBB03B)
**Lines**: After line 85

**Add**:
```scss
.stats-investment {
  background-color: $color-brand-gold;
  margin: 0 calc(-50vw + 50%);
  padding: $section-spacing-desktop calc(50vw - 50% + #{$space-container-desktop});

  .section-title {
    color: $color-neutral-black;
  }

  .stats-card__label,
  .stats-card__value,
  .stats-card__subvalue,
  .stats-card__unit {
    color: $color-neutral-black;
  }

  @media (max-width: $breakpoint-md) {
    padding: $section-spacing-mobile $space-container-mobile;
  }
}
```

---

### 7. Fix Chart Title Font Size (CRITICAL)
**File**: `src/components/stats/LinearCharts.scss` (or create if needed)
**Issue**: Chart titles appear small, should be 24px on all breakpoints

**Add/Update**:
```scss
.chart-heading {
  font-family: $font-family-body;
  font-size: $font-size-h4; // 24px
  font-weight: $font-weight-semi-bold;
  line-height: $line-height-tight;
  color: $color-neutral-white;
  text-align: center;
  margin-bottom: $space-md;

  @media (max-width: $breakpoint-md) {
    font-size: $font-size-h4; // Keep 24px
  }
}
```

---

### 8. Make Income Table Responsive (CRITICAL)
**File**: `src/components/stats/Income.js`
**Issue**: Table causes horizontal scroll on mobile, must convert to cards
**Lines**: 51-158

**Replace entire table section with**:
```jsx
<div className="income-stats-container">
  {/* Desktop table: hidden on mobile */}
  <table className="income-table d-none d-md-table">
    {/* Keep existing table code here */}
  </table>

  {/* Mobile cards: hidden on tablet+ */}
  <div className="income-cards d-md-none d-flex flex-column gap-4">
    {/* Card 1: Less than 1 Year */}
    <div className="income-card">
      <h4 className="income-card__title">Less than 1 Year</h4>
      <div className="income-card__content">
        <div className="income-row">
          <span className="income-row__label">Daily</span>
          <div className="income-row__values">
            <span>${this.state.incomeData.usd.daily}</span>
            <span>{this.state.incomeData.btc.daily} BTC</span>
            <strong>{this.state.incomeData.sys.daily} SYS</strong>
          </div>
        </div>
        {/* Weekly, Monthly, Yearly rows... */}
      </div>
    </div>

    {/* Card 2: 1+ Year */}
    {/* Card 3: 2.5+ Year */}
  </div>
</div>
```

**Create**: `src/components/stats/Income.scss`
```scss
.income-cards {
  .income-card {
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    padding: $space-lg;
  }

  .income-card__title {
    font-size: $font-size-h5;
    font-weight: $font-weight-semi-bold;
    color: $color-brand-gold;
    margin-bottom: $space-md;
  }

  .income-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-md 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    &:last-child {
      border-bottom: none;
    }
  }

  .income-row__label {
    font-size: $font-size-body-medium;
    color: $color-neutral-white;
  }

  .income-row__values {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: $space-sm;

    span {
      font-size: $font-size-body-medium;
      color: $color-neutral-white;
    }

    strong {
      font-weight: $font-weight-bold;
      color: $color-brand-gold;
    }
  }
}
```

---

## PRIORITY 2: HIGH PRIORITY FIXES

### 9. Add Income Section Title (HIGH)
**File**: `src/components/stats/Income.js`
**Issue**: Missing section title "INCOME STATS"
**Line**: 50

**Replace**:
```jsx
<h2 className="section-title">INCOME STATS</h2>
```

---

### 10. Add Price Section Title (HIGH)
**File**: `src/components/stats/Price.js`
**Issue**: Missing section title "PRICE STATS"
**Line**: 66

**Add**:
```jsx
<h2 className="section-title">PRICE STATS</h2>
```

---

### 11. Add Blockchain Section Title (HIGH)
**File**: `src/components/stats/Blockchain.jsx`
**Issue**: Missing section title "BLOCKCHAIN STATS"

**Add before component content**:
```jsx
<h2 className="section-title">BLOCKCHAIN STATS</h2>
```

---

### 12. Add WorldMap Section Title (HIGH)
**File**: `src/components/stats/WorldMap.js`
**Issue**: Missing section title "SENTRYNODES LOCATIONS"

**Add before map**:
```jsx
<h2 className="section-title">SENTRYNODES LOCATIONS</h2>
```

---

### 13. Create Standardized Section Title Component (HIGH)
**File**: `src/scss/_stats.scss`
**Issue**: Section titles not consistent across page
**Line**: After line 22

**Add**:
```scss
.section-title {
  font-family: $font-family-body;
  font-size: 2rem; // 32px
  font-weight: $font-weight-semi-bold;
  line-height: $line-height-tight;
  color: $color-neutral-white;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 $space-xl 0;

  @media (max-width: $breakpoint-md) {
    font-size: 2rem;
    margin-bottom: $space-lg;
  }

  &--black {
    color: $color-neutral-black;
  }
}
```

---

## PRIORITY 3: MEDIUM PRIORITY FIXES

### 14. Fix Chart Bar Fixed Height (MEDIUM)
**File**: Legacy chart styles or LinearCharts.scss
**Issue**: Chart bars don't have fixed height (should be 40px)

**Add**:
```scss
.chart-mini-hor {
  height: 40px;
  display: flex;
  border-radius: 3px;
  overflow: hidden;
}
```

---

### 15. Standardize Chart Legend (MEDIUM)
**File**: Legacy chart styles
**Issue**: Legend font size not consistent

**Add/Update**:
```scss
.char-mini-legend {
  display: flex;
  gap: $space-lg;
  justify-content: center;
  margin-top: $space-md;
  font-size: $font-size-body-medium; // 16px
  color: $color-neutral-white;

  @media (max-width: $breakpoint-md) {
    gap: $space-md;
  }
}
```

---

### 16. Add Price Section Mobile Layout (MEDIUM)
**File**: `src/components/stats/Price.js` or Price.scss
**Issue**: Price cards should show 2-column on mobile (not 1)

**Add to Price.scss or inline**:
```scss
.stats-price .stats-grid {
  @media (max-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}
```

---

### 17. Add Chart Container Spacing Adjustment (MEDIUM)
**File**: `src/components/stats/LinearCharts.scss`
**Issue**: Spacing between charts is inconsistent
**Line**: 8

**Change from**:
```scss
margin-top: 58px;
```

**To**:
```scss
margin-top: $space-xl; // 32px
```

---

### 18. Add Map Aspect Ratio (MEDIUM)
**File**: Create `src/components/stats/WorldMap.scss` or update existing
**Issue**: Map doesn't maintain proper aspect ratio

**Add**:
```scss
.world-map-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;

  @media (max-width: $breakpoint-md) {
    aspect-ratio: 4 / 3;
  }
}
```

---

## PRIORITY 4: LOW PRIORITY POLISH

### 19. Add Card Hover States (LOW)
**File**: `src/components/stats/StatsCard.scss`
**Issue**: No visual feedback on hover

**Add**:
```scss
.stats-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(251, 176, 59, 0.15);
  }
}
```

---

### 20. Verify Map Colors (LOW)
**File**: `src/components/stats/WorldMap.js`
**Issue**: Verify map uses correct design token colors

**Ensure**:
```javascript
const mapConfig = {
  defaultFill: '#808080',      // Gray
  selectedFill: '#FBB03B',     // Gold
  hoverFill: '#D87D10'        // Dark gold
};
```

---

## SUMMARY TABLE

| # | Issue | File | Severity | Status |
|---|-------|------|----------|--------|
| 1 | Hero title size | HeroSection.scss:27,40 | CRITICAL | Pending |
| 2 | Hero title color split | HeroSection.jsx:13 | CRITICAL | Pending |
| 3 | Card value mobile size | StatsCard.scss:77 | CRITICAL | Pending |
| 4 | Card label mobile size | StatsCard.scss:47 | CRITICAL | Pending |
| 5 | Grid gap mobile | StatsGrid.scss:15 | CRITICAL | Pending |
| 6 | Investment background | _stats.scss:85+ | CRITICAL | Pending |
| 7 | Chart title size | LinearCharts.scss | CRITICAL | Pending |
| 8 | Income table responsive | Income.js:51-158 | CRITICAL | Pending |
| 9 | Income title | Income.js:50 | HIGH | Pending |
| 10 | Price title | Price.js:66 | HIGH | Pending |
| 11 | Blockchain title | Blockchain.jsx | HIGH | Pending |
| 12 | WorldMap title | WorldMap.js | HIGH | Pending |
| 13 | Section title standard | _stats.scss:22+ | HIGH | Pending |
| 14 | Chart bar height | LinearCharts.scss | MEDIUM | Pending |
| 15 | Chart legend | LinearCharts.scss | MEDIUM | Pending |
| 16 | Price mobile layout | Price.scss | MEDIUM | Pending |
| 17 | Chart spacing | LinearCharts.scss:8 | MEDIUM | Pending |
| 18 | Map aspect ratio | WorldMap.scss | MEDIUM | Pending |
| 19 | Card hover states | StatsCard.scss | LOW | Pending |
| 20 | Map colors | WorldMap.js | LOW | Pending |

---

## IMPLEMENTATION NOTES

- **Total Files to Modify**: 12 files
- **New Files to Create**: 1 file (Income.scss)
- **Estimated Time**: 2-3 hours for full implementation
- **Test After Each Fix**: Verify changes at http://localhost:3000/stats
- **Responsive Testing Required**: Mobile (<768px), Tablet (768-991px), Desktop (≥992px)

---

## VERIFICATION CHECKLIST

After implementing all fixes:
- [ ] Hero title is 32px on desktop and mobile
- [ ] Hero title shows gold "SENTRYNODES" + white "STATS"
- [ ] Card values are correct sizes (24px desktop, 18px mobile)
- [ ] Card labels are correct sizes (16px desktop, 12px mobile)
- [ ] Grid gap is 24px desktop, 16px mobile
- [ ] Investment section has full-width gold background
- [ ] Investment text is black on gold
- [ ] Income table converts to cards on mobile
- [ ] All section titles are present and styled consistently
- [ ] Chart titles are 24px
- [ ] No horizontal scrolling on any device
- [ ] Page looks correct at all breakpoints
