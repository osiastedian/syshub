# SentryNodes Design System

> A comprehensive design system for the SysHub application based on the SentryNodes Figma design.

## Quick Start

The design system is built on **SCSS design tokens** that serve as the single source of truth for all design properties. All components should use these tokens to maintain consistency.

### Key File
- **`src/scss/_design-tokens.scss`** - All design tokens (colors, typography, spacing, etc.)

### Import Design Tokens
In any SCSS file, import the design tokens:
```scss
@import "design-tokens.scss";
```

Then use the variables:
```scss
.my-element {
  background-color: $color-primary; // #FBB03B
  color: $color-text; // #FFFFFF
  padding: $space-md; // 16px
}
```

---

## Color System

### Brand Colors
- **Gold (Primary):** `#FBB03B` - Main action color
- **Blue (Secondary):** `#1F5EFF` - Accent and interactive elements
- **Orange (Tertiary):** `#F7931A` - Alternative accent

### Neutral Colors
- **Black:** `#0A0A0A` - Primary background
- **White:** `#FFFFFF` - Primary text
- **Dark BG:** `#1A1A1A` - Surface background
- **Gray (Medium):** `#666666` - Secondary text

### Status Colors
- **Success:** Light `#E0F5D6` / Dark `#1A2A1A` - Background
  - Text: `#52A929`
- **Error:** Light `#FDE7E7` / Dark `#2A1A1A` - Background
  - Text: `#F67676`
- **Warning:** Light `#FBEED6` / Dark `#2A2520` - Background
  - Text: `#D79D35`

### Using Colors
```scss
// Use semantic aliases for better maintainability
$color-primary: $color-brand-gold;      // Actions
$color-background: $color-neutral-black; // Main BG
$color-text: $color-neutral-white;       // Main text
```

---

## Typography

### Font Families
- **Headings:** `Sentry Slab LC` (serif)
- **Body:** `DM Sans` (sans-serif)
- **Monospace:** `Courier New` (code/technical)

### Font Sizes
| Token | Size | Usage |
|-------|------|-------|
| `$font-size-h1` | 48px | Main headings |
| `$font-size-h2` | 40px | Section headings |
| `$font-size-h3` | 32px | Subsection headings |
| `$font-size-body-large` | 18px | Large body text |
| `$font-size-body-medium` | 16px | Default body text |
| `$font-size-body-small` | 14px | Small body text |

### Typography Mixins
Use typography mixins to apply consistent styles:

```scss
// Apply H1 styling
.page-title {
  @include typography-h1;
}

// Apply body text styling
.description {
  @include typography-body-medium-regular;
}

// Apply semi-bold body
.important-text {
  @include typography-body-medium-semi-bold;
}
```

### Font Weights
- `$font-weight-light:` 300
- `$font-weight-regular:` 400
- `$font-weight-medium:` 500
- `$font-weight-semi-bold:` 600
- `$font-weight-bold:` 700

---

## Spacing

All spacing uses a consistent 4px base unit:

```scss
$space-2xs: 4px
$space-xs:  8px
$space-sm:  12px
$space-md:  16px   // Default
$space-lg:  24px
$space-xl:  32px
$space-2xl: 48px
$space-3xl: 64px
```

### Usage
```scss
.component {
  padding: $space-md;         // 16px
  margin-bottom: $space-lg;   // 24px
  gap: $space-sm;             // 12px
}
```

---

## Border Radius

Consistent rounding for different contexts:

```scss
$radius-none:  0       // Sharp corners
$radius-sm:    4px     // Subtle rounding
$radius-md:    8px     // Inputs, cards
$radius-lg:    12px    // Toasts, modals
$radius-xl:    16px    // Large elements
$radius-pill:  20px    // Pill buttons, toggles
$radius-full:  50%     // Circles
```

### Usage
```scss
.button {
  border-radius: $radius-pill; // 20px
}

.input {
  border-radius: $radius-md; // 8px
}
```

---

## Component Tokens

Pre-configured tokens for common components:

### Buttons
```scss
$button-height-default: 40px
$button-border-radius: 20px (pill)
$button-icon-size: 32px
```

### Inputs
```scss
$input-height: 40px
$input-border-radius: 8px
$input-border-color: $color-brand-blue (#1F5EFF)
$input-background: $color-surface (#1A1A1A)
```

### Navbar
```scss
$navbar-height: 64px
$navbar-background: $color-background (#0A0A0A)
$navbar-link-hover-color: $color-primary (#FBB03B)
```

### Toast
```scss
$toast-border-radius: 12px
$toast-icon-size: 32px
$toast-padding: 16px
```

---

## Transitions

Consistent animation timing:

```scss
$transition-fast:  150ms ease-in-out  // Quick feedback
$transition-base:  200ms ease-in-out  // Default
$transition-slow:  300ms ease-in-out  // Modal/overlay
```

### Usage
```scss
.button {
  transition: background-color $transition-base;

  &:hover {
    background-color: darken($color-primary, 10%);
  }
}
```

---

## Breakpoints

Mobile-first responsive design:

```scss
$breakpoint-xs:   0px     // Extra small (mobile)
$breakpoint-sm:   576px   // Small
$breakpoint-md:   768px   // Medium (tablet)
$breakpoint-lg:   992px   // Large
$breakpoint-xl:   1200px  // Extra large
$breakpoint-2xl:  1400px  // 2X extra large
```

### Usage with Mixins
```scss
@mixin media-sm {
  @media (min-width: $breakpoint-sm) { @content; }
}

.grid {
  display: grid;
  grid-template-columns: 1fr;

  @include media-md {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## Z-Index Scale

Predictable stacking contexts:

```scss
$z-dropdown: 100           // Dropdowns, popovers
$z-modal-backdrop: 1000    // Modal backdrops
$z-modal: 1010             // Modal dialogs
$z-tooltip: 1100           // Tooltips
```

---

## Component Guidelines

### 1. Always Use Design Tokens
❌ **Don't:** Hard-code values
```scss
.button {
  background-color: #FBB03B;
  padding: 16px;
  border-radius: 20px;
}
```

✅ **Do:** Use design tokens
```scss
.button {
  background-color: $color-primary;
  padding: $space-md;
  border-radius: $radius-pill;
}
```

### 2. Use Typography Mixins
❌ **Don't:** Repeat typography properties
```scss
.heading {
  font-family: 'Sentry Slab LC', serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
}
```

✅ **Do:** Use mixins
```scss
.heading {
  @include typography-h3;
}
```

### 3. Semantic Color Usage
Use semantic aliases instead of specific colors:
```scss
.element {
  background-color: $color-background;     // Not $color-neutral-black
  color: $color-text;                      // Not $color-neutral-white
  border-color: $color-border;             // Not $color-neutral-gray-dark
}
```

### 4. Responsive Design
Always start with mobile-first approach:
```scss
.grid {
  display: grid;
  grid-template-columns: 1fr;  // Mobile: single column

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);  // Tablet+: two columns
  }
}
```

---

## Design System Files

```
src/scss/
├── _design-tokens.scss    ← Design system foundation
├── _settings.scss         ← Bootstrap/global overrides
├── _mixins.scss          ← Utility functions
├── _btns.scss            ← Button component styles
├── _inputs.scss          ← Input/form field styles
├── _nav.scss             ← Navigation/navbar styles
├── _tables.scss          ← Table component styles
├── _modal.scss           ← Modal/dialog styles
├── _icons.scss           ← Icon styles
├── _article.scss         ← Content/article styles
├── _backgrounds.scss     ← Background utilities
├── _header.scss          ← Header component styles
└── styles.scss           ← Main stylesheet (imports all)
```

---

## Testing & Reference

### Homepage Reference
A reference screenshot is provided at `/homepage.png` for visual testing during development.

### Using Playwright for Testing
Set up visual regression tests with Playwright:
```javascript
// tests/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage matches design system', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check colors
  const button = await page.locator('.btn-primary');
  const bgColor = await button.evaluate((el) =>
    window.getComputedStyle(el).backgroundColor
  );
  expect(bgColor).toBe('rgb(251, 176, 59)'); // #FBB03B
});
```

---

## Maintenance

### Adding New Tokens
1. Add to `_design-tokens.scss` in the appropriate section
2. Use a consistent naming convention: `$category-element-state`
3. Document the token with comments
4. Update this document with new tokens

### Updating Existing Tokens
1. Update the value in `_design-tokens.scss`
2. All components using the token automatically update
3. No need to hunt down hard-coded values

### Deprecating Tokens
1. Add `@deprecated` comment in `_design-tokens.scss`
2. Update components to use new token
3. Remove token after all usages updated

---

## Resources

- **Figma Design:** https://www.figma.com/design/azvuitP9PvixRa2SM1sLXj/SentryNodes
- **Homepage Reference:** `/homepage.png`
- **Design Plan:** `/REDESIGN_PLAN.md`
- **AGENTS.md:** `/AGENTS.md` (Project architecture)

---

**Last Updated:** 2025-10-29
**Version:** 1.0.0
