import { test, expect, Page } from '@playwright/test';

// Design token values (from _design-tokens.scss)
const DESIGN_TOKENS = {
  colors: {
    primary: '#FBB03B',           // $color-primary (gold)
    secondary: '#1F5EFF',         // $color-secondary (blue)
    black: '#0A0A0A',             // $color-neutral-black
    surfaceDark: '#1A1A1A',       // $color-neutral-dark-bg
    white: '#FFFFFF',             // $color-neutral-white
    grayDark: '#2A2A2A',          // $color-neutral-gray-dark
    grayMedium: '#666666',        // $color-neutral-gray-medium
    grayLight: '#CCCCCC',         // $color-neutral-gray-light
  },
  spacing: {
    '2xs': '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  radius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    pill: '20px',
    full: '50%',
  },
};

// Helper function to convert CSS color to hex format
function rgbToHex(rgb: string): string {
  const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
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

test.describe('Footer Component - Design Token Compliance & Structure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Wait for footer to be visible
    await page.locator('footer').waitFor({ state: 'visible' });
  });

  // ============================================================================
  // FOOTER STRUCTURE & LAYOUT TESTS
  // ============================================================================

  test.describe('Footer Structure', () => {
    test('footer element exists and is visible', async ({ page }) => {
      const footer = page.locator('footer');
      expect(await footer.count()).toBeGreaterThan(0);
      await expect(footer).toBeVisible();
    });

    test('footer has logo and tagline section', async ({ page }) => {
      const header = page.locator('.footer__header');
      expect(await header.count()).toBeGreaterThan(0);
      await expect(header).toBeVisible();
    });

    test('footer logo is present and visible', async ({ page }) => {
      const logo = page.locator('.footer__header .footer__logo');
      expect(await logo.count()).toBeGreaterThan(0);
      await expect(logo).toBeVisible();
    });

    test('footer tagline is present with correct text', async ({ page }) => {
      const tagline = page.locator('.footer__tagline');
      expect(await tagline.count()).toBeGreaterThan(0);
      await expect(tagline).toBeVisible();

      const text = await tagline.textContent();
      expect(text).toContain('Anchoring the final ledger of Web3');
    });

    test('footer has 3-column layout section', async ({ page }) => {
      const inner = page.locator('.footer__inner');
      expect(await inner.count()).toBeGreaterThan(0);
      await expect(inner).toBeVisible();

      // Should have exactly 3 columns
      const columns = inner.locator('.footer__column');
      expect(await columns.count()).toBe(3);
    });

    test('footer has social media section', async ({ page }) => {
      const social = page.locator('.footer__social-section');
      expect(await social.count()).toBeGreaterThan(0);
      await expect(social).toBeVisible();
    });

    test('footer has copyright section', async ({ page }) => {
      const bottom = page.locator('.footer__bottom');
      expect(await bottom.count()).toBeGreaterThan(0);
      await expect(bottom).toBeVisible();

      const copyright = page.locator('.footer__copyright');
      const text = await copyright.textContent();
      expect(text).toContain('Syscoin');
      expect(text).toContain('All rights reserved');
    });
  });

  // ============================================================================
  // FOOTER CONTENT TESTS
  // ============================================================================

  test.describe('Footer Content Verification', () => {
    test('SENTRYNODES column exists with correct title', async ({ page }) => {
      const column = page.locator('.footer__column').first();
      const title = column.locator('.footer__column-title');
      await expect(title).toHaveText('SENTRYNODES');
    });

    test('SENTRYNODES column has all required links', async ({ page }) => {
      const column = page.locator('.footer__column').first();
      const links = column.locator('.footer__link a');

      expect(await links.count()).toBe(5); // About, Stats, Setup, Governance, SentryNode

      // Verify link text
      const texts = await links.allTextContents();
      expect(texts).toContain('About');
      expect(texts).toContain('Stats');
      expect(texts).toContain('Setup');
      expect(texts).toContain('Governance');
      expect(texts).toContain('SentryNode');
    });

    test('RESOURCES column exists with correct title', async ({ page }) => {
      const columns = page.locator('.footer__column');
      const column = columns.nth(1);
      const title = column.locator('.footer__column-title');
      await expect(title).toHaveText('RESOURCES');
    });

    test('RESOURCES column shows FAQ instead of News', async ({ page }) => {
      const columns = page.locator('.footer__column');
      const column = columns.nth(1);
      const links = column.locator('.footer__link a');

      expect(await links.count()).toBe(2); // FAQ, Support

      // Verify that FAQ is the first link
      const firstLink = links.first();
      await expect(firstLink).toHaveText('FAQ');

      // Verify Support is the second link
      const secondLink = links.nth(1);
      await expect(secondLink).toHaveText('Support');

      // Ensure "News" is NOT present
      const allText = await column.textContent();
      expect(allText).not.toContain('News');
    });

    test('RESOURCES column has correct links', async ({ page }) => {
      const columns = page.locator('.footer__column');
      const column = columns.nth(1);
      const links = column.locator('.footer__link a');

      const texts = await links.allTextContents();
      expect(texts).toContain('FAQ');
      expect(texts).toContain('Support');
    });

    test('STAY UPDATED! column exists with correct title', async ({ page }) => {
      const columns = page.locator('.footer__column');
      const column = columns.nth(2);
      const title = column.locator('.footer__column-title');
      await expect(title).toHaveText('STAY UPDATED!');
    });

    test('STAY UPDATED! column has subscribe form with input and button', async ({ page }) => {
      const columns = page.locator('.footer__column');
      const column = columns.nth(2);

      const form = column.locator('.footer__subscribe-form');
      expect(await form.count()).toBeGreaterThan(0);

      const input = form.locator('input[type="email"]');
      expect(await input.count()).toBeGreaterThan(0);

      const button = form.locator('button[type="submit"]');
      expect(await button.count()).toBeGreaterThan(0);
      await expect(button).toContainText('Subscribe now');
    });

    test('STAY UPDATED! column has subscribe description text', async ({ page }) => {
      const columns = page.locator('.footer__column');
      const column = columns.nth(2);

      const text = column.locator('.footer__subscribe-text');
      expect(await text.count()).toBeGreaterThan(0);

      const content = await text.textContent();
      expect(content).toContain('Get the latest updates and news');
    });
  });

  // ============================================================================
  // VISUAL PROPERTIES & DESIGN TOKENS
  // ============================================================================

  test.describe('Visual Properties & Color Tokens', () => {
    test('footer background color matches design token', async ({ page }) => {
      const footer = page.locator('footer').first();
      const bgColor = await footer.evaluate(el =>
        window.getComputedStyle(el).backgroundColor
      );

      const hexColor = normalizeColor(bgColor);
      expect(hexColor).toBe(DESIGN_TOKENS.colors.surfaceDark);
    });

    test('footer column titles use primary color (gold)', async ({ page }) => {
      const titles = page.locator('.footer__column-title');
      const titleColor = await titles.first().evaluate(el =>
        window.getComputedStyle(el).color
      );

      const hexColor = normalizeColor(titleColor);
      expect(hexColor).toBe(DESIGN_TOKENS.colors.primary);
    });

    test('footer column titles are uppercase', async ({ page }) => {
      const title = page.locator('.footer__column-title').first();
      const textTransform = await title.evaluate(el =>
        window.getComputedStyle(el).textTransform
      );

      expect(textTransform).toBe('uppercase');
    });

    test('footer links have secondary text color', async ({ page }) => {
      const link = page.locator('.footer__link a').first();
      const color = await link.evaluate(el =>
        window.getComputedStyle(el).color
      );

      const hexColor = normalizeColor(color);
      // Footer links should be white or light colored
      expect(hexColor).toBe(DESIGN_TOKENS.colors.white);
    });

    test('social media icons use secondary color (blue)', async ({ page }) => {
      const icon = page.locator('.footer__social-section .socials li a').first();
      const color = await icon.evaluate(el =>
        window.getComputedStyle(el).color
      );

      const hexColor = normalizeColor(color);
      expect(hexColor).toBe(DESIGN_TOKENS.colors.secondary);
    });

    test('subscribe button uses primary color background', async ({ page }) => {
      const button = page.locator('.footer__subscribe-form button[type="submit"]');
      const bgColor = await button.evaluate(el =>
        window.getComputedStyle(el).backgroundColor
      );

      const hexColor = normalizeColor(bgColor);
      expect(hexColor).toBe(DESIGN_TOKENS.colors.primary);
    });

    test('subscribe input has blue border on focus', async ({ page }) => {
      const input = page.locator('.footer__subscribe-form input[type="email"]');

      // Focus the input
      await input.focus();

      // Get computed border color
      const borderColor = await input.evaluate(el =>
        window.getComputedStyle(el).borderColor
      );

      const hexColor = normalizeColor(borderColor);
      expect(hexColor).toBe(DESIGN_TOKENS.colors.secondary);
    });

    test('copyright text has reduced opacity (secondary text color)', async ({ page }) => {
      const copyright = page.locator('.footer__copyright');
      const color = await copyright.evaluate(el =>
        window.getComputedStyle(el).color
      );

      // Should be light gray or white with opacity
      const hexColor = normalizeColor(color);
      expect([DESIGN_TOKENS.colors.grayLight, DESIGN_TOKENS.colors.white]).toContain(hexColor);
    });
  });

  // ============================================================================
  // SPACING & DIMENSIONS
  // ============================================================================

  test.describe('Spacing & Dimensions', () => {
    test('footer has correct padding', async ({ page }) => {
      const footer = page.locator('footer').first();
      const padding = await footer.evaluate(el =>
        window.getComputedStyle(el).padding
      );

      // Should have padding (default is 48px for 2xl)
      expect(padding).not.toBe('0px');
    });

    test('footer logo has correct dimensions', async ({ page }) => {
      const logo = page.locator('.footer__logo').first();

      const width = await logo.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.width;
      });

      const height = await logo.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.height;
      });

      // Logo should be 60px x 54px
      expect(width).toBe('60px');
      expect(height).toBe('54px');
    });

    test('footer columns have equal flex distribution', async ({ page }) => {
      const columns = page.locator('.footer__column');
      const count = await columns.count();
      expect(count).toBe(3);
    });

    test('social icons have correct size', async ({ page }) => {
      const icon = page.locator('.footer__social-section .socials li a').first();

      const width = await icon.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.width;
      });

      const height = await icon.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.height;
      });

      // Icons should be 40x40px
      expect(width).toBe('40px');
      expect(height).toBe('40px');
    });
  });

  // ============================================================================
  // INTERACTIVE STATES
  // ============================================================================

  test.describe('Interactive States', () => {
    test('footer links change color on hover', async ({ page }) => {
      const link = page.locator('.footer__link a').first();

      // Get initial color
      const initialColor = await link.evaluate(el =>
        window.getComputedStyle(el).color
      );

      // Hover over link
      await link.hover();

      // Get hovered color (should be primary/gold)
      const hoveredColor = await link.evaluate(el =>
        window.getComputedStyle(el).color
      );

      // Verify color changed
      expect(initialColor).not.toBe(hoveredColor);

      const hexColor = normalizeColor(hoveredColor);
      expect(hexColor).toBe(DESIGN_TOKENS.colors.primary);
    });

    test('social icons change color on hover', async ({ page }) => {
      const icon = page.locator('.footer__social-section .socials li a').first();

      // Get initial color
      const initialColor = await icon.evaluate(el =>
        window.getComputedStyle(el).color
      );

      // Hover over icon
      await icon.hover();

      // Get hovered background
      const hoveredBg = await icon.evaluate(el =>
        window.getComputedStyle(el).backgroundColor
      );

      const hexColor = normalizeColor(hoveredBg);
      expect(hexColor).toBe(DESIGN_TOKENS.colors.secondary);
    });

    test('subscribe button changes on hover', async ({ page }) => {
      const button = page.locator('.footer__subscribe-form button[type="submit"]');

      // Hover over button
      await button.hover();

      // Button should have transition effect (opacity or shadow)
      const boxShadow = await button.evaluate(el =>
        window.getComputedStyle(el).boxShadow
      );

      // Should have some shadow effect on hover
      expect(boxShadow).not.toBe('none');
    });

    test('subscribe input shows focus state', async ({ page }) => {
      const input = page.locator('.footer__subscribe-form input[type="email"]');

      // Focus the input
      await input.focus();

      // Get border color (should be primary/blue)
      const borderColor = await input.evaluate(el =>
        window.getComputedStyle(el).borderColor
      );

      const hexColor = normalizeColor(borderColor);
      expect(hexColor).toBe(DESIGN_TOKENS.colors.secondary);
    });
  });

  // ============================================================================
  // RESPONSIVE BEHAVIOR
  // ============================================================================

  test.describe('Responsive Behavior', () => {
    test('footer is responsive on mobile viewports', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 812 });

      // Wait for footer to reflow
      await page.waitForTimeout(300);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      // On mobile, columns should stack
      const inner = page.locator('.footer__inner');
      const computedStyle = await inner.evaluate(el =>
        window.getComputedStyle(el).flexDirection
      );

      expect(computedStyle).toBe('column');
    });

    test('footer is responsive on tablet viewports', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });

      // Wait for footer to reflow
      await page.waitForTimeout(300);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    test('footer is responsive on desktop viewports', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Wait for footer to reflow
      await page.waitForTimeout(300);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      // On desktop, columns should be horizontal
      const inner = page.locator('.footer__inner');
      const computedStyle = await inner.evaluate(el =>
        window.getComputedStyle(el).flexDirection
      );

      expect(computedStyle).toBe('row');
    });
  });

  // ============================================================================
  // FOOTER LAYOUT ALIGNMENT
  // ============================================================================

  test.describe('Footer Layout Alignment', () => {
    test('footer container is centered with max-width', async ({ page }) => {
      const footer = page.locator('.footer').first();

      const maxWidth = await footer.evaluate(el =>
        window.getComputedStyle(el).maxWidth
      );

      // Should have max-width of 1400px
      expect(maxWidth).toBe('1400px');
    });

    test('footer inner columns are evenly distributed', async ({ page }) => {
      const columns = page.locator('.footer__column');

      // Verify all columns have flex properties
      for (let i = 0; i < await columns.count(); i++) {
        const flex = await columns.nth(i).evaluate(el =>
          window.getComputedStyle(el).flex
        );

        // Should have flex: 1 or similar flex property
        expect(flex).not.toBe('0 1 auto'); // Not the default
      }
    });

    test('footer has border dividers between sections', async ({ page }) => {
      const inner = page.locator('.footer__inner');

      const borderBottom = await inner.evaluate(el =>
        window.getComputedStyle(el).borderBottom
      );

      // Should have a border
      expect(borderBottom).toContain('solid');
      expect(borderBottom).toContain('1px');
    });

    test('social section has centered alignment', async ({ page }) => {
      const social = page.locator('.footer__social-section');

      const justifyContent = await social.evaluate(el =>
        window.getComputedStyle(el).justifyContent
      );

      expect(justifyContent).toBe('center');
    });

    test('footer bottom is centered', async ({ page }) => {
      const bottom = page.locator('.footer__bottom');

      const justifyContent = await bottom.evaluate(el =>
        window.getComputedStyle(el).justifyContent
      );

      expect(justifyContent).toBe('center');
    });
  });

  // ============================================================================
  // EMAIL INPUT VALIDATION
  // ============================================================================

  test.describe('Subscribe Form Validation', () => {
    test('email input has type="email"', async ({ page }) => {
      const input = page.locator('.footer__subscribe-form input');
      const type = await input.getAttribute('type');
      expect(type).toBe('email');
    });

    test('email input has placeholder text', async ({ page }) => {
      const input = page.locator('.footer__subscribe-form input');
      const placeholder = await input.getAttribute('placeholder');
      expect(placeholder).toBeTruthy();
      expect(placeholder).toContain('example.com');
    });

    test('email input is required', async ({ page }) => {
      const input = page.locator('.footer__subscribe-form input');
      const required = await input.getAttribute('required');
      expect(required).not.toBeNull();
    });

    test('subscribe button is clickable', async ({ page }) => {
      const button = page.locator('.footer__subscribe-form button[type="submit"]');
      await expect(button).toBeEnabled();
    });

    test('subscribe form has arrow icon in button', async ({ page }) => {
      const arrow = page.locator('.footer__subscribe-form button .arrow');
      expect(await arrow.count()).toBeGreaterThan(0);

      const text = await arrow.textContent();
      expect(text).toBe('→');
    });
  });

  // ============================================================================
  // VISUAL REGRESSION SCREENSHOTS
  // ============================================================================

  test.describe('Visual Regression Screenshots', () => {
    test('footer full page screenshot', async ({ page }) => {
      // Scroll to footer
      const footer = page.locator('footer');
      await footer.scrollIntoViewIfNeeded();

      // Take screenshot
      await expect(footer).toHaveScreenshot('footer-full.png', {
        maxDiffPixels: 100,
      });
    });

    test('footer header section screenshot', async ({ page }) => {
      const header = page.locator('.footer__header');
      await header.scrollIntoViewIfNeeded();

      await expect(header).toHaveScreenshot('footer-header.png', {
        maxDiffPixels: 50,
      });
    });

    test('footer columns section screenshot', async ({ page }) => {
      const columns = page.locator('.footer__inner');
      await columns.scrollIntoViewIfNeeded();

      await expect(columns).toHaveScreenshot('footer-columns.png', {
        maxDiffPixels: 50,
      });
    });

    test('footer social section screenshot', async ({ page }) => {
      const social = page.locator('.footer__social-section');
      await social.scrollIntoViewIfNeeded();

      await expect(social).toHaveScreenshot('footer-social.png', {
        maxDiffPixels: 50,
      });
    });

    test('footer copyright section screenshot', async ({ page }) => {
      const bottom = page.locator('.footer__bottom');
      await bottom.scrollIntoViewIfNeeded();

      await expect(bottom).toHaveScreenshot('footer-copyright.png', {
        maxDiffPixels: 50,
      });
    });
  });
});
