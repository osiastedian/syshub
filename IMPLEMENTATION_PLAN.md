# ABOUT PAGE REDESIGN - IMPLEMENTATION PLAN

## Overview
Transform the About page from a traditional timeline-based layout to a modern, card-based design with toggle-controlled sections and refined visual hierarchy, matching the Figma redesign specifications.

---

## Key Design Changes

### 1. Hero Section
- **Current**: InnerBanner with basic heading
- **New**: Large hero with "Learn about Syscoin SentryNodes" heading, 3 paragraph descriptions, and 3D device image on right
- **Content from Figma**:
  - Para 1: "Syscoin SentryNodes protect the blockchain from outside attacks..."
  - Para 2: "This important token helps fund the network decentralization..."
  - Para 3: "The cost of operating a Sentry Node varies..."

### 2. Feature Cards Section (NEW)
- **Location**: After hero, before governance
- **Layout**: 4-card responsive grid
- **Cards**:
  1. "Syscoin Features and Services"
  2. "Seniority benefits to masternode operators"
  3. "2-DBG Protocol's instant asset transfer"
  4. "Scalability"
- **Features**: Icons, hover states, responsive stacking

### 3. Seniority Section
- **Current**: Vertical timeline with alternating left/right blocks
- **New**: Toggle button system with collapsible details
- **Toggles**: "1 Month", "1 Year", "2.5 Years"
- **Content**: Shows calculation details for each period
  - 1 Month: 30% increase
  - 1 Year: 50% increase
  - 2.5 Years: Higher percentage

### 4. Sections Retained (with style updates)
- Governance section
- Rewards section
- Requirements list

---

## Implementation Tasks

### PHASE 1: Discovery & Analysis

**Task 1.1: Code Structure & Architecture**
- Map About page component dependencies
- Identify SCSS files and design patterns
- Document component hierarchy
- Extract existing styling patterns
- **Owner**: Explore Agent
- **Input**: Codebase analysis
- **Output**: Architecture document with file paths

**Task 1.2: i18n Translation Structure**
- Catalog current translation keys
- Map key hierarchy
- Identify missing keys for new content
- Document translation file locations
- **Owner**: Explore Agent
- **Input**: i18n configuration and files
- **Output**: Translation audit document

---

### PHASE 2: Component Development

**Task 2.1: Hero Section Component**
- Create new hero section JSX
- Update heading and text from Figma
- Position 3D device image responsively
- Apply new styling (colors, spacing, typography)
- Ensure responsive behavior
- **Owner**: Component Builder Agent
- **Input**: Figma design specs, current component code
- **Output**: Updated hero component JSX and SCSS

**Task 2.2: Feature Cards Component (NEW)**
- Build 4-card grid component
- Add card styling with hover effects
- Create responsive grid (4 cols → 2 cols → 1 col)
- Add icons/graphics for each card
- **Owner**: Component Builder Agent
- **Input**: Figma design specs
- **Output**: Feature cards component JSX and SCSS

**Task 2.3: Seniority Section Refactor**
- Replace timeline with toggle buttons
- Build toggle state management
- Create collapsible calculation boxes
- Add smooth transitions
- Update seniority display logic
- **Owner**: Component Builder Agent
- **Input**: Figma design specs, current seniority code
- **Output**: Refactored seniority section JSX and SCSS

**Task 2.4: Governance & Rewards Update**
- Update styling for consistency
- Refine typography and spacing
- Maintain responsive design
- **Owner**: Component Builder Agent
- **Input**: Figma design specs
- **Output**: Updated sections JSX and SCSS

---

### PHASE 3: Styling & Design Tokens

**Task 3.1: SCSS/Design Tokens**
- Define color palette (if new colors in Figma)
- Create spacing/padding system
- Build component-specific styles
- Ensure design token consistency
- **Owner**: Component Builder Agent
- **Input**: Figma design, current SCSS
- **Output**: Updated SCSS files with new tokens

---

### PHASE 4: Translation & i18n

**Task 4.1: Update Translation Files**
- Add new hero section text (3 paragraphs)
- Add feature card titles and descriptions
- Update seniority section labels
- Add toggle button labels
- Ensure all keys properly structured
- **Owner**: General Purpose Agent
- **Input**: Translation audit, Figma content
- **Output**: Updated i18n JSON/YAML files

---

### PHASE 5: Integration

**Task 5.1: About.js Integration**
- Replace old section imports with new components
- Update component hierarchy
- Verify all i18n keys are referenced
- Update className structures
- Test component rendering
- **Owner**: General Purpose Agent
- **Input**: New components, updated i18n
- **Output**: Updated About.js page component

---

### PHASE 6: Testing & QA

**Task 6.1: Visual Testing**
- Compare rendered output against Figma design
- Verify colors, spacing, typography
- Test all interactive elements
- Check responsive behavior (mobile, tablet, desktop)
- **Owner**: Visual Tester Agent
- **Input**: Figma design, deployed/local build
- **Output**: Visual test report with screenshots

**Task 6.2: Accessibility & Performance**
- Verify a11y compliance (WCAG AA)
- Test keyboard navigation
- Test screen reader compatibility
- Verify image loading and performance
- **Owner**: General Purpose Agent
- **Input**: Updated page component
- **Output**: QA report with issues/fixes

---

## File Structure & Dependencies

### Components to Create/Modify
- `src/pages/About.js` - Main page component (MODIFY)
- `src/components/About/HeroSection.jsx` - New hero component (CREATE)
- `src/components/About/FeatureCards.jsx` - New feature cards (CREATE)
- `src/components/About/SenioritySection.jsx` - Refactored seniority (CREATE)
- `src/components/About/GovernanceSection.jsx` - Extracted/updated (CREATE)
- `src/components/About/RewardsSection.jsx` - Extracted/updated (CREATE)

### Styling Files
- `src/scss/_about.scss` - Main About page styles (MODIFY)
- `src/scss/_cards.scss` - Card component styles (MODIFY/CREATE)
- `src/scss/_hero.scss` - Hero section styles (CREATE)
- `src/scss/_seniority.scss` - Seniority section styles (MODIFY/CREATE)

### Translation Files
- `public/locales/en/about.json` - English translations (MODIFY)
- `public/locales/[lang]/about.json` - Other languages (MODIFY)

---

## Execution Plan

### Wave 1 (Parallel Discovery)
- **Task 1.1**: Code structure analysis
- **Task 1.2**: i18n audit
- **Duration**: ~30 minutes
- **Output**: Architecture and translation documents

### Wave 2 (Parallel Component Development)
- **Task 2.1**: Hero section
- **Task 2.2**: Feature cards
- **Task 2.3**: Seniority refactor
- **Task 2.4**: Governance/Rewards update
- **Task 3.1**: SCSS/tokens
- **Duration**: ~2-3 hours
- **Output**: All component code with styling

### Wave 3 (Translation Update)
- **Task 4.1**: Update i18n files
- **Duration**: ~30 minutes
- **Output**: Updated translation files

### Wave 4 (Integration)
- **Task 5.1**: About.js integration
- **Duration**: ~1 hour
- **Output**: Updated main page component

### Wave 5 (Testing & QA)
- **Task 6.1**: Visual testing
- **Task 6.2**: Accessibility/Performance
- **Duration**: ~1-2 hours
- **Output**: QA reports, any fixes needed

---

## Success Criteria

- [ ] Hero section matches Figma design (text, image, layout, colors)
- [ ] Feature cards display correctly in 4-col/2-col/1-col responsive layout
- [ ] Seniority toggles work correctly and display appropriate content
- [ ] All sections maintain responsive design across breakpoints
- [ ] All i18n keys properly updated and referenced
- [ ] Visual comparison passes against Figma design
- [ ] Accessibility compliance verified (WCAG AA)
- [ ] No console errors or warnings
- [ ] Page loads without performance issues

---

## Parallel Agent Strategy

This plan is designed for parallel execution using these agent types:

1. **Explore Agent** (Wave 1)
   - Tasks: 1.1, 1.2
   - Purpose: Analyze codebase structure and i18n setup

2. **Component Builder Agent** (Wave 2)
   - Tasks: 2.1, 2.2, 2.3, 2.4, 3.1
   - Purpose: Build components and styling

3. **General Purpose Agent** (Waves 3, 4, 5.2)
   - Tasks: 4.1, 5.1, 6.2
   - Purpose: Translation updates, integration, QA

4. **Visual Tester Agent** (Wave 5.1)
   - Task: 6.1
   - Purpose: Visual design verification

---

## Notes

- All components should use existing project patterns and utilities
- Maintain consistency with current design system (Bootstrap 5, existing colors)
- All new code should follow project conventions (React class/functional, i18n usage)
- Responsive design is critical - test at 375px, 768px, 1440px+ breakpoints
- Preserve backward compatibility with existing translations
