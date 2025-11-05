const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  // Navigate to the local dev server
  await page.goto('http://localhost:3000');

  // Wait for footer to load
  await page.waitForSelector('footer.footer', { timeout: 10000 });

  // Scroll to footer
  await page.evaluate(() => {
    document.querySelector('footer.footer').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  await page.waitForTimeout(1000);

  // Take screenshot of footer
  const footer = await page.locator('footer.footer');
  await footer.screenshot({ path: 'footer-current.png' });

  console.log('Screenshot saved to footer-current.png');

  await browser.close();
})();
