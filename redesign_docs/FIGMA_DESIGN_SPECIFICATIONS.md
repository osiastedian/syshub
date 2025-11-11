# ABOUT PAGE REDESIGN - FIGMA DESIGN SPECIFICATIONS

**Extracted from Figma**: SentryNodes Design System
**Design File**: https://www.figma.com/design/azvuitP9PvixRa2SM1sLXj/SentryNodes?node-id=2015-791
**Last Updated**: 2025-11-11
**Status**: Complete - Ready for Implementation

---

## Overview

This document provides complete visual, spacing, and interaction specifications extracted from the Figma design for the About page redesign. All specifications use the SysHub design tokens and responsive breakpoints.

---

## Design System Reference

### Color Palette (from `_design-tokens.scss`)

**Brand Colors**
- Primary Gold: `$color-brand-gold: #FBB03B`
- Gold Dark: `$color-brand-gold-dark: #D87D10`
- Brand Blue: `$color-brand-blue: #1F5EFF`
- Brand Orange: `$color-brand-orange: #F7931A`

**Neutral Colors**
- Black: `#0A0A0A`
- White: `#FFFFFF`
- Dark Background: `#1A1A1A`
- Dark Gray: `#2A2A2A`
- Medium Gray: `#666666`
- Light Gray: `#CCCCCC`

**Text Colors**
- Primary Text: `$color-text: #FFFFFF`
- Secondary Text: `$color-text-secondary: rgba(255,255,255,0.8)`
- Tertiary Text: `rgba(255,255,255,0.7)`

### Typography System

**Font Families**
- Headings: `'Sentry Slab LC', serif`
- Body: `'DM Sans', sans-serif`
- Monospace: `'Courier New', monospace`

**Font Sizes**
- H1: 48px (headings), 32px (tablet), 24px (mobile)
- H2: 40px
- H3: 32px
- H4: 24px
- Body Large: 18px
- Body Medium: 16px
- Body Small: 14px

**Font Weights**
- Light: 300
- Regular: 400
- Medium: 500
- Semi-Bold: 600
- Bold: 700
- Black: 900

**Line Heights**
- Tight: 1.2
- Normal: 1.5
- Relaxed: 1.8

### Spacing System

- `$space-2xs`: 4px
- `$space-xs`: 8px
- `$space-sm`: 12px
- `$space-md`: 16px
- `$space-lg`: 24px
- `$space-xl`: 32px
- `$space-2xl`: 48px
- `$space-3xl`: 64px

### Responsive Breakpoints

- Mobile: `0` - `575px`
- Tablet: `576px` - `767px`
- Tablet Large: `768px` - `991px`
- Desktop: `992px` - `1199px`
- Desktop Large: `1200px` - `1399px`
- Desktop XL: `1400px+`

### Shadows

- Small: `0 1px 2px rgba(0, 0, 0, 0.1)`
- Medium: `0 4px 6px rgba(0, 0, 0, 0.15)`
- Large: `0 8px 12px rgba(0, 0, 0, 0.2)`
- Extra Large: `0 12px 24px rgba(0, 0, 0, 0.25)`

### Transitions

- Fast: `150ms ease-in-out`
- Base: `200ms ease-in-out`
- Slow: `300ms ease-in-out`

### Border Radius

- None: `0`
- Small: `4px`
- Medium: `8px`
- Large: `12px`
- Extra Large: `16px`
- Pill: `20px`
- Full: `50%`

---

## Section 1: Hero Section

### Layout & Positioning

**Desktop Layout** (992px+)
- Layout: Two-column flex layout
- Content (left): 50% width, flex: 1
- Image (right): 50% width, flex: 1
- Gap between columns: 32px (`$space-xl`)
- Max-width container: 1400px
- Padding: 48px sides (`$space-2xl`), 48px top/bottom
- Padding-top (with navbar): `64px + 48px = 112px`

**Tablet Layout** (768px - 991px)
- Layout: Stacked vertically
- Image positioned above content
- Full width: 100%
- Padding: 32px sides (`$space-xl`), 32px top/bottom
- Margin-bottom (image): 32px (`$space-xl`)

**Mobile Layout** (0 - 767px)
- Layout: Stacked vertically
- Image positioned first
- Full width: 100%
- Image dimensions: 195.73px × 257px (fixed size on mobile)
- Image margin-bottom: 44px (spacing to header)
- Padding: 24px sides (`$space-lg`), 24px top/bottom

### Hero Title

**Styling**
- Font: `'Sentry Slab LC', serif`
- Weight: 700 (bold)
- Color: #FFFFFF
- Text Shadow: `0 2px 4px rgba(0, 0, 0, 0.3)`
- Line Height: 1.2
- Margin Bottom: 24px (`$space-lg`)

**Font Sizes**
- Desktop (1400px+): 48px
- Desktop (992px-1399px): 48px
- Tablet (768px-991px): 32px
- Mobile (0-767px): 32px, max-width 358px

**Content** (from Figma)
```
"Learn about Syscoin SentryNodes"
```
Translation key: `about.hero.title`

### Hero Description

**Styling**
- Font: `'DM Sans', sans-serif`
- Weight: 400 (regular)
- Font Size: 16px (body medium)
- Color: `rgba(255,255,255,0.8)` (secondary text)
- Line Height: 1.8 (relaxed)
- Margin Bottom: 32px (`$space-xl`)
- Max Width: 550px (desktop), 100% (mobile)

**Content** (from Figma)
```
"Syscoin SentryNodes protect the blockchain from network attacks, in the same vein as traditional proof of stake algorithms. It's often expensive to accumulate enough of a currency to create a masternode. This expense helps keep the network decentralised, as it would take an ungodly amount of money to purchase enough currency to have a monopoly on its nodes. The cost of operating a Sentry Node also keeps operators honest. Unlike Bitcoin miners, who may switch from one coin on its blockchain to the next based on profitability, operators are incentivised to properly maintain and upkeep their Syscoin SentryNodes. The exorbitant initial investment serves as collateral, whereby if operators want their investment to pay off, they have to play by the blockchain's rules. Between the high operation costs and promising return on investment, it's in an operator's best interest to operate his/her node properly and without any malicious intent."
```
Translation key: `about.hero.description`

### Hero Image

**Dimensions**
- Desktop: Flexible, constrained by 50% width
- Tablet: Flexible, 100% width
- Mobile: 195.73px × 257px (fixed)

**Styling**
- Max-width: 100%
- Height: auto
- Display: block
- Drop Shadow Filter: `drop-shadow(0 10px 30px rgba(251, 176, 59, 0.15))`

**Image Source**
- Path: `/assets/images/header-img1.png` (current) or provide updated 3D SentryNode illustration

**Background**
- Radial Gradient Overlay: `circle at 20% 50%, rgba(251, 176, 59, 0.05) 0%, transparent 50%`
- Purpose: Subtle accent light effect behind hero section

---

## Section 2: Feature Cards Section (NEW)

### Section Container

**Styling**
- Background: Dark background (`$color-background: #0A0A0A`)
- Padding: 48px sides, 48px top/bottom (desktop)
- Padding: 32px sides, 32px top/bottom (tablet)
- Padding: 24px sides, 24px top/bottom (mobile)

### Section Title

**Content** (from Figma)
```
"What sets Syscoin SentryNodes apart?"
```
Translation key: `about.features.title`

**Styling**
- Font: `'DM Sans', sans-serif`
- Weight: 600 (semi-bold)
- Font Size: 38px (custom - between h3 and h2)
- Color: #FFFFFF
- Text Transform: uppercase
- Margin Bottom: 32px (`$space-xl`)
- Text Align: center

### Cards Grid Layout

**Desktop Layout** (992px+)
- Grid: 4 columns
- Gap: 24px (`$space-lg`)
- Card Width: calc(25% - 18px)

**Tablet Layout** (768px - 991px)
- Grid: 2 columns
- Gap: 24px (`$space-lg`)
- Card Width: calc(50% - 12px)

**Mobile Layout** (0 - 767px)
- Grid: 1 column
- Gap: 16px (`$space-md`)
- Card Width: 100%

### Individual Card Styling

**Dimensions**
- Min-height: 240px (desktop), 200px (tablet), 180px (mobile)
- Padding: 24px (`$space-lg`)

**Colors**
- Background: `#1A1A1A` (surface)
- Border: 1px solid `rgba(255,255,255,0.1)`
- Border Radius: 12px (`$radius-lg`)

**Effects**
- Box Shadow: `0 4px 6px rgba(0, 0, 0, 0.15)` (default)
- Hover Shadow: `0 8px 12px rgba(0, 0, 0, 0.2)`
- Transition: `all 200ms ease-in-out` (hover effect)
- Transform on Hover: `translateY(-4px)` (subtle lift)

**Layout**
- Display: flex
- Flex Direction: column
- Align Items: center
- Text Align: center
- Gap: 16px (`$space-md`)

### Card Icon

**Dimensions**
- Width: 100px
- Height: 100px
- Position: top of card (with margin-top adjustment)

**Styling**
- Object Fit: contain
- Display: block

**Icon Files & Specs** (Already in `/public/assets/images/about-icons/`)

1. **Facilitation Icon**
   - File: `about-feature-facilitation.png`
   - Size: 100x100px
   - Style: Black/grayscale 3D
   - Description: Twisted spiral/helix shape

2. **Seniority Benefits Icon**
   - File: `about-feature-seniority.png`
   - Size: 100x100px
   - Style: Black/grayscale 3D
   - Description: Layered/stacked structure

3. **Z-DAG Protocol Icon**
   - File: `about-feature-zdags.png`
   - Size: 100x100px
   - Style: Black/grayscale 3D
   - Description: Multi-layered geometric design

4. **Scalability Icon**
   - File: `about-feature-scalability.png`
   - Size: 100x100px
   - Style: Black/grayscale 3D
   - Description: Spiral/wave pattern

### Card Title/Text

**Card 1: Facilitation**
```
"Facilitation of future Syscoin features and services"
```
Translation key: `about.features.list.f1`

**Card 2: Seniority**
```
"Seniority benefits to masternode operators"
```
Translation key: `about.features.list.f2`

**Card 3: Z-DAG**
```
"Z-DAG Protocol's instant asset transfer"
```
Translation key: `about.features.list.f3`

**Card 4: Scalability**
```
"Scalability"
```
Translation key: `about.features.list.f4`

**Styling**
- Font: `'DM Sans', sans-serif`
- Weight: 500 (medium)
- Font Size: 16px (body medium)
- Color: #FFFFFF
- Line Height: 1.5 (normal)
- Max Width: 120px

---

## Section 3: Seniority Section

### Section Header

**Title**
```
"SENTRY NODE SENIORITY EXPLAINED"
```
Translation key: `about.seniority.title`

**Styling**
- Font: `'Sentry Slab LC', serif`
- Weight: 700
- Font Size: 32px (h3)
- Color: #FFFFFF
- Text Transform: uppercase
- Text Align: center
- Margin Bottom: 24px (`$space-lg`)

**Description**
Translation key: `about.seniority.description`
- Font Size: 16px
- Color: `rgba(255,255,255,0.8)`
- Text Align: center
- Margin Bottom: 48px (`$space-2xl`)

### TX Data Blocks Section

**Label**
```
"Syscoin Average Block is 60 Seconds. Therefore:"
```
Translation key: `about.seniority.blockInfo.label`

**Styling**
- Font: `'DM Sans', sans-serif`
- Weight: 400
- Font Size: 16px
- Color: `rgba(255,255,255,0.7)`
- Text Align: center
- Margin Bottom: 32px (`$space-xl`)

### Three Data Blocks Grid

**Layout**
- Display: Grid or Flex (3 columns on desktop)
- Gap: 24px (`$space-lg`)
- Max Width: 100% (responsive)

**Desktop** (992px+): 3 columns
**Tablet** (768px - 991px): 2 columns with flex-wrap
**Mobile** (0 - 767px): 1 column (stacked)

### Individual Data Block

**Styling**
- Background: `#1A1A1A` (surface)
- Border: 1px solid `rgba(255,255,255,0.1)`
- Border Radius: 12px (`$radius-lg`)
- Padding: 24px (`$space-lg`)
- Min Height: 140px

**Label (Block Type)**
- Font: Bold, 14px
- Color: `$color-brand-gold: #FBB03B`
- Text Transform: uppercase
- Text Align: center
- Margin Bottom: 12px (`$space-sm`)

**Data Content**
- Font: Semi-bold, 24px
- Color: #FFFFFF
- Text Align: center

#### GAMMA Block
```
Label: "TX DATA GAMMA"
Data: "43,800 Blocks"
```
Translation keys:
- Label: `about.seniority.txData.gamma.label`
- Data: `about.seniority.txData.gamma.blocks`

#### BETA Block
```
Label: "TX DATA BETA"
Data: "526,600 Blocks"
```
Translation keys:
- Label: `about.seniority.txData.beta.label`
- Data: `about.seniority.txData.beta.blocks`

#### ALPHA Block
```
Label: "TX DATA ALPHA"
Data: "1,314,000 Blocks"
```
Translation keys:
- Label: `about.seniority.txData.alpha.label`
- Data: `about.seniority.txData.alpha.blocks`

### Two Column Benefit Cards

**Layout**
- Display: Flex (2 columns)
- Gap: 24px (`$space-lg`)
- Margin Top: 48px (`$space-2xl`)
- Max Width: 100%

**Responsive**
- Desktop (992px+): 2 equal columns
- Tablet (768px - 991px): 2 columns, may wrap
- Mobile (0 - 767px): 1 column (stacked)

### Benefit Card 1: 1 Year

**Title**
```
"1 YEAR 35% increase of base rate"
```
Translation key: `about.seniority.oneYear.title`

**Styling**
- Background: `#1A1A1A` (surface)
- Border: 1px solid `rgba(255,255,255,0.1)`
- Border Radius: 12px
- Padding: 24px (`$space-lg`)
- Min Height: 160px
- Display: flex
- Align Items: center
- Justify Content: center

**Title Styling**
- Font: Bold, 20px (h5)
- Color: #FFFFFF
- Text Align: center
- Line Height: 1.4

### Benefit Card 2: 2.5 Years

**Title**
```
"2.5 YEARS 100% increase of base rate"
```
Translation key: `about.seniority.twoAndHalf.title`

**Styling**
- Same as Card 1 (mirror design)

### Seniority Note Section

**Note Content**
Translation key: `about.seniority.note.main`

**Styling**
- Font: Regular, 16px
- Color: `rgba(255,255,255,0.8)`
- Text Align: center
- Margin Top: 48px (`$space-2xl`)
- Max Width: 800px (centered)
- Padding: 0 24px

---

## Section 4: Governance Section (Updated)

### Layout

**Desktop** (992px+)
- Two columns: Image (left, 50%) | Content (right, 50%)
- Gap: 40px

**Tablet/Mobile** (0 - 991px)
- Stacked vertically
- Image first (order: -1)

### Title
- Font: H3, 32px
- Color: #FFFFFF
- Weight: 700

### Subtitle (Question)
- Font: Italic, body large
- Color: `rgba(255,255,255,0.8)`
- Margin Bottom: 16px

### Description
- Font: Regular, 16px
- Color: `rgba(255,255,255,0.7)`
- Line Height: 1.8
- Multiple paragraphs

### Image
- File: `/assets/images/governance.png` (chart showing superblock decline)
- Max-width: 100%
- Height: auto

---

## Section 5: Rewards Section (Updated)

### Layout

**Desktop** (992px+)
- Two columns: Content (left, 50%) | Image (right, 50%)
- Gap: 40px
- Order: content first (content order: 1, image order: 2)

**Tablet/Mobile** (0 - 991px)
- Stacked vertically
- Image on top (order: -1)

### Title
- Font: H3, 32px
- Color: #FFFFFF
- Weight: 700

### Description
- Font: Regular, 16px
- Color: `rgba(255,255,255,0.7)`
- Line Height: 1.8
- Two paragraphs:
  1. Block reward distribution (75% to SentryNode operators)
  2. Seniority benefits (35%+ bonus)

### Image
- File: `/assets/images/reward.png` (chart showing reward increase over time)
- Max-width: 100%
- Height: auto

---

## Section 6: Requirements List (Style Updates)

### Title
- Font: H4, 24px, white
- Text Align: center
- Margin Bottom: 24px

### List Styling
- List Type: Unordered
- Icon: FontAwesome `fa-angle-right`
- Icon Color: `$color-brand-gold: #FBB03B`
- Icon Margin: 8px right padding
- Text Color: #FFFFFF
- Font Size: 14px-16px
- Line Height: 1.6
- Gap Between Items: 12px
- Margin Left: 0 (no indent)

### List Items

Standard requirement items (8 total):
- `about.requirements.requirement.r1` through `about.requirements.requirement.r8`

---

## Global Section Spacing

### Section Container Padding
**Desktop** (992px+)
- Horizontal: 48px (`$space-2xl`)
- Vertical: 64px (`$space-3xl`)

**Tablet** (768px - 991px)
- Horizontal: 32px (`$space-xl`)
- Vertical: 48px (`$space-2xl`)

**Mobile** (0 - 767px)
- Horizontal: 24px (`$space-lg`)
- Vertical: 32px (`$space-xl`)

### Section Margins
- Between major sections: 64px (`$space-3xl`) on desktop, 48px on tablet, 32px on mobile

---

## Interactive Elements & Animations

### Hover Effects

**Cards**
- Transition: all 200ms ease-in-out
- Transform: translateY(-4px)
- Shadow increase: from `$shadow-md` to `$shadow-lg`

**Buttons** (if any)
- Transition: opacity 200ms, transform 200ms
- Opacity: 0.8-0.9 on hover
- Transform: scale(1.02)

### Focus States (Accessibility)
- Focus outline: 2px solid `$color-brand-gold`
- Focus offset: 2px
- Apply to all interactive elements

---

## Dark Mode Considerations

All specifications use the dark theme:
- Background: #0A0A0A
- Surface: #1A1A1A
- Text: #FFFFFF
- Accents: Gold (#FBB03B), Blue (#1F5EFF), Orange (#F7931A)

No separate light mode theme needed for this design.

---

## Responsive Testing Checklist

### Breakpoints to Test
- [ ] Mobile: 375px (iPhone SE)
- [ ] Mobile: 768px (iPad portrait)
- [ ] Tablet: 991px (iPad landscape)
- [ ] Desktop: 1200px (standard desktop)
- [ ] Desktop: 1440px (large desktop)

### Responsive Features
- [ ] Hero section stacks correctly
- [ ] Feature cards grid adapts (4→2→1 columns)
- [ ] Images scale properly
- [ ] Text remains readable at all sizes
- [ ] Spacing/padding adjusts appropriately
- [ ] Touch targets are 48px+ on mobile
- [ ] No horizontal scroll on any device

---

## CSS Class Naming Convention

Following project BEM-style conventions:

```
.about-page {} (page container)
.about-page__section {} (section)
.about-page__hero {} (hero section)
.about-page__hero__content {}
.about-page__hero__title {}
.about-page__hero__image {}

.about-page__features {} (features section)
.about-page__feature-card {}
.about-page__feature-card__icon {}
.about-page__feature-card__title {}

.about-page__seniority {} (seniority section)
.about-page__seniority__header {}
.about-page__seniority__data-blocks {}
.about-page__data-block {}
.about-page__data-block--gamma {}
.about-page__data-block--beta {}
.about-page__data-block--alpha {}
.about-page__benefit-card {}
.about-page__benefit-card--1year {}
.about-page__benefit-card--2_5year {}

.about-page__governance {} (governance section)
.about-page__rewards {} (rewards section)
.about-page__requirements {} (requirements section)
```

---

## Performance Considerations

1. **Image Optimization**
   - Ensure images are optimized (WebP with PNG fallback)
   - Icons (100x100px PNGs) are appropriately sized
   - Use responsive images with srcset for different viewport sizes

2. **CSS Optimization**
   - Use design tokens to minimize CSS repetition
   - Group media queries for better maintainability
   - Leverage existing design system utilities

3. **Animation Performance**
   - Use `transform` and `opacity` for smooth animations
   - Avoid animating `height`, `width`, `top`, `left`
   - Keep transitions to 150-300ms range

4. **Accessibility**
   - Ensure 4.5:1 contrast ratio for all text
   - Use semantic HTML (h1, h2, h3, p, etc.)
   - Include alt text for all images
   - Ensure keyboard navigation works
   - Test with screen readers

---

## Implementation Quick Reference

### Key Files to Create/Modify

**New Components**
- `src/components/About/HeroSection.jsx`
- `src/components/About/FeatureCards.jsx`
- `src/components/About/SenioritySection.jsx`
- `src/components/About/GovernanceSection.jsx` (if extracting)
- `src/components/About/RewardsSection.jsx` (if extracting)

**Updated Files**
- `src/pages/About.js` (integrate new components)
- `src/scss/_about.scss` (add new section styles)
- `src/shared/locales/en/pages/about/index.js` (all keys already added)

**Assets**
- `/public/assets/images/about-icons/*.png` (4 icon files - already added)
- `/assets/images/header-img1.png` (hero image)
- `/assets/images/governance.png` (governance chart)
- `/assets/images/reward.png` (rewards chart)

### Translation Keys Reference

All keys are available in `src/shared/locales/en/pages/about/index.js`:

**Hero Section**
- `about.hero.title`
- `about.hero.description`

**Features Section**
- `about.features.title`
- `about.features.list.f1`
- `about.features.list.f2`
- `about.features.list.f3`
- `about.features.list.f4`

**Seniority Section**
- `about.seniority.title`
- `about.seniority.description`
- `about.seniority.blockInfo.label`
- `about.seniority.txData.gamma.label`
- `about.seniority.txData.gamma.blocks`
- `about.seniority.txData.beta.label`
- `about.seniority.txData.beta.blocks`
- `about.seniority.txData.alpha.label`
- `about.seniority.txData.alpha.blocks`
- `about.seniority.oneYear.title`
- `about.seniority.twoAndHalf.title`
- `about.seniority.note.main`

**Governance Section**
- `about.governance.title`
- `about.governance.question`
- `about.governance.description.d1`

**Rewards Section**
- `about.rewards.title`
- `about.rewards.description.d1`
- `about.rewards.description.d2`

**Requirements Section**
- `about.requirements.requirement.r1` through `r8`

---

## Next Steps

1. **Review** this specification with design team for approval
2. **Implement** components using these specifications
3. **Test** responsive behavior at all breakpoints
4. **Validate** against original Figma design
5. **Deploy** and monitor performance

---

**Document Version**: 1.0
**Extraction Date**: 2025-11-11
**Extracted By**: Claude Code - Using Figma MCP
**Status**: Complete and Ready for Implementation
