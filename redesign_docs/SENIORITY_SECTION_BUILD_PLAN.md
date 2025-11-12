# Seniority Section - Component Builder Todo List

**Source:** ui-design-auditor comprehensive audit (node-id: 2016-2476)
**Status:** Ready for implementation
**Target:** 95%+ design fidelity match with Figma specifications
**Priority:** HIGH (Critical layout and content issues)

---

## CRITICAL TASKS (Must complete first)

### ✅ TASK 1: Restructure Middle Section Layout
**Status:** NOT STARTED
**Severity:** CRITICAL
**Files to Modify:**
- `/Users/ted/syscoin/syshub/src/components/About/SenioritySection.jsx`
- `/Users/ted/syscoin/syshub/src/scss/_about-seniority.scss`

**Implementation Details:**
- Replace Bootstrap grid structure with flexbox
- Create three-column layout with explicit structure:
  1. **Column 1 (Left):** Text paragraph "Syscoin Average Block is 60 Seconds. Therefore:"
  2. **Column 2 (Middle):** TX data grid (move existing component)
  3. **Column 3 (Right):** Empty or additional content
- Set container width: `1080px`
- Set gap between columns: `80px`
- Set container height: `191px`
- Use `display: flex`, `flex-direction: row`, `gap: 80px`

**Column 1 Text Specifications:**
- Font: `DM Sans Regular`
- Size: `18px`
- Line-height: `1.3`
- Color: `#ffffff` (white)
- Content: "Syscoin Average Block is 60 Seconds. Therefore:"

**Figma Reference:**
- Node: 2016-2476 (middle section area)
- Design shows explicit three-column layout with fixed spacing

**Acceptance Criteria:**
- [ ] Three-column layout renders horizontally on desktop
- [ ] Gap between columns is exactly 80px
- [ ] Container width is 1080px
- [ ] Container height is 191px
- [ ] Text in column 1 matches specifications
- [ ] Existing TX data grid moves to column 2 without layout changes
- [ ] Responsive on tablets/mobile (stack vertically, reduce gaps)

---

### ✅ TASK 2: Implement Two-Tone Title Coloring
**Status:** NOT STARTED
**Severity:** CRITICAL
**Files to Modify:**
- `/Users/ted/syscoin/syshub/src/components/About/SenioritySection.jsx`

**Implementation Details:**
- Split title into two parts with different colors
- Part 1: "SENTRY NODE SENIORITY" (white, #ffffff)
- Part 2: " EXPLAINED" (gold, #fbb03b)
- Typography: DM Sans SemiBold, 38px, line-height 1.3, UPPERCASE
- Remove any existing letter-spacing override

**JSX Structure:**
```jsx
<h2 className="about-seniority__title">
  <span style={{ color: '#ffffff' }}>SENTRY NODE SENIORITY</span>
  <span style={{ color: '#fbb03b' }}> EXPLAINED</span>
</h2>
```

**SCSS Requirements:**
- Font-size: `38px`
- Font-weight: `600` (SemiBold)
- Line-height: `1.3`
- Text-transform: `uppercase`
- Letter-spacing: `0` (remove any existing)
- Font-variation-settings: `'opsz' 14`

**Figma Reference:**
- Node: 2016-2476 (title area)
- Exact color codes: white #ffffff, gold #fbb03b

**Acceptance Criteria:**
- [ ] "SENTRY NODE SENIORITY" renders in white
- [ ] " EXPLAINED" renders in gold
- [ ] Font specifications match (38px, 600 weight, 1.3 line-height)
- [ ] Text is uppercase
- [ ] No letter-spacing applied
- [ ] Visual matches Figma design exactly

---

### ✅ TASK 3: Add Complete Content to 1 YEAR Seniority Card
**Status:** NOT STARTED
**Severity:** CRITICAL
**Files to Modify:**
- `/Users/ted/syscoin/syshub/src/components/About/SenioritySection.jsx`
- `/Users/ted/syscoin/syshub/src/scss/_about-seniority.scss`

**Card Structure (HTML/JSX):**
```
.seniority-card
  ├─ .seniority-card__header
  │  ├─ .seniority-card__title-main: "1 YEAR"
  │  └─ .seniority-card__title-subtitle: "35% increase of base rate"
  ├─ .seniority-card__gap (44px)
  └─ .seniority-card__content
     ├─ .seniority-card__subheading: "Calculating Seniority:"
     ├─ .seniority-card__gap (24px)
     └─ .seniority-card__text-blocks
        ├─ Block 1: "You sent your 100,000 Syscoin at Block Height 1000."
        ├─ Block 2: "525,600 + 1000 = 526,600."
        └─ Block 3: "526,600 Block Height = Your first increase in Seniority." (BOLD GOLD)
```

**Typography Specifications:**

**Header:**
- Title main ("1 YEAR"): DM Sans Semibold, 24px, white, line-height 1.3
- Title subtitle ("35% increase..."): DM Sans Medium, 24px, white, line-height 1.3
- Gap below header: `44px`

**Subheading:**
- "Calculating Seniority:": DM Sans Medium, 18px, white, line-height 21px (1.167)
- Gap below: `24px`

**Text Blocks:**
- Blocks 1-2: DM Sans Regular, 18px, white, line-height 21px (1.167), gap 8px
- Block 3: DM Sans Bold, 18px, gold #fbb03b, line-height 25.2px (1.4)

**Card Styling:**
- Border: `1px solid #fbb03b` (GOLD, not white)
- Border-radius: `8px`
- Padding: `32px`
- Background: `transparent` or `$color-background`

**Translation Keys (Already exist):**
- `about.seniority.seniority.s3.title`: "Calculating 1 Year Seniority"
- `about.seniority.seniority.s3.d1`: "You sent your 100,000 Syscoin at Block Height 1000."
- `about.seniority.seniority.s3.d2`: "525,600 + 1000 = 526,600."
- `about.seniority.seniority.s3.d3`: "526,600 Block Height = Your first increase in Seniority."

**Figma Reference:**
- Node: 2016-2476 (1 YEAR card section)

**Acceptance Criteria:**
- [ ] Card displays title "1 YEAR" + "35% increase of base rate"
- [ ] 44px gap between header and content
- [ ] Subheading "Calculating Seniority:" renders with correct typography
- [ ] Three text blocks render with correct spacing (8px gaps)
- [ ] Text block 3 is bold and gold colored
- [ ] Card border is 1px solid gold (#fbb03b)
- [ ] Border-radius is 8px
- [ ] Padding is 32px
- [ ] All typography matches specifications exactly

---

### ✅ TASK 4: Add Complete Content to 2.5 YEARS Seniority Card
**Status:** NOT STARTED
**Severity:** CRITICAL
**Files to Modify:**
- `/Users/ted/syscoin/syshub/src/components/About/SenioritySection.jsx`
- `/Users/ted/syscoin/syshub/src/scss/_about-seniority.scss`

**Card Structure:** (Identical to 1 YEAR card but different content)

**Typography Specifications:**
- Same as 1 YEAR card (identical structure)

**Card Styling:**
- **DIFFERENT BORDER COLOR:** `1px solid #1f5eff` (BLUE, not gold!)
- Border-radius: `8px`
- Padding: `32px`
- Background: `transparent` or `$color-background`

**Header Content:**
- Title main: "2.5 YEARS"
- Title subtitle: "100% increase of base rate"

**Text Blocks:**
- Subheading: "Calculating 2 Year Seniority" (from translations)
- Block 1: "You sent your 100,000 Syscoin at Block Height 1000."
- Block 2: "1,314,000 + 1000 = 1,315,000"
- Block 3: "1,314,000 Block Height = Your second increase in Seniority." (BOLD GOLD)

**Translation Keys (Already exist):**
- `about.seniority.seniority.s4.title`: "Calculating 2 Year Seniority"
- `about.seniority.seniority.s4.d1`: "You sent your 100,000 Syscoin at Block Height 1000."
- `about.seniority.seniority.s4.d2`: "1,314,000 + 1000 = 1,315,000"
- `about.seniority.seniority.s4.d3`: "314,000 Block Height = Your second increase in Seniority."
  - **NOTE:** Translation says "314,000" but should be "1,314,000" based on calculation. Verify with user if this should be fixed.

**Figma Reference:**
- Node: 2016-2476 (2.5 YEARS card section)

**Acceptance Criteria:**
- [ ] Card displays title "2.5 YEARS" + "100% increase of base rate"
- [ ] Card border is 1px solid BLUE (#1f5eff), NOT gold
- [ ] All content and typography matches 1 YEAR card structure
- [ ] Text block 3 is bold and gold colored
- [ ] All text blocks render correctly with proper spacing
- [ ] Visual matches Figma design exactly (blue border is key differentiator)

---

## HIGH PRIORITY TASKS

### ✅ TASK 5: Update TX Data Labels and Container
**Status:** NOT STARTED
**Severity:** HIGH
**Files to Modify:**
- `/Users/ted/syscoin/syshub/src/components/About/SenioritySection.jsx`
- `/Users/ted/syscoin/syshub/src/scss/_about-seniority.scss`
- `/Users/ted/syscoin/syshub/src/shared/locales/en/pages/about/index.js` (update labels)

**Current TX Data Structure:**
```
txData: {
  gamma: { label: 'TX DATA GAMMA', blocks: '43,800 Blocks' }
  beta: { label: 'TX DATA BETA', blocks: '526,600 Blocks' }
  alpha: { label: 'TX DATA ALPHA', blocks: '1,314,000 Blocks' }
}
```

**Required Update:**
```
txData: {
  month: { label: '1 Month =', blocks: '43,800 Blocks' }
  year: { label: '1 Year Seniority =', blocks: '526,600 Blocks' }
  twoHalf: { label: '2.5 Year Seniority =', blocks: '1,314,000 Blocks' }
}
```

**Label Typography:**
- Font: DM Sans SemiBold, 18px
- Color: WHITE (#ffffff), NOT gold
- Line-height: 1.3
- Text-align: center
- Font-variation-settings: 'opsz' 14

**Block Container Styling:**
- Background: `#0a0a0a` (pure black)
- Border: `1px solid #fbb03b` (GOLD)
- Border-radius: `12px`
- Padding: `8px` vertical, `16px` horizontal
- Display: `flex`, `justify-content: space-between`
- Width: Full within parent container

**Value Tag Styling (Color-Coded):**
- **Block 1 ("1 Month"):**
  - Background: `rgba(31, 94, 255, 0.2)` (blue 20% opacity)
  - Text color: `#1f5eff` (blue)
- **Block 2 ("1 Year Seniority"):**
  - Background: `rgba(251, 176, 59, 0.2)` (gold 20% opacity)
  - Text color: `#fbb03b` (gold)
- **Block 3 ("2.5 Year Seniority"):**
  - Background: `rgba(251, 176, 59, 0.2)` (gold 20% opacity)
  - Text color: `#fbb03b` (gold)

**Common Value Tag Styling:**
- Font: DM Sans SemiBold, 16px
- Line-height: 1.3
- Padding: `8px` all sides
- Border-radius: `12px`

**Figma Reference:**
- Node: 2016-2476 (TX data section)

**Acceptance Criteria:**
- [ ] TX data labels changed from "TX DATA X" to "1 Month =", "1 Year Seniority =", "2.5 Year Seniority ="
- [ ] Label color is white, not gold
- [ ] Label typography: DM Sans SemiBold, 18px, line-height 1.3
- [ ] Block containers have gold borders (#fbb03b)
- [ ] Block background is pure black (#0a0a0a)
- [ ] Value tags have correct color-coded backgrounds (blue for month, gold for years)
- [ ] Value tags have correct text colors (blue for month, gold for years)
- [ ] All spacing and padding matches specifications
- [ ] Translation keys updated in locale file

---

### ✅ TASK 6: Implement Card Layout with Correct Gaps
**Status:** NOT STARTED
**Severity:** HIGH
**Files to Modify:**
- `/Users/ted/syscoin/syshub/src/components/About/SenioritySection.jsx`
- `/Users/ted/syscoin/syshub/src/scss/_about-seniority.scss`

**Current Layout:** Bootstrap grid (col-lg-6 for each card)
**Required Layout:** Flexbox with explicit gap

**Container Specifications:**
- Display: `flex`
- Flex-direction: `row` (horizontal)
- Gap: `100px` (between cards)
- Width: `1080px`
- Align-items: `flex-start` (or `stretch` for equal heights)

**Card Specifications:**
- Flex: `1 1 0` (equal growth, no minimum size)
- Remove Bootstrap grid classes
- Remove margin-bottom (use gap instead)
- Width: auto (will grow to fill available space)

**Responsive Behavior:**
- **Tablet (@breakpoint-lg):** Reduce gap to 60px, reduce card width if needed
- **Mobile (@breakpoint-md):** Stack vertically (flex-direction: column), full width, reduce gap to 32px

**Figma Reference:**
- Node: 2016-2476 (card layout section)

**Acceptance Criteria:**
- [ ] Cards displayed side-by-side horizontally on desktop
- [ ] Gap between cards is exactly 100px
- [ ] Cards have equal width (flex: 1 1 0)
- [ ] Container width is 1080px
- [ ] Bootstrap grid classes removed
- [ ] Responsive layout stacks on tablet/mobile
- [ ] Visual matches Figma layout exactly

---

### ✅ TASK 7: Update Section Padding and Spacing
**Status:** NOT STARTED
**Severity:** HIGH
**Files to Modify:**
- `/Users/ted/syscoin/syshub/src/scss/_about-seniority.scss`

**Desktop Specifications:**
- Horizontal padding: `180px`
- Vertical padding: `100px`
- Gap between major sections (header → middle → cards → note): `60px`

**Tablet Specifications (@breakpoint-lg):**
- Horizontal padding: `80px`
- Vertical padding: `80px`
- Gap: `48px`

**Mobile Specifications (@breakpoint-md):**
- Horizontal padding: `40px`
- Vertical padding: `60px`
- Gap: `32px`

**Section Structure Gaps:**
- Gap between title section and middle section: `60px`
- Gap between middle section and cards section: `60px`
- Gap between cards section and final note: `60px`

**Current Implementation:** Unknown (likely using Bootstrap or incorrect spacing tokens)

**Figma Reference:**
- Node: 2016-2476 (overall section spacing)

**Acceptance Criteria:**
- [ ] Horizontal padding is 180px on desktop
- [ ] Vertical padding is 100px on desktop
- [ ] Gaps between sections are 60px
- [ ] Responsive padding correct on tablet/mobile
- [ ] Visual spacing matches Figma exactly
- [ ] No Bootstrap container default spacing interferes

---

## MEDIUM PRIORITY TASKS

### ✅ TASK 8: Update Description Text Typography
**Status:** NOT STARTED
**Severity:** MEDIUM
**Files to Modify:**
- `/Users/ted/syscoin/syshub/src/scss/_about-seniority.scss`

**Current Implementation:** Unknown styling (possibly using typography mixin)

**Required Specifications:**
- Font: DM Sans Regular
- Size: `18px`
- Line-height: `1.3` (NOT 1.8)
- Color: WHITE (#ffffff), NOT `$color-text-secondary`
- Font-variation-settings: `'opsz' 14`

**Affected Element:**
- Description text at top of section (before middle three-column layout)

**Figma Reference:**
- Node: 2016-2476 (description text)

**Acceptance Criteria:**
- [ ] Font-size is 18px
- [ ] Line-height is 1.3
- [ ] Color is pure white (#ffffff)
- [ ] Font-variation-settings applied
- [ ] Text displays correctly in browser
- [ ] Visual matches Figma exactly

---

### ✅ TASK 9: Simplify Final Note Styling
**Status:** NOT STARTED
**Severity:** MEDIUM
**Files to Modify:**
- `/Users/ted/syscoin/syshub/src/scss/_about-seniority.scss`

**Current Implementation:** Has background, border-left, border-radius, padding (decorative styling)

**Required: Remove all decorative styling**
- NO background color
- NO border-left accent
- NO border-radius
- NO padding (use parent container padding)
- Color: WHITE (#ffffff)
- Line-height: 1.3 (NOT 1.8)
- Font-size: 16px
- Font: DM Sans Regular
- Font-variation-settings: 'opsz' 14

**Content Styling:**
- Keep inline bold styling for "Transaction Block Height" and "ONLY"
- Use `<strong>` or `<span>` tags with bold styling for these words

**Figma Reference:**
- Node: 2016-2476 (final note section)

**Acceptance Criteria:**
- [ ] Background color removed
- [ ] Border-left removed
- [ ] Border-radius removed
- [ ] Padding removed (integrates with container padding)
- [ ] Text color is white
- [ ] Line-height is 1.3
- [ ] Inline text ("Transaction Block Height", "ONLY") are bold
- [ ] Visual matches Figma (plain text, no decoration)

---

### ✅ TASK 10: Fix TX Data Label Typography
**Status:** NOT STARTED
**Severity:** MEDIUM
**Files to Modify:**
- `/Users/ted/syscoin/syshub/src/scss/_about-seniority.scss`

**Current Implementation:** Likely using typography mixin with wrong size/weight

**Required Specifications:**
- Font: DM Sans SemiBold (weight: 600)
- Size: `18px`
- Line-height: 1.3
- Color: WHITE (#ffffff)
- Text-align: center
- White-space: pre (preserve spaces in "1 Month =")
- Font-variation-settings: 'opsz' 14
- NO text-transform: uppercase
- NO letter-spacing

**Figma Reference:**
- Node: 2016-2476 (TX data labels)

**Acceptance Criteria:**
- [ ] Font-size is 18px (NOT 14px)
- [ ] Font-weight is 600 (NOT 700)
- [ ] Color is white (NOT gold)
- [ ] Line-height is 1.3
- [ ] No text-transform applied
- [ ] No letter-spacing applied
- [ ] Text-align is center
- [ ] Visual matches Figma exactly

---

## LOW PRIORITY TASKS

### ✅ TASK 11: Review and Preserve Hover States (Optional)
**Status:** NOT STARTED
**Severity:** LOW
**Files to Modify:**
- `/Users/ted/syscoin/syshub/src/scss/_about-seniority.scss`

**Current Implementation:** Cards have hover effects (transform, shadow, border-color)

**Figma Specification:** No hover states defined

**Decision Required:**
- Option A: Remove all hover states to match Figma exactly
- Option B: Keep hover states as UX enhancement (not contradicting design)

**Recommendation:** Keep hover states (improves UX, doesn't contradict design)

**Acceptance Criteria:**
- [ ] Decide on approach (remove vs keep)
- [ ] If keeping: ensure they don't interfere with design specifications
- [ ] Document decision

---

### ✅ TASK 12: Add Font-Variation-Settings Globally
**Status:** NOT STARTED
**Severity:** LOW
**Files to Modify:**
- `/Users/ted/syscoin/syshub/src/scss/_about-seniority.scss`
- `/Users/ted/syscoin/syshub/public/index.html` (verify font loading)

**Required Action:**
- Verify DM Sans variable font is loaded (check `@font-face` or Google Fonts)
- Add `font-variation-settings: 'opsz' 14` to:
  - Title
  - All text blocks
  - Labels
  - Description
  - Final note

**Figma Reference:**
- All text in node 2016-2476 includes this setting

**Acceptance Criteria:**
- [ ] Variable fonts properly loaded
- [ ] Font-variation-settings applied to all text
- [ ] Subtle font rendering improvements visible
- [ ] No visual regressions

---

## BUILD COMPLETION CHECKLIST

### Pre-Build Verification
- [ ] All files identified for modification
- [ ] All translation keys verified to exist
- [ ] Figma design node (2016-2476) accessible and reviewed
- [ ] Current component structure examined

### Implementation Order (Recommended)
1. Task 1: Restructure middle section layout
2. Task 2: Implement two-tone title
3. Task 5: Update TX data labels and styling
4. Task 3: Add 1 YEAR card content
5. Task 4: Add 2.5 YEARS card content
6. Task 6: Implement card layout with gaps
7. Task 7: Update section padding and spacing
8. Task 8: Update description typography
9. Task 9: Simplify final note
10. Task 10: Fix TX data label typography
11. Task 11: Review hover states
12. Task 12: Add font-variation-settings

### Post-Build Verification
- [ ] All tasks completed
- [ ] Visual comparison with Figma (side-by-side screenshot)
- [ ] Design fidelity ~95%+ achieved
- [ ] No responsive regressions
- [ ] No console errors
- [ ] Commit message follows pattern: "refactor: Seniority section layout and content updates"

---

## FILES TO MODIFY

1. **Component:**
   - `/Users/ted/syscoin/syshub/src/components/About/SenioritySection.jsx`

2. **Styles:**
   - `/Users/ted/syscoin/syshub/src/scss/_about-seniority.scss`

3. **Translations (if needed):**
   - `/Users/ted/syscoin/syshub/src/shared/locales/en/pages/about/index.js`
   - Update TX data labels from gamma/beta/alpha to month/year/twoHalf (if keys change)

---

## NOTES FOR COMPONENT BUILDER

1. **Design System Alignment:** This section requires explicit pixel values rather than relying on spacing tokens. Use design token values as base but override with explicit values to match Figma exactly.

2. **Color Values:** Ensure design tokens match Figma colors:
   - `$color-primary: #FBB03B` (gold)
   - `$color-brand-blue: #1F5EFF` (blue)
   - `$color-neutral-black: #0A0A0A` (black)
   - `$color-neutral-white: #FFFFFF` (white)

3. **Typography Consistency:** All text in this section should use DM Sans (not serif). Verify `$font-family-body: 'DM Sans', sans-serif`.

4. **Responsive Design:** Mobile designs not provided in Figma. Use judgment for tablet/mobile breakpoints based on existing responsive patterns in Governance and Rewards sections.

5. **Translation Keys:** Most keys already exist in `/src/shared/locales/en/pages/about/index.js`. Only "1 Month =", "1 Year Seniority =", "2.5 Year Seniority =" may need to be added.

6. **Testing:** After implementation, compare with Figma design (node 2016-2476) using ui-design-auditor for final verification.

---

**Status:** Ready for component-builder agent implementation
**Estimated Complexity:** HIGH (15+ discrepancies, significant restructuring)
**Estimated Time:** 2-3 hours for experienced developer
**Priority:** HIGH (Critical for About page redesign completion)
