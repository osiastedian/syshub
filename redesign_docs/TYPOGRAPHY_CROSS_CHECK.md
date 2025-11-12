# TYPOGRAPHY CROSS-CHECK REPORT
## About Page - Figma Design vs Implementation

**Date:** 2025-11-12
**Status:** CRITICAL DISCREPANCY FOUND
**Location:** Hero Section "Learn about Syscoin SentryNodes" title

---

## CRITICAL FINDING: HERO TITLE TYPOGRAPHY MISMATCH

### Figma Design Specification
**Node ID:** 2015:797
**Text:** "Learn about Syscoin SentryNodes"

**Figma Typography:**
- **Font Family:** DM Sans (sans-serif)
- **Font Size:** 45px
- **Font Weight:** 600 (SemiBold)
- **Line Height:** 130% (1.3)
- **Color:** #FFFFFF (white)
- **Letter Spacing:** Not specified (default)

### Current Implementation (Design Tokens)
**File:** `/Users/ted/syscoin/syshub/src/scss/_design-tokens.scss`

**Current H1 Typography Mixin (line 94-100):**
```scss
@mixin typography-h1 {
  font-family: $font-family-heading;        // 'Sentry Slab LC', serif ❌ WRONG
  font-size: $font-size-h1;                 // 48px ❌ SHOULD BE 45px
  font-weight: $font-weight-bold;           // 700 ❌ SHOULD BE 600
  line-height: $line-height-tight;          // 1.2 ❌ SHOULD BE 1.3
  letter-spacing: -1.6px;                   // ❌ NOT IN FIGMA
}
```

---

## DISCREPANCY ANALYSIS

| Property | Figma Design | Current Token | Status |
|----------|--------------|----------------|--------|
| Font Family | DM Sans (sans-serif) | Sentry Slab LC (serif) | 🔴 WRONG |
| Font Size | 45px | 48px | 🔴 WRONG |
| Font Weight | 600 (SemiBold) | 700 (Bold) | 🔴 WRONG |
| Line Height | 1.3 (130%) | 1.2 (120%) | 🔴 WRONG |
| Color | #FFFFFF | $color-text (#FFFFFF) | ✅ CORRECT |
| Letter Spacing | Default | -1.6px | ⚠️ EXTRA STYLING |

---

## SEVERITY ASSESSMENT

**🔴 CRITICAL - BLOCKS PRODUCTION**

The hero title typography is completely different from Figma design:
- **Font family wrong:** Using serif (Sentry Slab LC) instead of sans-serif (DM Sans)
- **Size wrong:** 48px instead of 45px
- **Weight wrong:** Bold (700) instead of SemiBold (600)
- **Line height wrong:** 1.2 instead of 1.3
- **Letter spacing added:** -1.6px not in Figma design

This is a major visual mismatch that will be immediately obvious to users comparing the live site with Figma design.

---

## ROOT CAUSE

The `typography-h1` mixin was defined to use:
1. A serif heading font (Sentry Slab LC) that doesn't exist on Google Fonts
2. Standard heading sizes (48px) instead of the specific Figma size (45px)
3. Bold weight instead of SemiBold
4. Standard tight line-height instead of Figma's 1.3

However, looking at Figma design context, the hero title should use:
- **DM Sans** (the same body font!) - not a serif font at all
- **45px exact size**
- **600 weight SemiBold**
- **1.3 line height**
- **No letter spacing adjustments**

---

## IMPLEMENTATION REQUIREMENTS

### Option A: Update Design Tokens (RECOMMENDED)
Update `/Users/ted/syscoin/syshub/src/scss/_design-tokens.scss` to fix the H1 mixin:

```scss
// OPTION 1: Create a hero-specific mixin that matches Figma exactly
@mixin typography-hero-h1 {
  font-family: $font-family-body;           // DM Sans (sans-serif)
  font-size: 45px;                          // Exact Figma size
  font-weight: $font-weight-semi-bold;      // 600 SemiBold
  line-height: 1.3;                         // 130% from Figma
  letter-spacing: 0;                        // No adjustment
  color: $color-text;                       // #FFFFFF
}

// OPTION 2: Update generic H1 mixin to match Figma (affects all H1s)
@mixin typography-h1 {
  font-family: $font-family-body;           // Changed from serif to sans-serif
  font-size: 45px;                          // Changed from 48px to 45px
  font-weight: $font-weight-semi-bold;      // Changed from 700 to 600
  line-height: 1.3;                         // Changed from 1.2 to 1.3
  letter-spacing: 0;                        // Removed -1.6px adjustment
}
```

**Recommendation:** Use **OPTION 1** (hero-specific mixin) to preserve other heading styles that may already be correct, while fixing only the hero title to match Figma exactly.

---

## PAGES AFFECTED

### Hero Section
**File:** `/Users/ted/syscoin/syshub/src/components/About/HeroSection.jsx`
**Element:** `<h1 class="about-hero__title">`
**Current Styling:** Uses `@include typography-h1;` from `_about-hero.scss`

If we create a new mixin, update the component:
```jsx
// Current
<h1 className="about-hero__title">Learn about Syscoin SentryNodes</h1>

// CSS would use:
.about-hero__title {
  @include typography-hero-h1;  // New specific mixin
  color: $color-text;
  margin-bottom: $space-xl;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
```

---

## TYPOGRAPHY AUDIT - ALL SECTIONS

Now that we've found this critical issue with H1, let me document the expected typography for the entire page based on Figma:

### Typography Hierarchy

**H1 - Hero Title**
- Font: DM Sans SemiBold (600)
- Size: 45px
- Line Height: 1.3
- Color: #FFFFFF
- Example: "Learn about Syscoin SentryNodes"

**H2 - Section Titles**
- Font: DM Sans Regular (400) [From variable defs and Figma design context]
- Size: 38px [Inferred from Figma "What sets Sycoin SentryNodes apart?"]
- Line Height: 1.3
- Color: #FFFFFF
- Example: "What sets Sycoin SentryNodes apart?"

**Body Large - SemiBold**
- Font: DM Sans SemiBold (600)
- Size: 18px
- Line Height: 1.3 (from variable defs)
- Color: #FFFFFF
- Example: Feature card descriptions

**Body Large - Regular**
- Font: DM Sans Regular (400)
- Size: 18px
- Line Height: 1.3 (from variable defs)
- Color: #FFFFFF / #CCCCCC (secondary)
- Example: Hero description paragraph

**Body Medium - Regular**
- Font: DM Sans Regular (400)
- Size: 16px
- Line Height: 1.3 (from variable defs)
- Color: #CCCCCC (secondary)
- Example: Smaller body text

---

## RECOMMENDED FIXES (IN PRIORITY ORDER)

### PRIORITY 1: Fix Hero H1 Typography (CRITICAL)
**Estimated Time:** 10 minutes

Update `/Users/ted/syscoin/syshub/src/scss/_design-tokens.scss`:

```scss
// Add new hero-specific mixin (after line 100)
@mixin typography-hero-h1 {
  font-family: $font-family-body;
  font-size: 45px;
  font-weight: $font-weight-semi-bold;
  line-height: 1.3;
  letter-spacing: 0;
}
```

Update `/Users/ted/syscoin/syshub/src/scss/_about-hero.scss` (line 25):

```scss
&__title {
  @include typography-hero-h1;      // Changed from typography-h1
  color: $color-text;
  margin-bottom: $space-xl;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.2; // Keep this for tighter hero spacing

  @media (max-width: $breakpoint-md) {
    font-size: $font-size-h2;
  }
}
```

### PRIORITY 2: Verify All Other Typography Matches Figma
**Estimated Time:** 30 minutes

After fixing H1:
1. Compare all section headings with Figma
2. Verify body text sizing and weights
3. Check line heights across all text elements
4. Verify color values match design tokens

---

## TESTING CHECKLIST

After implementing fixes:

- [ ] Hero title "Learn about Syscoin SentryNodes" renders in DM Sans SemiBold
- [ ] Font size is exactly 45px (not 48px)
- [ ] Font weight is 600 SemiBold (not 700 bold)
- [ ] Line height is 1.3 (not 1.2)
- [ ] No unexpected letter spacing
- [ ] Color is white (#FFFFFF)
- [ ] All other H1 elements on page still render correctly
- [ ] Responsive breakpoints still work
- [ ] Figma and live page typography match visually

---

## FIGMA VERIFICATION METHOD

To verify in Figma Designer:
1. Select element: "Learn about Syscoin SentryNodes" (node 2015:797)
2. Open Design panel on right
3. Check Typography section:
   - Font: DM Sans
   - Style: SemiBold
   - Size: 45
   - Line height: 130%

**Visual Reference:**
![Hero Title Typography](figma-hero-h1-screenshot.png)
From Figma node 2015:797

---

## SUMMARY

The design token system has a critical error in the H1 typography mixin. Instead of using a serif heading font (Sentry Slab LC) that doesn't exist on Google Fonts, the Figma design actually calls for DM Sans (sans-serif, the same body font) at a slightly smaller size (45px) with SemiBold weight (600) and 1.3 line height.

This needs to be fixed immediately to achieve design compliance.

**Files to Modify:**
1. `/Users/ted/syscoin/syshub/src/scss/_design-tokens.scss` - Add hero-specific mixin
2. `/Users/ted/syscoin/syshub/src/scss/_about-hero.scss` - Update title class to use new mixin

**Estimated Fix Time:** 15 minutes
**Blocking:** YES - Production cannot launch with wrong hero title typography

---

**Prepared By:** Claude Code (Senior Frontend Engineer)
**Date:** 2025-11-12
**Status:** 🔴 REQUIRES IMMEDIATE FIXES
