# ABOUT PAGE REDESIGN - SINGLE AGENT IMPLEMENTATION PLAN

## Overview
Complete redesign of the About page from traditional timeline layout to modern card-based design with toggle-controlled seniority sections. This plan is designed for a **single agent** to execute the entire redesign end-to-end.

**Estimated Duration:** 3-4 hours
**Complexity:** High (multiple components, styling, i18n updates, testing)

---

## Key Design Changes

### 1. Hero Section
- **Current**: InnerBanner with basic heading
- **New**: Large hero section with:
  - Heading: "Learn about Syscoin SentryNodes"
  - 3 paragraphs of descriptive text (from Figma)
  - 3D device image positioned on right side
  - Responsive layout (stack on mobile)

### 2. Feature Cards Section (NEW)
- **Location**: After hero section
- **Layout**: 4-card responsive grid (4 cols desktop → 2 cols tablet → 1 col mobile)
- **Cards**:
  1. "Syscoin Features and Services"
  2. "Seniority benefits to masternode operators"
  3. "2-DBG Protocol's instant asset transfer"
  4. "Scalability"
- **Styling**: Cards with icons, hover effects, clean typography

### 3. Seniority Section (MAJOR REFACTOR)
- **Current**: Vertical timeline with alternating left/right blocks
- **New**: Toggle button system with expandable calculation boxes
  - Toggle buttons: "1 Month", "1 Year", "2.5 Years"
  - Selected button shows calculation details
  - Smooth transitions between states
  - Each period displays different percentage increase

### 4. Other Sections (Style Updates)
- Governance section: Refine styling and spacing
- Rewards section: Update layout and visual hierarchy
- Requirements list: Polish typography and styling

---

## Implementation Steps

### Step 1: Analyze Current Implementation (15 minutes)
- [ ] Review `src/pages/About.js` structure
- [ ] Examine current i18n keys and translation files
- [ ] Check SCSS files for About page styling (`src/scss/_about.scss`)
- [ ] Understand component hierarchy and imports
- **Output**: Mental map of current structure

### Step 2: Update Translation Keys (20 minutes)
- [ ] Locate i18n translation files (likely in `public/locales/`)
- [ ] Add new hero section text (3 paragraphs from Figma)
- [ ] Add feature card titles and descriptions
- [ ] Update/add seniority section toggle labels
- [ ] Ensure all keys follow existing naming conventions
- **Output**: Updated translation files with new keys

### Step 3: Create Feature Cards Component (30 minutes)
- [ ] Create new component file: `src/components/About/FeatureCards.jsx`
- [ ] Design 4-card grid layout with responsive breakpoints
- [ ] Style cards with design tokens (colors, spacing, shadows)
- [ ] Add hover effects and transitions
- [ ] Add proper i18n key references
- **Output**: Fully styled feature cards component

### Step 4: Create Seniority Toggle Component (45 minutes)
- [ ] Create new component: `src/components/About/SenioritySection.jsx`
- [ ] Implement toggle button state management
- [ ] Create toggle button group styling
- [ ] Build collapsible calculation box for each period
- [ ] Display appropriate content based on selected period
- [ ] Add smooth CSS transitions
- [ ] Style calculation details boxes (colors, spacing, typography)
- **Output**: Fully functional seniority section with working toggles

### Step 5: Refactor Hero Section (25 minutes)
- [ ] Create new component: `src/components/About/HeroSection.jsx`
- [ ] Update heading and replace with new content from Figma
- [ ] Position 3D device image on right side (responsive)
- [ ] Apply Figma design styling (colors, spacing, typography)
- [ ] Ensure responsive behavior (mobile: stack vertically)
- **Output**: Modern hero section component

### Step 6: Extract & Update Other Sections (20 minutes)
- [ ] Extract governance section to separate component if needed
- [ ] Extract rewards section to separate component if needed
- [ ] Update styling for consistency with new design
- [ ] Refine typography and spacing throughout
- **Output**: Modular section components with updated styles

### Step 7: Update SCSS Files (30 minutes)
- [ ] Review and update `src/scss/_about.scss`
- [ ] Create new SCSS files if needed (`_about-hero.scss`, `_about-cards.scss`, `_about-seniority.scss`)
- [ ] Use design tokens for all colors, spacing, typography
- [ ] Add responsive breakpoints (mobile, tablet, desktop)
- [ ] Ensure no hard-coded colors or values
- [ ] Add hover/active states for interactive elements
- **Output**: Complete SCSS styling with design tokens

### Step 8: Refactor About.js Main Component (30 minutes)
- [ ] Import new components (HeroSection, FeatureCards, SenioritySection, etc.)
- [ ] Update page structure to use new components
- [ ] Verify all i18n keys are properly passed to components
- [ ] Remove old inline styling or component code
- [ ] Update className structures as needed
- [ ] Ensure proper component hierarchy
- **Output**: Refactored About.js with clean component structure

### Step 9: Test Responsive Design (20 minutes)
- [ ] Test at mobile breakpoint (375px)
- [ ] Test at tablet breakpoint (768px)
- [ ] Test at desktop breakpoint (1440px+)
- [ ] Verify images scale correctly
- [ ] Check text readability at all sizes
- [ ] Verify toggle functionality on touch devices
- [ ] Check card grid layout at all breakpoints
- **Output**: Verified responsive behavior

### Step 10: Visual Verification & Polish (20 minutes)
- [ ] Compare rendered page against Figma design
- [ ] Verify colors match design tokens
- [ ] Check spacing and alignment
- [ ] Verify typography hierarchy
- [ ] Test all interactive elements (hovers, toggles)
- [ ] Check for console errors or warnings
- [ ] Ensure smooth transitions and animations
- **Output**: Polished, visually correct About page

### Step 11: Browser Testing (15 minutes)
- [ ] Test in Chrome/Safari
- [ ] Verify all styles render correctly
- [ ] Check image loading
- [ ] Test form inputs and interactions
- [ ] Verify footer and header integration
- **Output**: Cross-browser compatibility confirmed

### Step 12: Build & Deployment Check (10 minutes)
- [ ] Run `npm run build` to verify production build works
- [ ] Check for build errors or warnings
- [ ] Verify no console errors in built version
- [ ] Test built version locally if possible
- **Output**: Confirmed build succeeds

---

## File Structure to Create/Modify

### New Files to Create
```
src/components/About/
├── HeroSection.jsx          (Hero with heading, text, image)
├── FeatureCards.jsx         (4-card grid component)
├── SenioritySection.jsx      (Toggle + expandable content)
├── GovernanceSection.jsx     (Extracted, updated)
├── RewardsSection.jsx        (Extracted, updated)
└── index.js                  (Barrel export)

src/scss/
├── _about-hero.scss         (Hero styling)
├── _about-cards.scss        (Feature cards styling)
└── _about-seniority.scss    (Seniority toggle styling)
```

### Files to Modify
```
src/pages/About.js                      (Main page - restructure with new components)
src/scss/_about.scss                    (Update/consolidate styling)
src/scss/styles.scss                    (Ensure imports included)
public/locales/en/about.json            (Add new translation keys)
public/locales/[other-langs]/about.json (Add new translation keys for all languages)
```

---

## Key Technical Details

### Design Tokens to Use
```scss
// Colors (already defined in _design-tokens.scss)
$color-primary: #FBB03B          // Gold (buttons, accents)
$color-secondary: #1F5EFF        // Blue (secondary actions)
$color-text: #FFFFFF             // White text
$color-background: #0A0A0A       // Black background
$color-surface: #1A1A1A          // Dark surface (cards)

// Spacing
$space-sm: 12px
$space-md: 16px
$space-lg: 24px
$space-xl: 32px

// Typography
Use typography mixins from _mixins.scss
@include typography-h1
@include typography-h2
@include typography-body-medium

// Breakpoints
$breakpoint-mobile: 375px
$breakpoint-tablet: 768px
$breakpoint-desktop: 992px
```

### i18n Key Naming Convention
```
about.hero.heading
about.hero.paragraph1
about.hero.paragraph2
about.hero.paragraph3

about.features.title
about.features.card1.title
about.features.card1.description
about.features.card2.title
...etc

about.seniority.toggles.month
about.seniority.toggles.year
about.seniority.toggles.years
about.seniority.calculation.month
...etc
```

### Component Props Pattern
All components should accept:
- `t` (i18n function) via withTranslation HOC
- className for styling overrides
- Standard React component props

### Responsive Design Approach
Use Bootstrap grid classes + SCSS media queries:
```scss
.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: $space-lg;

  @media (max-width: $breakpoint-tablet) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: $breakpoint-mobile) {
    grid-template-columns: 1fr;
  }
}
```

---

## Testing Checklist

### Visual Testing
- [ ] Hero section displays with correct heading and text
- [ ] Hero image scales and positions correctly
- [ ] Feature cards display in proper grid layout
- [ ] Feature cards have visible hover effects
- [ ] Seniority toggles are clickable and visually distinct
- [ ] Seniority content updates when toggle changes
- [ ] All text is readable at all breakpoints
- [ ] Colors match design tokens
- [ ] Spacing is consistent throughout

### Functional Testing
- [ ] All i18n keys resolve to proper text
- [ ] Seniority toggle state changes properly
- [ ] Responsive layout works at all breakpoints
- [ ] Images load without errors
- [ ] No console errors or warnings
- [ ] Links work if any added
- [ ] Transitions are smooth

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Toggle buttons are properly labeled
- [ ] Images have alt text
- [ ] Color contrast is sufficient
- [ ] Form inputs (if any) have labels

### Browser Testing
- [ ] Chrome desktop
- [ ] Safari desktop
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)
- [ ] Tablet view

---

## Success Criteria

- [ ] About page matches Figma design visually
- [ ] Hero section displays correctly with new text and image
- [ ] Feature cards component renders in responsive grid
- [ ] Seniority toggle system works correctly (toggle changes content)
- [ ] All sections maintain responsive design
- [ ] All i18n keys properly implemented
- [ ] No console errors or warnings
- [ ] Build succeeds without errors (`npm run build`)
- [ ] Page loads without performance issues
- [ ] Cross-browser compatibility verified

---

## Troubleshooting Guide

### If styles don't apply:
1. Verify SCSS import in `src/scss/styles.scss`
2. Check for specificity issues in CSS
3. Clear browser cache and rebuild
4. Verify design tokens are imported

### If i18n keys show as undefined:
1. Check key spelling and nesting in translation files
2. Verify withTranslation HOC is applied
3. Confirm `t` prop is passed to component
4. Check language file exists for all languages

### If responsive layout breaks:
1. Verify media queries use correct breakpoints
2. Check grid/flexbox configuration
3. Test with browser dev tools responsive mode
4. Verify Bootstrap grid classes work correctly

### If component doesn't render:
1. Check import paths are correct
2. Verify component exports properly
3. Look for React errors in console
4. Confirm all required props are passed

---

## Agent Role Rules & Responsibilities

This is a **multi-faceted single-agent task**. Throughout execution, you will adopt different specialized roles:

### ROLE 1: Component Builder (Steps 3-8)
**When executing**: Steps 3, 4, 5, 6, 7, 8 (component creation and SCSS styling)

**Read the Component Builder System Prompt** from `.claude/agents/component-builder.md`:
- MUST follow design token compliance absolutely - NO hard-coded colors, spacing, or sizing
- Review `src/scss/_design-tokens.scss` before writing any styles
- Use ONLY design tokens in SCSS files
- Cover all interactive states (default, hover, active, disabled, focus)
- Verify SCSS compilation with `npm run build`
- Follow BEM naming conventions and component patterns
- Quality check each component before moving forward

**Key Rules**:
- ✅ ALL values must come from design tokens
- ✅ Verify all color values match token definitions
- ✅ Verify all spacing uses token variables
- ✅ Verify all typography follows token patterns
- ❌ NO hard-coded hex colors
- ❌ NO inline styles
- ❌ NO magic numbers for spacing

### ROLE 2: UX Design Reviewer (Steps 9, 10)
**When executing**: Steps 9 and 10 (visual verification and polish)

**Read the UX Design Reviewer System Prompt** from `.claude/agents/ux-design-reviewer.md`:
- Perform meticulous pixel-perfect review against Figma design
- Examine spacing, layout, typography, colors with precision
- Check responsive behavior across all breakpoints (mobile, tablet, desktop)
- Document any discrepancies with exact values
- Compare rendered output against Figma design systematically
- Verify interactive states match design
- Use methodology: layout → components → spacing → typography → colors → interactive states

**Key Rules**:
- ✅ Compare EVERY visual element against Figma
- ✅ Note exact measurements (px values, colors, spacing)
- ✅ Test at 375px (mobile), 768px (tablet), 1440px (desktop)
- ✅ Verify hover/focus states match design
- ❌ Don't skip responsive testing
- ❌ Don't accept "close enough" - pixel-perfect match required

### ROLE 3: Visual Tester (Step 12 - Post-build verification)
**When executing**: Step 12 (build verification and browser testing)

**Read the Visual Tester System Prompt** from `.claude/agents/visual-tester.md`:
- Verify visual properties (colors, sizes, spacing) match design tokens
- Test all component states in built version
- Cross-reference rendered colors against design token values
- Report any mismatches with specific hex values
- Ensure screenshot comparisons verify rendering consistency

**Key Rules**:
- ✅ Verify colors match design tokens exactly
- ✅ Test all interactive states
- ✅ Cross-reference values against _design-tokens.scss
- ✅ Provide specific hex values in reports
- ❌ Don't skip any component states
- ❌ Don't proceed if build has errors

---

## Notes for Agent

1. **Source of Truth**: Figma design image and current About.js implementation
2. **Design Consistency**: Use existing design tokens from `_design-tokens.scss` - no hard-coded colors
3. **i18n Integration**: All text must come from translation files, not hardcoded
4. **Code Quality**: Follow existing project patterns and conventions
5. **Testing**: Verify visual output matches Figma at each major step
6. **Component Modularity**: Keep components small and focused (single responsibility)
7. **Responsive First**: Test responsive behavior as you build, not at the end
8. **Performance**: Optimize images, avoid unnecessary re-renders
9. **Accessibility**: Ensure keyboard navigation and semantic HTML
10. **Documentation**: Comments for complex logic, but code should be self-documenting
11. **Role-Based Rigor**: When in Component Builder mode, ensure design token compliance. When in UX Reviewer mode, be pixel-perfect. When in Visual Tester mode, be exhaustive about state coverage.

---

## Quick Reference: Figma Content

### Hero Section Text
```
Heading: Learn about Syscoin SentryNodes

Paragraph 1:
"Syscoin SentryNodes protect the blockchain from outside attacks. In the same vein as traditional proof of stake algorithms, it's important to accumulate enough of a currency to create a node."

Paragraph 2:
"This important token helps fund the network decentralization. A node is also able to transfer Syscoin through trading and selling on the Syscoin exchange. Syscoin is built as a liquid sidechain of Bitcoin."

Paragraph 3:
"The cost of operating a Sentry Node varies, depending on time and price. We estimate that most coin has spent around 20k SYS coin and up on the SYS and then they produce their brand new Sentry Node properly and without any maintenance issues."
```

### Feature Cards Titles
1. "Syscoin Features and Services"
2. "Seniority benefits to masternode operators"
3. "2-DBG Protocol's instant asset transfer"
4. "Scalability"

### Seniority Periods
- 1 Month: 30% increase of base rate
- 1 Year: 50% increase of base rate
- 2.5 Years: [Higher percentage - verify in Figma]

---

## Execution Flow

1. **Start** → Step 1 (Analyze)
2. **Quick Decisions** → Step 2 (Update i18n)
3. **Build Components** → Steps 3-6 (Components)
4. **Style & Polish** → Steps 7-8 (SCSS & refactor)
5. **Test & Verify** → Steps 9-12 (Testing & build)
6. **Done** → Commit changes

**Total Time**: 3-4 hours of focused work

---

**Plan Created**: 2025-11-11
**Target Agent**: General Purpose / Component Builder (with role-based switching)
**Status**: Ready for Execution

---

## Progress Tracking & Session Continuation

### How to Track Progress

Create/Update `ABOUT_PAGE_PROGRESS.md` after each session to track:

1. **Session Summary**
   - Date and duration
   - Which steps were completed
   - Current status

2. **Completed Steps**
   - List each completed step with ✅
   - Include what was delivered
   - Note any issues encountered and how they were resolved

3. **In-Progress Step**
   - Current step being worked on
   - What has been done so far
   - What remains to be done
   - Any blockers or decisions needed

4. **Files Modified/Created**
   - List all files touched in this session
   - Include file paths
   - Brief description of changes

5. **Known Issues**
   - Any bugs, warnings, or errors encountered
   - How they were addressed (or if unresolved)
   - Recommendations for next session

6. **Next Session Instructions**
   - Which step to resume from
   - Any prerequisites to run first
   - Quick setup commands if needed
   - Critical context for resuming

### Progress File Template

```markdown
# ABOUT PAGE REDESIGN - Session Progress

**Session Date**: [DATE]
**Duration**: [HOURS]
**Agent**: [AGENT NAME]

## Session Summary
[Brief overview of what was accomplished]

## Completed Steps
- [x] Step 1: Analyzed current implementation ✅
- [x] Step 2: Updated translation keys ✅
- [x] Step 3: Created feature cards component ✅
- [ ] Step 4: Seniority toggle component
- [ ] Step 5: Hero section refactor
... etc

## Current Status: [STEP_NUMBER - IN_PROGRESS]

### What's Done
- [Description of completed work in current step]

### What Remains
- [Description of remaining work]

### Blockers
- [Any issues preventing progress]

## Files Modified/Created This Session
- `src/components/About/FeatureCards.jsx` - NEW
- `src/scss/_about-cards.scss` - NEW
- `public/locales/en/about.json` - MODIFIED

## Known Issues
- [Issue description] - [Status: Fixed/Pending/Workaround]

## Next Session Start Point
- **Resume from**: Step [X]
- **Prerequisites**: Run `npm install` if new packages added
- **Key file locations**:
  - Components: `src/components/About/`
  - Styling: `src/scss/_about*.scss`
  - Translations: `public/locales/*/about.json`
- **Quick commands**:
  ```bash
  npm start                 # Start dev server
  npm run build            # Test production build
  git status               # Check changes
  ```

## Agent Notes for Next Session
[Any specific guidance or context for continuing the work]
```

### When to Update Progress

- **End of each step**: Update after completing major steps (especially 3, 4, 5, 6)
- **Before switching contexts**: If pausing and resuming later
- **Before final commit**: Comprehensive summary of entire session
- **After encountering issues**: Document the issue and solution for continuity

### Important for Continuity

The progress file ensures:
1. ✅ Next agent/session knows exactly where to resume
2. ✅ No duplicate work or missed steps
3. ✅ Context about decisions made and issues encountered
4. ✅ Quick reference for file locations and git status
5. ✅ Prevention of scope creep (clear what's done vs todo)

### File Location
Save as: `redesign_docs/ABOUT_PAGE_PROGRESS.md`

Push to git at end of session with commit message:
```
docs: Update About page redesign progress - [COMPLETED STEPS]
```
