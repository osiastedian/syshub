# Task 4: Extract Voting Commands Styles

**Status:** 📋 Ready
**Priority:** High
**Estimated Time:** 45 minutes
**Safe to Merge:** ✅ Yes - Only affects governance proposal pages

---

## Overview

Move voting command section styles from global `App.css` to a component-scoped file. These styles are used in governance proposal pages to display CLI voting commands (yes/no/abstain) with color-coded labels and hash information.

This is the **largest extraction** from App.css (~75 lines).

## Files to Modify

### Source File
- **File:** `src/App.css`
- **Lines:** 117-191 (75 lines!)
- **Current Location:** Global CSS (loaded on every page)

### Target File
- **File:** `src/components/governance/VotingCommands.scss` (new file)
- **Import in:** Components that use `.voting-command-section`

---

## Step-by-Step Instructions

### Step 1: Create New Component SCSS File

Create `src/components/governance/VotingCommands.scss` with the following content:

```scss
// ============================================================================
// Voting Commands Component
// ============================================================================
// Styles for governance proposal voting command sections
// Displays CLI commands with color-coded labels (yes/no/abstain)
// Used in governance proposal detail pages
// ============================================================================

@import '../../scss/design-tokens';

/* Voting Command Sections */
.voting-command-section {
  margin: 16px 0;
  width: 100% !important;
  max-width: 100% !important;
  clear: both;

  .cli-command-container textarea {
    min-height: 60px;
    height: auto;
    width: 100%;
    max-width: 100%;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.4;
    padding: 12px 50px 12px 12px; /* top right bottom left - extra padding on right for copy icon */
    word-break: break-all;
    box-sizing: border-box;
  }
}

.voting-command-label {
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  width: fit-content;

  // Yes vote label - green
  &--yes {
    background-color: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.3);
  }

  // No vote label - red
  &--no {
    background-color: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  // Abstain vote label - gray
  &--abstain {
    background-color: rgba(156, 163, 175, 0.2);
    color: #9ca3af;
    border: 1px solid rgba(156, 163, 175, 0.3);
  }
}

/* Hash Info Section - Less Prominent */
.hash-info-section {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.8;

  p {
    font-size: 12px;
    margin: 4px 0;
  }
}

/* Override width constraints for voting commands in proposal budget section */
.proposal .budget .voting-command-section {
  width: 100% !important;
  max-width: 100% !important;
  float: none !important;
  clear: both;

  .cli-command-container {
    width: 100% !important;
    max-width: 100% !important;
  }
}
```

### Step 2: Find Component Usage

Search for components using voting command classes:

```bash
# Search for usage in the codebase
grep -r "voting-command-section" src/
grep -r "voting-command-label" src/
grep -r "hash-info-section" src/
```

Likely candidates:
- `src/components/governance/GovDetails.tsx` or similar
- `src/components/governance/ProposalDetails.tsx`
- `src/pages/Governance.tsx`
- Any component rendering proposal voting CLI commands

### Step 3: Import in Component

In the component(s) using `.voting-command-section`, add the import:

```tsx
import './VotingCommands.scss';
```

Or if the component is in a different directory:

```tsx
import '../governance/VotingCommands.scss';
```

### Step 4: Test Locally

1. Run the application:
   ```bash
   npm start
   ```

2. Navigate to a governance proposal detail page with voting commands

3. Verify:
   - [ ] Voting command sections display correctly
   - [ ] Textareas for CLI commands render properly
   - [ ] Textareas have monospace font (Courier New)
   - [ ] Textareas have proper padding (extra right padding for copy icon)
   - [ ] Word-break works (long commands wrap correctly)
   - [ ] **Yes label** displays with:
     - [ ] Green background (rgba(34, 197, 94, 0.2))
     - [ ] Green text (#22c55e)
     - [ ] Green border
   - [ ] **No label** displays with:
     - [ ] Red background (rgba(239, 68, 68, 0.2))
     - [ ] Red text (#ef4444)
     - [ ] Red border
   - [ ] **Abstain label** displays with:
     - [ ] Gray background (rgba(156, 163, 175, 0.2))
     - [ ] Gray text (#9ca3af)
     - [ ] Gray border
   - [ ] Hash info section displays below with:
     - [ ] Border top (separator line)
     - [ ] Slightly faded (opacity 0.8)
     - [ ] Small text (12px)
   - [ ] Layout is identical to before

4. Test responsive breakpoints

### Step 5: Delete from Global File

Once verified, delete lines 117-191 from `src/App.css`:

**Delete these lines:**

```css
/* Voting Command Sections */
.voting-command-section {
  margin: 16px 0;
  width: 100% !important;
  max-width: 100% !important;
  clear: both;
}

.voting-command-section .cli-command-container textarea {
  min-height: 60px;
  height: auto;
  width: 100%;
  max-width: 100%;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.4;
  padding: 12px 50px 12px 12px; /* top right bottom left - extra padding on right for copy icon */
  word-break: break-all;
  box-sizing: border-box;
}

.voting-command-label {
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  width: fit-content;
}

.voting-command-label--yes {
  background-color: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.voting-command-label--no {
  background-color: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.voting-command-label--abstain {
  background-color: rgba(156, 163, 175, 0.2);
  color: #9ca3af;
  border: 1px solid rgba(156, 163, 175, 0.3);
}

/* Hash Info Section - Less Prominent */
.hash-info-section {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.8;
}

.hash-info-section p {
  font-size: 12px;
  margin: 4px 0;
}

/* Override width constraints for voting commands in proposal budget section */
.proposal .budget .voting-command-section {
  width: 100% !important;
  max-width: 100% !important;
  float: none !important;
  clear: both;
}

.proposal .budget .voting-command-section .cli-command-container {
  width: 100% !important;
  max-width: 100% !important;
}
```

### Step 6: Test Again After Deletion

Run the application again and verify everything still works:
- [ ] All voting command sections display correctly
- [ ] Labels have correct colors (green/red/gray)
- [ ] Textareas render properly with monospace font
- [ ] Hash info section displays correctly
- [ ] No console errors
- [ ] No visual regressions

---

## Verification Checklist

Before committing:

- [ ] New file created: `src/components/governance/VotingCommands.scss`
- [ ] File imports design tokens: `@import '../../scss/design-tokens';`
- [ ] Component imports the new SCSS file
- [ ] Yes label: green background, green text, green border
- [ ] No label: red background, red text, red border
- [ ] Abstain label: gray background, gray text, gray border
- [ ] Textareas have monospace font
- [ ] Word-break works on long commands
- [ ] Hash info section displays with border and opacity
- [ ] Deleted lines 117-191 from `src/App.css`
- [ ] No console errors
- [ ] No visual differences from before
- [ ] Tested on governance proposal pages

---

## Commit Message

```
refactor: Move voting commands styles to component file

- Extract voting command section styles from global App.css
- Create src/components/governance/VotingCommands.scss
- Import design tokens for consistency
- Maintain exact visual appearance (color-coded labels, textarea styling)
- Only loads on governance pages instead of globally

Lines moved: 75 lines (App.css lines 117-191)
Affected pages: Governance proposal detail pages with voting commands

Includes:
- Voting command section container styles
- Color-coded labels (yes=green, no=red, abstain=gray)
- CLI command textarea styling (monospace, word-break)
- Hash info section styling
- Proposal budget section overrides
```

---

## Before/After

### Before (Global CSS)
- Styles in `src/App.css` (loaded on every page)
- Total global CSS: ~120 lines (after Tasks 2-3)

### After (Component-Scoped)
- Styles in `src/components/governance/VotingCommands.scss`
- Only loaded when component is used
- Total global CSS: ~45 lines (75 lines removed)
- **App.css is now minimal!** (mostly just legacy .App styles)

---

## Color Reference

For verification, here are the exact colors:

**Yes Vote (Green):**
- Background: `rgba(34, 197, 94, 0.2)` - 20% opacity green
- Text: `#22c55e` - bright green
- Border: `rgba(34, 197, 94, 0.3)` - 30% opacity green

**No Vote (Red):**
- Background: `rgba(239, 68, 68, 0.2)` - 20% opacity red
- Text: `#ef4444` - bright red
- Border: `rgba(239, 68, 68, 0.3)` - 30% opacity red

**Abstain Vote (Gray):**
- Background: `rgba(156, 163, 175, 0.2)` - 20% opacity gray
- Text: `#9ca3af` - medium gray
- Border: `rgba(156, 163, 175, 0.3)` - 30% opacity gray

---

## Potential Design Token Improvements (Future)

These colors could be added to design tokens in a future task:

```scss
// Future improvement (not part of this task):
$color-vote-yes-bg: rgba(34, 197, 94, 0.2);
$color-vote-yes-text: #22c55e;
$color-vote-yes-border: rgba(34, 197, 94, 0.3);

$color-vote-no-bg: rgba(239, 68, 68, 0.2);
$color-vote-no-text: #ef4444;
$color-vote-no-border: rgba(239, 68, 68, 0.3);

$color-vote-abstain-bg: rgba(156, 163, 175, 0.2);
$color-vote-abstain-text: #9ca3af;
$color-vote-abstain-border: rgba(156, 163, 175, 0.3);
```

For now, keep the hard-coded colors to maintain exact visual appearance.

---

## Notes

- This is the **largest** extraction from App.css (75 lines)
- Uses design tokens via `@import '../../scss/design-tokens'`
- Maintains exact color-coding for vote types
- Safe to merge - only affects governance pages
- No dependencies on other tasks
- Can be done in parallel with Tasks 2 and 3

After this task, **App.css will be reduced from 191 to ~45 lines** (76% reduction in global App.css!)

---

## Rollback Instructions

If something breaks:

1. Restore lines 117-191 to `src/App.css`
2. Remove the import from the component
3. Delete `src/components/governance/VotingCommands.scss`
4. Commit as revert

---

## Related Tasks

This task is independent, but related to:
- **Task 2:** CLI Command Container (same area of codebase) ✅ Can work in parallel
- **Task 3:** Proposal Link Button (same area of codebase) ✅ Can work in parallel
- **Task 11:** Proposals Styles (governance page) - Independent

These can be done in parallel by different agents.

---

## Testing Scenarios

### Scenario 1: Yes Vote Command
- [ ] Label shows "Vote Yes" or similar with green styling
- [ ] Textarea displays CLI command in monospace font
- [ ] Copy button appears (from Task 2's CLI Command Container)
- [ ] Colors match exactly (green background, text, border)

### Scenario 2: No Vote Command
- [ ] Label shows "Vote No" or similar with red styling
- [ ] Textarea displays CLI command in monospace font
- [ ] Colors match exactly (red background, text, border)

### Scenario 3: Abstain Vote Command
- [ ] Label shows "Abstain" or similar with gray styling
- [ ] Textarea displays CLI command in monospace font
- [ ] Colors match exactly (gray background, text, border)

### Scenario 4: Hash Info Section
- [ ] Displays below voting commands
- [ ] Has border separator at top
- [ ] Text is smaller (12px)
- [ ] Slightly faded (opacity 0.8)

### Scenario 5: Long Commands
- [ ] Long CLI commands wrap correctly (word-break)
- [ ] Textarea expands vertically (min-height 60px)
- [ ] Right padding accounts for copy button

### Scenario 6: Proposal Budget Section
- [ ] Width overrides work in .proposal .budget context
- [ ] Commands take full width
- [ ] No float issues
