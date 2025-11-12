# AGENT REBASING PROMPT - ABOUT PAGE REDESIGN

**For**: Background Implementation Agent
**Date**: 2025-11-12
**Priority**: HIGH - Critical Updates Needed

---

## CRITICAL: READ THIS FIRST

You were handed off this task before Figma Desktop MCP access was available. **Significant new findings have been discovered through detailed Figma cross-check analysis.** This document contains all corrections, discrepancies, and verified specifications.

**Your current work must be rebased to incorporate these findings.**

---

## QUICK SUMMARY OF WHAT'S NEW

**4 New Documentation Files Created**:
1. `redesign_docs/CROSS_CHECK_SUMMARY.md` - Executive summary (read first, 5 min)
2. `redesign_docs/FIGMA_VS_SPEC_MEASUREMENTS.md` - Exact measurements reference (10 min)
3. `redesign_docs/IMPLEMENTATION_PLAN.md` - Complete 9-phase roadmap (45 min reference)
4. `redesign_docs/FIGMA_DESIGN_SPECIFICATIONS.md` - UPDATED v1.1 with cross-check section (30 min reference)

---

## 🔴 CRITICAL ISSUES - FIX IMMEDIATELY

### 1. FEATURE CARD GRID GAP (CRITICAL)

**What you probably implemented**: ~67px gap between cards (matching Figma)
**What you should implement**: 24px gap (from spec)

```scss
// WRONG (Figma):
gap: 67px;

// CORRECT (Spec):
gap: $space-lg;  // 24px
```

Impact: Feature card grid layout must be recalculated

---

### 2. SENIORITY DATA BLOCKS LAYOUT (CRITICAL)

**Original Spec**: Grid layout (3 columns, centered)
**Figma Shows**: List-style layout (label on left, badge on right)
**Decision**: Use Figma's list layout - more space-efficient

If you built grid cards, refactor to:
```jsx
<div className="about-page__seniority__data-blocks">
  <div className="about-page__data-block">
    <span className="label">TX DATA GAMMA</span>
    <span className="badge">43,800 Blocks</span>
  </div>
</div>
```

---

### 3. CONTENT TYPOS (CRITICAL)

| Location | Current | Correct |
|----------|---------|---------|
| Features title | "What sets **Sycoin** SentryNodes apart?" | "What sets **Syscoin** SentryNodes apart?" |
| Feature Card 4 | "**Scability**" | "**Scalability**" |

Verify these are correct in i18n files: `src/shared/locales/en/pages/about/index.js`

---

### 4. TYPOGRAPHY LINE HEIGHTS (IMPORTANT)

**Figma shows**: 1.3 for everything
**Spec requires**: Context-specific values

```scss
.title { line-height: 1.2; }         // Tight (headlines)
.body { line-height: 1.5; }          // Normal (body text)
.description { line-height: 1.8; }   // Relaxed (long-form)
```

---

### 5. FEATURE CARD VERTICAL ALIGNMENT (IMPORTANT)

**Figma has offset cards** - This is an error in Figma design.
Use CSS Grid which naturally aligns all cards horizontally. Ignore Figma offsets.

---

## ✅ WHAT TO KEEP FROM YOUR WORK

- Component file structure
- i18n integration (useTranslation hook)
- BEM-style class naming
- Color token usage
- Font family usage
- Semantic HTML structure
- Current component organization

---

## 🔄 WHAT TO UPDATE

1. **Feature card grid gap**: 24px (not ~67px)
2. **Seniority data blocks**: List layout with flex space-between
3. **Card alignment**: Use CSS Grid auto-alignment
4. **Line heights**: 1.2/1.5/1.8 context-specific
5. **Spacing gaps**: Use spec values consistently
6. **Content verification**: Ensure correct spelling in i18n

---

## MISSING ELEMENTS - VERIFY BEFORE FINALIZING

### Assets (Must Exist)
- [ ] `/public/assets/images/about-icons/about-feature-facilitation.png`
- [ ] `/public/assets/images/about-icons/about-feature-seniority.png`
- [ ] `/public/assets/images/about-icons/about-feature-zdags.png`
- [ ] `/public/assets/images/about-icons/about-feature-scalability.png`
- [ ] `/assets/images/header-img1.png`
- [ ] `/assets/images/governance.png`
- [ ] `/assets/images/reward.png`

**Status**: Icon files confirmed to exist in repo

### Shadows & Effects (Not in Figma, from spec)
- [ ] Hero title text-shadow: `0 2px 4px rgba(0, 0, 0, 0.3)`
- [ ] Hero image drop-shadow: `drop-shadow(0 10px 30px rgba(251, 176, 59, 0.15))`
- [ ] Card box-shadow: `0 4px 6px rgba(0, 0, 0, 0.15)`
- [ ] Card hover shadow: `0 8px 12px rgba(0, 0, 0, 0.2)`
- [ ] Card hover transform: `translateY(-4px)`

---

## SECTION-BY-SECTION CRITICAL UPDATES

### SECTION 2: FEATURE CARDS

**Gap**: Must be 24px
```scss
.about-page__features__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $space-lg;  // 24px - NOT 67px
}
```

**Alignment**: All cards at same height
```scss
/* CSS Grid handles this automatically - no manual offset needed */
grid-auto-rows: 1fr;  /* Optional: make all rows equal height */
```

**Responsive**:
- Desktop 992px+: 4 columns, gap 24px
- Tablet 768px-991px: 2 columns, gap 24px
- Mobile 0-767px: 1 column, gap 16px

---

### SECTION 3: SENIORITY - DATA BLOCKS

**Layout Type**: List (NOT grid)
```scss
.about-page__seniority__data-blocks {
  display: flex;
  flex-direction: column;
  gap: 16px;  /* Reduce from Figma's 69px */
  max-width: 600px;
  margin: 0 auto;
}

.about-page__data-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $space-lg;
  background: #1A1A1A;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
}
```

**Label**: 14px, gold, uppercase
```scss
.about-page__data-block__label {
  font-size: 14px;
  font-weight: 700;
  color: $color-brand-gold;
  text-transform: uppercase;
}
```

**Badge**: 16px, dark gray background
```scss
.about-page__data-block__value {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background: #2A2A2A;
  padding: 8px 12px;
  border-radius: 6px;
  white-space: nowrap;
}
```

---

### SECTION 4: BENEFIT CARDS

**Figma measurements**: 490×370px each, 590px gap between
**Implementation**: Use flex with gap: 24px

```scss
.about-page__seniority__benefits {
  display: flex;
  gap: $space-lg;  // 24px
  margin-bottom: $space-2xl;

  @media (max-width: 575px) {
    flex-direction: column;
  }
}

.about-page__benefit-card {
  flex: 1;
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1A1A1A;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: $space-lg;
}
```

---

## TESTING CHECKLIST

Before submitting rebased work, verify ALL of these:

### Visual Correctness
- [ ] Feature card gap is 24px (measure to verify, not wider)
- [ ] Seniority data items are in horizontal list layout
- [ ] Label and badge are aligned left/right with space-between
- [ ] All feature cards horizontally aligned (no vertical offset)
- [ ] Line heights: 1.2 (titles), 1.5 (body), 1.8 (descriptions)
- [ ] Colors match: #fbb03b (gold), #ffffff (white), #1a1a1a (surface)
- [ ] Shadows applied: text-shadow, drop-shadow, box-shadow

### Responsive Design
- [ ] Mobile (375px): All sections single column
- [ ] Mobile (480px): Feature cards 1 column
- [ ] Tablet (768px): Feature cards 2 columns
- [ ] Tablet (992px): Feature cards 4 columns
- [ ] Desktop (1200px): Correct spacing and sizing
- [ ] No horizontal scroll at any breakpoint

### Content
- [ ] "Syscoin" (not "Sycoin") in features title
- [ ] "Scalability" (not "Scability") in feature card 4
- [ ] All translation keys from i18n present
- [ ] All images load correctly (no 404 errors)

### Code Quality
- [ ] No console errors or warnings
- [ ] BEM naming convention followed
- [ ] CSS follows existing project patterns
- [ ] i18n hook properly used
- [ ] Semantic HTML structure
- [ ] Alt text on all images

### Accessibility
- [ ] Keyboard navigation works (Tab through elements)
- [ ] Focus states visible on interactive elements
- [ ] Color contrast 4.5:1 (WCAG AA)
- [ ] Screen reader compatible

---

## EXACT MEASUREMENT REFERENCE

### Feature Cards (Figma vs Spec)

| Property | Figma | Spec | Use |
|----------|-------|------|-----|
| Columns (desktop) | 4 | 4 | 4 |
| Card width | 220px | calc(25% - gap) | CSS grid |
| Gap | ~67px | 24px | **24px** |
| Min-height | 142-194px | 240px | 240px |
| Icon size | 100×100px | 100×100px | 100×100px |
| Title size | 16px | 16px | 16px |
| Line-height | 1.3 | 1.5 | **1.5** |

### Seniority Data Blocks (Figma vs Spec)

| Property | Figma | Spec | Use |
|----------|-------|------|-----|
| Layout | List | Grid | **List** |
| Label width | 82-165px | N/A | flex-grow: 0 |
| Badge width | 126-142px | N/A | flex-shrink: 0 |
| Gap | 69px | 24px | **16px** |
| Font-size | 14px/16px | 14px/16px | Match |

---

## REFERENCE DOCUMENTATION

**Essential reading (in order)**:

1. **redesign_docs/CROSS_CHECK_SUMMARY.md** (5 min)
   - Quick overview of all findings
   - Decision matrix for conflicts
   - Blocking issues list

2. **redesign_docs/FIGMA_VS_SPEC_MEASUREMENTS.md** (10 min reference)
   - Exact measurements for each section
   - Quick decision matrix
   - Color and typography reference

3. **redesign_docs/IMPLEMENTATION_PLAN.md** (45 min reference)
   - 9-phase detailed roadmap
   - Component code examples
   - SCSS structure templates
   - Full testing checklist

4. **redesign_docs/FIGMA_DESIGN_SPECIFICATIONS.md** (30 min reference)
   - Complete original specification
   - New cross-check verification section
   - All discrepancies documented

---

## KEY DECISIONS FOR YOUR REBASE

| Decision | Figma | Spec | Use | Reason |
|----------|-------|------|-----|--------|
| Feature gap | 67px | 24px | 24px | Design system standard |
| Seniority layout | List | Grid | List | More space-efficient |
| Line heights | 1.3 | 1.2/1.5/1.8 | Context-specific | Better typography |
| Card offset | Yes | No | No | Figma design error |
| Responsive | No | Yes | Yes | Required for mobile |

---

## ESTIMATED REBASE TIME

| Task | Time |
|------|------|
| Review findings | 15 min |
| Update feature card gap | 20 min |
| Refactor seniority layout | 30 min |
| Update line heights | 20 min |
| Fix spacing/gaps | 20 min |
| Test responsive | 30 min |
| Verify checklist | 15 min |
| **Total** | **2-3 hours** |

---

## CRITICAL SUCCESS FACTORS

For this rebase to be successful, verify:

1. ✅ Feature card gap is 24px (not 67px)
2. ✅ Seniority data blocks use list layout (not grid)
3. ✅ Content has correct spelling (Syscoin, Scalability)
4. ✅ Line heights are 1.2/1.5/1.8 context-specific
5. ✅ Responsive design tested at 5 breakpoints
6. ✅ All shadows applied from spec values
7. ✅ Card alignment corrected (no Figma offsets)
8. ✅ All checklist items pass

---

## WHAT HAPPENS NEXT

1. Review the 4 documentation files
2. Audit your current implementation against critical issues
3. Make updates to the 5 critical areas
4. Test thoroughly at all breakpoints
5. Run through the full checklist
6. Submit rebased work with notes on what changed

**Questions during rebase?** Refer to:
- Exact measurements: `FIGMA_VS_SPEC_MEASUREMENTS.md`
- Implementation details: `IMPLEMENTATION_PLAN.md`
- Complete spec: `FIGMA_DESIGN_SPECIFICATIONS.md`
- Quick decisions: `CROSS_CHECK_SUMMARY.md`

---

**Status**: Ready for Rebasing
**Complexity**: Medium (most structure done, focus on corrections)
**Author**: Claude Code (Senior Frontend Engineer)
**Date**: 2025-11-12
**Commit Reference**: e39da254 (documentation commit)
