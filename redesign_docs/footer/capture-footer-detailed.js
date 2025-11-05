const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function ensureDirectory(dirPath) {
  await fs.promises.mkdir(dirPath, { recursive: true });
}

async function main() {
  const baseUrl = process.env.SCREENSHOT_URL || 'http://localhost:3000';
  const outDir = path.resolve(__dirname, '..', 'footer-screenshots');
  await ensureDirectory(outDir);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

    console.log('Navigating to:', baseUrl);
    await page.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 120000 });

    console.log('Waiting for page to render...');
    await page.waitForTimeout(2000);

    // Scroll to bottom
    console.log('Scrolling to footer...');
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1500);

    // Take full viewport screenshot at footer
    console.log('Capturing footer viewport screenshot...');
    await page.screenshot({
      path: path.join(outDir, '01-footer-viewport.png')
    });

    // Get detailed measurements
    console.log('Extracting measurements...');
    const measurements = await page.evaluate(() => {
      const footer = document.querySelector('footer.footer');

      if (!footer) {
        return { error: 'Footer element not found' };
      }

      const header = footer.querySelector('.footer__header');
      const inner = footer.querySelector('.footer__inner');
      const socialSection = footer.querySelector('.footer__social-section');
      const bottom = footer.querySelector('.footer__bottom');
      const columns = footer.querySelectorAll('.footer__column');
      const shell = footer.querySelector('.shell');

      const getComputedRect = (el, name = '') => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const computed = window.getComputedStyle(el);
        return {
          element: name,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          top: Math.round(rect.top),
          paddingTop: computed.paddingTop,
          paddingBottom: computed.paddingBottom,
          paddingLeft: computed.paddingLeft,
          paddingRight: computed.paddingRight,
          marginTop: computed.marginTop,
          marginBottom: computed.marginBottom,
          gap: computed.gap,
          display: computed.display,
          flexDirection: computed.flexDirection,
          flexWrap: computed.flexWrap,
          justifyContent: computed.justifyContent,
          alignItems: computed.alignItems
        };
      };

      // Get all columns data
      const columnsData = [];
      columns.forEach((col, idx) => {
        const title = col.querySelector('.footer__column-title');
        const links = col.querySelector('.footer__links');
        const subscribe = col.querySelector('.footer__subscribe');

        columnsData.push({
          index: idx + 1,
          colMeasure: getComputedRect(col, `column-${idx + 1}`),
          title: title ? {
            text: title.textContent.trim(),
            measure: getComputedRect(title, `title-${idx + 1}`)
          } : null,
          links: links ? {
            itemCount: links.querySelectorAll('li').length,
            measure: getComputedRect(links, `links-${idx + 1}`)
          } : null,
          subscribe: subscribe ? {
            measure: getComputedRect(subscribe, `subscribe-${idx + 1}`)
          } : null
        });
      });

      // Get social icons info
      const socialsUl = footer.querySelector('.footer__social-section .socials ul');
      const socialLis = socialsUl ? Array.from(socialsUl.querySelectorAll('li')).length : 0;

      return {
        success: true,
        footer: getComputedRect(footer, 'footer'),
        shell: getComputedRect(shell, 'shell'),
        header: getComputedRect(header, 'header'),
        inner: getComputedRect(inner, 'inner'),
        socialSection: getComputedRect(socialSection, 'social-section'),
        socialsUl: getComputedRect(socialsUl, 'socials-ul'),
        bottom: getComputedRect(bottom, 'bottom'),
        columnCount: columns.length,
        columns: columnsData,
        socialIconCount: socialLis
      };
    });

    if (measurements.error) {
      console.error('ERROR:', measurements.error);
      return;
    }

    // Save measurements
    console.log('Saving measurements...');
    fs.writeFileSync(
      path.join(outDir, 'measurements.json'),
      JSON.stringify(measurements, null, 2)
    );

    // Print summary
    console.log('\n========================================');
    console.log('FOOTER SPACING ANALYSIS');
    console.log('========================================\n');
    console.log('Footer Dimensions:', {
      width: measurements.footer.width + 'px',
      height: measurements.footer.height + 'px'
    });

    console.log('\nFooter Padding:', {
      top: measurements.footer.paddingTop,
      bottom: measurements.footer.paddingBottom,
      left: measurements.footer.paddingLeft,
      right: measurements.footer.paddingRight
    });

    console.log('\nShell (inner container):', {
      width: measurements.shell.width + 'px',
      height: measurements.shell.height + 'px',
      paddingTop: measurements.shell.paddingTop,
      paddingBottom: measurements.shell.paddingBottom,
      paddingLeft: measurements.shell.paddingLeft,
      paddingRight: measurements.shell.paddingRight
    });

    console.log('\nHeader Section:', {
      width: measurements.header.width + 'px',
      height: measurements.header.height + 'px',
      gap: measurements.header.gap,
      marginBottom: measurements.header.marginBottom
    });

    console.log('\nInner Section (3-columns):', {
      width: measurements.inner.width + 'px',
      height: measurements.inner.height + 'px',
      gap: measurements.inner.gap,
      marginBottom: measurements.inner.marginBottom,
      paddingBottom: measurements.inner.paddingBottom,
      flexDirection: measurements.inner.flexDirection
    });

    console.log('\nColumn Widths:');
    measurements.columns.forEach((col, idx) => {
      console.log(`  Column ${idx + 1}: ${col.colMeasure.width}px`);
    });

    console.log('\nSocial Section:', {
      width: measurements.socialsUl.width + 'px',
      height: measurements.socialsUl.height + 'px',
      gap: measurements.socialsUl.gap,
      iconCount: measurements.socialIconCount
    });

    console.log('\nBottom Section:', {
      width: measurements.bottom.width + 'px',
      height: measurements.bottom.height + 'px',
      paddingTop: measurements.bottom.paddingTop,
      marginTop: measurements.bottom.marginTop
    });

    console.log('\n========================================');
    console.log('Files saved to:', outDir);
    console.log('========================================\n');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
