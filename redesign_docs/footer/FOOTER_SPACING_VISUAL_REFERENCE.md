# Footer Spacing - Visual Reference Guide

**Purpose:** This document provides visual diagrams and measurements for the footer component spacing.

---

## 1. Desktop Layout (1920px viewport)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ FOOTER ELEMENT (padding: 48px 24px)                                         │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ SHELL CONTAINER (max-width: 1400px, centered)                       │   │
│  │                                                                      │   │
│  │  HEADER SECTION (margin-bottom: 48px)                              │   │
│  │  ┌────────────────────────────────────────────────────────────────┐│   │
│  │  │ [LOGO]                                                         ││   │
│  │  │ 60px × 54px                                                    ││   │
│  │  │                    gap: 16px                                   ││   │
│  │  │ "Anchoring the final ledger of Web3 with Bitcoin's security   ││   │
│  │  │  and modular scalability." (max-width: 500px)                 ││   │
│  │  │                                                                ││   │
│  │  └────────────────────────────────────────────────────────────────┘│   │
│  │                                                                      │   │
│  │  ─────────────────────────────────────────────────────────────────   │   │
│  │  (border-bottom: 1px solid #2A2A2A)                                 │   │
│  │                                                                      │   │
│  │  COLUMNS SECTION (gap: 32px, margin-bottom: 32px, padding-bottom: 32px)
│  │  ┌──────────────────┬──────────────────┬──────────────────────────┐│   │
│  │  │ SENTRYNODES      │ RESOURCES        │ STAY UPDATED!           ││   │
│  │  │ (300px fixed)    │ (flex: 1)        │ (flex: 1)               ││   │
│  │  │                  │                  │                         ││   │
│  │  │ margin-b: 24px   │ margin-b: 24px   │ margin-b: 24px         ││   │
│  │  │                  │                  │                         ││   │
│  │  │ • About          │ • FAQ            │ Description text        ││   │
│  │  │ • Stats          │ • Support        │ Get the latest updates...││   │
│  │  │ • Setup          │                  │                         ││   │
│  │  │ • Governance     │  gap: 16px       │ [email input    ]       ││   │
│  │  │ • SentryNode     │  between items   │ [Subscribe now →]       ││   │
│  │  │                  │                  │                         ││   │
│  │  │ gap: 16px        │                  │ gap: 12px (form)        ││   │
│  │  │ between items    │                  │                         ││   │
│  │  └──────────────────┴──────────────────┴──────────────────────────┘│   │
│  │                                                                      │   │
│  │  ─────────────────────────────────────────────────────────────────   │   │
│  │  (border-top: 1px solid #2A2A2A)                                    │   │
│  │                                                                      │   │
│  │  SOCIAL SECTION (margin-top: 48px, padding-top: 32px)              │   │
│  │  ┌────────────────────────────────────────────────────────────────┐│   │
│  │  │            [F][T][I][G][D][T][R][L][W][Y]                    ││   │
│  │  │            40×40px icons with 16px gap                         ││   │
│  │  │            Blue (#1F5EFF) with hover effect                    ││   │
│  │  │                                                                ││   │
│  │  └────────────────────────────────────────────────────────────────┘│   │
│  │                                                                      │   │
│  │  COPYRIGHT SECTION (margin-top: 24px, padding-top: 32px)            │   │
│  │  ┌────────────────────────────────────────────────────────────────┐│   │
│  │  │            © 2025 Syscoin. All rights reserved                 ││   │
│  │  │            (14px, white at 0.7 opacity)                        ││   │
│  │  │                                                                ││   │
│  │  └────────────────────────────────────────────────────────────────┘│   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Desktop Vertical Spacing Breakdown

```
┌─ FOOTER START ─────────────────────────────────────┐
│                                                     │
│  padding-top: 48px                                  │
│                                                     │
├─ HEADER SECTION START ─────────────────────────────┤
│                                                     │
│  Logo: 60px × 54px                                  │
│  gap: 16px                                          │
│  Tagline: ~44px (2 lines × 22.4px per line)        │
│                                                     │
├─ HEADER BOTTOM MARGIN: 48px ───────────────────────┤
│                                                     │
├─ COLUMNS SECTION START ────────────────────────────┤
│                                                     │
│  Column max-height: ~190px (SENTRYNODES)            │
│  (title 16px + margin 24px + 5 links + gaps)       │
│                                                     │
├─ COLUMNS BOTTOM: 32px margin + 32px padding ───────┤
│                                                     │
├─ SOCIAL SECTION START ─────────────────────────────┤
│                                                     │
│  margin-top: 48px                                   │
│  padding-top: 32px                                  │
│  Icons: 40px × 40px                                 │
│                                                     │
├─ SOCIAL BOTTOM SPACING ───────────────────────────┤
│                                                     │
├─ COPYRIGHT SECTION START ──────────────────────────┤
│                                                     │
│  margin-top: 24px                                   │
│  padding-top: 32px                                  │
│  Text: 14px                                         │
│                                                     │
│  padding-bottom: 48px                               │
│                                                     │
└─ FOOTER END ───────────────────────────────────────┘

TOTAL FOOTER HEIGHT: ~750px (including all padding and margins)
```

---

## 3. Column Width Distribution

```
DESKTOP (1920px viewport, max-width: 1400px)

┌──────────────────────────────────────────────────────────────────────┐
│ Available width: 1400px - (24px × 2 padding) = 1352px                │
└──────────────────────────────────────────────────────────────────────┘

Distribution:
  Column 1: 300px (fixed)
  Gap:      32px
  Column 2: (1352px - 300px - 32px*2) ÷ 2 = 510px
  Gap:      32px
  Column 3: 510px

Visual:
┌──────────────────┬────────────────────────────┬──────────────────────────┐
│ SENTRYNODES      │ RESOURCES                  │ STAY UPDATED!            │
│ 300px            │ 510px                      │ 510px                    │
├─────────────────────────────────────────────────────────────────────────┤
│ gap: 32px        │ gap: 32px                                              │
│ between columns                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Link Item Spacing

```
SINGLE LINK ITEM

┌──────────────────────────────────────┐
│ padding-top: 12px                    │
├──────────────────────────────────────┤
│ "About"                              │
│ (14px font, white at 0.8 opacity)    │
├──────────────────────────────────────┤
│ padding-bottom: 12px                 │
├──────────────────────────────────────┤
│ gap: 16px (next item)                │
└──────────────────────────────────────┘

TOTAL ITEM HEIGHT: 12px + 14px + 12px = 38px (per link)

SENTRYNODES COLUMN (5 links):
  Title:      16px (font) + 24px (margin-bottom) = 40px
  Link 1:     38px
  + Gap:      16px
  Link 2:     38px
  + Gap:      16px
  Link 3:     38px
  + Gap:      16px
  Link 4:     38px
  + Gap:      16px
  Link 5:     38px
  ─────────────────────────────────────
  Total:      ~230px (height of SENTRYNODES)
```

---

## 5. Subscribe Form Layout (Desktop)

```
HORIZONTAL LAYOUT (Desktop)

┌─────────────────────────────────────────────────────┐
│ "Get the latest updates and news..."  (14px regular)│
├─────────────────────────────────────────────────────┤
│ gap: 16px (field spacing)                           │
├──────────────────────────────────────┬──────────────┤
│ [email input             ]  │  button  │
│ flex: 1                     │ auto     │
│ height: 40px                │ 40px     │
│ padding: 16px               │ 16/24px  │
│ border-radius: 8px          │ 8px      │
│ border: 1px #2A2A2A         │ none     │
│ background: rgba(white, 0.05) │ #FBB03B│
│                             │          │
│ gap between:                │          │
│ input & button: 12px        │          │
└──────────────────────────────────────┴──────────────┘

VERTICAL LAYOUT (Mobile, max-width: 576px)

┌─────────────────────────────────────┐
│ "Get the latest updates..."         │
├─────────────────────────────────────┤
│ gap: 16px                           │
├─────────────────────────────────────┤
│ [email input (100% width)]          │
│ height: 40px                        │
│ padding: 16px                       │
├─────────────────────────────────────┤
│ gap: 12px                           │
├─────────────────────────────────────┤
│ [Subscribe (100% width)]            │
│ height: 40px                        │
│ padding: 16px 24px                  │
└─────────────────────────────────────┘

TOTAL HEIGHT (Mobile): 14 + 16 + 40 + 12 + 40 = 122px
```

---

## 6. Social Icons Layout

```
DESKTOP (1920px)

┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [F] [T] [I] [G] [D] [T] [R] [L] [W] [Y]                           │
│
│  Available width: 1400px - (24px × 2 padding) = 1352px              │
│  Icons space: 10 × 40px + 9 × 16px = 400 + 144 = 544px            │
│  Centered with margin: (1352 - 544) / 2 = 404px on each side ✓     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

TABLET (768px)

┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│      [F] [T] [I] [G] [D] [T] [R] [L] [W] [Y]                       │
│                                                                      │
│  Available width: 768px - (16px × 2 padding) = 736px                │
│  Icons space: 544px (same)                                          │
│  Centered with margin: (736 - 544) / 2 = 96px on each side ✓       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

MOBILE (375px) - WITH WRAPPING

┌────────────────────────────┐
│ [F][T][I][G][D]            │  Row 1 (5 icons)
│ [T][R][L][W][Y]            │  Row 2 (5 icons)
├────────────────────────────┤
│ gap: 16px (horizontal)     │
│ gap: 16px (vertical)       │
│ flex-wrap: wrap            │
│ justify-content: center    │
└────────────────────────────┘

ICONS PER ROW:
  375px - (16px × 2 padding) = 343px available
  4 icons: 4 × 40px + 3 × 16px = 208px (fits)
  5 icons: 5 × 40px + 4 × 16px = 264px (fits)

  → Actually: 5 icons fit per row with wrapping
```

---

## 7. Mobile Layout (375px)

```
┌─────────────────────────────────────┐
│ FOOTER (padding: 24px 16px)         │
│                                     │
│ HEADER SECTION (margin-bottom: 48px)
│ ┌─────────────────────────────────┐│
│ │ [LOGO]                         ││
│ │ 50px × 45px (smaller)          ││
│ │                                 ││
│ │ gap: 16px                       ││
│ │                                 ││
│ │ "Anchoring the final ledger..." ││
│ │ (centered, max 100%)            ││
│ └─────────────────────────────────┘│
│                                     │
│ COLUMNS SECTION (flex-direction: col, gap: 16px)
│ ┌─────────────────────────────────┐│
│ │ SENTRYNODES (100% width)        ││
│ │ [5 links]                       ││
│ └─────────────────────────────────┘│
│                                     │
│ ┌─────────────────────────────────┐│
│ │ RESOURCES (100% width)          ││
│ │ [2 links]                       ││
│ └─────────────────────────────────┘│
│                                     │
│ ┌─────────────────────────────────┐│
│ │ STAY UPDATED! (100% width)      ││
│ │ [Form content]                  ││
│ └─────────────────────────────────┘│
│                                     │
│ SOCIAL SECTION (margin-top: 48px)
│ ┌─────────────────────────────────┐│
│ │ [F][T][I][G][D]               ││
│ │ [T][R][L][W][Y]               ││
│ │ (centered wrapping)            ││
│ └─────────────────────────────────┘│
│                                     │
│ COPYRIGHT (margin-top: 24px)
│ ┌─────────────────────────────────┐│
│ │ © 2025 Syscoin.              ││
│ │ All rights reserved            ││
│ └─────────────────────────────────┘│
│                                     │
└─────────────────────────────────────┘

PADDING BREAKDOWN:
  Top:    16px (from $space-lg)
  Bottom: 16px (from $space-lg)
  Left:   24px (from $space-lg → reduced to 16px on mobile)
  Right:  24px (from $space-lg → reduced to 16px on mobile)
```

---

## 8. Color Palette Visual Reference

```
PRIMARY ACCENT
┌──────────────┐
│ #FBB03B      │  Gold - Used for:
│              │  • Column titles (UPPERCASE)
│              │  • Subscribe button
│              │  • Link hover states
│              │  • Focus borders on inputs
└──────────────┘

SECONDARY ACCENT
┌──────────────┐
│ #1F5EFF      │  Blue - Used for:
│              │  • Social icon colors
│              │  • Social icon background (0.1 opacity)
│              │  • Social icon fill on hover
└──────────────┘

BACKGROUND
┌──────────────┐
│ #1A1A1A      │  Dark - Used for:
│              │  • Footer background
│              │  • Overall section color
└──────────────┘

TEXT COLORS
┌──────────────┐      ┌──────────────────┐
│ #FFFFFF      │      │ #FFF (0.7 opac)  │
│ Primary Text │      │ Secondary Text   │
│ (full opacity)       │ (tagline, footer)│
└──────────────┘      └──────────────────┘

BORDERS
┌──────────────┐
│ #2A2A2A      │  Dark Gray - Used for:
│              │  • Dividing lines
│              │  • Border top on footer
│              │  • Input borders
│              │  • Input focus borders
└──────────────┘
```

---

## 9. Typography Spacing

```
COLUMN TITLES (14px semi-bold uppercase)
┌─────────────────────────────────┐
│ SENTRYNODES                     │
│ (letter-spacing: 0.1em)         │
├─────────────────────────────────┤
│ margin-bottom: 24px ($space-lg) │
└─────────────────────────────────┘

BODY TEXT (14px regular)
┌─────────────────────────────────┐
│ About                           │
│ (line-height: 1.5)              │
├─────────────────────────────────┤
│ gap to next item: 16px          │
│ (padding: 12px vertical)        │
└─────────────────────────────────┘

TAGLINE (14px regular)
┌─────────────────────────────────┐
│ "Anchoring the final ledger     │
│  of Web3 with Bitcoin's         │
│  security and modular..."       │
│ (line-height: 1.6)              │
│ (color: white at 0.7 opacity)   │
│ (max-width: 500px)              │
└─────────────────────────────────┘

FORM PLACEHOLDER (14px regular)
┌─────────────────────────────────┐
│ youremail@example.com           │
│ (color: #666 at 0.5 opacity)    │
└─────────────────────────────────┘

BUTTON TEXT (14px semi-bold)
┌─────────────────────────────────┐
│ Subscribe now →                 │
│ (gap between text: 12px)        │
│ (arrow size: 18px)              │
└─────────────────────────────────┘
```

---

## 10. Interactive States

```
LINK DEFAULT → HOVER
┌─────────────────────────┐    ┌─────────────────────────┐
│ About                   │    │ About                   │
│ (white, 0.8 opacity)    │ →  │ (#FBB03B gold)          │
│ (border: transparent)   │    │ (border-bottom: gold)   │
│ (200ms transition)      │    │ (200ms transition)      │
└─────────────────────────┘    └─────────────────────────┘

SOCIAL ICON DEFAULT → HOVER
┌──────────────┐    ┌──────────────┐
│   [F]        │    │   [F]        │
│ bg: rgba(   │    │ bg: #1F5EFF  │
│   0.1)       │ →  │ (lift -2px)  │
│ color: blue  │    │ color: white │
└──────────────┘    └──────────────┘

BUTTON DEFAULT → HOVER
┌────────────────────────────┐    ┌────────────────────────────┐
│ Subscribe now →            │    │ Subscribe now →            │
│ bg: #FBB03B                │ →  │ bg: #FBB03B                │
│ (opacity: 1.0)             │    │ (opacity: 0.9)             │
│ (transform: none)          │    │ (transform: Y -2px)        │
│ (shadow: none)             │    │ (shadow: 0 4px 12px)       │
│                            │    │ (→ translateX 4px)         │
└────────────────────────────┘    └────────────────────────────┘

INPUT DEFAULT → FOCUS
┌────────────────────────────┐    ┌────────────────────────────┐
│ youremail@example.com      │    │ youremail@example.com      │
│ bg: rgba(white, 0.05)      │ →  │ bg: rgba(white, 0.1)       │
│ border: 1px #2A2A2A        │    │ border: 1px #FBB03B        │
│ (outline: none)            │    │ (outline: none - custom)   │
└────────────────────────────┘    └────────────────────────────┘
```

---

## 11. Breakpoint-Specific Measurements

```
DESKTOP (1920px - max)
├─ Content width: 1400px (max-width)
├─ Padding: 48px 24px
├─ Column gap: 32px
├─ Column 1: 300px fixed
├─ Columns 2-3: flex 1
├─ Social icons: Single row
└─ Status: Full layout

TABLET (1024px - 768px)
├─ Content width: 100% - 16px padding
├─ Padding: 32px 16px
├─ Column gap: 24px
├─ Columns: Stack vertically
├─ Social icons: Single row
├─ Header: Centered
└─ Status: Responsive

MOBILE (768px - 375px)
├─ Content width: 100% - 16px padding
├─ Padding: 24px 16px
├─ Column gap: 16px
├─ Columns: 100% width stacked
├─ Social icons: Wrap with 16px gap
├─ Form: Full width stacked
├─ Logo: 50px × 45px (smaller)
└─ Status: Mobile optimized
```

---

## 12. Element Dimensions Quick Reference

```
LOGO
  Desktop: 60px × 54px
  Mobile:  50px × 45px

ICONS (Social)
  Size: 40px × 40px
  Border Radius: 8px

FORM ELEMENTS
  Input Height: 40px
  Button Height: 40px
  Input Padding: 16px
  Button Padding: 16px (V) × 24px (H)
  Border Radius: 8px
  Gap (input-button): 12px

COLUMN 1
  Desktop: 300px (fixed)
  Mobile: 100% width

FOOTER MAX-WIDTH
  1400px (centered)

FOOTER PADDING
  Vertical: 48px (desktop), 24px (mobile)
  Horizontal: 24px (desktop), 16px (mobile)
```

---

## Summary

This visual reference provides:

1. **Desktop Layout** - Full 3-column structure with all spacing
2. **Vertical Spacing** - Complete breakdown of footer height
3. **Column Widths** - Flex distribution and fixed widths
4. **Link Spacing** - Item height and gap calculations
5. **Form Layout** - Desktop and mobile variations
6. **Social Icons** - Horizontal and wrapping layouts
7. **Mobile Layout** - Full vertical stacking
8. **Color Palette** - Visual hex values and usage
9. **Typography** - Font sizes and line heights
10. **Interactive States** - Hover and focus visuals
11. **Breakpoints** - Responsive measurements
12. **Quick Reference** - Element dimensions

All measurements are pixel-accurate and based on the design tokens defined in `_design-tokens.scss`.

