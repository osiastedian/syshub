# FIGMA VS SPEC - EXACT MEASUREMENTS REFERENCE

**Quick Reference for Developers**
**Use spec values unless noted otherwise**

---

## SECTION 1: HERO SECTION

### Desktop Layout (1440px)

| Property | Figma Actual | Spec Requirement | Use Value | Notes |
|----------|--------------|------------------|-----------|-------|
| Container height | 928px | Flexible | Flexible | Height varies by content |
| Container padding | 180px L, R varies | 48px sides | 48px | Spec is standard |
| Content width | 572.6px | ~50% flex | flex: 1 | Use flex, not fixed |
| Image width | 457.25px | ~50% flex | flex: 1 | Use flex, not fixed |
| Gap between columns | ~272px | 32px | 32px | Spec value |
| Hero title size | N/A | 48px | 48px | From spec |
| Title line-height | 1.3 | 1.2 | 1.2 | Spec (tight) |
| Description size | 16px | 16px | 16px | Matches |
| Description line-height | 1.3 | 1.8 | 1.8 | Spec (relaxed) |
| Image drop-shadow | N/A | drop-shadow(0 10px 30px rgba(251,176,59,0.15)) | Yes | From spec |
| Title text-shadow | N/A | 0 2px 4px rgba(0,0,0,0.3) | Yes | From spec |

### Gradient Overlay (from Figma ellipses)

```
Ellipse 1: 140×222px at (899, 224.5)  → Gold accent light
Ellipse 2:  82×82px  at (1111, 555.5) → Secondary accent
Ellipse 3:  82×101px at (833, 579.5)  → Tertiary accent

CSS Implementation:
background: radial-gradient(
  circle at 20% 50%,
  rgba(251, 176, 59, 0.05) 0%,
  transparent 50%
);
```

### Tablet Layout (768px - 991px)

| Property | Figma | Spec | Use |
|----------|-------|------|-----|
| Layout | Vertical stack | Column reverse | Column reverse |
| Image position | Top | First (order: -1) | First |
| Padding | 32px | 32px | 32px |
| Image margin-bottom | 32px | 32px | 32px |
| Title size | 32px | 32px | 32px |

### Mobile Layout (0-767px)

| Property | Figma | Spec | Use |
|----------|-------|------|-----|
| Layout | Vertical stack | Column reverse | Column reverse |
| Image size | 195.73×257px | Fixed | Fixed |
| Image margin-bottom | 44px | Varies | 44px |
| Padding | 24px | 24px | 24px |
| Title size | 32px | 32px | 32px |
| Title max-width | 358px | 358px | 358px |

---

## SECTION 2: FEATURE CARDS

### Desktop Grid (1440px)

| Property | Figma | Spec | Use | Decision |
|----------|-------|------|-----|----------|
| Columns | 4 | 4 | 4 | Match |
| Card width | 220px | calc(25% - gap) | CSS grid | Use grid |
| Total row width | 880px + gaps | 1080px | Full container | Figma measured only cards |
| Gap between cards | ~286.67px intervals | 24px | 24px | **Spec value** |
| Calculated gap | ~67px | 24px | 24px | **Use spec** |
| Card min-height | 142-194px | 240px | 240px | Spec minimum |
| Card padding | 24px | 24px | 24px | Match |
| Icon size | 100×100px | 100×100px | 100×100px | Match |
| Border radius | ~12px | 12px | 12px | Match |
| Border color | rgba(255,255,255,0.1) | rgba(255,255,255,0.1) | rgba(255,255,255,0.1) | Match |
| Title size | 16px | 16px | 16px | Match |
| Title max-width | 220px (card) | 120px | 120px | Spec is narrower |

### Card Vertical Alignment Issue

```
FIGMA SHOWS (incorrect alignment):
Card 0: y=0px    ← Correct baseline
Card 1: y=13px   ← OFFSET - IGNORE THIS
Card 2: y=13px   ← OFFSET - IGNORE THIS
Card 3: y=26px   ← OFFSET - IGNORE THIS

IMPLEMENTATION:
Use CSS Grid with align-items: stretch
All cards naturally align at top (y=0)
```

### Tablet Grid (768px-991px)

| Property | Value |
|----------|-------|
| Columns | 2 |
| Gap | 24px |
| Card min-height | 200px |

### Mobile Grid (0-767px)

| Property | Value |
|----------|-------|
| Columns | 1 |
| Gap | 16px |
| Card min-height | 180px |

---

## SECTION 3: SENIORITY - DATA BLOCKS

### Layout Type Decision

**Figma Shows**: List-style layout
```
[Label: "TX DATA GAMMA"] → [Badge: "43,800 Blocks"]
[Label: "TX DATA BETA"]  → [Badge: "526,600 Blocks"]
[Label: "TX DATA ALPHA"] → [Badge: "1,314,000 Blocks"]
```

**Spec Suggests**: Grid-style layout
```
[Card 1]  [Card 2]  [Card 3]
centered  centered  centered
```

**Decision**: ✅ **Use Figma list layout** (more space-efficient)

### Figma Measurements (List Layout)

| Property | Figma Value | Implementation |
|----------|-------------|-----------------|
| Container max-width | 600px | 600px |
| Item height | ~69px | ~69px |
| Label width | 82-165px | flex-grow: 0 |
| Label font-size | 14px bold | 14px weight 700 |
| Label color | Gold (#fbb03b) | $color-brand-gold |
| Label text-transform | uppercase | uppercase |
| Badge width | 126-142px | flex-shrink: 0 |
| Badge font-size | 16px | 16px |
| Badge padding | Visible ~8-12px | 8px 12px |
| Badge background | Dark | #2A2A2A |
| Badge border-radius | ~6px | 6px |
| Gap between items | ~69px (vertical) | 16-24px (use smaller) |

### Responsive Adjustments

| Breakpoint | Layout | Notes |
|-----------|--------|-------|
| Desktop 992px+ | Flex row (label + badge) | Use space-between |
| Tablet 768-991px | Flex row (label + badge) | Same as desktop |
| Mobile 0-767px | Flex column (stack) | Badge below label |

---

## SECTION 4: SENIORITY - BENEFIT CARDS

### Figma Dimensions

| Property | Card 1 Year | Card 2.5 Year |
|----------|------------|---------------|
| Width | 490px | 490px |
| Height | 370px | 370px |
| Gap between | 590px (2-col split) | — |
| Padding | 32px | 32px |
| Title height | 62px | 62px |
| Title font-size | ~20px | ~20px |
| Title font-weight | 700 | 700 |
| Min content height | 160px | 160px |

### Spec Requirements

| Property | Spec Value | Implementation |
|----------|-----------|-----------------|
| Flex layout | 2-column | flex: 1 each |
| Gap | 24px | gap: 24px |
| Min-height | 160px | min-height: 160px |
| Border | 1px solid rgba(255,255,255,0.1) | Yes |
| Border-radius | 12px | 12px |
| Padding | 24px | 24px |
| Background | #1A1A1A | #1A1A1A |
| Title line-height | 1.4 | 1.4 |

### Responsive

| Breakpoint | Layout |
|-----------|--------|
| Desktop 992px+ | 2-column flex |
| Tablet 768-991px | 2-column flex (may wrap) |
| Mobile 0-767px | 1-column (flex-direction: column) |

---

## SECTION 5: GOVERNANCE & REWARDS

### Governance Layout

**Desktop (992px+)**: 2-column
```
[Image: 50%] | [Content: 50%]
```

**Tablet/Mobile**: Stacked
```
[Image: 100%]
[Content: 100%]
```

### Figma Measurements

| Property | Value |
|----------|-------|
| Container width (desktop) | 1080px (main container) + 180px padding = 1440px |
| Image width (desktop) | 490px (45%) |
| Content width (desktop) | 530px (49%) |
| Gap | 40px (per spec) |
| Graph height | 389px |
| Chart title font-size | ~34px |
| Axis label font-size | 16-18px |

### Spec Values

| Property | Spec |
|----------|------|
| Desktop layout | 50/50 flex split |
| Gap | 40px (noted in spec) |
| Title font-size | 32px (H3) |
| Description font-size | 16px |
| Description line-height | 1.8 |

---

## SECTION 6: REQUIREMENTS LIST

### Figma Structure

```
8 Requirement Items
├── Icon frame: 16×16px
├── Icon margin-right: 32px
└── Text: Variable height (23px or 46px for multi-line)

Item heights: 23px (single line) to 46px (multi-line)
Total gap between items: ~39-50px
```

### Spec Requirements

| Property | Spec |
|----------|------|
| List type | Unordered |
| Icon | fa-angle-right |
| Icon color | $color-brand-gold |
| Text size | 14px-16px |
| Text color | #ffffff |
| Line height | 1.6 |
| Item gap | 12px (margin-bottom) |
| Padding-left | 32px (icon + margin) |

### Implementation

```scss
.requirement-item {
  padding-left: 32px;      // Icon + gap
  margin-bottom: 12px;     // Item spacing
  position: relative;

  i {
    position: absolute;
    left: 0;
    color: $color-brand-gold;
  }
}
```

---

## GLOBAL SPACING REFERENCE

### Figma Observations

```
Hero padding:        ~180px sides (large)
Feature container:   180px left padding
Section padding:     24-48px (varies by section)
Content max-width:   1080px (internal), 1440px (with padding)
```

### Spec System

```
$space-xs:   8px
$space-sm:   12px
$space-md:   16px
$space-lg:   24px
$space-xl:   32px
$space-2xl:  48px
$space-3xl:  64px

Standard section padding: 48px (desktop), 32px (tablet), 24px (mobile)
```

### Implementation Decision

**Use spec spacing system** - More consistent and maintainable

```scss
// Standard section
.section {
  padding: $space-3xl $space-2xl;  // 64px top/bottom, 48px sides

  @media (max-width: 991px) {
    padding: $space-2xl $space-xl;  // 48px top/bottom, 32px sides
  }

  @media (max-width: 575px) {
    padding: $space-xl $space-lg;   // 32px top/bottom, 24px sides
  }
}
```

---

## COLOR VALUES (VERIFIED)

### From Figma Variables

```
$color-gold:           #fbb03b  ✓
$color-gold-dark:      #d87d10
$color-blue:           #1f5eff  ✓
$color-orange:         #f7931a
$color-black:          #0a0a0a  ✓
$color-white:          #ffffff  ✓
$color-background:     #0a0a0a  ✓
$color-surface:        #1a1a1a  ✓
$color-text:           #ffffff  ✓
$color-text-secondary: rgba(255,255,255,0.8) ✓
$color-text-tertiary:  rgba(255,255,255,0.7)
```

### Applied in Implementation

```scss
// Use semantic naming from spec
.element {
  color: $color-text;              // White text
  background: $color-background;   // Dark background
  border: 1px solid rgba(255,255,255,0.1);  // Overlay white 10%
  color: $color-text-secondary;    // Secondary text
}
```

---

## TYPOGRAPHY HIERARCHY

### Font Families (Verified)

```
Headlines: 'Sentry Slab LC', serif
Body:      'DM Sans', sans-serif
Monospace: 'Courier New', monospace
```

### Font Sizes (Spec)

```
H1: 48px (desktop), 32px (mobile)
H2: 40px
H3: 32px
H4: 24px
Body Large: 18px
Body Medium: 16px
Body Small: 14px
```

### Font Weights

```
Light: 300
Regular: 400
Medium: 500
Semi-Bold: 600
Bold: 700
Black: 900
```

### Line Heights (Spec - Override Figma 1.3)

```
Tight: 1.2    (headlines, titles)
Normal: 1.5   (body text, card titles)
Relaxed: 1.8  (descriptions, paragraphs)
```

---

## QUICK DECISION MATRIX

### When in doubt, use:

| Situation | Source | Value |
|-----------|--------|-------|
| Colors | Figma Variables | Use as-is |
| Font families | Spec | Sentry Slab LC, DM Sans |
| Font weights | Spec | 400, 500, 600, 700 |
| Font sizes | Spec | 14px, 16px, 18px, 24px, 32px, etc. |
| Line heights | Spec | 1.2, 1.5, 1.8 (NOT 1.3) |
| Spacing/gaps | Spec | 24px standard (NOT Figma's 67px) |
| Shadows | Spec | Use provided values |
| Border radius | Spec | 12px cards, 6px badges |
| Responsive | Spec | 5 breakpoints defined |

---

**Last Updated**: 2025-11-12
**Status**: Ready for Development
**Author**: Claude Code - Cross-Check Analysis
