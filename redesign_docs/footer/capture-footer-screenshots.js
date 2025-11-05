const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Create screenshots directory
const screenshotsDir = path.join(__dirname, 'footer-screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function captureFooterScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1440 }
  });

  try {
    console.log('Navigating to homepage...');
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

    // Wait for page to fully load
    await page.waitForTimeout(2000);

    console.log('Getting page content...');
    const pageContent = await page.content();

    if (!pageContent.includes('footer')) {
      console.log('Warning: footer tag not found in page content');
    }

    // Get body height
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log('Page body height:', bodyHeight);

    // Scroll to bottom to reveal footer
    console.log('Scrolling to bottom of page...');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Take viewport screenshot at bottom
    console.log('Capturing footer viewport...');
    await page.screenshot({
      path: path.join(screenshotsDir, '01-footer-viewport.png')
    });

    // Get footer measurements
    console.log('Extracting footer measurements...');
    const measurements = await page.evaluate(() => {
      const footer = document.querySelector('footer.footer');

      if (!footer) {
        return { error: 'Footer element not found' };
      }

      const header = footer.querySelector('.footer__header');
      const inner = footer.querySelector('.footer__inner');
      const social = footer.querySelector('.footer__social-section');
      const bottom = footer.querySelector('.footer__bottom');
      const columns = footer.querySelectorAll('.footer__column');
      const shell = footer.querySelector('.shell');

      const getMeasurements = (el, name = '') => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const styles = window.getComputedStyle(el);
        return {
          element: name,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          paddingTop: styles.paddingTop,
          paddingBottom: styles.paddingBottom,
          paddingLeft: styles.paddingLeft,
          paddingRight: styles.paddingRight,
          marginTop: styles.marginTop,
          marginBottom: styles.marginBottom,
          gap: styles.gap,
          display: styles.display,
          flexDirection: styles.flexDirection
        };
      };

      return {
        footer: getMeasurements(footer, 'footer'),
        shell: getMeasurements(shell, 'shell'),
        header: getMeasurements(header, 'header'),
        inner: getMeasurements(inner, 'inner'),
        social: getMeasurements(social, 'social'),
        bottom: getMeasurements(bottom, 'bottom'),
        columnCount: columns.length,
        columnMeasurements: Array.from(columns).map((col, idx) =>
          getMeasurements(col, `column-${idx + 1}`)
        ),
        columnTitles: Array.from(footer.querySelectorAll('.footer__column-title')).map((title, idx) => ({
          index: idx,
          text: title.textContent.trim(),
          ...getMeasurements(title, `column-title-${idx + 1}`)
        })),
        columnLinks: Array.from(footer.querySelectorAll('.footer__links')).map((list, idx) => ({
          index: idx,
          itemCount: list.querySelectorAll('li').length,
          ...getMeasurements(list, `column-links-${idx + 1}`)
        })),
        socials: getMeasurements(footer.querySelector('.footer__social-section .socials ul'), 'socials-ul'),
        footerElement: {
          computed: {
            paddingTop: styles.paddingTop,
            paddingBottom: styles.paddingBottom,
            paddingLeft: styles.paddingLeft,
            paddingRight: styles.paddingRight
          }
        }
      };
    });

    if (measurements.error) {
      console.log('ERROR:', measurements.error);
      return;
    }

    // Save measurements
    fs.writeFileSync(
      path.join(screenshotsDir, 'measurements.json'),
      JSON.stringify(measurements, null, 2)
    );

    console.log('\n======================================');
    console.log('FOOTER SPACING MEASUREMENTS');
    console.log('======================================\n');
    console.log(JSON.stringify(measurements, null, 2));

    console.log('\n======================================');
    console.log('SUMMARY');
    console.log('======================================');
    console.log(`Footer dimensions: ${measurements.footer.width} x ${measurements.footer.height}px`);
    console.log(`Column count: ${measurements.columnCount}`);
    console.log(`Column 1 width: ${measurements.columnMeasurements[0]?.width}px`);
    console.log(`Column 2 width: ${measurements.columnMeasurements[1]?.width}px`);
    console.log(`Column 3 width: ${measurements.columnMeasurements[2]?.width}px`);
    console.log(`Social icons gap: ${measurements.socials?.gap}`);

    console.log('\nScreenshots saved to: ' + screenshotsDir);

  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

captureFooterScreenshots();
