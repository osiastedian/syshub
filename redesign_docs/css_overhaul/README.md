# CSS Overhaul Plan

**Goal:** Reduce global CSS footprint and improve maintainability by moving component-specific styles from global files to component-scoped CSS files.

**Critical Rule:** ⚠️ **Each PR must be mergeable to main without breaking layout or visual appearance**

## Overview

Based on the investigation in `00_INVESTIGATION_REPORT.md`, we identified ~2,000-2,500 lines of component-specific CSS in global files that should be moved to component-scoped files.

## Strategy

Each task below is **independent** and **non-breaking**. They can be:
- Worked on in parallel by different agents
- Merged in any order
- Tested individually without dependencies

## Task Breakdown

Each task follows this pattern:
1. **Copy** styles from global file to new component file
2. **Import** design tokens in new component file
3. **Verify** layout is identical (no visual changes)
4. **Only then delete** from global file
5. Commit with clear before/after verification

---

## Tasks (Prioritized by Independence)

### ✅ Task 1: Move ProfileCloseAccountConfirmation Styles
**Status:** Already Done (Good Example)
- File is already component-scoped
- Uses design tokens
- No global dependencies

---

### Task 2: Extract CLI Command Styles from App.css
**File:** `01_cli_command_container.md`
**Affected Components:** Governance proposal pages
**Lines:** `src/App.css` lines 44-80
**Target:** `src/components/governance/CliCommandContainer.scss`

**Why Safe to Merge:**
- Only used in governance components
- Self-contained styles (no external dependencies)
- Can be imported only where needed

---

### Task 3: Extract Proposal Link Button from App.css
**File:** `02_proposal_link_button.md`
**Affected Components:** Governance proposal pages
**Lines:** `src/App.css` lines 82-115
**Target:** `src/components/governance/ProposalLinkButton.scss`

**Why Safe to Merge:**
- Only used in governance components
- Self-contained button styles
- Independent from Task 2

---

### Task 4: Extract Voting Commands from App.css
**File:** `03_voting_commands.md`
**Affected Components:** Governance proposal pages
**Lines:** `src/App.css` lines 117-191
**Target:** `src/components/governance/VotingCommands.scss`

**Why Safe to Merge:**
- Only used in governance components
- Self-contained styles
- Independent from Tasks 2 & 3

---

### Task 5: Move About Hero Section Styles
**File:** `04_about_hero_section.md`
**Affected Components:** About page only
**Source:** `src/scss/_about-hero.scss`
**Target:** `src/components/About/HeroSection.scss`

**Why Safe to Merge:**
- Only used on About page
- Already in separate file (just needs to move location)
- Remove from global import, add to About page component

---

### Task 6: Move About Cards Section Styles
**File:** `05_about_cards_section.md`
**Affected Components:** About page only
**Source:** `src/scss/_about-cards.scss`
**Target:** `src/components/About/FeatureCards.scss`

**Why Safe to Merge:**
- Only used on About page
- Independent from Task 5
- Can be moved separately

---

### Task 7: Move About Governance Section Styles
**File:** `06_about_governance_section.md`
**Affected Components:** About page only
**Source:** `src/scss/_about-governance.scss`
**Target:** `src/components/About/GovernanceSection.scss`

**Why Safe to Merge:**
- Only used on About page
- Independent from Tasks 5 & 6

---

### Task 8: Move About Rewards Section Styles
**File:** `07_about_rewards_section.md`
**Affected Components:** About page only
**Source:** `src/scss/_about-rewards.scss`
**Target:** `src/components/About/RewardsSection.scss`

**Why Safe to Merge:**
- Only used on About page
- Independent from other About section tasks

---

### Task 9: Move About Seniority Section Styles
**File:** `08_about_seniority_section.md`
**Affected Components:** About page only
**Source:** `src/scss/_about-seniority.scss`
**Target:** `src/components/About/SenioritySection.scss`

**Why Safe to Merge:**
- Only used on About page
- Independent from other About section tasks

---

### Task 10: Move About Requirements Section Styles
**File:** `09_about_requirements_section.md`
**Affected Components:** About page only
**Source:** `src/scss/_about-requirements.scss`
**Target:** `src/components/About/RequirementsSection.scss`

**Why Safe to Merge:**
- Only used on About page
- Independent from other About section tasks

---

### Task 11: Extract Proposals Styles from _tables.scss
**File:** `10_proposals_styles.md`
**Affected Components:** Governance page
**Lines:** `src/scss/_tables.scss` lines 197-665
**Target:** `src/pages/Governance/ProposalsList.scss`

**Why Safe to Merge:**
- Only used on Governance page
- Self-contained proposal card styles
- No dependencies on other tasks

---

### Task 12: Extract Ministry Stats from _tables.scss
**File:** `11_ministry_stats.md`
**Affected Components:** Stats page
**Lines:** `src/scss/_tables.scss` lines 732-878
**Target:** `src/pages/Stats/MinistryStats.scss`

**Why Safe to Merge:**
- Only used on Stats page
- Self-contained stats styles
- Independent from Task 11

---

### Task 13: Extract Governance Table from _tables.scss
**File:** `12_governance_table.md`
**Affected Components:** Governance page
**Lines:** `src/scss/_tables.scss` lines 879-944
**Target:** `src/pages/Governance/GovernanceTable.scss`

**Why Safe to Merge:**
- Only used on Governance page
- Independent from Tasks 11 & 12

---

### Task 14: Move Background Decorations to Home Page
**File:** `13_background_decorations.md`
**Affected Components:** Home page (primarily)
**Source:** `src/scss/_backgrounds.scss` (entire file)
**Target:** `src/pages/Home/BackgroundDecorations.scss`

**Why Safe to Merge:**
- Used only on specific pages
- Self-contained positioning styles
- Can identify which pages use which backgrounds

---

### Task 15: Extract Hero Section Specific Styles
**File:** `14_hero_section_specific.md`
**Affected Components:** Home page hero section
**Lines:** `src/scss/_hero.scss` lines 405-625
**Target:** `src/pages/Home/HeroSection.scss`

**Why Safe to Merge:**
- Very specific to Home page banner
- Keep generic `.hero` class in global
- Move only `.hero-section` specific styles

---

### Task 16: Extract SentryNode Section from _hero.scss
**File:** `15_sentrynode_section.md`
**Affected Components:** Home page
**Lines:** `src/scss/_hero.scss` lines 724-778
**Target:** `src/pages/Home/SentryNodeSection.scss`

**Why Safe to Merge:**
- Only used on Home page
- Independent from Task 15

---

### Task 17: Extract Hero Button Styles
**File:** `16_hero_buttons.md`
**Affected Components:** Components using `.hero-btn`
**Lines:** `src/scss/_hero.scss` lines 627-722
**Target:** `src/components/shared/HeroButton.scss` (if reused) OR page-specific

**Why Safe to Merge:**
- Self-contained button styles
- Independent from Tasks 15 & 16

---

### Task 18: Extract Article Component from _hero.scss
**File:** `17_article_component.md`
**Affected Components:** Article component
**Lines:** `src/scss/_hero.scss` lines 234-363
**Target:** `src/components/Article/Article.scss`

**Why Safe to Merge:**
- Self-contained article styles
- Used across multiple pages but can be component-imported

---

### Task 19: Move Socials Component from _settings.scss
**File:** `18_socials_component.md`
**Affected Components:** Footer/Social links
**Lines:** `src/scss/_settings.scss` lines 462-493
**Target:** `src/components/Footer/Socials.scss` OR `src/components/global/Socials.scss`

**Why Safe to Merge:**
- Self-contained social link styles
- Used primarily in footer

---

### Task 20: Move Title Border Utilities
**File:** `19_title_border_utilities.md`
**Affected Components:** Multiple components using `.title-border`
**Lines:** `src/scss/_settings.scss` lines 372-392
**Target:** `src/scss/_title-utilities.scss` (new global utility) OR move to components

**Why Safe to Merge:**
- Need to search all usages first
- If used in many places, could create a new utility file
- If used in few places, move to those components

**Note:** This task requires investigation first (search for `.title-border` usage)

---

### Task 21: Move Selector List from _settings.scss
**File:** `20_selector_list.md`
**Affected Components:** Component using `ul.selector`
**Lines:** `src/scss/_settings.scss` lines 102-181
**Target:** Component-specific SCSS

**Why Safe to Merge:**
- Self-contained list styles
- Need to find which component uses it

**Note:** This task requires investigation first (search for `ul.selector` usage)

---

### Task 22: Delete Deprecated Footer Styles
**File:** `21_delete_deprecated_footer.md`
**Affected Components:** None (already moved to _footer.scss)
**Lines:** `src/scss/_settings.scss` lines 437-460
**Target:** Delete only

**Why Safe to Merge:**
- Styles already exist in `_footer.scss`
- This is dead code removal
- Verify footer still works, then delete

---

## Bootstrap Migration Tasks (Lower Priority)

These tasks involve replacing custom CSS with Bootstrap utilities. They should be done **after** the component extraction tasks above to minimize risk.

### Task 23: Replace Custom Grid with Bootstrap Grid
**File:** `22_bootstrap_grid_migration.md`
**Lines:** `src/scss/_settings.scss` lines 304-367
**Target:** Replace usages with Bootstrap classes

**Why Safe to Merge:**
- Find all usages of `.cols`, `.col--*`
- Replace one component at a time
- Each component can be its own PR
- Test each component independently

**Note:** This should be broken into sub-tasks per component

---

### Task 24: Replace Visibility Helpers with Bootstrap
**File:** `23_bootstrap_visibility_migration.md`
**Lines:** `src/scss/_settings.scss` lines 394-434
**Target:** Replace usages with Bootstrap display utilities

**Why Safe to Merge:**
- Find all usages of `.visible-*`, `.hidden-*`
- Replace one component at a time
- Each component can be its own PR
- Test responsive behavior per component

**Note:** This should be broken into sub-tasks per component

---

## How to Execute a Task

### Step 1: Read Task File
Each task has its own markdown file (e.g., `01_cli_command_container.md`) with:
- Detailed instructions
- Code to copy
- Import statements needed
- Verification steps
- Testing checklist

### Step 2: Create New Branch
```bash
git checkout main
git pull origin main
git checkout -b claude/task-XX-description
```

### Step 3: Execute Task
Follow the instructions in the task file:
1. Copy styles from global to component file
2. Import design tokens
3. Test locally (verify no visual changes)
4. Delete from global file
5. Update imports if needed

### Step 4: Verify No Breaking Changes
- [ ] Run the application locally
- [ ] Navigate to affected pages
- [ ] Compare visual appearance (should be identical)
- [ ] Test responsive breakpoints
- [ ] Check browser console for errors

### Step 5: Commit and Push
```bash
git add .
git commit -m "refactor: Move [component] styles to component-scoped file"
git push -u origin claude/task-XX-description
```

### Step 6: Create PR
- Title: "refactor: Move [component] styles to component-scoped file"
- Description: Include before/after screenshots showing no visual changes
- Reference task file in description

---

## Parallel Work Strategy

Multiple agents can work on different tasks simultaneously:

**Agent Group 1 (Governance):**
- Task 2: CLI Command Container
- Task 3: Proposal Link Button
- Task 4: Voting Commands
- Task 11: Proposals Styles
- Task 13: Governance Table

**Agent Group 2 (About Page):**
- Task 5: About Hero
- Task 6: About Cards
- Task 7: About Governance Section
- Task 8: About Rewards Section
- Task 9: About Seniority Section
- Task 10: About Requirements Section

**Agent Group 3 (Stats Page):**
- Task 12: Ministry Stats

**Agent Group 4 (Home Page):**
- Task 14: Background Decorations
- Task 15: Hero Section Specific
- Task 16: SentryNode Section
- Task 17: Hero Buttons

**Agent Group 5 (Shared Components):**
- Task 18: Article Component
- Task 19: Socials Component

**Agent Group 6 (Cleanup):**
- Task 20: Title Border (after investigation)
- Task 21: Selector List (after investigation)
- Task 22: Delete Deprecated Footer

**Agent Group 7 (Bootstrap Migration):**
- Task 23: Grid Migration (after Tasks 1-22)
- Task 24: Visibility Migration (after Tasks 1-22)

---

## Progress Tracking

| Task | Status | PR Link | Notes |
|------|--------|---------|-------|
| Task 1 | ✅ Done | N/A | Already component-scoped |
| Task 2 | 📋 Ready | | |
| Task 3 | 📋 Ready | | |
| Task 4 | 📋 Ready | | |
| Task 5 | 📋 Ready | | |
| Task 6 | 📋 Ready | | |
| Task 7 | 📋 Ready | | |
| Task 8 | 📋 Ready | | |
| Task 9 | 📋 Ready | | |
| Task 10 | 📋 Ready | | |
| Task 11 | 📋 Ready | | |
| Task 12 | 📋 Ready | | |
| Task 13 | 📋 Ready | | |
| Task 14 | 📋 Ready | | |
| Task 15 | 📋 Ready | | |
| Task 16 | 📋 Ready | | |
| Task 17 | 📋 Ready | | |
| Task 18 | 📋 Ready | | |
| Task 19 | 📋 Ready | | |
| Task 20 | 🔍 Needs Investigation | | Search for usages first |
| Task 21 | 🔍 Needs Investigation | | Search for usages first |
| Task 22 | 📋 Ready | | |
| Task 23 | ⏳ Blocked | | Do after Tasks 1-22 |
| Task 24 | ⏳ Blocked | | Do after Tasks 1-22 |

---

## Success Metrics

After completing all tasks:
- [ ] Global CSS reduced by ~2,000-2,500 lines (~50% reduction)
- [ ] No visual regressions on any page
- [ ] All component-specific styles moved to component files
- [ ] All page-specific styles moved to page files
- [ ] Bootstrap utilities used instead of custom CSS where appropriate
- [ ] All tasks merged to main successfully

---

## Questions or Issues?

If you encounter any issues:
1. Check the investigation report: `00_INVESTIGATION_REPORT.md`
2. Verify the task file has clear instructions
3. Test locally before pushing
4. If uncertain, create a draft PR for review

Remember: **Each PR must be mergeable without breaking layout!**
