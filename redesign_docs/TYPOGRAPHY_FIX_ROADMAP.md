# TYPOGRAPHY FIX ROADMAP
## About Page - From Audit to Implementation

**Date:** 2025-11-12
**Status:** Audit Complete | Implementation Ready
**Total Fixes Required:** 7 issues across 4 priority levels
**Estimated Total Time:** 90 minutes

---

## QUICK SUMMARY

### ✅ ALREADY FIXED (1 item)
- Hero H1 typography (DM Sans, 45px, 600, 1.3) - COMPLETE

### 🔴 CRITICAL FIXES NEEDED (1 item)
- Feature cards section title font family (serif → sans-serif)

### 🟠 HIGH PRIORITY FIXES (2 items)
- Hero description line-height and color
- Governance/Rewards/Seniority section titles font family

### 🟡 MEDIUM PRIORITY (3 items)
- Feature card text line-height
- Body text line-height standardization
- Seniority card titles font family

### 🟢 LOW PRIORITY (1 item)
- Requirements list line-height (minimal impact)

---

## DETAILED FIX CHECKLIST

### PHASE 1: CRITICAL FIXES (15 minutes)
**Target:** Prevent serif fonts from rendering in main headings

#### Fix 1: Feature Cards Section Title
**File:** `/Users/ted/syscoin/syshub/src/scss/_about-cards.scss` (line 14-18)
**Severity:** 🔴 CRITICAL
**Current:** Uses H2 mixin (serif, bold, 40px)
**Figma Spec:** DM Sans sans-serif, 38px, weight 400

**EXACT CODE TO IMPLEMENT:**

In `/src/scss/_design-tokens.scss` (after line 110), add:
```scss
// Feature/Section titles - matches Figma design (all sans-serif, not serif)
@mixin typography-section-h2 {
  font-family: $font-family-body;           // DM Sans (not serif!)
  font-size: 38px;                          // Exact Figma size
  font-weight: $font-weight-regular;        // 400 Regular (not bold)
  line-height: 1.3;                         // 130% per Figma
  letter-spacing: 0;
}
```

In `/src/scss/_about-cards.scss` (line 14), change:
```scss
// FROM:
&__title {
  @include typography-h2;

// TO:
&__title {
  @include typography-section-h2;
```

**Estimated Time:** 3 minutes
**Impact:** Feature cards section title will render in clean sans-serif

---

### PHASE 2: HIGH PRIORITY FIXES (10 minutes)
**Target:** Fix color and line-height mismatches in main content

#### Fix 2: Hero Description Text
**File:** `/Users/ted/syscoin/syshub/src/scss/_about-hero.scss` (line 35-40)
**Severity:** 🟠 HIGH
**Issue 1 - Line Height:** Currently 1.8, should be 1.3
**Issue 2 - Color:** Currently #CCCCCC (gray), should be #FFFFFF (white)

**EXACT CODE TO IMPLEMENT:**
```scss
// FROM:
&__description {
  @include typography-body-large-regular;
  color: $color-text-secondary;
  line-height: 1.8;  // ← REMOVE THIS LINE
  margin-bottom: 0;
}

// TO:
&__description {
  @include typography-body-large-regular;
  color: $color-text;           // Change from $color-text-secondary
  line-height: 1.3;             // Change from 1.8
  margin-bottom: 0;
}
```

**Estimated Time:** 2 minutes
**Impact:** Hero description will be brighter white and more compact

---

#### Fix 3: Governance & Rewards Section Titles
**Files:**
- `/src/scss/_about-governance.scss` (line 41-50)
- `/src/scss/_about-rewards.scss` (similar structure)
- `/src/scss/_about-seniority.scss` (line 41-50)

**Severity:** 🟠 HIGH
**Current:** All use H2 mixin (serif, bold, line-height 1.2)
**Figma Spec:** Should use sans-serif, bold, line-height 1.3

**EXACT CODE TO IMPLEMENT:**

For each file (`_about-governance.scss`, `_about-rewards.scss`, `_about-seniority.scss`):

First, add section-title mixin to `_design-tokens.scss`:
```scss
// Section titles with emphasis (Governance, Rewards, Seniority)
@mixin typography-section-title-bold {
  font-family: $font-family-body;           // DM Sans (not serif!)
  font-size: 40px;
  font-weight: $font-weight-bold;           // 700 Bold
  line-height: 1.3;                         // Change from 1.2
  letter-spacing: 0;
}
```

Then update each section title:
```scss
// GOVERNANCE
&__title {
  @include typography-section-title-bold;  // Changed from typography-h2
  color: $color-text;
  margin-bottom: $space-lg;
  // Remove line-height: 1.2 override
}
```

**Estimated Time:** 5 minutes (for all 3 sections)
**Impact:** Section titles will render in clean sans-serif consistent with design

---

### PHASE 3: MEDIUM PRIORITY FIXES (20 minutes)
**Target:** Standardize line-heights across body text

#### Fix 4: Feature Card Text Line-Height
**File:** `/src/scss/_about-cards.scss` (line 77-82)
**Severity:** 🟡 MEDIUM
**Current:** 1.5 (overriding mixin)
**Figma Spec:** 1.3

**EXACT CODE TO IMPLEMENT:**
```scss
// FROM:
&__text {
  @include typography-body-medium-regular;
  color: $color-text;
  margin-bottom: 0;
  line-height: 1.5;  // ← CHANGE THIS

// TO:
&__text {
  @include typography-body-medium-regular;
  color: $color-text;
  margin-bottom: 0;
  line-height: 1.3;  // ← CHANGED
}
```

**Estimated Time:** 2 minutes
**Impact:** Card text will be slightly more compact, matching Figma

---

#### Fix 5: Body Text Line-Height Standardization
**Files:**
- `/src/scss/_about-governance.scss` (description text)
- `/src/scss/_about-rewards.scss` (description text)
- `/src/scss/_about-seniority.scss` (description text)

**Severity:** 🟡 MEDIUM
**Current:** Various (1.5, 1.8 with manual overrides)
**Figma Spec:** 1.3 throughout

**EXACT CODE TO IMPLEMENT:**

For all long-form description paragraphs, change line-height from 1.8 or 1.5 to 1.3:
```scss
&__description {
  @include typography-body-large-regular;
  color: $color-text;
  line-height: 1.3;  // Standardize to Figma (was 1.8 or 1.5)
  margin-bottom: $space-2xl;
}
```

**Affected locations:**
- Governance description (near line 60)
- Rewards description (near line 65)
- Seniority description (near line 65)

**Estimated Time:** 10 minutes
**Impact:** All body text will have consistent, relaxed Figma-standard spacing

---

#### Fix 6: Seniority Card Titles Font Family
**File:** `/src/scss/_about-seniority.scss`
**Severity:** 🟡 MEDIUM
**Current:** Uses H2/H3 mixin (serif)
**Figma Spec:** DM Sans sans-serif

**EXACT CODE TO IMPLEMENT:**
Find all `.card__title` or similar elements and update:
```scss
&__title {
  @include typography-section-h2;  // Use section-h2 mixin (sans-serif)
  color: $color-text;
  // ... other properties
}
```

**Estimated Time:** 3 minutes
**Impact:** Seniority card titles will match section title styling

---

### PHASE 4: LOW PRIORITY FIXES (5 minutes)
**Target:** Minor cleanup and consistency

#### Fix 7: Requirements List Line-Height
**File:** `/src/scss/` (requirements section)
**Severity:** 🟢 LOW
**Current:** 1.5
**Figma Spec:** 1.3

**EXACT CODE TO IMPLEMENT:**
```scss
// For requirement list items:
line-height: 1.3;  // Change from 1.5
```

**Estimated Time:** 1 minute
**Impact:** Minimal visual impact, maintains consistency

---

## LONG-TERM IMPROVEMENTS (Optional, 30 minutes)

### Update Design Token Defaults
**File:** `/src/scss/_design-tokens.scss`

After implementing all fixes above, consider updating the core design tokens for future consistency:

```scss
// CHANGE: Line-height defaults to match Figma's consistent 1.3 approach
$line-height-normal: 1.3;    // Was 1.5 (Figma uses 1.3 consistently)

// CHANGE: Document font family philosophy
// ALL typography in design uses DM Sans sans-serif exclusively
// No serif fonts are used in the Figma design system
```

**Benefit:** Reduces need for manual overrides in component files
**Risk:** May affect other pages using old line-height values (review needed)
**Recommendation:** Only do this if audit of other pages is performed first

---

## IMPLEMENTATION SEQUENCE

### Recommended Order for Minimal Risk:

1. **Step 1 (3 min):** Add `typography-section-h2` and `typography-section-title-bold` mixins to `_design-tokens.scss`
2. **Step 2 (2 min):** Fix hero description (line-height 1.3, color #FFFFFF)
3. **Step 3 (8 min):** Update feature cards, governance, rewards, seniority section titles to use new sans-serif mixins
4. **Step 4 (12 min):** Update all body text line-heights to 1.3
5. **Step 5 (3 min):** Update seniority card titles
6. **Step 6 (1 min):** Update requirements line-height
7. **Step 7 (5 min):** Test and verify all changes

**Total Time:** 34 minutes for critical + high priority fixes
**Total Time:** 90 minutes including all medium/low priority and testing

---

## VERIFICATION CHECKLIST

After implementing each fix, verify:

- [ ] Hero title: DM Sans, 45px, 600, 1.3 (ALREADY FIXED)
- [ ] Hero description: DM Sans, 18px, 400, 1.3, #FFFFFF white
- [ ] Feature cards title: DM Sans, 38px, 400, 1.3, centered
- [ ] Feature card text: DM Sans, 16px, 400, 1.3, #FFFFFF
- [ ] Governance title: DM Sans, 40px, 700, 1.3, #FFFFFF
- [ ] Governance description: DM Sans, 18px, 400, 1.3
- [ ] Rewards title: DM Sans, 40px, 700, 1.3, #FFFFFF
- [ ] Rewards description: DM Sans, 18px, 400, 1.3
- [ ] Seniority title: DM Sans, 40px, 700, 1.3, #FFFFFF
- [ ] Seniority description: DM Sans, 18px, 400, 1.3
- [ ] Seniority cards: DM Sans sans-serif headings
- [ ] Requirements items: Line-height 1.3
- [ ] No serif fonts visible anywhere on page
- [ ] Visual comparison with Figma matches
- [ ] Browser DevTools shows correct computed styles
- [ ] No console errors

---

## DEVELOPER RESOURCES

### Files Referencing Figma Specifications:
- **COMPREHENSIVE_TYPOGRAPHY_AUDIT_REPORT.md** - Full audit with exact details
- **FIGMA_TYPOGRAPHY_AUDIT.md** - Design system analysis
- **TYPOGRAPHY_CROSS_CHECK.md** - Figma vs implementation comparison
- **ABOUT_PAGE_IMPLEMENTATION_PLAN.md** - Updated with typography specs

### Key Principles for All Fixes:
1. **All typography uses DM Sans** (no serif fonts anywhere)
2. **Line-height is 1.3 consistently** (not 1.2, not 1.5, not 1.8)
3. **SemiBold (600) for emphasis**, Bold (700) for section headings
4. **Color #FFFFFF for primary text**, #CCCCCC for secondary only when specified
5. **No letter-spacing adjustments** unless explicitly required

---

## NEXT STEPS

**Option 1: Use Component-Builder Agent (Recommended)**
Launch component-builder to implement all fixes automatically with verification.

**Option 2: Manual Implementation**
Follow the exact code examples in this roadmap, section by section.

**Option 3: Selective Implementation**
Implement only critical and high-priority fixes (Phase 1 & 2) for immediate production readiness, then tackle medium/low priority later.

---

**Prepared By:** Claude Code (Senior Frontend Engineer)
**Date:** 2025-11-12
**Status:** 🟢 READY FOR IMPLEMENTATION
