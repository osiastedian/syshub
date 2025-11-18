# Global CSS/SCSS Investigation Report

**Date:** 2025-11-18
**Branch:** `claude/investigate-global-css-016X3T1TywKtZG4C4EkKrghZ`

## Executive Summary

This report documents all global CSS/SCSS files in the SentryNodes codebase and identifies opportunities to:
1. Move component-specific styles from global files to component-scoped CSS files
2. Replace custom CSS with Bootstrap utilities/classes
3. Reduce global CSS footprint for better maintainability

## Current State

### Global CSS Files

#### 1. `/src/index.css` (14 lines)
**Status:** ✅ Good - Minimal global styles

**Contents:**
- Basic React defaults (body, code font families)
- Font smoothing

**Recommendation:** Keep as-is. These are appropriate global styles.

---

#### 2. `/src/App.css` (191 lines)
**Status:** ⚠️ Needs Refactoring

**Issues:**
- Contains many component-specific styles that should be moved to component CSS files
- Has page-specific styles (governance proposals, voting commands)

**Component-Specific Styles to Move:**

| Lines | Class/Selector | Should Move To | Priority |
|-------|----------------|----------------|----------|
| 1-38 | `.App`, `.App-logo`, `.App-header`, etc. | `src/components/App/App.scss` | Low (unused?) |
| 40-42 | `.ReactCollapse--collapse` | Component using ReactCollapse | Low |
| 44-80 | `textarea#prepareCommand`, `textarea#submitCommand`, `.cli-command-container`, `.copy-icon` | `src/components/governance/GovernanceProposal.scss` or similar | High |
| 82-115 | `.proposal-link-button`, `.proposal-link-section` | `src/components/governance/ProposalLink.scss` | High |
| 117-191 | `.voting-command-section`, `.voting-command-label--yes/no/abstain`, `.hash-info-section` | `src/components/governance/VotingCommands.scss` | High |

**Bootstrap Replacement Opportunities:**
- `.cli-command-container` positioning could use Bootstrap utilities: `position-relative`, `d-inline-block`, `w-100`

---

#### 3. `/src/pages/Home.css` (9 lines)
**Status:** ⚠️ Misplaced

**Issue:** This is in `/pages/` directory but should be component-scoped CSS.

**Recommendation:**
- If used, move to `/src/pages/Home/Home.scss` or similar
- If unused, delete

---

### Global SCSS Files

#### Design System Files (Keep Global)

##### `/src/scss/_design-tokens.scss` (335 lines)
**Status:** ✅ Excellent - Core design system

Contains:
- Color palette (brand, neutral, overlay, status)
- Typography (font families, sizes, weights, line heights, mixins)
- Spacing scale ($space-2xs to $space-3xl)
- Border radius scale
- Shadows, transitions, z-index scale
- Breakpoints
- Component-specific tokens (buttons, inputs, navbar, toast)
- Utility classes (.sr-only, .flex-center, .flex-between, .flex-column)

**Recommendation:** Keep as-is. This is the foundation of the design system.

---

##### `/src/scss/_btns.scss` (357 lines)
**Status:** ✅ Good - Design system component

Contains reusable button styles:
- Base `.btn` class
- Primary/secondary variants
- Size variants
- Special button types (play button, gradient)
- Sentry table buttons

**Recommendation:** Keep as-is. These are reusable design system components.

---

##### `/src/scss/_cards.scss` (519 lines)
**Status:** ✅ Good - Design system component

Contains reusable card styles:
- Base `.card` class and variants
- Card header, content, footer
- Card grid layouts
- Section styling
- Feature cards, stat cards, testimonial cards

**Recommendation:** Keep as-is. These are reusable design system components.

---

##### `/src/scss/_inputs.scss` (470 lines)
**Status:** ✅ Good - Design system component

Contains reusable form elements:
- Form groups
- Labels
- Text inputs, textareas, selects
- Checkboxes, radio buttons
- Toggle switches
- Helper text, indicators
- Wizard/multi-step forms

**Recommendation:** Keep as-is. These are reusable design system components.

---

##### `/src/scss/_modal.scss` (163 lines)
**Status:** ✅ Good - Design system component

Contains reusable modal styles:
- Backdrop
- Modal container with size variants (sm, md, lg)
- Modal header, body, footer
- Tooltip styling

**Recommendation:** Keep as-is. These are reusable design system components.

---

##### `/src/scss/_tables.scss` (1207 lines)
**Status:** ⚠️ Mixed - Contains both design system AND page-specific styles

**Design System Styles (Keep):**
- Base table styles (lines 1-116)
- Pagination styles (lines 117-196)
- Breadcrumbs (lines 671-701)
- Loading spinner (lines 703-730)

**Page-Specific Styles (Should Move):**

| Lines | Class/Selector | Should Move To | Priority |
|-------|----------------|----------------|----------|
| 197-665 | `.proposals`, `.proposal` (governance proposals) | `src/pages/Governance/Governance.scss` or `src/components/governance/ProposalsList.scss` | High |
| 732-878 | `.ministats`, `.stat`, `.chart-mini-hor` (ministry stats) | `src/pages/Stats/Stats.scss` or `src/components/stats/MinistryStats.scss` | High |
| 879-944 | `.table--governance` | `src/pages/Governance/Governance.scss` | Medium |

---

#### Layout Components (Keep Global)

##### `/src/scss/_header.scss` (364 lines)
**Status:** ✅ Good - Global layout component

Contains:
- Header base styles
- Logo styling
- Login button
- User dropdown menu
- Mobile responsive styles

**Recommendation:** Keep as-is. Header is a global layout component.

---

##### `/src/scss/_footer.scss` (321 lines)
**Status:** ✅ Good - Global layout component

Contains:
- Footer base styles
- Branding section
- Column layouts
- Links, subscribe section
- Bottom section (copyright, legal)

**Recommendation:** Keep as-is. Footer is a global layout component.

---

##### `/src/scss/_nav.scss` (621 lines)
**Status:** ✅ Good - Global layout component

Contains:
- Navigation base styles
- Navigation links
- User menu/dropdown
- Navigation dropdown (megamenu)
- Mobile hamburger menu
- Footer navigation utilities

**Recommendation:** Keep as-is. Navigation is a global layout component.

---

#### Problematic Global Files

##### `/src/scss/_settings.scss` (493 lines)
**Status:** 🔴 Needs Major Refactoring

**Issues:**
- Extremely large file with many concerns mixed together
- Contains component-specific styles that should be elsewhere
- Many styles can be replaced with Bootstrap utilities

**Breakdown:**

| Lines | Content | Issue | Recommendation | Priority |
|-------|---------|-------|----------------|----------|
| 1-46 | Font families, sizes, breakpoints, colors | Good - design variables | Keep, but consider moving to `_design-tokens.scss` | Low |
| 47-101 | Base body styles, typography (h1-h6) | Good - global typography | Keep | Low |
| 102-181 | `ul.selector` styles | Component-specific | Move to component using it | Medium |
| 183-199 | `.wrapper`, `.shell` container classes | OK - layout utilities | Keep | Low |
| 201-302 | CSS Reset | Good - global reset | Keep | Low |
| 304-367 | Grid helpers (`.cols`, `.col--size2`, etc.) | **Can use Bootstrap grid instead** | Replace with Bootstrap classes (`row`, `col-*`) | High |
| 368-371 | `.text-center` | **Bootstrap has this** | Use Bootstrap's `.text-center` | High |
| 372-390 | `.title-border` and variants | Component-specific | Move to components using it | Medium |
| 391-392 | `.title--slim` | Component-specific | Move to components using it | Medium |
| 394-434 | Responsive visibility helpers | **Bootstrap has these** | Use Bootstrap's `.d-none`, `.d-md-block`, etc. | High |
| 437-460 | Footer styles (DEPRECATED comment) | Already moved to `_footer.scss` | Delete these deprecated styles | High |
| 462-482 | `.socials` styles | Component-specific | Move to Footer or Social component | Medium |
| 484-493 | `.socials-secondary` styles | Component-specific | Move to component using it | Medium |

**Bootstrap Replacement Examples:**

Current Custom CSS:
```scss
.cols { display: flex; flex-flow: row wrap; }
.col--1of2 { max-width: 50%; flex: 0 0 50%; }
.col--size6 { max-width: 50%; flex: 0 0 50%; }
```

Replace with Bootstrap:
```html
<div class="row">
  <div class="col-md-6">...</div>
  <div class="col-md-6">...</div>
</div>
```

Current Custom CSS:
```scss
.visible-xs-block { display: none !important; }
@media (max-width: $responsive-xs) {
  .hidden-xs { display: none !important; }
  .visible-xs-block { display: block !important; }
}
```

Replace with Bootstrap:
```html
<div class="d-block d-md-none">Visible on mobile only</div>
<div class="d-none d-md-block">Hidden on mobile</div>
```

---

##### `/src/scss/_hero.scss` (779 lines)
**Status:** ⚠️ Mixed - Contains both design system AND page-specific styles

**Design System Styles (Keep):**
- Lines 1-231: Base `.hero` class and variations (good reusable styles)

**Page-Specific Styles (Should Move):**

| Lines | Class/Selector | Should Move To | Priority |
|-------|----------------|----------------|----------|
| 234-363 | `.article__actions`, `.article__title`, `.article__content` | `src/components/Article/Article.scss` | Medium |
| 405-625 | `.hero-section` (banner image hero - very specific) | `src/pages/Home/HeroSection.scss` or similar | High |
| 627-722 | `.hero-btn`, `.hero-btn--learn-more`, `.hero-btn--setup` | Component using these buttons | Medium |
| 724-778 | `.sentrynode-section` | `src/pages/Home/SentryNodeSection.scss` or similar | High |

---

##### `/src/scss/_backgrounds.scss` (131 lines)
**Status:** 🔴 Should be Component-Specific

**Issue:** This entire file contains very specific positioning for background decorations. These are not reusable.

**Contents:**
- `.main` and `.main__background` classes with dozens of specific background positions
- Each background has exact pixel positioning (e.g., `top: -127px; right: 0; width: 1702px;`)

**Recommendation:**
- Move to page-specific component CSS files (likely Home page)
- These are not global design system components
- Priority: **High**

---

##### `/src/scss/_about.scss` and About-specific files (7 files!)
**Status:** 🔴 Should ALL be Component-Specific

These files are ALL page-specific for the About page:

1. `/src/scss/_about.scss` (22 lines) - Just imports other about files
2. `/src/scss/_about-hero.scss` - Hero section specific to About page
3. `/src/scss/_about-cards.scss` - Cards specific to About page
4. `/src/scss/_about-governance.scss` - Governance section on About page
5. `/src/scss/_about-rewards.scss` - Rewards section on About page
6. `/src/scss/_about-seniority.scss` - Seniority section on About page
7. `/src/scss/_about-requirements.scss` - Requirements section on About page

**Issue:** All these files are imported globally in `styles.scss` but they're only used on the About page.

**Recommendation:**
- Move ALL About-specific SCSS to `/src/pages/About/` or `/src/components/About/`
- Import them only in the About page component
- Remove from global `styles.scss`
- Priority: **High**

---

##### `/src/scss/_article.scss`
**Status:** ❓ Not found in repo

The file is imported in `styles.scss` (line 61) but I couldn't locate it in the codebase.

**Recommendation:**
- Verify if this file exists
- If it doesn't exist, remove the import from `styles.scss`
- Priority: **Medium**

---

##### `/src/scss/_icons.scss`
**Status:** ❓ Not analyzed yet

Imported in `styles.scss` but not read during investigation.

**Recommendation:** Analyze this file separately.

---

##### `/src/scss/_mixins.scss`
**Status:** ❓ Not analyzed yet

Imported in `styles.scss` but not read during investigation. Mixins are typically good to keep global.

**Recommendation:** Analyze this file to ensure it only contains reusable mixins.

---

### Component SCSS Files (Good Examples)

These files demonstrate the ideal pattern:

1. **`/src/components/profile/ProfileCloseAccountConfirmation.scss`** (251 lines)
   - ✅ Well-scoped with component-specific class names
   - ✅ Imports design tokens
   - ✅ All styles are prefixed with component name

2. **`/src/components/global/Navbar.scss`** (119 lines)
   - ✅ Well-scoped BEM-style naming
   - ✅ Imports design tokens
   - ✅ Clean responsive design

3. **`/src/components/login/LoginForm.scss`** (223 lines)
   - ✅ Perfect example of component-scoped styles
   - ✅ All classes prefixed with `.login-`
   - ✅ Uses design tokens

---

## Action Items

### Priority: High (Do These First)

#### 1. Move About Page Styles from Global to Component-Specific
**Files to Move:**
- `/src/scss/_about.scss`
- `/src/scss/_about-hero.scss`
- `/src/scss/_about-cards.scss`
- `/src/scss/_about-governance.scss`
- `/src/scss/_about-rewards.scss`
- `/src/scss/_about-seniority.scss`
- `/src/scss/_about-requirements.scss`

**Move To:**
- `/src/pages/About/` or `/src/components/About/` (existing component folder)

**Steps:**
1. Move all 7 files to `/src/components/About/` directory
2. Import them in the About page component (not globally)
3. Remove imports from `/src/scss/styles.scss`

**Estimated Impact:** Reduces global CSS by ~500-1000 lines

---

#### 2. Extract Governance-Specific Styles from `App.css`
**Lines to Move:** 44-191

**Create New Files:**
- `/src/components/governance/VotingCommands.scss` (voting command sections)
- `/src/components/governance/ProposalLink.scss` (proposal link button)
- `/src/components/governance/CliCommandContainer.scss` (CLI command textareas)

**Steps:**
1. Create new component SCSS files
2. Move styles from `App.css` to new files
3. Import in relevant components
4. Delete from `App.css`

**Estimated Impact:** Reduces `App.css` from 191 to ~40 lines

---

#### 3. Extract Proposals & Stats from `_tables.scss`
**Lines to Move:** 197-878

**Create New Files:**
- `/src/pages/Governance/Proposals.scss` (or `/src/components/governance/ProposalsList.scss`)
- `/src/pages/Stats/MinistryStats.scss` (or `/src/components/stats/MinistryStats.scss`)

**Steps:**
1. Create new page/component SCSS files
2. Move proposal styles (lines 197-665) to Governance
3. Move ministry stats styles (lines 732-878) to Stats
4. Import in relevant page components
5. Keep only base table styles in `_tables.scss`

**Estimated Impact:** Reduces `_tables.scss` from 1207 to ~350 lines

---

#### 4. Replace Custom Grid with Bootstrap Grid
**File:** `/src/scss/_settings.scss` (lines 304-367)

**Current Custom CSS to Replace:**
```scss
.cols { display: flex; flex-flow: row wrap; }
.col--size2 { max-width: 20%; flex: 0 0 20%; }
.col--size3 { max-width: 25%; flex: 0 0 25%; }
.col--size4 { max-width: 33.33%; flex: 0 0 33.33%; }
.col--size6 { max-width: 50%; flex: 0 0 50%; }
// ... etc
```

**Replace With Bootstrap:**
```html
<!-- Old -->
<div class="cols">
  <div class="col--size6">...</div>
  <div class="col--size6">...</div>
</div>

<!-- New with Bootstrap -->
<div class="row">
  <div class="col-md-6">...</div>
  <div class="col-md-6">...</div>
</div>
```

**Steps:**
1. Find all usages of `.cols` and `.col--*` classes in components
2. Replace with Bootstrap grid classes (`row`, `col-*`)
3. Delete custom grid CSS from `_settings.scss`
4. Test responsive behavior

**Estimated Impact:**
- Removes ~60 lines of custom CSS
- Makes layout easier for AI agents to understand (standard Bootstrap)
- Reduces CSS bundle size

---

#### 5. Replace Responsive Visibility Helpers with Bootstrap
**File:** `/src/scss/_settings.scss` (lines 394-434)

**Current Custom CSS to Replace:**
```scss
.visible-xs-block { display: none !important; }
.visible-md-block { display: none !important; }
.hidden-xs { display: none !important; }
// ... etc
```

**Replace With Bootstrap:**
```html
<!-- Old -->
<div class="hidden-xs visible-md-block">Desktop only</div>
<div class="visible-xs-block">Mobile only</div>

<!-- New with Bootstrap -->
<div class="d-none d-md-block">Desktop only</div>
<div class="d-block d-md-none">Mobile only</div>
```

**Steps:**
1. Find all usages of visibility helper classes
2. Replace with Bootstrap display utilities
3. Delete custom visibility CSS from `_settings.scss`
4. Test responsive behavior

**Estimated Impact:**
- Removes ~40 lines of custom CSS
- Standard Bootstrap utilities are easier for AI agents to understand

---

#### 6. Delete Deprecated Footer Styles
**File:** `/src/scss/_settings.scss` (lines 437-460)

**Issue:** These styles have a comment saying "DEPRECATED - Now using _footer.scss"

**Steps:**
1. Verify footer still works without these styles
2. Delete lines 437-460 from `_settings.scss`

**Estimated Impact:** Removes ~25 lines of deprecated code

---

#### 7. Move Background Decorations to Page Components
**File:** `/src/scss/_backgrounds.scss` (entire file - 131 lines)

**Issue:** Very specific background positioning, not reusable

**Move To:**
- Likely `/src/pages/Home/Backgrounds.scss` or similar page-specific component

**Steps:**
1. Identify which pages use these background classes
2. Move styles to page-specific SCSS files
3. Import in page components (not globally)
4. Remove `/src/scss/_backgrounds.scss` and its import from `styles.scss`

**Estimated Impact:** Reduces global CSS by 131 lines

---

### Priority: Medium (Do These Next)

#### 8. Extract Component-Specific Styles from `_settings.scss`

**Styles to Move:**

| Lines | Class | Move To | Reason |
|-------|-------|---------|--------|
| 102-181 | `ul.selector` | Component using it | Only used in specific component |
| 372-390 | `.title-border` and variants | Shared component or mixin | Used across multiple components |
| 391-392 | `.title--slim` | Components using it | Component-specific styling |
| 462-482 | `.socials` | Footer or Social component | Only used in footer |
| 484-493 | `.socials-secondary` | Component using it | Specific to one component |

**Steps:**
1. Search for usages of each class in the codebase
2. Create component SCSS files if they don't exist
3. Move styles to component files
4. Import design tokens in component files
5. Delete from `_settings.scss`

**Estimated Impact:** Reduces `_settings.scss` by ~100 lines

---

#### 9. Extract Article Styles from `_hero.scss`
**Lines to Move:** 234-363

**Create New File:**
- `/src/components/Article/Article.scss`

**Steps:**
1. Create Article component SCSS file
2. Move article-specific styles from `_hero.scss`
3. Import in Article component
4. Keep only hero-related styles in `_hero.scss`

**Estimated Impact:** Reduces `_hero.scss` by ~130 lines

---

#### 10. Move Page-Specific Hero Sections
**Lines to Move:** 405-778 from `_hero.scss`

**Create New Files:**
- `/src/pages/Home/HeroSection.scss` (lines 405-625)
- `/src/pages/Home/SentryNodeSection.scss` (lines 724-778)
- Component file for hero buttons (lines 627-722)

**Estimated Impact:** Reduces `_hero.scss` by ~370 lines, making it focused on reusable hero component

---

#### 11. Investigate Missing `_article.scss`
**File:** Referenced in `styles.scss` line 61 but not found

**Steps:**
1. Search for `_article.scss` in the codebase
2. If it doesn't exist, remove the import from `styles.scss`
3. If it exists but misplaced, verify it's in the right location

---

### Priority: Low (Nice to Have)

#### 12. Replace `.text-center` with Bootstrap
**File:** `/src/scss/_settings.scss` line 370

**Current:**
```scss
.text-center { text-align: center; }
```

**Replace With:** Bootstrap's `.text-center` (already available)

**Steps:**
1. Verify Bootstrap's `.text-center` is available
2. Search for custom `.text-center` usages
3. Delete custom `.text-center` from `_settings.scss`

**Note:** This is low priority because it's only 1 line and Bootstrap may not be fully imported yet

---

#### 13. Consolidate Design Tokens
**File:** `/src/scss/_settings.scss` (lines 1-46)

**Opportunity:** Some variables in `_settings.scss` overlap with `_design-tokens.scss`

**Steps:**
1. Review variables in both files
2. Move shared design variables to `_design-tokens.scss`
3. Keep only Bootstrap-specific overrides in `_settings.scss`

---

#### 14. Review `_icons.scss` and `_mixins.scss`
**Files Not Analyzed:** These were imported but not read during investigation

**Steps:**
1. Read `/src/scss/_icons.scss`
2. Read `/src/scss/_mixins.scss`
3. Verify they contain only global utilities (good to keep global)
4. Move any component-specific content to component files

---

## Benefits of Implementing These Changes

### 1. Easier for AI Agents to Understand
- Bootstrap utilities are standard and well-documented
- Component-scoped CSS is easier to reason about
- Reduced global namespace pollution

### 2. Better Maintainability
- Changes to About page styles won't affect other pages
- Clearer separation of concerns
- Easier to find relevant styles

### 3. Smaller CSS Bundle
- Components only load styles they need
- Tree-shaking can remove unused component styles
- Global CSS is significantly smaller

### 4. Improved Developer Experience
- Faster to locate styles (next to component using them)
- Less risk of unintended side effects
- Clear ownership of styles

---

## Implementation Strategy

### Phase 1: High Priority (Week 1-2)
- Move About page styles (7 files) → Component-specific
- Extract governance styles from `App.css`
- Extract proposals/stats from `_tables.scss`
- Move `_backgrounds.scss` to page components

**Estimated Impact:** Reduces global CSS by ~2000-2500 lines

### Phase 2: Bootstrap Migration (Week 3)
- Replace custom grid with Bootstrap grid
- Replace visibility helpers with Bootstrap display utilities
- Delete deprecated footer styles

**Estimated Impact:**
- Removes ~100 lines of custom CSS
- Makes codebase more standard/accessible

### Phase 3: Medium Priority (Week 4)
- Extract remaining component-specific styles from `_settings.scss`
- Move article styles from `_hero.scss`
- Move page-specific hero sections

**Estimated Impact:** Reduces `_settings.scss` and `_hero.scss` by ~600 lines

### Phase 4: Low Priority (Week 5)
- Consolidate design tokens
- Review `_icons.scss` and `_mixins.scss`
- Additional Bootstrap replacements

---

## Testing Checklist

After each migration, verify:
- [ ] Page still renders correctly
- [ ] Responsive breakpoints still work
- [ ] No visual regressions
- [ ] CSS bundle size decreased
- [ ] No console errors
- [ ] Hover/focus/active states still work

---

## Summary Statistics

### Current State
- **Global SCSS files:** 26+ files
- **Total global CSS/SCSS lines:** ~5,000-6,000 lines (estimated)
- **Component SCSS files:** 40+ files (good!)

### Target State (After All Improvements)
- **Global SCSS files:** ~12 files (design system only)
- **Total global CSS/SCSS lines:** ~2,500-3,000 lines (50% reduction)
- **Component SCSS files:** 55+ files (moving component-specific styles)

### Files That Should Remain Global
1. `_design-tokens.scss` - Design system foundation ✅
2. `_settings.scss` - Reduced to Bootstrap overrides and true global utilities
3. `_mixins.scss` - Reusable mixins
4. `_header.scss` - Global layout
5. `_footer.scss` - Global layout
6. `_nav.scss` - Global navigation
7. `_btns.scss` - Design system buttons
8. `_cards.scss` - Design system cards
9. `_inputs.scss` - Design system form elements
10. `_modal.scss` - Design system modals
11. `_tables.scss` - Reduced to base table styles only
12. `_icons.scss` - Icon utilities (if truly global)
13. `_hero.scss` - Reduced to reusable hero component only

### Files That Should Be Component-Specific
1. All About page files (7 files) → `/src/components/About/`
2. `_backgrounds.scss` → Page components
3. Governance styles from `App.css` → `/src/components/governance/`
4. Proposals from `_tables.scss` → `/src/pages/Governance/`
5. Stats from `_tables.scss` → `/src/pages/Stats/`
6. Article styles from `_hero.scss` → `/src/components/Article/`
7. Page-specific sections from `_hero.scss` → Page components

---

## Conclusion

The codebase has a solid foundation with design tokens and reusable component styles. However, there are significant opportunities to:

1. **Reduce global CSS by ~50%** by moving page/component-specific styles
2. **Improve maintainability** with better separation of concerns
3. **Leverage Bootstrap utilities** instead of custom CSS for common patterns
4. **Make it easier for AI agents** to understand and modify the codebase

The high-priority items will have the biggest impact and should be tackled first. Parallel work can be done on different sections (About page, Governance, Stats) to speed up the refactoring.
