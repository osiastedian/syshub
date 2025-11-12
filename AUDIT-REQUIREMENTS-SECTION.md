# Requirements Section Audit Report
**Syscoin SentryNodes - About Page**

---

## Executive Summary

This audit compares the current implementation of the "Requirements to Setup a Syscoin Sentry Node" section against the Figma design specification (Node ID: 2017-2577). The analysis reveals **significant visual discrepancies** across layout, typography, spacing, iconography, and overall design fidelity.

**Audit Date:** 2025-11-12
**Figma Design:** https://www.figma.com/design/azvuitP9PvixRa2SM1sLXj/SentryNodes?node-id=2017-2577
**Current Implementation:**
- Component: `/Users/ted/syscoin/syshub/src/components/About/RequirementsSection.jsx`
- Styles: `/Users/ted/syscoin/syshub/src/scss/_about-requirements.scss`

### Critical Findings Summary
- **14 Major Discrepancies** requiring immediate attention
- **Layout structure** completely different from design
- **Typography** mismatches in size, weight, and line-height
- **Iconography** using wrong icon type (Font Awesome vs SVG arrow)
- **Spacing** inconsistencies throughout
- **Missing design elements** (circular gold bullet indicators)

---

## Detailed Discrepancy Analysis

### 1. SECTION CONTAINER & LAYOUT

#### Issue 1.1: Section Padding (CRITICAL)
**Priority:** Critical
**Location:** Section container wrapper

**Current State:**
```scss
.about-requirements {
  padding: $space-3xl 0; // 64px 0
}
```
- Vertical padding: 64px top/bottom
- Horizontal padding: Relies on Bootstrap container (varies)

**Expected State (Figma):**
```scss
padding: 100px 180px;
```
- Vertical padding: 100px top/bottom
- Horizontal padding: 180px left/right

**Discrepancy:**
- Vertical padding is 36px too small (64px vs 100px)
- Horizontal padding is completely different (uses Bootstrap container vs fixed 180px)

---

#### Issue 1.2: Content Max Width (HIGH)
**Priority:** High
**Location:** Requirements list container

**Current State:**
```scss
&__list {
  max-width: 800px;
}
```

**Expected State (Figma):**
```scss
width: 993px;
```

**Discrepancy:** Content container is 193px narrower than design specification (800px vs 993px)

---

#### Issue 1.3: Section Gap Between Title and List (MEDIUM)
**Priority:** Medium
**Location:** Gap between title and requirements list

**Current State:**
```scss
&__title {
  margin-bottom: $space-2xl; // 48px
}
```

**Expected State (Figma):**
```
gap: 60px;
```

**Discrepancy:** Gap is 12px too small (48px vs 60px)

---

### 2. TYPOGRAPHY

#### Issue 2.1: Section Title Font Size (CRITICAL)
**Priority:** Critical
**Location:** Section heading "Requirements to Setup a Syscoin Sentry Node"

**Current State:**
```scss
&__title {
  @include typography-section-h2;
  // font-size: 38px;
  // font-weight: 400 (Regular);
  // line-height: 1.3;
}
```

**Expected State (Figma):**
```
font-family: 'DM Sans', sans-serif;
font-size: 38px;
font-weight: 400 (Regular);
line-height: 1.3 (130%);
color: #FFFFFF;
text-align: center;
```

**Discrepancy:**
- Font size is CORRECT (38px)
- Font weight is CORRECT (400)
- Line-height is CORRECT (1.3)
- **Text alignment may be centered via Bootstrap but not explicitly defined**
- Uses typography mixin which is correct

**Status:** MOSTLY CORRECT - Need to verify text-align: center is applied

---

#### Issue 2.2: List Item Font Size (HIGH)
**Priority:** High
**Location:** Each requirement list item text

**Current State:**
```scss
&__item {
  @include typography-body-medium-regular;
  // font-size: 16px;
  // font-weight: 400;
  // line-height: 1.5;
}
```

**Expected State (Figma):**
```
font-family: 'DM Sans', sans-serif;
font-size: 18px;
font-weight: 400 (Regular);
line-height: 1.3 (130%);
color: #FFFFFF;
```

**Discrepancy:**
- Font size is 2px too small (16px vs 18px)
- Line-height is incorrect (1.5 vs 1.3)
- Should use `typography-body-large-regular` mixin instead

---

### 3. ICONOGRAPHY & BULLET POINTS

#### Issue 3.1: Icon Type (CRITICAL)
**Priority:** Critical
**Location:** Bullet point indicators before each requirement

**Current State:**
```jsx
<i className="fa fa-angle-right"></i>
```
Uses Font Awesome icon `fa-angle-right`

**Expected State (Figma):**
```jsx
// SVG arrow icon in circular gold background
<div className="about-requirements__icon">
  <img src={arrowIcon} alt="" />
</div>
```
- SVG arrow icon (vuesax/linear/arrow-right)
- 8x8px icon size
- Wrapped in circular container

**Discrepancy:** Completely wrong icon implementation - using Font Awesome text icon instead of SVG graphic

---

#### Issue 3.2: Icon Container Background (CRITICAL)
**Priority:** Critical
**Location:** Icon wrapper element

**Current State:**
```scss
i {
  color: $color-primary; // #FBB03B
  margin-right: $space-sm; // 12px
}
```
Icon is rendered as text with gold color, no background container

**Expected State (Figma):**
```scss
.about-requirements__icon {
  background-color: #FBB03B; // var(--brand/gold)
  border-radius: 500px; // Full circle
  padding: 4px;
  width: 16px; // 8px icon + 4px padding each side
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**Discrepancy:**
- Missing circular background container
- Missing border-radius for circle shape
- Missing proper padding
- Icon not contained in proper visual treatment

---

#### Issue 3.3: Icon to Text Spacing (MEDIUM)
**Priority:** Medium
**Location:** Gap between icon and requirement text

**Current State:**
```scss
i {
  margin-right: $space-sm; // 12px
}
```

**Expected State (Figma):**
```
gap: 16px;
```

**Discrepancy:** Gap is 4px too small (12px vs 16px)

---

### 4. LIST LAYOUT & STRUCTURE

#### Issue 4.1: List Item Layout Direction (HIGH)
**Priority:** High
**Location:** Each requirement item structure

**Current State:**
```jsx
<li className="about-requirements__item">
  <i className="fa fa-angle-right"></i> {t(key)}
</li>
```
Icon and text are inline, no explicit flex container

**Expected State (Figma):**
```jsx
<div className="about-requirements__item">
  <div className="about-requirements__icon">...</div>
  <p className="about-requirements__text">{t(key)}</p>
</div>
```
```scss
&__item {
  display: flex;
  align-items: center;
  gap: 16px;
}
```

**Discrepancy:**
- Should use explicit flex container
- Should use div instead of li (Figma shows divs, not semantic list)
- Gap property not used

---

#### Issue 4.2: List Item Vertical Spacing (MEDIUM)
**Priority:** Medium
**Location:** Space between each requirement item

**Current State:**
```scss
&__item {
  padding: $space-md 0; // 16px top/bottom
  border-bottom: 1px solid $color-border;
}
```
Creates 32px total spacing (16px + 16px) with visual separator

**Expected State (Figma):**
```
gap: 16px; // Between items in flex column
```
No border-bottom, just 16px gap

**Discrepancy:**
- Total spacing is correct (32px current ~= 16px gap Figma)
- But implementation differs: uses padding + border vs gap
- **Border-bottom should be removed** (not in Figma design)

---

#### Issue 4.3: Border Bottom on List Items (HIGH)
**Priority:** High
**Location:** Each requirement item

**Current State:**
```scss
&__item {
  border-bottom: 1px solid $color-border;

  &:last-child {
    border-bottom: none;
  }
}
```

**Expected State (Figma):**
No border-bottom on any items

**Discrepancy:** Borders should be completely removed - not present in Figma design

---

### 5. INTERACTIVE STATES

#### Issue 5.1: Hover State (MEDIUM)
**Priority:** Medium
**Location:** List item hover effects

**Current State:**
```scss
&:hover {
  color: $color-primary; // #FBB03B
  padding-left: $space-sm; // 12px
}
```

**Expected State (Figma):**
No hover states defined in Figma design

**Discrepancy:**
- Current implementation adds hover effects not in design
- Recommendation: **Remove hover effects** or confirm with design team if intentional enhancement

---

### 6. SEMANTIC HTML STRUCTURE

#### Issue 6.1: List Element Type (MEDIUM)
**Priority:** Medium
**Location:** Requirements list wrapper

**Current State:**
```jsx
<ul className="about-requirements__list">
  <li className="about-requirements__item">...</li>
</ul>
```
Uses semantic HTML `<ul>` and `<li>` elements

**Expected State (Figma):**
```jsx
<div className="about-requirements__list">
  <div className="about-requirements__item">...</div>
</div>
```
Figma shows divs with flex column layout

**Discrepancy:**
- Current uses semantic HTML (better for accessibility)
- Figma uses divs
- **Recommendation:** Keep semantic `<ul>`/`<li>` but match visual styling to Figma

---

### 7. RESPONSIVE DESIGN

#### Issue 7.1: Mobile Padding (MEDIUM)
**Priority:** Medium
**Location:** Section container on mobile

**Current State:**
```scss
@media (max-width: $breakpoint-md) {
  padding: $space-2xl 0; // 48px 0
}
```

**Expected State (Figma):**
Not specified in Figma design (only desktop shown)

**Discrepancy:**
- Mobile responsive styles exist but no Figma spec to compare
- **Recommendation:** Maintain current responsive approach but adjust to match desktop proportions

---

### 8. TRANSLATION CONTENT DISCREPANCIES

#### Issue 8.1: Requirement #6 Text Mismatch (LOW)
**Priority:** Low
**Location:** 6th requirement item

**Current State (Translation):**
```
r6: '4GB swap (if less than 8GB real RAM) Will need to use SSD if using Swap',
```

**Expected State (Figma):**
```
4GB RAM (real) minimum (8GB RAM preferred); 4GB swap (if less than 8gb real RAM) Will need to use SSD if using Swap
```

**Discrepancy:**
- Translation file has r5 and r6 as separate items
- Figma shows them potentially as one combined item
- Content matches but structure differs

---

#### Issue 8.2: Requirement #7 Text Mismatch (LOW)
**Priority:** Low
**Location:** 7th requirement item

**Current State (Translation):**
```
r7: '80GB Disk Space (100GB + SSD preferred).',
```

**Expected State (Figma):**
```
80GB+ SSD Hard Disk (100GB+ Recommended)
```

**Discrepancy:** Wording is slightly different but conveys same meaning

---

## Priority Matrix

### CRITICAL (Must Fix)
1. **Icon Implementation** - Replace Font Awesome with SVG arrow in circular gold container
2. **Section Padding** - Change from 64px to 100px vertical, add 180px horizontal
3. **Icon Container Background** - Add circular gold background with proper sizing

### HIGH (Should Fix)
4. **Content Max Width** - Change from 800px to 993px
5. **List Item Font Size** - Change from 16px to 18px
6. **List Item Line Height** - Change from 1.5 to 1.3
7. **Border Bottom** - Remove borders from all list items
8. **List Item Layout** - Implement proper flex container structure

### MEDIUM (Nice to Fix)
9. **Section Title to List Gap** - Change from 48px to 60px
10. **Icon to Text Spacing** - Change from 12px to 16px
11. **List Item Spacing** - Remove padding, use gap property
12. **Hover States** - Remove or confirm if intentional
13. **Responsive Padding** - Adjust to maintain design proportions
14. **Text Alignment** - Ensure title is explicitly centered

### LOW (Minor/Content)
15. **Translation Content** - Minor wording differences in requirements text

---

## Developer Prompts for Implementation

### Prompt 1: Update Section Container Styling (CRITICAL)
**File:** `/Users/ted/syscoin/syshub/src/scss/_about-requirements.scss`

```scss
.about-requirements {
  // Change from: padding: $space-3xl 0;
  // To:
  padding: 100px 180px;
  background-color: $color-surface;

  @media (max-width: $breakpoint-md) {
    // Maintain proportional spacing for mobile
    padding: 60px $space-lg;
  }
}
```

**Why:** Section padding must be 100px vertical and 180px horizontal per Figma spec (Node 2017:2577)

---

### Prompt 2: Update Title Styling and Ensure Center Alignment (MEDIUM)
**File:** `/Users/ted/syscoin/syshub/src/scss/_about-requirements.scss`

```scss
&__title {
  @include typography-section-h2; // This is correct - 38px, Regular, 1.3 line-height
  color: $color-text;
  text-align: center; // Explicitly ensure centered
  margin-bottom: 60px; // Change from $space-2xl (48px)

  @media (max-width: $breakpoint-md) {
    font-size: $font-size-h3;
    margin-bottom: $space-xl;
  }
}
```

**Why:** Gap between title and list should be 60px per Figma, ensure text-align: center is explicit

---

### Prompt 3: Update List Container Width (HIGH)
**File:** `/Users/ted/syscoin/syshub/src/scss/_about-requirements.scss`

```scss
&__list {
  list-style: none;
  padding: 0;
  margin: 0;
  // Change from: max-width: 800px;
  // To:
  width: 993px;
  max-width: 100%; // Allow responsive shrinking
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 16px; // Add gap between items
}
```

**Why:** List container should be 993px wide with 16px gap between items per Figma design

---

### Prompt 4: Create Icon SVG Asset (CRITICAL)
**File:** Create new file `/Users/ted/syscoin/syshub/src/assets/icons/arrow-right-requirement.svg`

```svg
<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Add the arrow-right icon SVG content from Figma export -->
  <!-- This is a placeholder - export actual icon from Figma -->
  <path d="..." fill="currentColor"/>
</svg>
```

**Note:** Export the exact arrow icon from Figma (Node ID: I2017:2596;40000032:2953) and place in assets

---

### Prompt 5: Update List Item Structure and Styling (CRITICAL)
**File:** `/Users/ted/syscoin/syshub/src/scss/_about-requirements.scss`

```scss
&__item {
  // Remove old styles:
  // @include typography-body-medium-regular;
  // padding: $space-md 0;
  // border-bottom: 1px solid $color-border;
  // line-height: 1.5;
  // &:last-child { border-bottom: none; }
  // &:hover { color: $color-primary; padding-left: $space-sm; }

  // Add new styles:
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

&__icon {
  background-color: $color-brand-gold; // #FBB03B
  border-radius: 500px; // Full circle
  padding: 4px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; // Prevent icon from shrinking
  overflow: hidden;

  img {
    width: 8px;
    height: 8px;
    display: block;
  }
}

&__text {
  @include typography-body-large-regular; // 18px, not 16px
  color: $color-text;
  line-height: 1.3; // Change from 1.5 to 1.3
  margin: 0;
  flex: 1;
}
```

**Why:**
- List items need flex layout with 16px gap
- Icon needs circular gold background per Figma
- Text needs to be 18px with 1.3 line-height per Figma
- Remove borders and hover effects not in design

---

### Prompt 6: Update Component JSX Structure (CRITICAL)
**File:** `/Users/ted/syscoin/syshub/src/components/About/RequirementsSection.jsx`

```jsx
import React from "react";
import { withTranslation } from "react-i18next";
import ArrowIcon from "../../assets/icons/arrow-right-requirement.svg";

const RequirementsSection = ({ t }) => {
  const requirementKeys = [
    "about.requirements.requirement.r1",
    "about.requirements.requirement.r2",
    "about.requirements.requirement.r3",
    "about.requirements.requirement.r4",
    "about.requirements.requirement.r5",
    "about.requirements.requirement.r6",
    "about.requirements.requirement.r7",
    "about.requirements.requirement.r8",
  ];

  return (
    <section className="about-requirements">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="about-requirements__title">
              {t("about.requirements.title")}
            </h2>
            <ul className="about-requirements__list">
              {requirementKeys.map((key) => (
                <li key={key} className="about-requirements__item">
                  <div className="about-requirements__icon">
                    <img src={ArrowIcon} alt="" />
                  </div>
                  <p className="about-requirements__text">{t(key)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation()(RequirementsSection);
```

**Why:**
- Replace `<i className="fa fa-angle-right"></i>` with proper icon container and SVG
- Add separate `__icon` and `__text` elements for proper styling
- Keep semantic `<ul>`/`<li>` for accessibility but style to match Figma
- Import and use SVG arrow icon

---

### Prompt 7: Verify Translation Content (LOW)
**File:** `/Users/ted/syscoin/syshub/src/shared/locales/en/pages/about/index.js`

Review requirement text for accuracy against Figma:
- r5: Should read "4GB RAM (real) minimum (8GB RAM preferred); 4GB swap (if less than 8gb real RAM) Will need to use SSD if using Swap"
- r7: Should read "80GB+ SSD Hard Disk (100GB+ Recommended)" (currently says "80GB Disk Space (100GB + SSD preferred).")

**Why:** Minor wording differences exist between translation and Figma design

---

### Prompt 8: Add Typography Mixin if Needed (MEDIUM)
**File:** `/Users/ted/syscoin/syshub/src/scss/_design-tokens.scss`

Verify `typography-body-large-regular` exists with correct specs:

```scss
@mixin typography-body-large-regular {
  font-family: $font-family-body; // 'DM Sans', sans-serif
  font-size: $font-size-body-large; // 18px
  font-weight: $font-weight-regular; // 400
  line-height: 1.3; // IMPORTANT: Should be 1.3 for this section, not 1.5
}
```

**Note:** Current design tokens show `line-height: $line-height-normal` (1.5) for body-large. For this requirements section specifically, we need 1.3 per Figma. Override in component styles.

---

## Implementation Checklist

Use this checklist to track implementation progress:

- [ ] **1. Update section container padding** (100px vertical, 180px horizontal)
- [ ] **2. Update list container width** (993px instead of 800px)
- [ ] **3. Update title bottom margin** (60px instead of 48px)
- [ ] **4. Export arrow icon SVG from Figma** and add to assets
- [ ] **5. Create icon container styles** (circular gold background, 16x16px)
- [ ] **6. Update list item layout** (flex with 16px gap)
- [ ] **7. Remove border-bottom from list items**
- [ ] **8. Remove hover effects from list items**
- [ ] **9. Update list item text styling** (18px font-size, 1.3 line-height)
- [ ] **10. Update component JSX** (add icon container, separate text element)
- [ ] **11. Import and use SVG arrow icon** in component
- [ ] **12. Test responsive behavior** on mobile/tablet
- [ ] **13. Review translation content** for accuracy
- [ ] **14. Cross-browser testing** (Chrome, Firefox, Safari)
- [ ] **15. Accessibility testing** (screen reader, keyboard navigation)

---

## Design System Recommendations

### Observation 1: Line-Height Inconsistency
The design tokens define `typography-body-large-regular` with `line-height: $line-height-normal` (1.5), but Figma specifies 1.3 for this section. Consider:

1. **Option A:** Create a new mixin `typography-requirements-text` with 1.3 line-height
2. **Option B:** Override line-height in component-specific SCSS (current approach)
3. **Option C:** Update global `line-height-normal` to 1.3 (may affect other components)

**Recommendation:** Use Option B - override in component SCSS to maintain specificity

---

### Observation 2: Icon System
Currently using Font Awesome icons throughout the site. This section requires SVG icons per Figma. Consider:

1. Establishing an icon system (Font Awesome vs SVG vs both)
2. Creating a reusable IconBullet component for similar use cases
3. Documenting when to use Font Awesome vs custom SVG

**Recommendation:** Create reusable `CircularBulletIcon` component for design system

---

### Observation 3: Spacing Scale Gaps
Figma specifies 60px gap (title to list) and 100px padding, but design tokens jump from:
- `$space-2xl: 48px`
- `$space-3xl: 64px`

No token for 60px or 100px exists.

**Recommendation:**
- Add `$space-4xl: 100px` to design tokens
- Use explicit 60px value or create `$space-2xl-plus: 60px` token

---

### Observation 4: Container Width Pattern
This section uses fixed width (993px) while other sections may use max-width (800px). Consider:

1. Establishing container width guidelines
2. Creating semantic width tokens ($container-narrow, $container-standard, $container-wide)
3. Documenting when to use each width

**Recommendation:** Add width tokens to design system for consistency

---

## Accessibility Considerations

### Current Implementation Strengths:
- Uses semantic HTML (`<ul>`, `<li>`)
- Proper heading hierarchy (`<h2>`)
- Text content is readable and properly translated

### Potential Issues to Address:
1. **Icon alt text:** Current `<i>` has no screen reader context, new `<img>` has `alt=""` which is correct for decorative icons
2. **List semantics:** Keep `<ul>`/`<li>` even though Figma shows divs (better for screen readers)
3. **Color contrast:** Verify gold icon (#FBB03B) on dark background meets WCAG AA standards (decorative, so less critical)
4. **Focus states:** No focus styles defined - add keyboard navigation support if items become interactive

---

## Testing Recommendations

### Visual Regression Testing
1. Take before/after screenshots at breakpoints: 320px, 768px, 1024px, 1440px, 1920px
2. Compare measurements using browser dev tools
3. Verify icon rendering across browsers
4. Check SVG rendering quality

### Cross-Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### Accessibility Testing
- Screen reader testing (VoiceOver, NVDA)
- Keyboard navigation
- Color contrast verification
- Zoom testing (up to 200%)

---

## Questions for Design Team

1. **Hover States:** Current implementation has hover effects (color change, padding shift). Figma doesn't show hover states. Should these be removed or are they intentional enhancements?

2. **Responsive Behavior:** Figma only shows desktop view. Should the 180px horizontal padding scale down proportionally on mobile, or follow current approach?

3. **Translation Content:** Minor wording differences exist in requirements #6 and #7. Which version is correct?

4. **Icon Source:** Can you provide the exact SVG export for the arrow icon, or should we use the Figma plugin to export?

5. **Semantic HTML:** Should we maintain `<ul>`/`<li>` structure for accessibility, or strictly match Figma's `<div>` structure?

---

## Estimated Implementation Time

**Total Estimated Time:** 4-6 hours

**Breakdown:**
- Icon asset creation and integration: 1-2 hours
- SCSS refactoring: 2-3 hours
- Component JSX updates: 1 hour
- Testing and QA: 1-2 hours
- Translation review: 0.5 hours

**Dependencies:**
- SVG icon export from Figma
- Design team confirmation on hover states
- Translation team review of content discrepancies

---

## Conclusion

The Requirements section implementation deviates significantly from the Figma design specification in several critical areas: iconography, spacing, typography, and layout structure. The most impactful changes needed are:

1. Replacing Font Awesome icons with SVG arrows in circular gold backgrounds
2. Adjusting section padding from 64px to 100px vertical
3. Increasing list item font size from 16px to 18px
4. Removing border-bottom decorations not present in design
5. Implementing proper flex layout with 16px gap

While the current implementation is functional and accessible, it does not match the visual design fidelity specified in Figma. Implementing the recommended changes will bring the component into full compliance with the design specification while maintaining accessibility best practices.

---

**Report Generated:** 2025-11-12
**Auditor:** Claude Code (UI Design Audit Agent)
**Next Steps:** Review with development team, prioritize fixes, begin implementation
