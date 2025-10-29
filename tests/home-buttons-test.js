const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testHomePageButtons() {
  const testResults = {
    timestamp: new Date().toISOString(),
    tests: [],
    summary: {
      passed: 0,
      failed: 0,
      total: 0
    }
  };

  console.log('Starting Home Page Button Tests...\n');

  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    console.log('Page loaded successfully.\n');

    // Take full page screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, 'homepage-full.png'),
      fullPage: true
    });

    // Find all primary buttons
    const buttons = await page.$$('.btn-primary');
    console.log(`Found ${buttons.length} primary buttons on the page\n`);

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];

      // Get button text
      const buttonText = await page.evaluate(el => el.textContent, button);

      console.log(`=== Testing Button ${i + 1}: "${buttonText.trim()}" ===`);

      const testResult = {
        buttonIndex: i + 1,
        buttonText: buttonText.trim(),
        tests: []
      };

      // Scroll button into view
      await page.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), button);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get computed styles
      const styles = await page.evaluate(el => {
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
          border: computed.border,
          transition: computed.transition
        };
      }, button);

      console.log('Computed Styles:', JSON.stringify(styles, null, 2));

      // Take screenshot of button
      await button.screenshot({
        path: path.join(screenshotsDir, `button-${i + 1}.png`)
      });

      // Test 1: Background Color
      const bgColorTest = {
        name: 'Background Color',
        expected: 'rgb(251, 176, 59) or #FBB03B',
        actual: styles.backgroundColor,
        passed: false
      };

      const bgMatch = styles.backgroundColor === 'rgb(251, 176, 59)' ||
                      styles.backgroundColor === 'rgba(251, 176, 59, 1)';
      bgColorTest.passed = bgMatch;
      testResult.tests.push(bgColorTest);

      if (bgMatch) {
        console.log('✓ Background color is correct:', styles.backgroundColor);
        testResults.summary.passed++;
      } else {
        console.log('✗ Background color mismatch.');
        console.log('  Expected: rgb(251, 176, 59)');
        console.log('  Got:', styles.backgroundColor);
        testResults.summary.failed++;
      }
      testResults.summary.total++;

      // Test 2: Text Color
      const textColorTest = {
        name: 'Text Color',
        expected: 'rgb(255, 255, 255) or #FFFFFF',
        actual: styles.color,
        passed: false
      };

      const colorMatch = styles.color === 'rgb(255, 255, 255)' ||
                         styles.color === 'rgba(255, 255, 255, 1)';
      textColorTest.passed = colorMatch;
      testResult.tests.push(textColorTest);

      if (colorMatch) {
        console.log('✓ Text color is correct:', styles.color);
        testResults.summary.passed++;
      } else {
        console.log('✗ Text color mismatch.');
        console.log('  Expected: rgb(255, 255, 255)');
        console.log('  Got:', styles.color);
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
        console.log('✗ Height mismatch.');
        console.log('  Expected: 40px');
        console.log('  Got:', styles.height);
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
        console.log('✗ Border radius mismatch.');
        console.log('  Expected: 20px');
        console.log('  Got:', styles.borderRadius);
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
        console.log('✗ Cursor mismatch.');
        console.log('  Expected: pointer');
        console.log('  Got:', styles.cursor);
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
        console.log('✗ Button text unexpected.');
        console.log('  Expected one of:', validTexts);
        console.log('  Got:', buttonText.trim());
        testResults.summary.failed++;
      }
      testResults.summary.total++;

      // Test 7: Hover state
      const initialOpacity = styles.opacity;

      // Hover over button
      await button.hover();
      await new Promise(resolve => setTimeout(resolve, 300)); // Wait for transition

      const hoverStyles = await page.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          opacity: computed.opacity,
          backgroundColor: computed.backgroundColor,
          transform: computed.transform
        };
      }, button);

      console.log('Hover Styles:', JSON.stringify(hoverStyles, null, 2));

      // Take screenshot while hovering
      await button.screenshot({
        path: path.join(screenshotsDir, `button-${i + 1}-hover.png`)
      });

      const hoverTest = {
        name: 'Hover Opacity Change',
        expected: 'Opacity should change (typically to 0.8)',
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
        console.log('⚠ Hover state does not change opacity');
        console.log('  (This might be OK if other hover effects exist)');
        testResults.summary.failed++;
      }
      testResults.summary.total++;

      testResults.tests.push(testResult);
      console.log(''); // Empty line between buttons
    }

    // Check if reference image exists
    const referencePath = path.join(__dirname, '..', 'homepage.png');
    if (fs.existsSync(referencePath)) {
      console.log('=== Reference Image Comparison ===');
      console.log('Reference image found at:', referencePath);
      console.log('You can manually compare:');
      console.log('  Reference:', referencePath);
      console.log('  Current:', path.join(screenshotsDir, 'homepage-full.png'));
      testResults.referenceImageFound = true;
      testResults.referenceImagePath = referencePath;
    } else {
      console.log('=== Reference Image Not Found ===');
      console.log('Expected at:', referencePath);
      testResults.referenceImageFound = false;
    }

  } catch (error) {
    console.error('Error during test execution:', error);
    testResults.error = error.message;
  } finally {
    await browser.close();
  }

  // Save test report
  const reportPath = path.join(__dirname, 'test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));

  // Print summary
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║          TEST SUMMARY                  ║');
  console.log('╚════════════════════════════════════════╝');
  console.log(`Total Tests:    ${testResults.summary.total}`);
  console.log(`Passed:         ${testResults.summary.passed} ✓`);
  console.log(`Failed:         ${testResults.summary.failed} ✗`);
  console.log(`Success Rate:   ${((testResults.summary.passed / testResults.summary.total) * 100).toFixed(1)}%`);
  console.log(`\nReport saved to: ${reportPath}`);
  console.log(`Screenshots saved to: ${screenshotsDir}`);

  return testResults;
}

// Run the test
testHomePageButtons()
  .then(results => {
    const exitCode = results.summary.failed > 0 ? 1 : 0;
    process.exit(exitCode);
  })
  .catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
