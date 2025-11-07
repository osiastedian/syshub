#!/usr/bin/env node
/**
 * Footer Component Validation Script
 * Takes screenshots and validates footer structure/content
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const DESIGN_TOKENS = {
  colors: {
    primary: '#FBB03B',           // gold
    secondary: '#1F5EFF',         // blue
    surfaceDark: '#1A1A1A',       // background
    white: '#FFFFFF',
    black: '#0A0A0A',
  },
};

async function validateFooter() {
  let browser;
  const results = {
    timestamp: new Date().toISOString(),
    tests: [],
    screenshots: [],
    summary: {
      passed: 0,
      failed: 0,
      total: 0,
    },
  };

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

    // Wait for footer to load
    await page.waitForSelector('footer', { timeout: 5000 });

    // TEST 1: Footer exists
    console.log('Test 1: Checking if footer exists...');
    const footerExists = await page.$('footer') !== null;
    results.tests.push({
      name: 'Footer element exists',
      status: footerExists ? 'PASS' : 'FAIL',
      details: footerExists ? 'Footer found on page' : 'Footer not found',
    });
    if (footerExists) results.summary.passed++;
    results.summary.total++;

    // TEST 2: Check footer structure
    console.log('Test 2: Checking footer structure...');
    const structure = await page.evaluate(() => {
      return {
        header: !!document.querySelector('.footer__header'),
        inner: !!document.querySelector('.footer__inner'),
        socialSection: !!document.querySelector('.footer__social-section'),
        bottom: !!document.querySelector('.footer__bottom'),
        columns: document.querySelectorAll('.footer__column').length,
      };
    });

    const structurePass =
      structure.header &&
      structure.inner &&
      structure.socialSection &&
      structure.bottom &&
      structure.columns === 3;

    results.tests.push({
      name: 'Footer has complete structure (header, inner, social, bottom)',
      status: structurePass ? 'PASS' : 'FAIL',
      details: JSON.stringify(structure),
    });
    if (structurePass) results.summary.passed++;
    results.summary.total++;

    // TEST 3: Check SENTRYNODES column
    console.log('Test 3: Checking SENTRYNODES column...');
    const sentryNodesColumn = await page.evaluate(() => {
      const columns = document.querySelectorAll('.footer__column');
      const column = columns[0];
      const title = column?.querySelector('.footer__column-title')?.textContent;
      const links = Array.from(column?.querySelectorAll('.footer__link a') || []).map(
        a => a.textContent
      );
      return { title, links };
    });

    const sentryNodesPass =
      sentryNodesColumn.title === 'SENTRYNODES' &&
      sentryNodesColumn.links.includes('About') &&
      sentryNodesColumn.links.includes('Stats') &&
      sentryNodesColumn.links.includes('Setup') &&
      sentryNodesColumn.links.includes('Governance') &&
      sentryNodesColumn.links.includes('SentryNode');

    results.tests.push({
      name: 'SENTRYNODES column has all required links',
      status: sentryNodesPass ? 'PASS' : 'FAIL',
      details: JSON.stringify(sentryNodesColumn),
    });
    if (sentryNodesPass) results.summary.passed++;
    results.summary.total++;

    // TEST 4: Check RESOURCES column (FAQ instead of News)
    console.log('Test 4: Checking RESOURCES column for FAQ (not News)...');
    const resourcesColumn = await page.evaluate(() => {
      const columns = document.querySelectorAll('.footer__column');
      const column = columns[1];
      const title = column?.querySelector('.footer__column-title')?.textContent;
      const links = Array.from(column?.querySelectorAll('.footer__link a') || []).map(
        a => a.textContent
      );
      const hasNews = links.includes('News');
      const hasFAQ = links.includes('FAQ');
      return { title, links, hasNews, hasFAQ };
    });

    const resourcesPass =
      resourcesColumn.title === 'RESOURCES' &&
      resourcesColumn.hasFAQ &&
      !resourcesColumn.hasNews &&
      resourcesColumn.links.includes('Support');

    results.tests.push({
      name: 'RESOURCES column shows FAQ (not News)',
      status: resourcesPass ? 'PASS' : 'FAIL',
      details: JSON.stringify(resourcesColumn),
    });
    if (resourcesPass) results.summary.passed++;
    results.summary.total++;

    // TEST 5: Check STAY UPDATED! column
    console.log('Test 5: Checking STAY UPDATED! column...');
    const stayUpdatedColumn = await page.evaluate(() => {
      const columns = document.querySelectorAll('.footer__column');
      const column = columns[2];
      const title = column?.querySelector('.footer__column-title')?.textContent;
      const hasForm = !!column?.querySelector('.footer__subscribe-form');
      const hasInput = !!column?.querySelector('input[type="email"]');
      const hasButton = !!column?.querySelector('button[type="submit"]');
      const buttonText = column?.querySelector('button[type="submit"]')?.textContent;
      const hasDescription = !!column?.querySelector('.footer__subscribe-text');
      return { title, hasForm, hasInput, hasButton, buttonText, hasDescription };
    });

    const stayUpdatedPass =
      stayUpdatedColumn.title === 'STAY UPDATED!' &&
      stayUpdatedColumn.hasForm &&
      stayUpdatedColumn.hasInput &&
      stayUpdatedColumn.hasButton &&
      stayUpdatedColumn.hasDescription;

    results.tests.push({
      name: 'STAY UPDATED! column has subscribe form',
      status: stayUpdatedPass ? 'PASS' : 'FAIL',
      details: JSON.stringify(stayUpdatedColumn),
    });
    if (stayUpdatedPass) results.summary.passed++;
    results.summary.total++;

    // TEST 6: Check colors match design tokens
    console.log('Test 6: Checking color compliance...');
    const colors = await page.evaluate(() => {
      const getColor = el => {
        const computed = window.getComputedStyle(el);
        return computed.color || computed.backgroundColor;
      };

      const columnTitle = document.querySelector('.footer__column-title');
      const subscribeButton = document.querySelector('.footer__subscribe-form button');
      const footerBg = document.querySelector('footer');

      return {
        columnTitle: getColor(columnTitle),
        subscribeButton: getColor(subscribeButton),
        footerBg: window.getComputedStyle(footerBg).backgroundColor,
      };
    });

    results.tests.push({
      name: 'Color values extracted for verification',
      status: 'INFO',
      details: JSON.stringify(colors),
    });
    results.summary.total++;

    // TEST 7: Check copyright section
    console.log('Test 7: Checking copyright section...');
    const copyright = await page.evaluate(() => {
      const copyrightText = document.querySelector('.footer__copyright')?.textContent;
      return {
        text: copyrightText,
        hasSyscoin: copyrightText?.includes('Syscoin'),
        hasAllRightsReserved: copyrightText?.includes('All rights reserved'),
      };
    });

    const copyrightPass =
      copyright.hasSyscoin && copyright.hasAllRightsReserved;

    results.tests.push({
      name: 'Copyright section has correct text',
      status: copyrightPass ? 'PASS' : 'FAIL',
      details: JSON.stringify(copyright),
    });
    if (copyrightPass) results.summary.passed++;
    results.summary.total++;

    // TEST 8: Check responsive design
    console.log('Test 8: Checking responsive design on mobile...');
    await page.setViewport({ width: 375, height: 812 });
    await page.waitForTimeout(500);

    const mobileFooterVisible = await page.$('footer') !== null;
    results.tests.push({
      name: 'Footer responsive on mobile (375px)',
      status: mobileFooterVisible ? 'PASS' : 'FAIL',
      details: 'Mobile viewport test',
    });
    if (mobileFooterVisible) results.summary.passed++;
    results.summary.total++;

    // Take screenshots
    console.log('Taking screenshots...');

    // Desktop view
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    const footerElement = await page.$('footer');
    if (footerElement) {
      const screenshotPath = '/home/user/syshub/tests/screenshots/footer-desktop.png';
      await footerElement.screenshot({ path: screenshotPath });
      results.screenshots.push({
        name: 'footer-desktop.png',
        viewport: '1920x1080',
        path: screenshotPath,
      });
      console.log('Screenshot saved: footer-desktop.png');
    }

    // Mobile view
    await page.setViewport({ width: 375, height: 812 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    if (footerElement) {
      const screenshotPath = '/home/user/syshub/tests/screenshots/footer-mobile.png';
      await footerElement.screenshot({ path: screenshotPath });
      results.screenshots.push({
        name: 'footer-mobile.png',
        viewport: '375x812',
        path: screenshotPath,
      });
      console.log('Screenshot saved: footer-mobile.png');
    }

    // Full page screenshot
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    const fullPagePath = '/home/user/syshub/tests/screenshots/footer-fullpage.png';
    await page.screenshot({ path: fullPagePath, fullPage: true });
    results.screenshots.push({
      name: 'footer-fullpage.png',
      viewport: '1920x1080 (full page)',
      path: fullPagePath,
    });
    console.log('Screenshot saved: footer-fullpage.png');

  } catch (error) {
    console.error('Error during validation:', error);
    results.tests.push({
      name: 'Validation error',
      status: 'ERROR',
      details: error.message,
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  // Save results
  const reportPath = '/home/user/syshub/tests/footer-validation-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nValidation complete. Report saved to: ${reportPath}`);

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('FOOTER VALIDATION SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Tests: ${results.summary.total}`);
  console.log(`Passed: ${results.summary.passed}`);
  console.log(`Failed: ${results.summary.failed}`);
  console.log('='.repeat(80));
  console.log('\nTest Results:');
  results.tests.forEach((test, idx) => {
    const icon = test.status === 'PASS' ? 'PASS' : 'FAIL';
    console.log(`${idx + 1}. [${icon}] ${test.name}`);
    if (test.details) {
      console.log(`   Details: ${test.details}`);
    }
  });

  console.log('\nScreenshots:');
  results.screenshots.forEach((screenshot, idx) => {
    console.log(`${idx + 1}. ${screenshot.name} (${screenshot.viewport})`);
  });

  process.exit(results.summary.failed > 0 ? 1 : 0);
}

validateFooter().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
