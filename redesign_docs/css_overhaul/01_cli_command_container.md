# Task 2: Extract CLI Command Container Styles

**Status:** 📋 Ready
**Priority:** High
**Estimated Time:** 30 minutes
**Safe to Merge:** ✅ Yes - Only affects governance proposal pages

---

## Overview

Move CLI command container styles from global `App.css` to a component-scoped file. These styles are only used in governance proposal detail pages for displaying CLI commands with copy buttons.

## Files to Modify

### Source File
- **File:** `src/App.css`
- **Lines:** 44-80
- **Current Location:** Global CSS (loaded on every page)

### Target File
- **File:** `src/components/governance/CliCommandContainer.scss` (new file)
- **Import in:** Components that use `.cli-command-container`

---

## Step-by-Step Instructions

### Step 1: Create New Component SCSS File

Create `src/components/governance/CliCommandContainer.scss` with the following content:

```scss
// ============================================================================
// CLI Command Container Component
// ============================================================================
// Styles for CLI command textareas with copy functionality
// Used in governance proposal pages
// ============================================================================

@import '../../scss/design-tokens';

/* Custom selection styles for CLI command textareas */
textarea#prepareCommand::selection,
textarea#submitCommand::selection {
  background-color: #0078d4;
  color: #ffffff;
}

/* Copy icon positioning for CLI command textareas */
.cli-command-container {
  position: relative;
  display: inline-block;
  width: 100%;

  .copy-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    background: rgba(0, 120, 212, 0.9);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(0, 120, 212, 1);
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}
```

### Step 2: Find Component Usage

Search for components using `.cli-command-container`:

```bash
# Search for usage in the codebase
grep -r "cli-command-container" src/
```

Likely candidates:
- `src/components/governance/GovDetails.tsx` or similar
- `src/pages/Governance.tsx`
- Any component rendering proposal CLI commands

### Step 3: Import in Component

In the component(s) using `.cli-command-container`, add the import:

```tsx
import './CliCommandContainer.scss';
```

Or if the component is in a different directory:

```tsx
import '../governance/CliCommandContainer.scss';
```

### Step 4: Test Locally

1. Run the application:
   ```bash
   npm start
   ```

2. Navigate to a governance proposal detail page

3. Verify:
   - [ ] CLI command textarea displays correctly
   - [ ] Copy button appears in top-right corner
   - [ ] Copy button hover effect works (background darkens, scales up)
   - [ ] Copy button active effect works (scales down)
   - [ ] Text selection has blue background and white text
   - [ ] Layout is identical to before

4. Test responsive breakpoints (if applicable)

### Step 5: Delete from Global File

Once verified, delete lines 44-80 from `src/App.css`:

**Delete these lines:**

```css
/* Custom selection styles for CLI command textareas */
textarea#prepareCommand::selection,
textarea#submitCommand::selection {
  background-color: #0078d4;
  color: #ffffff;
}

/* Copy icon positioning for CLI command textareas */
.cli-command-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.cli-command-container .copy-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  background: rgba(0, 120, 212, 0.9);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.cli-command-container .copy-icon:hover {
  background: rgba(0, 120, 212, 1);
  transform: scale(1.05);
}

.cli-command-container .copy-icon:active {
  transform: scale(0.95);
}
```

### Step 6: Test Again After Deletion

Run the application again and verify everything still works:
- [ ] CLI commands still display correctly
- [ ] Copy button still works
- [ ] No console errors
- [ ] No visual regressions

---

## Verification Checklist

Before committing:

- [ ] New file created: `src/components/governance/CliCommandContainer.scss`
- [ ] File imports design tokens: `@import '../../scss/design-tokens';`
- [ ] Component imports the new SCSS file
- [ ] CLI command container displays correctly
- [ ] Copy button hover/active states work
- [ ] Text selection styling works
- [ ] Deleted lines 44-80 from `src/App.css`
- [ ] No console errors
- [ ] No visual differences from before
- [ ] Tested on governance proposal pages

---

## Commit Message

```
refactor: Move CLI command container styles to component file

- Extract CLI command container styles from global App.css
- Create src/components/governance/CliCommandContainer.scss
- Import design tokens for consistency
- Maintain exact visual appearance (no breaking changes)
- Only loads on governance pages instead of globally

Lines moved: 37 lines (App.css lines 44-80)
Affected pages: Governance proposal detail pages
```

---

## Before/After

### Before (Global CSS)
- Styles in `src/App.css` (loaded on every page)
- Total global CSS: ~191 lines

### After (Component-Scoped)
- Styles in `src/components/governance/CliCommandContainer.scss`
- Only loaded when component is used
- Total global CSS: ~154 lines (37 lines removed)

---

## Notes

- Uses design tokens via `@import '../../scss/design-tokens'`
- Maintains exact visual appearance
- Safe to merge - only affects governance pages
- No dependencies on other tasks
- Can be done in parallel with other tasks

---

## Rollback Instructions

If something breaks:

1. Restore lines 44-80 to `src/App.css`
2. Remove the import from the component
3. Delete `src/components/governance/CliCommandContainer.scss`
4. Commit as revert

---

## Related Tasks

This task is independent, but related to:
- Task 3: Proposal Link Button (same area of codebase)
- Task 4: Voting Commands (same area of codebase)
- Task 11: Proposals Styles (governance page)

These can be done in parallel by different agents.
