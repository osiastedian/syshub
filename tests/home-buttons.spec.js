const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('Home Page Button Styles', () => {
  let testResults = {
    timestamp: new Date().toISOString(),
    tests: [],
    summary: {
      passed: 0,
      failed: 0,
      total: 0
    }
  };

  test.beforeAll(async () => {
    // Create screenshots directory if it doesn't exist
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  test.afterAll(async () => {
    // Generate test report
    const reportPath = path.join(__dirname, 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
    console.log('\n=== TEST REPORT ===');
    console.log(JSON.stringify(testResults, null, 2));
  });

  test('should display buttons with correct styles', async ({ page }) => {
    // Navigate to home page
    await page.goto('http://localhost:3000');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await page.screenshot({
      path: path.join(__dirname, 'screenshots', 'homepage-full.png'),
      fullPage: true
    });

    // Find all primary buttons
    const buttons = await page.locator('.btn-primary').all();

    console.log(`\nFound ${buttons.length} primary buttons on the page`);

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const buttonText = await button.textContent();

      console.log(`\n--- Testing Button ${i + 1}: "${buttonText}" ---`);

      const testResult = {
        buttonIndex: i + 1,
        buttonText: buttonText.trim(),
        tests: []
      };

      // Scroll button into view
      await button.scrollIntoViewIfNeeded();

      // Take screenshot of button
      await button.screenshot({
        path: path.join(__dirname, 'screenshots', `button-${i + 1}.png`)
      });

      // Get computed styles
      const styles = await button.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          height: computed.height,
          borderRadius: computed.borderRadius,
          cursor: computed.cursor,
          opacity: computed.opacity,
          display: computed.display,
          padding: computed.padding,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          textAlign: computed.textAlign,
          border: computed.border
        };
      });

      console.log('Computed Styles:', styles);

      // Test 1: Background Color
      const bgColorTest = {
        name: 'Background Color',
        expected: '#FBB03B or rgb(251, 176, 59)',
        actual: styles.backgroundColor,
        passed: false
      };

      const bgMatch = styles.backgroundColor === 'rgb(251, 176, 59)' ||
                      styles.backgroundColor === '#FBB03B' ||
                      styles.backgroundColor.toLowerCase() === '#fbb03b';
      bgColorTest.passed = bgMatch;
      testResult.tests.push(bgColorTest);

      if (bgMatch) {
        console.log('✓ Background color is correct:', styles.backgroundColor);
        testResults.summary.passed++;
      } else {
        console.log('✗ Background color mismatch. Expected: rgb(251, 176, 59), Got:', styles.backgroundColor);
        testResults.summary.failed++;
      }
      testResults.summary.total++;

      // Test 2: Text Color
      const textColorTest = {
        name: 'Text Color',
        expected: '#FFFFFF or rgb(255, 255, 255)',
        actual: styles.color,
        passed: false
      };

      const colorMatch = styles.color === 'rgb(255, 255, 255)' ||
                         styles.color === '#FFFFFF' ||
                         styles.color.toLowerCase() === '#ffffff' ||
                         styles.color === '#fff';
      textColorTest.passed = colorMatch;
      testResult.tests.push(textColorTest);

      if (colorMatch) {
        console.log('✓ Text color is correct:', styles.color);
        testResults.summary.passed++;
      } else {
        console.log('✗ Text color mismatch. Expected: rgb(255, 255, 255), Got:', styles.color);
        testResults.summary.failed++;
      }
      testResults.summary.total++;

      // Test 3: Height
      const heightTest = {
        name: 'Height',
        expected: '40px',
        actual: styles.height,
        passed: false
      };

      const heightMatch = styles.height === '40px';
      heightTest.passed = heightMatch;
      testResult.tests.push(heightTest);

      if (heightMatch) {
        console.log('✓ Height is correct:', styles.height);
        testResults.summary.passed++;
      } else {
        console.log('✗ Height mismatch. Expected: 40px, Got:', styles.height);
        testResults.summary.failed++;
      }
      testResults.summary.total++;

      // Test 4: Border Radius
      const borderRadiusTest = {
        name: 'Border Radius',
        expected: '20px',
        actual: styles.borderRadius,
        passed: false
      };

      const radiusMatch = styles.borderRadius === '20px';
      borderRadiusTest.passed = radiusMatch;
      testResult.tests.push(borderRadiusTest);

      if (radiusMatch) {
        console.log('✓ Border radius is correct:', styles.borderRadius);
        testResults.summary.passed++;
      } else {
        console.log('✗ Border radius mismatch. Expected: 20px, Got:', styles.borderRadius);
        testResults.summary.failed++;
      }
      testResults.summary.total++;

      // Test 5: Cursor
      const cursorTest = {
        name: 'Cursor',
        expected: 'pointer',
        actual: styles.cursor,
        passed: false
      };

      const cursorMatch = styles.cursor === 'pointer';
      cursorTest.passed = cursorMatch;
      testResult.tests.push(cursorTest);

      if (cursorMatch) {
        console.log('✓ Cursor is correct:', styles.cursor);
        testResults.summary.passed++;
      } else {
        console.log('✗ Cursor mismatch. Expected: pointer, Got:', styles.cursor);
        testResults.summary.failed++;
      }
      testResults.summary.total++;

      // Test 6: Button Text Content
      const textContentTest = {
        name: 'Button Text',
        expected: 'One of: "Learn More", "Setup SentryNode", "Sign up"',
        actual: buttonText.trim(),
        passed: false
      };

      const validTexts = ['Learn More', 'Setup SentryNode', 'Sign up'];
      const textMatch = validTexts.includes(buttonText.trim());
      textContentTest.passed = textMatch;
      testResult.tests.push(textContentTest);

      if (textMatch) {
        console.log('✓ Button text is valid:', buttonText.trim());
        testResults.summary.passed++;
      } else {
        console.log('✗ Button text unexpected. Expected one of:', validTexts, 'Got:', buttonText.trim());
        testResults.summary.failed++;
      }
      testResults.summary.total++;

      // Test 7: Hover state - opacity change
      const initialOpacity = styles.opacity;

      // Hover over button
      await button.hover();
      await page.waitForTimeout(200); // Wait for transition

      const hoverStyles = await button.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          opacity: computed.opacity,
          backgroundColor: computed.backgroundColor,
          transform: computed.transform
        };
      });

      console.log('Hover Styles:', hoverStyles);

      // Take screenshot while hovering
      await button.screenshot({
        path: path.join(__dirname, 'screenshots', `button-${i + 1}-hover.png`)
      });

      const hoverTest = {
        name: 'Hover Opacity Change',
        expected: 'Opacity should change (typically to 0.8 or similar)',
        actual: `Initial: ${initialOpacity}, Hover: ${hoverStyles.opacity}`,
        passed: false
      };

      const opacityChanged = initialOpacity !== hoverStyles.opacity;
      hoverTest.passed = opacityChanged;
      testResult.tests.push(hoverTest);

      if (opacityChanged) {
        console.log('✓ Hover state changes opacity:', initialOpacity, '->', hoverStyles.opacity);
        testResults.summary.passed++;
      } else {
        console.log('⚠ Hover state does not change opacity (might be OK if other hover effects exist)');
        testResults.summary.failed++;
      }
      testResults.summary.total++;

      testResults.tests.push(testResult);
    }

    // Check if reference image exists for comparison
    const referencePath = path.join(__dirname, '..', 'homepage.png');
    if (fs.existsSync(referencePath)) {
      console.log('\n--- Reference Image Comparison ---');
      console.log('Reference image found at:', referencePath);
      console.log('Visual comparison available - check screenshots directory');
      testResults.referenceImageFound = true;
      testResults.referenceImagePath = referencePath;
    } else {
      console.log('\n--- Reference Image Not Found ---');
      console.log('Expected at:', referencePath);
      testResults.referenceImageFound = false;
    }

    console.log('\n=== SUMMARY ===');
    console.log(`Total Tests: ${testResults.summary.total}`);
    console.log(`Passed: ${testResults.summary.passed}`);
    console.log(`Failed: ${testResults.summary.failed}`);
    console.log(`Success Rate: ${((testResults.summary.passed / testResults.summary.total) * 100).toFixed(1)}%`);
  });
});
