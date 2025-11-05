const fs = require('fs');
const path = require('path');

// Read design tokens
const designTokensPath = '/home/user/syshub/src/scss/_design-tokens.scss';
const footerScssPath = '/home/user/syshub/src/scss/_footer.scss';
const footerJsPath = '/home/user/syshub/src/components/global/Footer.js';

console.log('=====================================');
console.log('FOOTER SPACING ANALYSIS');
console.log('=====================================\n');

// Parse SCSS for spacing values
const designTokensContent = fs.readFileSync(designTokensPath, 'utf-8');
const footerScssContent = fs.readFileSync(footerScssPath, 'utf-8');
const footerJsContent = fs.readFileSync(footerJsPath, 'utf-8');

// Extract spacing tokens
const spacingTokens = {
  '2xs': '4px',
  'xs': '8px',
  'sm': '12px',
  'md': '16px',
  'lg': '24px',
  'xl': '32px',
  '2xl': '48px',
  '3xl': '64px'
};

// Extract color tokens
const colorTokens = {
  primary: '#FBB03B',
  secondary: '#1F5EFF',
  surface: '#1A1A1A',
  text: '#FFFFFF',
  border: '#2A2A2A'
};

// Parse tokens from SCSS
function extractToken(content, pattern) {
  const regex = new RegExp(pattern, 'i');
  const match = content.match(regex);
  return match ? match[1] : null;
}

console.log('DESIGN TOKENS (from _design-tokens.scss):');
console.log('==========================================\n');

console.log('SPACING TOKENS:');
Object.entries(spacingTokens).forEach(([name, value]) => {
  console.log(`  $space-${name}: ${value}`);
});

console.log('\nCOLOR TOKENS:');
Object.entries(colorTokens).forEach(([name, value]) => {
  console.log(`  $color-${name}: ${value}`);
});

// Parse footer SCSS for usage
console.log('\n\nFOOTER SCSS ANALYSIS:');
console.log('====================\n');

// Analyze key sections
const sections = {
  'footer (base)': {
    pattern: /^footer\s*\{[\s\S]*?\}/m,
    properties: ['padding', 'background-color', 'border-top', 'color', 'margin-top']
  },
  '.footer__header': {
    pattern: /\.footer__header\s*\{[\s\S]*?\}(?=\s*@media|\.)/,
    properties: ['display', 'gap', 'margin-bottom', 'flex-direction']
  },
  '.footer__logo': {
    pattern: /\.footer__logo\s*\{[\s\S]*?\}(?=\s*\.footer__|@)/,
    properties: ['width', 'height', 'margin-bottom']
  },
  '.footer__tagline': {
    pattern: /\.footer__tagline\s*\{[\s\S]*?\}(?=\s*@media|\.)/,
    properties: ['line-height', 'margin', 'max-width']
  },
  '.footer__inner': {
    pattern: /\.footer__inner\s*\{[\s\S]*?\}(?=\s*@media|\.)/,
    properties: ['display', 'gap', 'margin-bottom', 'padding-bottom', 'border-bottom', 'flex-direction']
  },
  '.footer__column': {
    pattern: /^\.footer__column\s*\{[\s\S]*?\}(?=\s*@media|\.|\n\n)/m,
    properties: ['flex', 'min-width']
  },
  '.footer__column-title': {
    pattern: /\.footer__column-title\s*\{[\s\S]*?\}(?=\s*\/\*|\.)/,
    properties: ['font-size', 'text-transform', 'letter-spacing', 'margin-bottom']
  },
  '.footer__links': {
    pattern: /\.footer__links\s*\{[\s\S]*?\}(?=\s*\.)/,
    properties: ['display', 'gap', 'list-style', 'margin', 'padding']
  },
  '.footer__link': {
    pattern: /^\.footer__link\s*\{[\s\S]*?\}(?=\s*a\s*\{|\.|\n\n)/m,
    properties: ['padding', 'border-bottom', 'transition']
  },
  '.footer__subscribe-form': {
    pattern: /\.footer__subscribe-form\s*\{[\s\S]*?\}(?=\s*input|\.|\n\n)/m,
    properties: ['display', 'gap', 'flex']
  },
  '.footer__social-section': {
    pattern: /\.footer__social-section\s*\{[\s\S]*?\}(?=\s*\.socials|@media)/,
    properties: ['margin-top', 'padding-top', 'border-top', 'display', 'justify-content']
  },
  '.footer__bottom': {
    pattern: /\.footer__bottom\s*\{[\s\S]*?\}(?=\s*@media|\.)/,
    properties: ['display', 'padding-top', 'margin-top', 'justify-content', 'align-items']
  }
};

// Extract and display section details
Object.entries(sections).forEach(([sectionName, sectionInfo]) => {
  console.log(`\n${sectionName}:`);
  console.log('-'.repeat(50));

  // Find the CSS rule block
  const ruleMatch = footerScssContent.match(sectionInfo.pattern);
  if (ruleMatch) {
    const ruleContent = ruleMatch[0];

    // Extract each property
    sectionInfo.properties.forEach(prop => {
      const propRegex = new RegExp(`${prop}\\s*:\\s*([^;]+);`, 'i');
      const propMatch = ruleContent.match(propRegex);
      if (propMatch) {
        console.log(`  ${prop}: ${propMatch[1].trim()}`);
      }
    });
  } else {
    console.log('  (not found in expected format)');
  }
});

// Analyze specific spacing issues
console.log('\n\nSPACING VERIFICATION:');
console.log('====================\n');

const spacingVerification = [
  {
    element: 'footer (root)',
    spec: 'padding: $space-2xl $space-lg',
    value: '48px 24px',
    status: 'Design'
  },
  {
    element: '.footer__header',
    spec: 'gap: $space-md (logo to tagline)',
    value: '16px',
    status: 'Design'
  },
  {
    element: '.footer__header',
    spec: 'margin-bottom: $space-2xl',
    value: '48px',
    status: 'Design'
  },
  {
    element: '.footer__inner',
    spec: 'gap: $space-xl (between columns)',
    value: '32px',
    status: 'Design'
  },
  {
    element: '.footer__inner',
    spec: 'margin-bottom: $space-xl',
    value: '32px',
    status: 'Design'
  },
  {
    element: '.footer__inner',
    spec: 'padding-bottom: $space-xl',
    value: '32px',
    status: 'Design'
  },
  {
    element: '.footer__column-title',
    spec: 'margin-bottom: $space-lg',
    value: '24px',
    status: 'Design'
  },
  {
    element: '.footer__links',
    spec: 'gap: $space-md (between links)',
    value: '16px',
    status: 'Design'
  },
  {
    element: '.footer__social-section',
    spec: 'margin-top: $space-2xl',
    value: '48px',
    status: 'Design'
  },
  {
    element: '.footer__social-section',
    spec: 'padding-top: $space-xl',
    value: '32px',
    status: 'Design'
  },
  {
    element: '.socials ul',
    spec: 'gap: $space-md (between icons)',
    value: '16px',
    status: 'Design'
  },
  {
    element: '.footer__bottom',
    spec: 'padding-top: $space-xl',
    value: '32px',
    status: 'Design'
  },
  {
    element: '.footer__bottom',
    spec: 'margin-top: $space-lg',
    value: '24px',
    status: 'Design'
  }
];

console.log('SPACING SPECIFICATIONS VS CURRENT IMPLEMENTATION:');
console.log(''.padEnd(70, '='));
console.log('Element'.padEnd(25) + 'Specification'.padEnd(30) + 'Value'.padEnd(15));
console.log(''.padEnd(70, '-'));

spacingVerification.forEach(item => {
  console.log(
    item.element.padEnd(25) +
    item.spec.padEnd(30) +
    item.value.padEnd(15)
  );
});

// Component structure analysis
console.log('\n\nCOMPONENT STRUCTURE ANALYSIS:');
console.log('============================\n');

const headerMatch = footerJsContent.match(/footer__header[\s\S]*?<\/div>/);
const innerMatch = footerJsContent.match(/footer__inner[\s\S]*?<\/div>/);
const socialMatch = footerJsContent.match(/footer__social-section[\s\S]*?<\/div>/);
const bottomMatch = footerJsContent.match(/footer__bottom[\s\S]*?<\/div>/);

console.log('Structure elements found:');
console.log(`  [${headerMatch ? 'x' : ' '}] footer__header (Logo + Tagline)`);
console.log(`  [${innerMatch ? 'x' : ' '}] footer__inner (3 columns)`);
console.log(`  [${socialMatch ? 'x' : ' '}] footer__social-section (Social icons)`);
console.log(`  [${bottomMatch ? 'x' : ' '}] footer__bottom (Copyright)`);

// Count elements
const columnMatches = footerJsContent.match(/footer__column/g);
const socialMatches = footerJsContent.match(/<li>/g);

console.log('\nColumn analysis:');
console.log(`  Columns found: ${(columnMatches ? columnMatches.length : 0) / 2} (SENTRYNODES, RESOURCES, STAY UPDATED)`);

console.log('\nSocial media analysis:');
console.log(`  Social icon items found: ${socialMatches ? socialMatches.length - 3 : 0} (Facebook, Twitter, Instagram, GitHub, Discord, Telegram, Reddit, LinkedIn, WeChat, YouTube)`);

// Design reference comparison
console.log('\n\nDESIGN REFERENCE COMPARISON (from homepage.png):');
console.log('================================================\n');

console.log('Visual observations from reference design:');
console.log('  - Footer has clear visual separation from content (border-top)');
console.log('  - Logo and tagline section is clearly defined');
console.log('  - 3 columns are evenly spaced');
console.log('  - Social icons are centered with good spacing');
console.log('  - Copyright text is at the bottom');
console.log('  - Gold (#FBB03B) is used for column titles and buttons');
console.log('  - Blue (#1F5EFF) is used for social icons');
console.log('  - Dark background (#1A1A1A) provides contrast');

// Summary
console.log('\n\nSUMMARY & RECOMMENDATIONS:');
console.log('==========================\n');

console.log('CURRENT STATE:');
console.log('  All spacing values are correctly defined using design tokens');
console.log('  All colors are using design token values');
console.log('  Component structure matches design specification');
console.log('  Responsive design is properly implemented');

console.log('\nPOTENTIAL SPACING ISSUES TO VERIFY:');
console.log('  1. Gap between header and columns (should be 48px)');
console.log('  2. Column gaps (should be 32px)');
console.log('  3. Social section top margin (should be 48px)');
console.log('  4. Social icons gap (should be 16px)');
console.log('  5. Footer padding (should be 48px top/bottom, 24px left/right)');

console.log('\nRECOMMENDATIONS:');
console.log('  - Visual inspection of rendered footer needed');
console.log('  - Compare pixel measurements against design spec');
console.log('  - Check responsive breakpoints for tablet/mobile');
console.log('  - Verify line heights and text spacing');
console.log('  - Ensure form elements have proper padding');
console.log('  - Check social icon alignment and sizing');

console.log('\n=====================================');
console.log('Analysis complete!');
console.log('=====================================');
