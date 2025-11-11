# ABOUT PAGE REDESIGN - IMPLEMENTATION PLAN

**Document Version**: 1.0
**Created**: 2025-11-12
**Based on**: FIGMA_DESIGN_SPECIFICATIONS.md (v1.1) with cross-check verification
**Status**: Ready for Development

---

## EXECUTIVE SUMMARY

This plan details the step-by-step implementation of the About page redesign based on verified Figma specifications and cross-check analysis. All critical discrepancies have been identified, and implementation blockers are documented.

**Key Dependencies**:
- All translation keys already exist in `src/shared/locales/en/pages/about/index.js`
- Icon files exist in `/public/assets/images/about-icons/`
- Existing SCSS structure and design tokens available
- React 16.14, Bootstrap 5, SCSS setup

---

## PRE-IMPLEMENTATION CHECKLIST

### Phase 0: Pre-Flight Checks (Complete before coding)

- [ ] **Fix Figma Content Typos**
  - [ ] Update "Sycoin" → "Syscoin" in features section title
  - [ ] Update "Scability" → "Scalability" in feature card 4
  - [ ] Notify design team of corrections

- [ ] **Verify Assets**
  - [ ] Confirm feature card icon files exist (facilitation, seniority, zdags, scalability)
  - [ ] Confirm hero image file location (`/assets/images/header-img1.png`)
  - [ ] Confirm governance chart image (`/assets/images/governance.png`)
  - [ ] Confirm rewards chart image (`/assets/images/reward.png`)

- [ ] **Review Translation Keys**
  - [ ] All keys in `about.hero.*` present
  - [ ] All keys in `about.features.*` present
  - [ ] All keys in `about.seniority.*` present
  - [ ] All keys in `about.governance.*` present
  - [ ] All keys in `about.rewards.*` present
  - [ ] All keys in `about.requirements.*` present

- [ ] **Design System Review**
  - [ ] Confirm `_design-tokens.scss` has all required tokens
  - [ ] Verify breakpoint variables are defined
  - [ ] Check shadow utility classes exist or need creation

---

## PHASE 1: COMPONENT STRUCTURE & SCAFFOLDING

### 1.1 Create Component Files

**New Components to Create:**

```
src/components/About/
  ├── HeroSection.jsx           # Hero section with title, description, image
  ├── FeatureCards.jsx          # 4-card grid with icons
  ├── SenioritySection.jsx       # Complex section with data blocks and benefit cards
  ├── GovernanceSection.jsx      # 2-column layout with chart
  ├── RewardsSection.jsx         # 2-column layout with chart
  └── RequirementsList.jsx       # List of 8 requirements with icons
```

**Updated Files:**

```
src/pages/
  └── About.js                   # Update to import/use new components

src/scss/
  └── _about.scss                # Add new styling for all sections
```

### 1.2 Component API Design

**HeroSection Props**: None (uses i18n + images)
```jsx
<HeroSection />
```

**FeatureCards Props**: None (uses i18n + icon paths)
```jsx
<FeatureCards />
```

**SenioritySection Props**: None (uses i18n)
```jsx
<SenioritySection />
```

**GovernanceSection Props**: None (uses i18n + chart image)
```jsx
<GovernanceSection />
```

**RewardsSection Props**: None (uses i18n + chart image)
```jsx
<RewardsSection />
```

**RequirementsList Props**: None (uses i18n)
```jsx
<RequirementsList />
```

### 1.3 About.js Integration

```jsx
import HeroSection from '../components/About/HeroSection';
import FeatureCards from '../components/About/FeatureCards';
import SenioritySection from '../components/About/SenioritySection';
import GovernanceSection from '../components/About/GovernanceSection';
import RewardsSection from '../components/About/RewardsSection';
import RequirementsList from '../components/About/RequirementsList';

function About() {
  return (
    <div className="about-page">
      <HeroSection />
      <FeatureCards />
      <SenioritySection />
      <GovernanceSection />
      <RewardsSection />
      <RequirementsList />
    </div>
  );
}
```

---

## PHASE 2: HERO SECTION IMPLEMENTATION

### 2.1 Component Structure

```jsx
// HeroSection.jsx
import { useTranslation } from 'react-i18next';
import '../../../scss/_about.scss';

function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="about-page__hero">
      <div className="about-page__hero__container">
        <div className="about-page__hero__content">
          <h1 className="about-page__hero__title">
            {t('about.hero.title')}
          </h1>
          <p className="about-page__hero__description">
            {t('about.hero.description')}
          </p>
        </div>
        <div className="about-page__hero__image-wrapper">
          <img
            src="/assets/images/header-img1.png"
            alt={t('about.hero.title')}
            className="about-page__hero__image"
          />
        </div>
      </div>
    </section>
  );
}
```

### 2.2 SCSS Styling

**Key CSS Properties**:

```scss
.about-page__hero {
  background: $color-background;
  padding: $space-2xl;
  position: relative;

  // Radial gradient overlay (from Figma ellipses)
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 600px;
    height: 800px;
    background: radial-gradient(
      circle at 20% 50%,
      rgba($color-brand-gold, 0.05) 0%,
      transparent 50%
    );
    pointer-events: none;
  }
}

.about-page__hero__container {
  display: flex;
  gap: $space-xl;
  max-width: 1400px;

  @media (max-width: 991px) {
    flex-direction: column-reverse;
  }
}

.about-page__hero__content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.about-page__hero__title {
  font-family: 'Sentry Slab LC', serif;
  font-size: 48px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  margin-bottom: $space-lg;

  @media (max-width: 991px) {
    font-size: 32px;
  }

  @media (max-width: 575px) {
    font-size: 32px;
    max-width: 358px;
  }
}

.about-page__hero__description {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  margin-bottom: $space-xl;
  max-width: 550px;

  @media (max-width: 575px) {
    max-width: 100%;
  }
}

.about-page__hero__image-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 991px) {
    width: 100%;
  }
}

.about-page__hero__image {
  max-width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 10px 30px rgba($color-brand-gold, 0.15));

  @media (max-width: 575px) {
    max-width: 195.73px;
    height: 257px;
  }
}
```

### 2.3 Responsive Breakpoints

| Breakpoint | Width | Title Size | Description | Layout |
|-----------|-------|-----------|------------|--------|
| Desktop XL | 1400px+ | 48px | 550px max | 2-column |
| Desktop | 992px-1399px | 48px | 550px max | 2-column |
| Tablet | 768px-991px | 32px | 100% | Stacked |
| Mobile | 0-767px | 32px | 100% | Stacked |

---

## PHASE 3: FEATURE CARDS SECTION IMPLEMENTATION

### 3.1 Component Structure

```jsx
// FeatureCards.jsx
import { useTranslation } from 'react-i18next';

function FeatureCards() {
  const { t } = useTranslation();

  const features = [
    { key: 'f1', icon: 'about-feature-facilitation.png' },
    { key: 'f2', icon: 'about-feature-seniority.png' },
    { key: 'f3', icon: 'about-feature-zdags.png' },
    { key: 'f4', icon: 'about-feature-scalability.png' }
  ];

  return (
    <section className="about-page__features">
      <div className="about-page__features__container">
        <h2 className="about-page__features__title">
          {t('about.features.title')}
        </h2>
        <div className="about-page__features__grid">
          {features.map(feature => (
            <div key={feature.key} className="about-page__feature-card">
              <img
                src={`/assets/images/about-icons/${feature.icon}`}
                alt={t(`about.features.list.${feature.key}`)}
                className="about-page__feature-card__icon"
              />
              <p className="about-page__feature-card__title">
                {t(`about.features.list.${feature.key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 3.2 SCSS Styling

```scss
.about-page__features {
  background: $color-background;
  padding: $space-2xl;

  @media (max-width: 991px) {
    padding: $space-xl;
  }

  @media (max-width: 575px) {
    padding: $space-lg;
  }
}

.about-page__features__title {
  font-family: 'DM Sans', sans-serif;
  font-size: 38px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.3;
  text-align: center;
  margin-bottom: $space-xl;
}

.about-page__features__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $space-lg;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
    gap: $space-md;
  }
}

.about-page__feature-card {
  background: #1A1A1A;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: $space-lg;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $space-md;
  transition: all 200ms ease-in-out;

  @media (max-width: 991px) {
    min-height: 200px;
  }

  @media (max-width: 575px) {
    min-height: 180px;
  }

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);
  }
}

.about-page__feature-card__icon {
  width: 100px;
  height: 100px;
  object-fit: contain;
  display: block;
}

.about-page__feature-card__title {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  line-height: 1.5;
  max-width: 120px;
}
```

### 3.3 Critical Notes

- **Icon gap**: Figma shows ~67px, spec says 24px → **Use 24px (spec)**
- **Card alignment**: Figma has vertical offset → **Ignore offset, align all to y=0**
- **Content typo fix**: Ensure "Syscoin" and "Scalability" are correct from i18n

---

## PHASE 4: SENIORITY SECTION IMPLEMENTATION

### 4.1 Component Structure

```jsx
// SenioritySection.jsx
import { useTranslation } from 'react-i18next';

function SenioritySection() {
  const { t } = useTranslation();

  return (
    <section className="about-page__seniority">
      <div className="about-page__seniority__container">
        {/* Header */}
        <div className="about-page__seniority__header">
          <h2 className="about-page__seniority__title">
            {t('about.seniority.title')}
          </h2>
          <p className="about-page__seniority__description">
            {t('about.seniority.description')}
          </p>
        </div>

        {/* TX Data Blocks (List Layout) */}
        <div className="about-page__seniority__tx-data">
          <p className="about-page__seniority__blockinfo-label">
            {t('about.seniority.blockInfo.label')}
          </p>
          <div className="about-page__seniority__data-blocks">
            <div className="about-page__data-block about-page__data-block--gamma">
              <span className="about-page__data-block__label">
                {t('about.seniority.txData.gamma.label')}
              </span>
              <span className="about-page__data-block__value">
                {t('about.seniority.txData.gamma.blocks')}
              </span>
            </div>
            <div className="about-page__data-block about-page__data-block--beta">
              <span className="about-page__data-block__label">
                {t('about.seniority.txData.beta.label')}
              </span>
              <span className="about-page__data-block__value">
                {t('about.seniority.txData.beta.blocks')}
              </span>
            </div>
            <div className="about-page__data-block about-page__data-block--alpha">
              <span className="about-page__data-block__label">
                {t('about.seniority.txData.alpha.label')}
              </span>
              <span className="about-page__data-block__value">
                {t('about.seniority.txData.alpha.blocks')}
              </span>
            </div>
          </div>
        </div>

        {/* Benefit Cards */}
        <div className="about-page__seniority__benefits">
          <div className="about-page__benefit-card about-page__benefit-card--1year">
            <h3>{t('about.seniority.oneYear.title')}</h3>
          </div>
          <div className="about-page__benefit-card about-page__benefit-card--2_5year">
            <h3>{t('about.seniority.twoAndHalf.title')}</h3>
          </div>
        </div>

        {/* Note */}
        <p className="about-page__seniority__note">
          {t('about.seniority.note.main')}
        </p>
      </div>
    </section>
  );
}
```

### 4.2 SCSS Styling - Data Blocks (List Layout)

```scss
.about-page__seniority {
  background: $color-background;
  padding: $space-3xl $space-2xl;

  @media (max-width: 991px) {
    padding: $space-2xl $space-xl;
  }

  @media (max-width: 575px) {
    padding: $space-xl $space-lg;
  }
}

.about-page__seniority__header {
  text-align: center;
  margin-bottom: $space-2xl;
}

.about-page__seniority__title {
  font-family: 'Sentry Slab LC', serif;
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: $space-lg;
}

.about-page__seniority__description {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: $space-2xl;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.about-page__seniority__tx-data {
  margin-bottom: $space-2xl;
}

.about-page__seniority__blockinfo-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: $space-xl;
}

.about-page__seniority__data-blocks {
  display: flex;
  flex-direction: column;
  gap: $space-md;
  max-width: 600px;
  margin: 0 auto;
}

.about-page__data-block {
  background: #1A1A1A;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: $space-lg;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: auto;

  &--gamma { /* Gamma styling */ }
  &--beta { /* Beta styling */ }
  &--alpha { /* Alpha styling */ }
}

.about-page__data-block__label {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: $color-brand-gold;
  text-transform: uppercase;
}

.about-page__data-block__value {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background: #2A2A2A;
  padding: 8px 12px;
  border-radius: 6px;
  white-space: nowrap;
}
```

### 4.3 SCSS Styling - Benefit Cards

```scss
.about-page__seniority__benefits {
  display: flex;
  gap: $space-lg;
  margin-bottom: $space-2xl;

  @media (max-width: 575px) {
    flex-direction: column;
  }
}

.about-page__benefit-card {
  flex: 1;
  background: #1A1A1A;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: $space-lg;
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    font-family: 'DM Sans', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
    line-height: 1.4;
  }

  &--1year { /* 1 year styling */ }
  &--2_5year { /* 2.5 year styling */ }
}

.about-page__seniority__note {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 $space-lg;
}
```

---

## PHASE 5: GOVERNANCE & REWARDS SECTIONS

### 5.1 Governance Section

```jsx
// GovernanceSection.jsx
import { useTranslation } from 'react-i18next';

function GovernanceSection() {
  const { t } = useTranslation();

  return (
    <section className="about-page__governance">
      <div className="about-page__governance__container">
        <div className="about-page__governance__content">
          <h2>{t('about.governance.title')}</h2>
          <p className="italic">{t('about.governance.question')}</p>
          <p>{t('about.governance.description.d1')}</p>
        </div>
        <div className="about-page__governance__image">
          <img
            src="/assets/images/governance.png"
            alt={t('about.governance.title')}
          />
        </div>
      </div>
    </section>
  );
}
```

**SCSS Structure:**
- 2-column layout (50/50 split) on desktop
- Stacked (image first) on tablet/mobile
- Image left, content right positioning

### 5.2 Rewards Section

```jsx
// RewardsSection.jsx
function RewardsSection() {
  const { t } = useTranslation();

  return (
    <section className="about-page__rewards">
      <div className="about-page__rewards__container">
        <div className="about-page__rewards__content">
          <h2>{t('about.rewards.title')}</h2>
          <p>{t('about.rewards.description.d1')}</p>
          <p>{t('about.rewards.description.d2')}</p>
        </div>
        <div className="about-page__rewards__image">
          <img
            src="/assets/images/reward.png"
            alt={t('about.rewards.title')}
          />
        </div>
      </div>
    </section>
  );
}
```

**SCSS Structure:**
- 2-column layout (50/50 split) on desktop
- Stacked (image first) on tablet/mobile
- Content left, image right positioning

---

## PHASE 6: REQUIREMENTS LIST IMPLEMENTATION

### 6.1 Component Structure

```jsx
// RequirementsList.jsx
import { useTranslation } from 'react-i18next';

function RequirementsList() {
  const { t } = useTranslation();

  const requirements = [
    'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8'
  ];

  return (
    <section className="about-page__requirements">
      <h2>{t('about.requirements.title')}</h2>
      <ul className="about-page__requirements__list">
        {requirements.map(req => (
          <li key={req} className="about-page__requirement-item">
            <i className="fa fa-angle-right"></i>
            <span>{t(`about.requirements.requirement.${req}`)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

### 6.2 SCSS Styling

```scss
.about-page__requirements {
  background: $color-background;
  padding: $space-2xl;
  text-align: center;
}

.about-page__requirements h2 {
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: $space-lg;
}

.about-page__requirements__list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 800px;
  margin: 0 auto;
}

.about-page__requirement-item {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #ffffff;
  line-height: 1.6;
  margin-bottom: $space-sm;
  text-align: left;
  padding-left: 32px;
  position: relative;

  i {
    position: absolute;
    left: 0;
    color: $color-brand-gold;
    margin-right: $space-xs;
  }
}
```

---

## PHASE 7: RESPONSIVE DESIGN IMPLEMENTATION

### 7.1 Breakpoint Strategy

**Mobile-First Approach:**
- Base styles: Mobile (375px)
- `@media (min-width: 576px)` → Tablet
- `@media (min-width: 768px)` → Tablet Large
- `@media (min-width: 992px)` → Desktop
- `@media (min-width: 1200px)` → Desktop Large
- `@media (min-width: 1400px)` → Desktop XL

### 7.2 Key Responsive Transitions

| Section | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero | Stacked (image up) | Stacked (image up) | 2-column (50/50) |
| Features | 1 column | 2 columns | 4 columns |
| Governance | Stacked (image first) | Stacked (image first) | 2-column |
| Rewards | Stacked (image first) | Stacked (image first) | 2-column |
| Seniority Data | 1 column | 1 column | 1 column (list) |
| Benefit Cards | 1 column | 1 column | 2 columns |
| Requirements | Full width | Full width | Max 800px center |

### 7.3 Touch-Friendly Implementation

- Minimum touch target: 48px × 48px
- Card padding increased on mobile
- Feature card min-height reduced on mobile (180px)

---

## PHASE 8: TESTING & QA

### 8.1 Responsive Testing Checklist

- [ ] Mobile (375px - iPhone SE)
- [ ] Mobile (480px - Small Android)
- [ ] Tablet (768px - iPad Portrait)
- [ ] Tablet (1024px - iPad Landscape)
- [ ] Desktop (1200px - Laptop)
- [ ] Desktop (1440px - Large Monitor)
- [ ] Desktop (1920px - Ultra-wide)

### 8.2 Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 8.3 Accessibility Testing

- [ ] Keyboard navigation (Tab through all interactive elements)
- [ ] Screen reader compatibility (VoiceOver, NVDA)
- [ ] Color contrast ratios (4.5:1 minimum for WCAG AA)
- [ ] Focus states visible
- [ ] Alt text on all images

### 8.4 Performance Testing

- [ ] Lighthouse score > 90
- [ ] Image optimization verified (WebP with PNG fallback)
- [ ] CSS bundle size check
- [ ] Load time on 4G connection

### 8.5 Visual Regression Testing

- [ ] Compare to Figma screenshot (2015:791)
- [ ] Verify all colors match tokens
- [ ] Check spacing/padding against spec
- [ ] Validate typography sizes and weights

---

## PHASE 9: DEPLOYMENT & MONITORING

### 9.1 Pre-Deployment Checklist

- [ ] All components integrated into About.js
- [ ] All imports resolved (i18n, images, styles)
- [ ] No console errors or warnings
- [ ] No TypeScript/ESLint errors
- [ ] Build completes successfully (`npm run build`)
- [ ] Tests pass (if tests exist)

### 9.2 Deployment Steps

1. Create feature branch: `git checkout -b feat/about-page-redesign`
2. Implement all components following this plan
3. Run tests: `npm test`
4. Build production: `npm run build`
5. Visual QA on dev server
6. Create PR with screenshots
7. Deploy to staging for final review
8. Deploy to production

### 9.3 Post-Deployment Monitoring

- [ ] Monitor error logs (no 404s for images)
- [ ] Check page load metrics
- [ ] Verify on multiple devices
- [ ] Gather user feedback

---

## CRITICAL DEPENDENCIES & BLOCKERS

### Must Resolve Before Implementation

1. **Content Typo Fixes in Figma**
   - "Sycoin" → "Syscoin"
   - "Scability" → "Scalability"
   - **Impact**: High - Affects feature card text
   - **Owner**: Design team

2. **Icon Asset Verification**
   - Confirm all 4 feature card icons exist in `/public/assets/images/about-icons/`
   - **Impact**: Medium - Component won't display icons otherwise
   - **Owner**: Assets/Design team

3. **Chart Image Files**
   - Governance chart: `/assets/images/governance.png`
   - Rewards chart: `/assets/images/reward.png`
   - **Impact**: Medium - Sections display without content
   - **Owner**: Assets/Design team

### Known Implementation Notes

1. **Line Heights**: Figma variables show uniform 1.3, but spec requires context-specific (1.2, 1.5, 1.8). **Use spec values.**

2. **Card Gap**: Figma shows ~67px, spec says 24px. **Use 24px (spec)** - may require card width recalculation.

3. **Seniority Data Blocks**: Figma shows list layout, spec shows grid. **Use Figma list layout** - more efficient.

4. **Feature Card Vertical Offset**: Figma has misaligned cards. **Ignore offset, align all cards vertically.**

5. **Responsive Artboards**: Only desktop artboard in Figma. **Build responsive based on spec breakpoints.**

---

## DEVELOPER QUICK REFERENCE

### Component Import Template

```jsx
import { useTranslation } from 'react-i18next';
import '../../../scss/_about.scss';

function SectionComponent() {
  const { t } = useTranslation();

  return (
    <section className="about-page__section-name">
      {/* Component content */}
    </section>
  );
}

export default SectionComponent;
```

### SCSS Class Naming Convention

```
.about-page{}                    // Page container
.about-page__section{}           // Major section
.about-page__section__element{}  // Element within section
.about-page__element--modifier{} // Variant/state
```

### Common SCSS Mixins to Use

```scss
// Responsive text sizes
@mixin respond-to($breakpoint) {
  @media (max-width: $breakpoint) {
    @content;
  }
}

// Center content
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// Card styling
@mixin card {
  background: #1A1A1A;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: $space-lg;
}
```

---

## ESTIMATIONS

| Phase | Component | Est. Hours | Complexity |
|-------|-----------|-----------|------------|
| 1 | Scaffolding & Setup | 1 | Low |
| 2 | HeroSection | 2 | Low |
| 3 | FeatureCards | 1.5 | Low |
| 4 | SenioritySection | 3 | Medium |
| 5 | Governance & Rewards | 2 | Low |
| 6 | RequirementsList | 1 | Low |
| 7 | Responsive Design | 3 | Medium |
| 8 | Testing & QA | 3 | Medium |
| 9 | Deployment | 1 | Low |
| **Total** | | **17.5 hours** | |

---

## RESOURCES & REFERENCES

- **Figma Design**: https://www.figma.com/design/azvuitP9PvixRa2SM1sLXj/SentryNodes?node-id=2015-791
- **Specifications**: `redesign_docs/FIGMA_DESIGN_SPECIFICATIONS.md` (v1.1)
- **i18n Keys**: `src/shared/locales/en/pages/about/index.js`
- **Design Tokens**: `src/scss/_design-tokens.scss`
- **Icon Assets**: `/public/assets/images/about-icons/`

---

**Document Version**: 1.0
**Created**: 2025-11-12
**Last Updated**: 2025-11-12
**Status**: Ready for Development
**Author**: Claude Code (Senior Frontend Engineer)
