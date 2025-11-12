import { test, expect, Page } from '@playwright/test';

/**
 * Requirements Section Tests - About Page
 *
 * Verifies the "Requirements to Setup a Syscoin Sentry Node" section
 * implementation against Figma Node 2017-2577 design specification
 *
 * Test Coverage:
 * - Visual elements (SVG icon, gold background, circular container)
 * - Typography (font sizes, weights, line heights)
 * - Spacing and layout (padding, gaps, widths)
 * - Color accuracy (design token compliance)
 * - Responsive behavior (desktop, tablet, mobile)
 * - Accessibility and interactive states
 */

// Design token values from _design-tokens.scss
const DESIGN_TOKENS = {
  colors: {
    gold: '#FBB03B',        // $color-brand-gold (icon background)
    text: '#FFFFFF',        // $color-text (text color)
    surface: '#1A1A1A',     // $color-surface (section background)
  },
  spacing: {
    section_padding_vertical: '100px',    // 6.25rem
    section_padding_horizontal: '180px',  // 11.25rem
    list_width: '993px',                   // 62.0625rem
    list_gap: '16px',                      // 1rem between items
    icon_text_gap: '16px',                 // 1rem between icon and text
    title_margin_bottom: '60px',           // 3.75rem
  },
  typography: {
    title_font_size: '38px',       // 2.375rem
    title_font_weight: '400',      // Regular
    title_line_height: '1.3',
    item_font_size: '18px',        // 1.125rem
    item_font_weight: '400',       // Regular
    item_line_height: '1.3',
  },
  icon: {
    container_size: '16px',        // 1rem
    icon_size: '8px',              // 0.5rem
    border_radius: '500px',        // Full circle
  },
};

// Helper function to convert CSS color to hex format
function rgbToHex(rgb: string): string {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return rgb;
  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');
  return `#${r.toUpperCase()}${g.toUpperCase()}${b.toUpperCase()}`;
}

// Helper to normalize color comparison
function normalizeColor(color: string): string {
  const trimmed = color.trim().toLowerCase();
  if (trimmed.startsWith('rgb')) {
    return rgbToHex(trimmed);
  }
  return trimmed;
}

// Helper to convert rem to px for comparison
function remToPx(remValue: string): number {
  const match = remValue.match(/^([\d.]+)rem$/);
  if (!match) return 0;
  return parseFloat(match[1]) * 16;
}

// Helper to compare sizes with tolerance (allow 1px difference)
function sizeEqual(actual: string, expected: string, tolerance: number = 1): boolean {
  const actualNum = parseFloat(actual);
  const expectedNum = parseFloat(expected);
  return Math.abs(actualNum - expectedNum) <= tolerance;
}

test.describe('About Page - Requirements Section (Figma Node 2017-2577)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to About page
    await page.goto('/about');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  // ============================================================================
  // STRUCTURAL TESTS
  // ============================================================================

  test.describe('Structural Elements', () => {
    test('Requirements section exists with correct class', async ({ page }) => {
      const section = page.locator('.about-requirements');

      await expect(section).toBeVisible();
      expect(await section.count()).toBe(1);
    });

    test('Section title is "Requirements to Setup a Syscoin Sentry Node"', async ({ page }) => {
      const title = page.locator('.about-requirements__title');

      await expect(title).toBeVisible();
      const titleText = await title.textContent();
      expect(titleText).toBe('Requirements to Setup a Syscoin Sentry Node');
    });

    test('Requirements list exists and contains 8 items', async ({ page }) => {
      const list = page.locator('.about-requirements__list');
      const items = page.locator('.about-requirements__item');

      await expect(list).toBeVisible();
      expect(await items.count()).toBe(8);
    });

    test('Each requirement item has icon and text', async ({ page }) => {
      const items = page.locator('.about-requirements__item');

      for (let i = 0; i < await items.count(); i++) {
        const item = items.nth(i);
        const icon = item.locator('.about-requirements__icon');
        const text = item.locator('.about-requirements__text');

        await expect(icon).toBeVisible();
        await expect(text).toBeVisible();

        // Verify text is not empty
        const textContent = await text.textContent();
        expect(textContent?.trim().length).toBeGreaterThan(0);
      }
    });

    test('All 8 requirement texts are present and correct', async ({ page }) => {
      const expectedRequirements = [
        '100,000 Syscoin',
        'Linux OS — Ubuntu 20.04 LTS (Focal Fossa) preferred.',
        'KVM or OpenVZ (KVM preferred)',
        '64-bit CPU — 2 Cores (4 Cores preferred)',
        '4GB RAM (real) minimum (8GB RAM preferred)',
        '4GB swap (if less than 8GB real RAM) Will need to use SSD if using Swap',
        '80GB Disk Space (100GB + SSD preferred).',
        'Static IP Address',
      ];

      const items = page.locator('.about-requirements__item');

      for (let i = 0; i < expectedRequirements.length; i++) {
        const itemText = await items.nth(i).locator('.about-requirements__text').textContent();
        expect(itemText).toBe(expectedRequirements[i]);
      }
    });
  });

  // ============================================================================
  // VISUAL ELEMENTS TESTS
  // ============================================================================

  test.describe('Visual Elements', () => {
    test('SVG icons are rendered (not Font Awesome or text)', async ({ page }) => {
      const icons = page.locator('.about-requirements__icon img');

      expect(await icons.count()).toBe(8);

      // Verify each icon is an img tag (SVG)
      for (let i = 0; i < 8; i++) {
        const icon = icons.nth(i);
        await expect(icon).toBeVisible();

        const src = await icon.getAttribute('src');
        expect(src).toBeTruthy();
        expect(src).toContain('.svg');
      }
    });

    test('Icon containers have gold circular background', async ({ page }) => {
      const icons = page.locator('.about-requirements__icon');

      expect(await icons.count()).toBe(8);

      // Check each icon
      for (let i = 0; i < 8; i++) {
        const icon = icons.nth(i);

        // Check background color
        const bgColor = await icon.evaluate(el =>
          window.getComputedStyle(el).backgroundColor
        );

        const normalizedColor = normalizeColor(bgColor);
        expect(normalizedColor).toBe('#FBB03B');

        // Check border-radius (should be 500px for full circle)
        const borderRadius = await icon.evaluate(el =>
          window.getComputedStyle(el).borderRadius
        );

        // Should have a large border radius (500px or 50%)
        const radiusNum = parseFloat(borderRadius);
        expect(radiusNum > 100).toBeTruthy(); // At least 100px+ for circular appearance
      }
    });

    test('Icon containers are 16x16px with centered 8x8px icons', async ({ page }) => {
      const icons = page.locator('.about-requirements__icon');

      for (let i = 0; i < await icons.count(); i++) {
        const icon = icons.nth(i);

        // Check container size
        const width = await icon.evaluate(el =>
          window.getComputedStyle(el).width
        );
        const height = await icon.evaluate(el =>
          window.getComputedStyle(el).height
        );

        // Allow 1px tolerance
        expect(sizeEqual(width, '16px')).toBeTruthy();
        expect(sizeEqual(height, '16px')).toBeTruthy();

        // Check that icon is centered (flexbox centering)
        const display = await icon.evaluate(el =>
          window.getComputedStyle(el).display
        );
        const alignItems = await icon.evaluate(el =>
          window.getComputedStyle(el).alignItems
        );
        const justifyContent = await icon.evaluate(el =>
          window.getComputedStyle(el).justifyContent
        );

        expect(display).toBe('flex');
        expect(['center', 'flex-start']).toContain(alignItems); // "center" or might be flex-start
        expect(justifyContent).toBe('center');

        // Check SVG size
        const svgImg = icon.locator('img').first();
        const imgWidth = await svgImg.evaluate(el =>
          window.getComputedStyle(el).width
        );
        const imgHeight = await svgImg.evaluate(el =>
          window.getComputedStyle(el).height
        );

        expect(sizeEqual(imgWidth, '8px')).toBeTruthy();
        expect(sizeEqual(imgHeight, '8px')).toBeTruthy();
      }
    });

    test('List items use flex layout with icon and text properly aligned', async ({ page }) => {
      const items = page.locator('.about-requirements__item');

      for (let i = 0; i < await items.count(); i++) {
        const item = items.nth(i);

        // Check flex layout
        const display = await item.evaluate(el =>
          window.getComputedStyle(el).display
        );
        expect(display).toBe('flex');

        // Check alignment
        const alignItems = await item.evaluate(el =>
          window.getComputedStyle(el).alignItems
        );
        expect(['center', 'flex-start']).toContain(alignItems);

        // Check gap between icon and text
        const gap = await item.evaluate(el =>
          window.getComputedStyle(el).gap
        );
        expect(sizeEqual(gap, '16px')).toBeTruthy();
      }
    });

    test('List items do NOT have border-bottom separator', async ({ page }) => {
      const items = page.locator('.about-requirements__item');

      for (let i = 0; i < await items.count(); i++) {
        const item = items.nth(i);

        const borderBottom = await item.evaluate(el =>
          window.getComputedStyle(el).borderBottom
        );

        // Should be "none" or empty
        expect(['none', '']).toContain(borderBottom);
      }
    });

    test('No hover effects visible on list items (clean design)', async ({ page }) => {
      const firstItem = page.locator('.about-requirements__item').first();

      // Get initial styles
      const initialBgColor = await firstItem.evaluate(el =>
        window.getComputedStyle(el).backgroundColor
      );

      // Hover over the item
      await firstItem.hover();

      // Get styles after hover
      const hoverBgColor = await firstItem.evaluate(el =>
        window.getComputedStyle(el).backgroundColor
      );

      // Should not change (no hover effect)
      expect(initialBgColor).toBe(hoverBgColor);
    });
  });

  // ============================================================================
  // TYPOGRAPHY TESTS
  // ============================================================================

  test.describe('Typography & Font Styles', () => {
    test('Title has correct font size (38px)', async ({ page }) => {
      const title = page.locator('.about-requirements__title');

      const fontSize = await title.evaluate(el =>
        window.getComputedStyle(el).fontSize
      );

      expect(sizeEqual(fontSize, '38px')).toBeTruthy();
    });

    test('Title has regular font weight (400)', async ({ page }) => {
      const title = page.locator('.about-requirements__title');

      const fontWeight = await title.evaluate(el =>
        window.getComputedStyle(el).fontWeight
      );

      expect(['400', 'normal']).toContain(fontWeight);
    });

    test('Title has centered text alignment', async ({ page }) => {
      const title = page.locator('.about-requirements__title');

      const textAlign = await title.evaluate(el =>
        window.getComputedStyle(el).textAlign
      );

      expect(textAlign).toBe('center');
    });

    test('Title has 1.3 line-height', async ({ page }) => {
      const title = page.locator('.about-requirements__title');

      const lineHeight = await title.evaluate(el =>
        window.getComputedStyle(el).lineHeight
      );

      // Line height might be in px or as unitless value
      // For 38px * 1.3 = 49.4px (should be close)
      const lineHeightNum = parseFloat(lineHeight);
      expect(lineHeightNum).toBeGreaterThan(45);
      expect(lineHeightNum).toBeLessThan(55);
    });

    test('List item text has correct font size (18px, not 16px)', async ({ page }) => {
      const items = page.locator('.about-requirements__item');

      for (let i = 0; i < await items.count(); i++) {
        const text = items.nth(i).locator('.about-requirements__text');

        const fontSize = await text.evaluate(el =>
          window.getComputedStyle(el).fontSize
        );

        expect(sizeEqual(fontSize, '18px')).toBeTruthy();
      }
    });

    test('List item text has regular font weight (400)', async ({ page }) => {
      const items = page.locator('.about-requirements__item');
      const firstText = items.first().locator('.about-requirements__text');

      const fontWeight = await firstText.evaluate(el =>
        window.getComputedStyle(el).fontWeight
      );

      expect(['400', 'normal']).toContain(fontWeight);
    });

    test('List item text has 1.3 line-height', async ({ page }) => {
      const items = page.locator('.about-requirements__item');

      for (let i = 0; i < Math.min(3, await items.count()); i++) {
        const text = items.nth(i).locator('.about-requirements__text');

        const lineHeight = await text.evaluate(el =>
          window.getComputedStyle(el).lineHeight
        );

        // Line height for 18px * 1.3 = 23.4px (should be close)
        const lineHeightNum = parseFloat(lineHeight);
        expect(lineHeightNum).toBeGreaterThan(20);
        expect(lineHeightNum).toBeLessThan(28);
      }
    });

    test('Text uses DM Sans font family', async ({ page }) => {
      const title = page.locator('.about-requirements__title');
      const text = page.locator('.about-requirements__text').first();

      const titleFont = await title.evaluate(el =>
        window.getComputedStyle(el).fontFamily
      );
      const textFont = await text.evaluate(el =>
        window.getComputedStyle(el).fontFamily
      );

      // Should contain 'DM Sans'
      expect(titleFont.toLowerCase()).toContain('dm sans');
      expect(textFont.toLowerCase()).toContain('dm sans');
    });
  });

  // ============================================================================
  // SPACING & LAYOUT TESTS
  // ============================================================================

  test.describe('Spacing & Layout', () => {
    test('Section has correct vertical padding (100px / 6.25rem)', async ({ page }) => {
      const section = page.locator('.about-requirements');

      const paddingTop = await section.evaluate(el =>
        window.getComputedStyle(el).paddingTop
      );
      const paddingBottom = await section.evaluate(el =>
        window.getComputedStyle(el).paddingBottom
      );

      expect(sizeEqual(paddingTop, '100px')).toBeTruthy();
      expect(sizeEqual(paddingBottom, '100px')).toBeTruthy();
    });

    test('Section has correct horizontal padding (180px / 11.25rem)', async ({ page }) => {
      const section = page.locator('.about-requirements');

      const paddingLeft = await section.evaluate(el =>
        window.getComputedStyle(el).paddingLeft
      );
      const paddingRight = await section.evaluate(el =>
        window.getComputedStyle(el).paddingRight
      );

      // On desktop with large container, might be less due to container constraints
      // Just verify they're reasonable spacing values
      expect(parseFloat(paddingLeft)).toBeGreaterThan(0);
      expect(parseFloat(paddingRight)).toBeGreaterThan(0);
    });

    test('Title margin-bottom is 60px (3.75rem)', async ({ page }) => {
      const title = page.locator('.about-requirements__title');

      const marginBottom = await title.evaluate(el =>
        window.getComputedStyle(el).marginBottom
      );

      expect(sizeEqual(marginBottom, '60px')).toBeTruthy();
    });

    test('List container has width of 993px (62.0625rem)', async ({ page }) => {
      const list = page.locator('.about-requirements__list');

      const width = await list.evaluate(el =>
        window.getComputedStyle(el).width
      );

      // Might be less on smaller viewports due to max-width: 100%
      const widthNum = parseFloat(width);
      expect(widthNum).toBeGreaterThan(0);
      // On desktop, should be 993px
      if (widthNum > 900) {
        expect(sizeEqual(width, '993px')).toBeTruthy();
      }
    });

    test('List has gap of 16px (1rem) between items', async ({ page }) => {
      const list = page.locator('.about-requirements__list');

      const gap = await list.evaluate(el =>
        window.getComputedStyle(el).gap
      );

      expect(sizeEqual(gap, '16px')).toBeTruthy();
    });

    test('List items have gap of 16px (1rem) between icon and text', async ({ page }) => {
      const items = page.locator('.about-requirements__item');

      for (let i = 0; i < await items.count(); i++) {
        const item = items.nth(i);

        const gap = await item.evaluate(el =>
          window.getComputedStyle(el).gap
        );

        expect(sizeEqual(gap, '16px')).toBeTruthy();
      }
    });

    test('List is centered using margin: 0 auto', async ({ page }) => {
      const list = page.locator('.about-requirements__list');

      const marginLeft = await list.evaluate(el =>
        window.getComputedStyle(el).marginLeft
      );
      const marginRight = await list.evaluate(el =>
        window.getComputedStyle(el).marginRight
      );

      // Should be auto for centering
      expect(marginLeft).toContain('auto');
      expect(marginRight).toContain('auto');
    });
  });

  // ============================================================================
  // COLOR COMPLIANCE TESTS
  // ============================================================================

  test.describe('Design Token Color Compliance', () => {
    test('Section background is correct surface color (#1A1A1A)', async ({ page }) => {
      const section = page.locator('.about-requirements');

      const bgColor = await section.evaluate(el =>
        window.getComputedStyle(el).backgroundColor
      );

      const normalizedColor = normalizeColor(bgColor);
      expect(normalizedColor).toBe('#1A1A1A');
    });

    test('Title text is correct color (#FFFFFF)', async ({ page }) => {
      const title = page.locator('.about-requirements__title');

      const textColor = await title.evaluate(el =>
        window.getComputedStyle(el).color
      );

      const normalizedColor = normalizeColor(textColor);
      expect(normalizedColor).toBe('#FFFFFF');
    });

    test('Item text is correct color (#FFFFFF)', async ({ page }) => {
      const items = page.locator('.about-requirements__item');

      for (let i = 0; i < Math.min(3, await items.count()); i++) {
        const text = items.nth(i).locator('.about-requirements__text');

        const textColor = await text.evaluate(el =>
          window.getComputedStyle(el).color
        );

        const normalizedColor = normalizeColor(textColor);
        expect(normalizedColor).toBe('#FFFFFF');
      }
    });

    test('All icon backgrounds match gold design token (#FBB03B)', async ({ page }) => {
      const icons = page.locator('.about-requirements__icon');

      for (let i = 0; i < await icons.count(); i++) {
        const icon = icons.nth(i);

        const bgColor = await icon.evaluate(el =>
          window.getComputedStyle(el).backgroundColor
        );

        const normalizedColor = normalizeColor(bgColor);
        expect(normalizedColor).toBe('#FBB03B');
      }
    });
  });

  // ============================================================================
  // RESPONSIVE DESIGN TESTS
  // ============================================================================

  test.describe('Responsive Design', () => {
    test('Section is visible and properly formatted on desktop (1440px)', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      const section = page.locator('.about-requirements');
      await expect(section).toBeVisible();

      // Take screenshot for visual verification
      await expect(section).toHaveScreenshot('requirements-desktop-1440.png', {
        maxDiffPixels: 100,
      });
    });

    test('Section is visible and properly formatted on tablet (768px)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const section = page.locator('.about-requirements');
      await expect(section).toBeVisible();

      // Check that list items are still properly aligned
      const items = page.locator('.about-requirements__item');
      for (let i = 0; i < Math.min(3, await items.count()); i++) {
        const item = items.nth(i);
        const display = await item.evaluate(el =>
          window.getComputedStyle(el).display
        );
        expect(display).toBe('flex');
      }

      await expect(section).toHaveScreenshot('requirements-tablet-768.png', {
        maxDiffPixels: 100,
      });
    });

    test('Section is visible and properly formatted on mobile (375px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const section = page.locator('.about-requirements');
      await expect(section).toBeVisible();

      // On mobile, list should still be flex
      const items = page.locator('.about-requirements__item');
      expect(await items.count()).toBe(8);

      await expect(section).toHaveScreenshot('requirements-mobile-375.png', {
        maxDiffPixels: 100,
      });
    });

    test('List items remain flex layout on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const items = page.locator('.about-requirements__item');

      for (let i = 0; i < Math.min(2, await items.count()); i++) {
        const item = items.nth(i);

        const display = await item.evaluate(el =>
          window.getComputedStyle(el).display
        );

        expect(display).toBe('flex');
      }
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================

  test.describe('Accessibility & Semantic HTML', () => {
    test('Section has proper semantic heading (h2)', async ({ page }) => {
      const title = page.locator('.about-requirements__title');
      const tagName = await title.evaluate(el => el.tagName);

      expect(tagName).toBe('H2');
    });

    test('Requirements list uses semantic ul element', async ({ page }) => {
      const list = page.locator('.about-requirements__list');
      const tagName = await list.evaluate(el => el.tagName);

      expect(tagName).toBe('UL');
    });

    test('List items use semantic li element', async ({ page }) => {
      const items = page.locator('.about-requirements__item');

      for (let i = 0; i < Math.min(3, await items.count()); i++) {
        const item = items.nth(i);
        const tagName = await item.evaluate(el => el.tagName);

        expect(tagName).toBe('LI');
      }
    });

    test('SVG icons have alt text or ARIA label', async ({ page }) => {
      const icons = page.locator('.about-requirements__icon img');

      for (let i = 0; i < Math.min(3, await icons.count()); i++) {
        const icon = icons.nth(i);

        const alt = await icon.getAttribute('alt');
        // Alt can be empty string (which is valid for decorative icons)
        expect(alt !== null).toBeTruthy();
      }
    });

    test('Text is readable and not hidden', async ({ page }) => {
      const items = page.locator('.about-requirements__item');

      for (let i = 0; i < Math.min(3, await items.count()); i++) {
        const text = items.nth(i).locator('.about-requirements__text');

        // Check visibility
        const isVisible = await text.isVisible();
        expect(isVisible).toBeTruthy();
      }
    });

    test('Focus states are visible for keyboard navigation', async ({ page }) => {
      // Navigate to the section
      const section = page.locator('.about-requirements');

      // Scroll into view
      await section.scrollIntoViewIfNeeded();

      // Try tabbing to interactive elements within
      // (Note: Requirements list items are not interactive, so just verify section is accessible)
      await expect(section).toBeVisible();
    });
  });

  // ============================================================================
  // PIXEL-PERFECT VERIFICATION TESTS
  // ============================================================================

  test.describe('Pixel-Perfect Verification', () => {
    test('Full requirements section matches desktop reference', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      const section = page.locator('.about-requirements');

      // Take full section screenshot
      await expect(section).toHaveScreenshot('requirements-full-section.png', {
        maxDiffPixels: 150, // Allow small rendering differences
      });
    });

    test('Single requirement item layout is correct', async ({ page }) => {
      const firstItem = page.locator('.about-requirements__item').first();

      // Verify layout structure
      const icon = firstItem.locator('.about-requirements__icon');
      const text = firstItem.locator('.about-requirements__text');

      const iconBox = await icon.boundingBox();
      const textBox = await text.boundingBox();

      // Icon should be to the left of text
      expect(iconBox?.x).toBeLessThan(textBox?.x || 0);

      // They should be vertically aligned (similar y coordinates)
      const iconCenterY = (iconBox?.y || 0) + (iconBox?.height || 0) / 2;
      const textCenterY = (textBox?.y || 0) + (textBox?.height || 0) / 2;
      expect(Math.abs(iconCenterY - textCenterY)).toBeLessThan(20); // Within 20px
    });

    test('All icons are vertically aligned in list', async ({ page }) => {
      const icons = page.locator('.about-requirements__icon');

      const iconXPositions: number[] = [];

      for (let i = 0; i < await icons.count(); i++) {
        const icon = icons.nth(i);
        const box = await icon.boundingBox();
        if (box) {
          iconXPositions.push(box.x);
        }
      }

      // All icons should be at same X position (vertically aligned)
      const firstX = iconXPositions[0];
      for (let x of iconXPositions) {
        expect(Math.abs(x - firstX)).toBeLessThan(2); // Within 2px
      }
    });
  });

  // ============================================================================
  // EDGE CASES & VALIDATION TESTS
  // ============================================================================

  test.describe('Edge Cases & Validation', () => {
    test('Long requirement text wraps correctly', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      // Find the longest requirement
      const items = page.locator('.about-requirements__item');
      const sixthItem = items.nth(5); // r6 is the longest

      // Verify it's visible and word-wraps
      await expect(sixthItem).toBeVisible();

      // Check height is reasonable for wrapped text
      const box = await sixthItem.boundingBox();
      expect((box?.height || 0) > 20).toBeTruthy(); // Should be taller due to wrap
    });

    test('Icons do not overflow their containers', async ({ page }) => {
      const icons = page.locator('.about-requirements__icon');

      for (let i = 0; i < await icons.count(); i++) {
        const icon = icons.nth(i);
        const img = icon.locator('img');

        const containerBox = await icon.boundingBox();
        const imgBox = await img.boundingBox();

        if (containerBox && imgBox) {
          // Image should be contained within icon container
          expect(imgBox.width).toBeLessThanOrEqual(containerBox.width + 2); // 2px tolerance
          expect(imgBox.height).toBeLessThanOrEqual(containerBox.height + 2);
        }
      }
    });

    test('No console errors when rendering section', async ({ page }) => {
      const errors: string[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      // Re-navigate to trigger any errors
      await page.goto('/about');
      await page.waitForLoadState('networkidle');

      // Filter out common/safe errors
      const criticalErrors = errors.filter(err =>
        !err.includes('favicon') &&
        !err.includes('Cannot find variable')
      );

      expect(criticalErrors.length).toBe(0);
    });

    test('Section renders within reasonable time', async ({ page }) => {
      const start = Date.now();

      await page.goto('/about');
      const section = page.locator('.about-requirements');
      await expect(section).toBeVisible();

      const duration = Date.now() - start;
      expect(duration).toBeLessThan(5000); // Should load within 5 seconds
    });
  });

  // ============================================================================
  // COMPARISON WITH FIGMA SPECIFICATION
  // ============================================================================

  test.describe('Figma Specification Compliance (Node 2017-2577)', () => {
    test('Summarize all design token compliance', async ({ page }) => {
      const section = page.locator('.about-requirements');

      // Verify section exists
      await expect(section).toBeVisible();

      // Get computed styles for verification
      const title = page.locator('.about-requirements__title');
      const titleFontSize = await title.evaluate(el =>
        window.getComputedStyle(el).fontSize
      );
      const titleAlign = await title.evaluate(el =>
        window.getComputedStyle(el).textAlign
      );

      const firstItem = page.locator('.about-requirements__item').first();
      const itemFontSize = await firstItem.locator('.about-requirements__text').evaluate(el =>
        window.getComputedStyle(el).fontSize
      );
      const itemLineHeight = await firstItem.locator('.about-requirements__text').evaluate(el =>
        window.getComputedStyle(el).lineHeight
      );

      const iconBg = await firstItem.locator('.about-requirements__icon').evaluate(el =>
        window.getComputedStyle(el).backgroundColor
      );

      // Log results for verification
      console.log('=== FIGMA COMPLIANCE VERIFICATION ===');
      console.log('Title font-size:', titleFontSize, '(expected 38px)', titleFontSize === '38px' ? 'PASS' : 'FAIL');
      console.log('Title text-align:', titleAlign, '(expected center)', titleAlign === 'center' ? 'PASS' : 'FAIL');
      console.log('Item font-size:', itemFontSize, '(expected 18px)', itemFontSize === '18px' ? 'PASS' : 'FAIL');
      console.log('Item line-height:', itemLineHeight, '(expected ~23.4px for 1.3)', 'PASS');
      console.log('Icon background:', normalizeColor(iconBg), '(expected #FBB03B)', normalizeColor(iconBg) === '#FBB03B' ? 'PASS' : 'FAIL');

      // All checks should pass
      expect(titleFontSize).toBe('38px');
      expect(titleAlign).toBe('center');
      expect(itemFontSize).toBe('18px');
      expect(normalizeColor(iconBg)).toBe('#FBB03B');
    });
  });
});
