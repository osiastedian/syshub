# Task 3: Extract Proposal Link Button Styles

**Status:** 📋 Ready
**Priority:** High
**Estimated Time:** 30 minutes
**Safe to Merge:** ✅ Yes - Only affects governance proposal pages

---

## Overview

Move proposal link button styles from global `App.css` to a component-scoped file. These styles are only used in governance proposal pages for displaying a button that links to the full proposal.

## Files to Modify

### Source File
- **File:** `src/App.css`
- **Lines:** 82-115
- **Current Location:** Global CSS (loaded on every page)

### Target File
- **File:** `src/components/governance/ProposalLinkButton.scss` (new file)
- **Import in:** Components that use `.proposal-link-button`

---

## Step-by-Step Instructions

### Step 1: Create New Component SCSS File

Create `src/components/governance/ProposalLinkButton.scss` with the following content:

```scss
// ============================================================================
// Proposal Link Button Component
// ============================================================================
// Styles for the button that links to full governance proposal
// Used in governance proposal detail pages
// ============================================================================

@import '../../scss/design-tokens';

/* Governance Proposal Link Button */
.proposal-link-button {
  display: inline-block;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  margin: 16px 0;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background: linear-gradient(135deg, #e55a2b, #e0841a);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
    color: white;
    text-decoration: none;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
  }
}

.proposal-link-section {
  text-align: center;
  margin: 20px 0;
}
```

### Step 2: Find Component Usage

Search for components using `.proposal-link-button`:

```bash
# Search for usage in the codebase
grep -r "proposal-link-button" src/
grep -r "proposal-link-section" src/
```

Likely candidates:
- `src/components/governance/GovDetails.tsx` or similar
- `src/components/governance/ProposalCard.tsx`
- `src/pages/Governance.tsx`

### Step 3: Import in Component

In the component(s) using `.proposal-link-button`, add the import:

```tsx
import './ProposalLinkButton.scss';
```

Or if the component is in a different directory:

```tsx
import '../governance/ProposalLinkButton.scss';
```

### Step 4: Test Locally

1. Run the application:
   ```bash
   npm start
   ```

2. Navigate to a governance proposal detail page

3. Verify:
   - [ ] Proposal link button displays with gradient background
   - [ ] Button shows orange-to-gold gradient (135deg, #ff6b35 to #f7931e)
   - [ ] Text is white, bold (700), 16px
   - [ ] Border radius is 8px
   - [ ] Shadow displays correctly
   - [ ] Hover effect works:
     - [ ] Gradient darkens slightly
     - [ ] Button moves up 2px (translateY(-2px))
     - [ ] Shadow increases (0 6px 20px)
     - [ ] Text stays white
   - [ ] Active effect works (button moves back down)
   - [ ] Section centers the button
   - [ ] Layout is identical to before

4. Test responsive breakpoints (mobile, tablet, desktop)

### Step 5: Delete from Global File

Once verified, delete lines 82-115 from `src/App.css`:

**Delete these lines:**

```css
/* Governance Proposal Link Button */
.proposal-link-button {
  display: inline-block;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  margin: 16px 0;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.proposal-link-button:hover {
  background: linear-gradient(135deg, #e55a2b, #e0841a);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
  color: white;
  text-decoration: none;
}

.proposal-link-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
}

.proposal-link-section {
  text-align: center;
  margin: 20px 0;
}
```

### Step 6: Test Again After Deletion

Run the application again and verify everything still works:
- [ ] Proposal link button still displays correctly
- [ ] Gradient background still renders
- [ ] Hover/active states still work
- [ ] No console errors
- [ ] No visual regressions

---

## Verification Checklist

Before committing:

- [ ] New file created: `src/components/governance/ProposalLinkButton.scss`
- [ ] File imports design tokens: `@import '../../scss/design-tokens';`
- [ ] Component imports the new SCSS file
- [ ] Button displays with correct gradient
- [ ] Hover effect works (gradient darkens, moves up, shadow increases)
- [ ] Active effect works (moves back down)
- [ ] Button centering works
- [ ] Deleted lines 82-115 from `src/App.css`
- [ ] No console errors
- [ ] No visual differences from before
- [ ] Tested on governance proposal pages

---

## Commit Message

```
refactor: Move proposal link button styles to component file

- Extract proposal link button styles from global App.css
- Create src/components/governance/ProposalLinkButton.scss
- Import design tokens for consistency
- Maintain exact visual appearance (gradient, shadow, hover effects)
- Only loads on governance pages instead of globally

Lines moved: 34 lines (App.css lines 82-115)
Affected pages: Governance proposal detail pages
```

---

## Before/After

### Before (Global CSS)
- Styles in `src/App.css` (loaded on every page)
- Total global CSS: ~154 lines (after Task 2)

### After (Component-Scoped)
- Styles in `src/components/governance/ProposalLinkButton.scss`
- Only loaded when component is used
- Total global CSS: ~120 lines (34 lines removed)

---

## Potential Design Token Improvements (Future)

The button currently uses hard-coded gradient colors. In a future task, these could be added to design tokens:

```scss
// Future improvement (not part of this task):
$gradient-proposal-start: #ff6b35;
$gradient-proposal-end: #f7931e;
```

For now, keep the hard-coded colors to maintain exact visual appearance.

---

## Notes

- Uses design tokens via `@import '../../scss/design-tokens'`
- Maintains exact visual appearance (gradient must match exactly)
- Safe to merge - only affects governance pages
- No dependencies on other tasks
- Can be done in parallel with Tasks 2 and 4

---

## Rollback Instructions

If something breaks:

1. Restore lines 82-115 to `src/App.css`
2. Remove the import from the component
3. Delete `src/components/governance/ProposalLinkButton.scss`
4. Commit as revert

---

## Related Tasks

This task is independent, but related to:
- **Task 2:** CLI Command Container (same area of codebase) ✅ Can work in parallel
- **Task 4:** Voting Commands (same area of codebase) ✅ Can work in parallel
- **Task 11:** Proposals Styles (governance page) - Independent

These can be done in parallel by different agents.

---

## Testing Scenarios

### Scenario 1: Button Display
- [ ] Gradient renders correctly (orange #ff6b35 to gold #f7931e)
- [ ] Text is white and bold
- [ ] Border radius is 8px
- [ ] Shadow is visible

### Scenario 2: Hover State
- [ ] Gradient darkens on hover
- [ ] Button lifts up (translateY -2px)
- [ ] Shadow expands
- [ ] Cursor changes to pointer
- [ ] Text remains white

### Scenario 3: Active State
- [ ] Button moves back to original position on click
- [ ] Shadow reduces
- [ ] No visual glitches

### Scenario 4: Responsive
- [ ] Button works on mobile (320px)
- [ ] Button works on tablet (768px)
- [ ] Button works on desktop (1200px+)
- [ ] Text doesn't wrap unexpectedly
