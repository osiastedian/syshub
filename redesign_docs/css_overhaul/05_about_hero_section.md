# Task 5: Move About Hero Section Styles

**Status:** 📋 Ready
**Priority:** High
**Estimated Time:** 20 minutes
**Safe to Merge:** ✅ Yes - Only affects About page

---

## Overview

Move About page hero section styles from global SCSS to component-scoped file. The file already exists (`src/scss/_about-hero.scss`) but is imported globally. We need to move it to the About component directory and import it only in the About page.

## Why This is Safe

- Only used on About page (`/about`)
- Already in its own file (just wrong location)
- No other pages will be affected
- Simple move operation with import update

---

## Files to Modify

### Source File
- **File:** `src/scss/_about-hero.scss` (entire file)
- **Currently imported in:** `src/scss/_about.scss` (line 8)
- **Which is imported in:** `src/scss/styles.scss` (globally)

### Target Location
- **New location:** `src/components/About/HeroSection.scss`
- **Import in:** About page component (e.g., `src/pages/About.tsx` or `src/components/About/HeroSection.tsx`)

### Global Import to Remove
- **File:** `src/scss/_about.scss`
- **Line:** `@import 'about-hero';`

---

## Step-by-Step Instructions

### Step 1: Verify Current File Location

Check that the file exists:

```bash
ls -la src/scss/_about-hero.scss
```

### Step 2: Check If Component Directory Exists

```bash
ls -la src/components/About/
```

If directory exists, you'll see existing component files like:
- `HeroSection.tsx` or similar
- `HeroSection.scss` (may already exist - check content)

### Step 3: Move or Copy the File

**Option A: If `src/components/About/HeroSection.scss` doesn't exist:**

```bash
cp src/scss/_about-hero.scss src/components/About/HeroSection.scss
```

**Option B: If `src/components/About/HeroSection.scss` already exists:**

Read both files first to see if they're the same or different:

```bash
# Check if they're the same
diff src/scss/_about-hero.scss src/components/About/HeroSection.scss
```

If different, you may need to merge them. If the same, you can skip copying.

### Step 4: Update Import Path in New File

Edit `src/components/About/HeroSection.scss` and verify the design tokens import:

```scss
@import '../../scss/design-tokens';
```

The file should start with:

```scss
// ============================================================================
// About Page - Hero Section
// ============================================================================

@import '../../scss/design-tokens';

// ... rest of styles
```

### Step 5: Find the About Page Component

Search for the About page component:

```bash
# Find files that might be the About page
find src -name "*About*" -type f | grep -E "\.(tsx|jsx|ts|js)$"
```

Likely locations:
- `src/pages/About.tsx`
- `src/pages/About/About.tsx`
- `src/pages/About/index.tsx`

### Step 6: Import in About Component

In the About page component, add the import **at the component level** (not globally):

**If the component is at `src/pages/About.tsx`:**

```tsx
import React from 'react';
import './About.scss'; // Main About page styles
import '../components/About/HeroSection.scss'; // Hero section styles
// ... other imports
```

**If the component is at `src/pages/About/About.tsx`:**

```tsx
import React from 'react';
import './About.scss';
import '../../components/About/HeroSection.scss';
// ... other imports
```

**OR if there's a separate HeroSection component:**

In `src/components/About/HeroSection.tsx`:

```tsx
import React from 'react';
import './HeroSection.scss'; // Import at component level
// ... rest of component
```

### Step 7: Test Locally

1. Run the application:
   ```bash
   npm start
   ```

2. Navigate to About page (`http://localhost:3000/about`)

3. Verify:
   - [ ] Hero section displays correctly
   - [ ] Typography matches (headings, body text)
   - [ ] Spacing is identical
   - [ ] Colors are correct
   - [ ] Background gradients/images display
   - [ ] Responsive breakpoints work (mobile, tablet, desktop)
   - [ ] No console errors

4. Navigate to other pages to verify they're unaffected:
   - [ ] Home page still works
   - [ ] Governance page still works
   - [ ] Stats page still works

### Step 8: Remove from Global Import

Edit `src/scss/_about.scss` and **comment out** the import (don't delete yet):

```scss
// ============================================================================
// About Page Styles
// ============================================================================

@import 'design-tokens';
// @import 'about-hero';  // MOVED to component-scoped: src/components/About/HeroSection.scss
@import 'about-cards';
@import 'about-governance';
@import 'about-rewards';
@import 'about-seniority';
@import 'about-requirements';
```

### Step 9: Test Again After Removing Global Import

Run the application and verify:
- [ ] About page still displays correctly
- [ ] Hero section still looks the same
- [ ] No console errors
- [ ] No missing styles

### Step 10: Delete Original File (After Testing)

Once everything works, delete the original global file:

```bash
rm src/scss/_about-hero.scss
```

And remove the commented import line from `src/scss/_about.scss`:

```scss
// ============================================================================
// About Page Styles
// ============================================================================

@import 'design-tokens';
@import 'about-cards';
@import 'about-governance';
@import 'about-rewards';
@import 'about-seniority';
@import 'about-requirements';
```

### Step 11: Final Verification

- [ ] About page works perfectly
- [ ] All other pages unaffected
- [ ] No console errors
- [ ] Build succeeds: `npm run build`

---

## Verification Checklist

Before committing:

- [ ] File copied/moved to `src/components/About/HeroSection.scss`
- [ ] Design tokens imported: `@import '../../scss/design-tokens';`
- [ ] About component imports the new SCSS file
- [ ] About page hero section displays correctly
- [ ] All typography, spacing, colors identical
- [ ] Responsive breakpoints work
- [ ] Removed import from `src/scss/_about.scss`
- [ ] Deleted `src/scss/_about-hero.scss`
- [ ] No console errors
- [ ] Other pages unaffected
- [ ] Build succeeds

---

## Commit Message

```
refactor: Move About hero section styles to component file

- Move src/scss/_about-hero.scss to src/components/About/HeroSection.scss
- Import at component level instead of globally
- Remove global import from src/scss/_about.scss
- Maintain exact visual appearance (no breaking changes)
- Only loads on About page instead of globally

Affected pages: About page only
```

---

## Before/After

### Before (Global)
- File: `src/scss/_about-hero.scss`
- Imported globally via `src/scss/_about.scss` → `src/scss/styles.scss`
- Loaded on every page (unnecessary)

### After (Component-Scoped)
- File: `src/components/About/HeroSection.scss`
- Imported only in About page component
- Only loaded when About page is visited

---

## Expected File Structure After This Task

```
src/
  components/
    About/
      HeroSection.tsx (or similar)
      HeroSection.scss ✅ (new location)
      FeatureCards.tsx
      FeatureCards.scss
      // ... other About components
  scss/
    _about.scss (import removed)
    _about-hero.scss ❌ (deleted)
    _about-cards.scss (still here - Task 6)
    _about-governance.scss (still here - Task 7)
    // ... other files
```

---

## Notes

- This task only moves ONE About section file
- Other About section files (cards, governance, rewards, etc.) are separate tasks
- All About tasks can be done in parallel by different agents
- Each About task is independent and safe to merge separately

---

## Related Tasks

This task is independent, but part of the About page migration:
- **Task 6:** Move About Cards Section (can be done in parallel)
- **Task 7:** Move About Governance Section (can be done in parallel)
- **Task 8:** Move About Rewards Section (can be done in parallel)
- **Task 9:** Move About Seniority Section (can be done in parallel)
- **Task 10:** Move About Requirements Section (can be done in parallel)

All About tasks can be worked on simultaneously by different agents.

---

## Rollback Instructions

If something breaks:

1. Restore `src/scss/_about-hero.scss` (from git history)
2. Restore import in `src/scss/_about.scss`
3. Remove import from About component
4. Delete `src/components/About/HeroSection.scss` (if it didn't exist before)
5. Commit as revert

---

## Common Issues

**Issue:** Can't find the About page component
**Solution:** Search for `<HeroSection` or search for "About" in page files. The component might be named differently.

**Issue:** Styles not loading after import
**Solution:** Check the import path is correct relative to the component file. Use `../../scss/design-tokens` for design tokens.

**Issue:** Build fails
**Solution:** Check for syntax errors in SCSS. Verify all imports use correct paths.
