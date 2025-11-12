# FIGMA TYPOGRAPHY AUDIT
## Cross-Check: Live Figma Design vs. Documentation & Implementation

**Date:** 2025-11-12
**Status:** CRITICAL DISCREPANCIES IDENTIFIED
**Audit Source:** Direct extraction from Figma node 2015:791 using MCP tools

---

## EXECUTIVE SUMMARY

Comparison between **actual Figma design specifications** (extracted via MCP) and **documented implementation plan** reveals **3 critical typography misalignments**:

1. **Hero H1 Font Family**: Implementation docs assume serif heading font, but Figma specifies **DM Sans sans-serif**
2. **H1 Font Weight**: Documentation assumes bold (700), but Figma specifies **SemiBold (600)**
3. **H1 Font Size**: Documentation assumes 48px, but Figma specifies **45px**

---

## DETAILED CROSS-CHECK: HERO SECTION

### Figma Design Reality (Direct MCP Extraction)
**Node:** 2015:797 - "Learn about Syscoin SentryNodes"

```
Font Family:    DM Sans (sans-serif)
Font Size:      45px
Font Weight:    600 (SemiBold)
Line Height:    130% (1.3)
Color:          #FFFFFF (white)
Text Rendering: Generated React code shows:
                <p className="font-['DM_Sans:SemiBold',sans-serif]
                   font-semibold leading-[1.3]
                   text-[45px] text-white">
```

### Current Design Tokens (_design-tokens.scss)
**H1 Mixin (lines 94-100):**

```scss
@mixin typography-h1 {
  font-family: $font-family-heading;        // 'Sentry Slab LC', serif
  font-size: $font-size-h1;                 // 48px
  font-weight: $font-weight-bold;           // 700
  line-height: $line-height-tight;          // 1.2
  letter-spacing: -1.6px;
}
```

### Implementation Plan Documentation

The `ABOUT_PAGE_IMPLEMENTATION_PLAN.md` and `ABOUT_PAGE_SINGLE_AGENT_PLAN.md` **do not specify typography details** for the hero section. They only mention:
- "Apply new styling (colors, spacing, typography)"
- "Apply Figma design styling (colors, spacing, typography)"

**No specific typography values are documented**, leaving implementations to assume the generic H1 mixin would be correct. This is the root cause of the discrepancy.

### COMPARISON TABLE

| Property | Figma Design | Design Tokens | Status | Delta |
|----------|--------------|----------------|--------|-------|
| **Font Family** | DM Sans (sans) | Sentry Slab LC (serif) | 🔴 CRITICAL | Complete mismatch |
| **Font Size** | 45px | 48px | 🔴 CRITICAL | -3px (6% smaller in Figma) |
| **Font Weight** | 600 (SemiBold) | 700 (Bold) | 🔴 CRITICAL | Lighter in Figma |
| **Line Height** | 1.3 | 1.2 | 🔴 CRITICAL | +0.1 (taller in Figma) |
| **Color** | #FFFFFF | $color-text (#FFFFFF) | ✅ CORRECT | Match |
| **Letter Spacing** | Default (0) | -1.6px | ⚠️ EXTRA | Implementation adds spacing not in Figma |

---

## WHY THIS HAPPENED

### Design Token Assumption
The design token system was created with an assumption that:
- Headings should use a **serif font** (Sentry Slab LC) to contrast with body
- Headings should use standard **bold weight (700)** for visual emphasis
- Headings should use standard **48px size** for prominence
- Headings should use **tight line-height (1.2)** for compact spacing
- Headings should have **negative letter-spacing (-1.6px)** for visual tightness

### Figma Design Reality
However, the actual Figma design shows:
- Hero specifically uses **sans-serif DM Sans** (matching body text)
- Hero specifically uses **lighter SemiBold (600)** weight
- Hero specifically uses **smaller 45px** size
- Hero specifically uses **relaxed 1.3** line-height
- Hero specifically has **no letter-spacing adjustment**

This suggests the designer intentionally chose a more **elegant, lighter-weight approach** for the hero title rather than a bold, serif-based approach.

---

## VARIABLE DEFINITIONS FROM FIGMA

Figma design system variables extracted via MCP:

```json
{
  "Body Medium - Regular": "Font(family: DM Sans, style: Regular, size: 16, weight: 400, lineHeight: 1.3)",
  "Body Large - SemiBold": "Font(family: DM Sans, style: SemiBold, size: 18, weight: 600, lineHeight: 1.3)",
  "Body Medium - SemiBold": "Font(family: DM Sans, style: SemiBold, size: 16, weight: 600, lineHeight: 1.3)"
}
```

**Key Finding:** All Figma typography variables use:
- **DM Sans** exclusively (no serif fonts)
- **Line height 1.3** consistently (no tight 1.2)
- **SemiBold (600)** for emphasis variants (not bold 700)

This suggests the design system was intentionally built around sans-serif typography with consistent 1.3 line-heights.

---

## OTHER TYPOGRAPHY ELEMENTS

### Feature Cards Section Title (node 2015:801)
**"What sets Sycoin SentryNodes apart?"**

```
Font Family:    DM Sans (sans-serif)
Font Size:      38px
Font Weight:    400 (Regular)
Line Height:    1.3
Color:          #FFFFFF
Text Alignment: Center
```

**Current Token Equivalent:** Not exactly H1, not exactly H2
- H2 defined as 40px bold
- This is 38px regular weight

### Hero Description Text (node 2015:798)
**Long paragraph text**

```
Font Family:    DM Sans (sans-serif)
Font Size:      18px
Font Weight:    400 (Regular)
Line Height:    1.3
Color:          #FFFFFF
Layout:         Multi-paragraph with spacing
```

**Current Token:** Body Large Regular
- Matches: 18px, 400 weight, DM Sans
- Mismatch: Line height should be 1.3, not 1.5

---

## COMPLETE TYPOGRAPHY HIERARCHY FROM FIGMA

Based on MCP extraction and design context analysis:

### Headings (ALL using DM Sans!)
- **H1 (Hero):** 45px, 600, DM Sans, line-height 1.3
- **H2 (Section):** 38-40px, 400, DM Sans, line-height 1.3
- **H3:** Not defined in extracted data, but likely 32px, 400, DM Sans, 1.3

### Body Text (ALL using DM Sans)
- **Body Large Regular:** 18px, 400, DM Sans, line-height 1.3
- **Body Large SemiBold:** 18px, 600, DM Sans, line-height 1.3
- **Body Medium Regular:** 16px, 400, DM Sans, line-height 1.3
- **Body Medium SemiBold:** 16px, 600, DM Sans, line-height 1.3

### Colors
- Primary text: #FFFFFF (white)
- Secondary text: #CCCCCC (light gray)
- Background: #0A0A0A (black)
- Gold accent: #FBB03B
- Blue accent: #1F5EFF

### Consistent Rules
✅ **All typography uses DM Sans** (no serif fonts)
✅ **All typography uses line-height 1.3** (consistent relaxed spacing)
✅ **Emphasis uses weight 600** (SemiBold, not bold 700)
✅ **No negative letter-spacing** (all default spacing)

---

## RECOMMENDATIONS

### IMMEDIATE ACTION (Critical - Blocks Production)

**1. Fix Hero H1 Typography**
Create a hero-specific mixin in `_design-tokens.scss`:

```scss
@mixin typography-hero-h1 {
  font-family: $font-family-body;           // DM Sans (not serif!)
  font-size: 45px;                          // Exact Figma size
  font-weight: $font-weight-semi-bold;      // 600 (not 700)
  line-height: 1.3;                         // 130% (not 1.2)
  letter-spacing: 0;                        // No adjustment
}
```

Update `_about-hero.scss`:
```scss
&__title {
  @include typography-hero-h1;
  color: $color-text;
  margin-bottom: $space-xl;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
```

**Time Estimate:** 10 minutes
**Impact:** Hero title will visually match Figma design

---

### SHORT TERM (Should do - Improves Consistency)

**2. Update Line Height Design Tokens**
Change `_design-tokens.scss` line 90:

```scss
// Current:
$line-height-tight: 1.2;

// Should be (per Figma):
$line-height-tight: 1.3;    // Figma uses 1.3 consistently, not 1.2
```

Or create a new variable:
```scss
$line-height-figma-default: 1.3;    // Standard for all text in Figma design
```

**Impact:** All typography will better match Figma's relaxed line-height approach

---

### MEDIUM TERM (Nice to have - Aligns with Design System Philosophy)

**3. Review H2/H3 Headings**
Current design tokens have:
- H2: 40px, bold, serif, line-height 1.2
- H3: 32px, bold, serif, line-height 1.2

Figma appears to use:
- Section titles: 38-40px, regular, sans-serif, line-height 1.3

Update all heading mixins to match Figma philosophy:
```scss
@mixin typography-h1 {
  font-family: $font-family-body;   // Sans-serif for all
  font-size: 45px;
  font-weight: $font-weight-semi-bold;
  line-height: 1.3;
}

@mixin typography-h2 {
  font-family: $font-family-body;   // Changed from heading
  font-size: 40px;
  font-weight: $font-weight-regular;  // Changed from bold
  line-height: 1.3;
}
```

---

## DOCUMENTATION UPDATES NEEDED

1. **Update `ABOUT_PAGE_IMPLEMENTATION_PLAN.md`**
   - Add specific typography requirements for each section
   - Specify font families, sizes, weights, line-heights

2. **Create `TYPOGRAPHY_SPECIFICATIONS.md`**
   - Document hero title: 45px, 600, DM Sans, 1.3 line-height
   - Document section titles: 38px, 400, DM Sans, 1.3 line-height
   - Document body text: 18px/16px, 400/600, DM Sans, 1.3 line-height

3. **Update `_design-tokens.scss` comments**
   - Add note: "All typography uses DM Sans (sans-serif) per Figma design"
   - Document why line-heights are 1.3 (Figma standard)
   - Remove assumption about serif headings

---

## VALIDATION CHECKLIST

After implementing fixes, verify:

- [ ] Hero title renders in DM Sans SemiBold (not serif)
- [ ] Hero title is 45px (not 48px)
- [ ] Hero title font weight is 600 (not 700)
- [ ] Hero title line-height is 1.3 (not 1.2)
- [ ] All body text uses line-height 1.3
- [ ] Feature card titles render correctly
- [ ] Section headings render correctly
- [ ] Visual comparison with Figma shows typography match
- [ ] Browser DevTools shows correct computed styles
- [ ] No font loading errors in console

---

## CONCLUSION

The Figma design system uses a **consistent, elegant sans-serif approach** with:
- **All typography in DM Sans** (no serif fonts)
- **Consistent 1.3 line-heights** (relaxed spacing)
- **SemiBold (600) for emphasis** (not bold 700)
- **No letter-spacing adjustments** (natural spacing)

The current design token system makes incorrect assumptions about serif headings and bold weights that don't match the actual Figma design. These need to be corrected immediately to achieve visual fidelity.

**Files to modify:**
- `/src/scss/_design-tokens.scss` - Add hero-specific mixin, update line-height tokens
- `/src/scss/_about-hero.scss` - Use new hero-specific mixin
- Documentation files - Add specific typography requirements

**Estimated Total Time:** 15-20 minutes for critical fixes

---

**Prepared By:** Claude Code (Senior Frontend Engineer)
**Date:** 2025-11-12
**Status:** 🔴 CRITICAL FINDINGS - REQUIRES IMMEDIATE ACTION
