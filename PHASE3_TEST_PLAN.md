# Phase 3 Test Plan - Visual Verification with Playwright

**Status:** Test Plan Created
**Date:** 2025-10-29
**Branch:** `redesign`
**Reference Image:** `tests/screenshots/homepage-full.png`

---

## Overview

Phase 3 focuses on implementing remaining component styles (tables, modals, icons) with design tokens. This test plan ensures all UI changes are verified against the design system and the homepage reference image.

---

## Visual Verification Components

### 1. Tables Component (`_tables.scss`)
**File:** `src/scss/_tables.scss`
**Visual Elements to Verify:**
- [ ] Table header styling (white text, proper padding)
- [ ] Table row backgrounds (alternating, hover effects)
- [ ] Status badge styling (gold accent for ENABLED badges)
- [ ] Border styling (using design tokens)
- [ ] Responsive table layout (mobile, tablet, desktop)
- [ ] Table hover states (row highlight with gold)
- [ ] Cell spacing and padding consistency

**Test Selectors:**
```css
.table-resp
.check_table
table thead
table tbody tr
tbody td .badge
```

**Design Token Verification:**
- Colors: `$color-primary`, `$color-surface-dark`, `$color-white`
- Spacing: `$space-*` variables
- Border radius: Design token mixins

---

### 2. Modal Component (`_modal.scss`)
**File:** `src/scss/_modal.scss`
**Visual Elements to Verify:**
- [ ] Backdrop overlay (blur effect, dark background)
- [ ] Modal container (rounded corners, shadow)
- [ ] Modal title section (border styling, spacing)
- [ ] Modal body (padding, content area)
- [ ] Modal footer (button spacing, alignment)
- [ ] Close button (hover state, gold accent)
- [ ] Modal animations (smooth entry/exit)
- [ ] Size variants (sm, md, lg)

**Test Selectors:**
```css
.backdrop
.modal
.modal-title
.modal-body
.modal-footer
.modal .close
```

**Design Token Verification:**
- Colors: `$color-black`, `$color-surface-dark`, `$color-primary`
- Transitions: `$transition-base`
- Spacing: `$space-*` variables
- Shadows: `$shadow-*` variables

---

### 3. Icons Component (`_icons.scss`)
**File:** `src/scss/_icons.scss`
**Visual Elements to Verify:**
- [ ] Icon sizing (small, medium, large variants)
- [ ] Icon color variants (primary gold, secondary blue)
- [ ] Social icons styling (footer, nav)
- [ ] Icon hover states (gold highlight)
- [ ] Icon focus states (accessibility)
- [ ] Icon animations (rotation, transforms)

**Test Selectors:**
```css
.ico-facebook
.ico-twitter
.ico-instagram
.ico-bitcoin
.socials li
```

**Design Token Verification:**
- Colors: `$color-primary`, `$color-secondary`, `$color-white`
- Transitions: `$transition-base`
- Sizing: Design token scaling

---

## Homepage Reference Verification

**Reference Image:** `tests/screenshots/homepage-full.png`

### Key Visual Elements to Match:
1. ✅ Header/Navbar (from Phase 2)
   - Logo positioning
   - Navigation menu layout
   - Login button styling

2. ✅ Hero Section (from Phase 2)
   - Title and subtitle typography
   - CTA buttons (Learn More, Setup SentryNode)
   - Hero image on right

3. 🔄 Table Component (Phase 3)
   - If table appears on homepage, verify styling
   - Status badge colors and styling

4. 🔄 Footer (from Phase 2)
   - Social icons should use updated icon styling
   - Should verify icons match design system

---

## Test Execution Plan

### Test Environment
- **Framework:** Playwright
- **Browser:** Chromium (default)
- **Viewport:** 1920x1080 (desktop), 768x1024 (tablet), 375x667 (mobile)
- **Reference Image:** `tests/screenshots/homepage-full.png`

### Test Scenarios

#### Scenario 1: Tables Component
```javascript
test('tables component matches design system', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Verify table exists and styling
  const table = page.locator('.check_table');

  // Check colors using computed styles
  const bgColor = await table.evaluate(el =>
    window.getComputedStyle(el).backgroundColor
  );

  // Should match design token colors
  expect(bgColor).toMatch(designTokenColor);

  // Check table header styling
  const thead = page.locator('table thead');
  const headerColor = await thead.locator('th').evaluate(el =>
    window.getComputedStyle(el).color
  );

  // Should be white (#FFFFFF)
  expect(headerColor).toBe('rgb(255, 255, 255)');
});
```

#### Scenario 2: Modal Component
```javascript
test('modal component uses design tokens', async ({ page }) => {
  // Trigger modal open
  const modalTrigger = page.locator('[data-test="open-modal"]');
  await modalTrigger.click();

  // Verify modal styling
  const modal = page.locator('.modal');
  const backdrop = page.locator('.backdrop');

  // Check backdrop blur effect
  const backdropFilter = await backdrop.evaluate(el =>
    window.getComputedStyle(el).backdropFilter
  );
  expect(backdropFilter).toContain('blur');

  // Check modal background
  const modalBg = await modal.evaluate(el =>
    window.getComputedStyle(el).backgroundColor
  );
  expect(modalBg).toMatch(designTokenColor);
});
```

#### Scenario 3: Icons Component
```javascript
test('icons match design system colors', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check footer social icons
  const socialIcons = page.locator('.socials .ico-');

  for (const icon of await socialIcons.all()) {
    // Verify icon displays
    await expect(icon).toBeVisible();

    // Check icon dimensions
    const width = await icon.evaluate(el =>
      window.getComputedStyle(el).width
    );
    expect(width).toBeTruthy();
  }
});
```

---

## Visual Regression Testing

### Before Phase 3:
- Generate baseline screenshots of homepage
- Capture individual component states

### After Phase 3:
- Generate new screenshots
- Compare with baseline
- Document changes

### Screenshot Locations:
```
tests/screenshots/
├── homepage-full.png (reference)
├── tables-component.png (Phase 3)
├── modal-component.png (Phase 3)
├── icons-component.png (Phase 3)
└── phase3-verification/
    ├── tables-desktop.png
    ├── tables-mobile.png
    ├── modal-desktop.png
    └── icons-footer.png
```

---

## Design Token Compliance Checklist

### Colors ✅
- [ ] All hard-coded colors replaced with `$color-*` variables
- [ ] Primary gold used for interactive elements
- [ ] Secondary blue used for form focus
- [ ] Dark backgrounds using `$color-black` / `$color-surface-dark`
- [ ] White text using `$color-white`

### Spacing ✅
- [ ] All padding using `$space-*` variables
- [ ] All margins using `$space-*` variables
- [ ] Consistent spacing between components

### Border Radius ✅
- [ ] All border-radius using `$radius-*` or design token mixins
- [ ] No hard-coded px values for border-radius

### Typography ✅
- [ ] All text using typography mixins
- [ ] Font weights consistent with design tokens
- [ ] Line heights from typography system

### Transitions ✅
- [ ] All animations using `$transition-base` or `$transition-*`
- [ ] Smooth 200ms transitions on hover states
- [ ] No hard-coded transition values

### Shadows ✅
- [ ] All drop shadows using `$shadow-*` variables
- [ ] Modal shadows match design system
- [ ] Card shadows consistent

---

## Success Criteria

✅ **Phase 3 Test Success Requires:**
1. All component files updated with 100% design token compliance
2. Visual verification against homepage reference image passes
3. All tables, modals, and icons render correctly
4. Responsive design verified across breakpoints
5. No broken layout or styling
6. Build completes with 0 errors
7. No console errors or warnings
8. Design token colors match design system exactly
9. Transitions and animations smooth
10. Accessibility features (focus states) present

---

## Browser Compatibility

**Browsers to Test:**
- ✅ Chromium (default)
- ✅ Firefox
- ✅ Webkit/Safari

**Viewport Sizes:**
- Desktop: 1920x1080, 1366x768
- Tablet: 768x1024, 834x1112
- Mobile: 375x667, 414x896

---

## Test Report Template

```
# Phase 3 Test Report

**Date:** YYYY-MM-DD
**Status:** [PASS / FAIL]
**Duration:** XXm

## Test Results

### Tables Component
- [ ] Design token colors: PASS/FAIL
- [ ] Responsive layout: PASS/FAIL
- [ ] Hover states: PASS/FAIL
- [ ] Status badges: PASS/FAIL

### Modal Component
- [ ] Backdrop styling: PASS/FAIL
- [ ] Modal sizing: PASS/FAIL
- [ ] Animations: PASS/FAIL
- [ ] Close button: PASS/FAIL

### Icons Component
- [ ] Icon colors: PASS/FAIL
- [ ] Icon sizing: PASS/FAIL
- [ ] Social icons footer: PASS/FAIL
- [ ] Hover states: PASS/FAIL

## Visual Verification

- [ ] Tables match design system: YES/NO
- [ ] Modals match design system: YES/NO
- [ ] Icons match design system: YES/NO
- [ ] Homepage reference matched: YES/NO

## Build Status

- Build: PASS/FAIL
- SCSS Errors: 0
- Console Errors: 0

## Issues Found

[List any issues]

## Sign-off

**Verified by:** [Agent Name]
**Approval:** [Status]
```

---

## Next Steps

1. **Launch Phase 3 Agents** - 3 component-builder agents in parallel
2. **Monitor Agent Progress** - Check completion status at 20min, 40min, 60min
3. **Coordinate Integration** - Pull changes, verify imports
4. **Run Build** - `npm run build`
5. **Execute Visual Tests** - Playwright tests against homepage reference
6. **Generate Reports** - Document results
7. **Create Integration Commit** - Merge Phase 3 changes

---

**Prepared by:** Claude Code - SentryNodes Design System
**Status:** Ready for Phase 3 Execution
