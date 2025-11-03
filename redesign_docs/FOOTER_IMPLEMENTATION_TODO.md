# Footer Implementation Todo List

**Date Created:** 2025-11-03
**Design Reference:** Figma footer export (homepage.png)
**Current Component:** `src/components/global/Footer.js`
**Current Styles:** `src/scss/_footer.scss`

---

## 📋 Comparison: Figma Design vs Current Implementation

### Figma Design Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  SENTRYNODES        RESOURCES           STAY UPDATED!           │
│  [links below]      NEWS                [email input]           │
│                                         [Subscribe now button]  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Current Implementation Structure
```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]                                                          │
│                                                                  │
│  [Horizontal nav links: About, Stats, Setup, Governance, etc.]  │
│                                                                  │
│  [Social media icons in a row]                                  │
│  © 2025 Syscoin. All rights reserved                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✅ What's Missing - Implementation Todo List

### 1. **Structure: Convert to 3-Column Layout**
**Priority:** HIGH
**Status:** Not Implemented

**Current:** Single-column layout with logo, horizontal nav, and social icons
**Required:** 3-column grid layout with headers

**Tasks:**
- [ ] Remove current `.footer__entry` and `.footer__content` structure
- [ ] Create new `.footer__columns` container with 3-column grid
- [ ] Add `.footer__column` for each column (SENTRYNODES, RESOURCES, STAY UPDATED!)
- [ ] Update responsive breakpoints for mobile (stack columns vertically)

**Files to Modify:**
- `src/components/global/Footer.js` (JSX structure)
- `src/scss/_footer.scss` (grid layout)

---

### 2. **Column Headers with Orange Styling**
**Priority:** HIGH
**Status:** Not Implemented

**Current:** No column headers
**Required:** Three uppercase headers in orange (#FBB03B)

**Tasks:**
- [ ] Add `<h3 className="footer__column-title">SENTRYNODES</h3>`
- [ ] Add `<h3 className="footer__column-title">RESOURCES</h3>`
- [ ] Add `<h3 className="footer__column-title">STAY UPDATED!</h3>`
- [ ] Style headers: orange color, uppercase, proper letter-spacing
- [ ] Use design token `$color-primary` for orange color

**Design Specs:**
- Color: #FBB03B (orange - matches stats section)
- Text Transform: UPPERCASE
- Letter Spacing: ~0.1em
- Font Weight: Semi-bold or Medium

**Files to Modify:**
- `src/components/global/Footer.js` (add headers)
- `src/scss/_footer.scss` (already has `.footer__column-title` styles)

---

### 3. **SENTRYNODES Column Content**
**Priority:** HIGH
**Status:** Partially Implemented (links exist but wrong location)

**Current:** Navigation links in horizontal layout
**Required:** Vertical list under SENTRYNODES header

**Tasks:**
- [ ] Move existing navigation links under SENTRYNODES column
- [ ] Change from horizontal `<ul>` to vertical stacked links
- [ ] Update link styling to match design (smaller, lighter text)
- [ ] Ensure links are: About, Stats, Setup, Governance, SentryNodes

**Expected Links:**
- About
- Stats
- Setup
- Governance
- SentryNode (or SentryNodes)

**Files to Modify:**
- `src/components/global/Footer.js` (move nav into column 1)
- `src/scss/_footer.scss` (vertical link styling)

---

### 4. **RESOURCES Column Content**
**Priority:** HIGH
**Status:** Not Implemented

**Current:** No RESOURCES column or NEWS link
**Required:** RESOURCES column with NEWS link

**Tasks:**
- [ ] Create RESOURCES column structure
- [ ] Add "NEWS" link (determine URL - likely `/news` or external)
- [ ] Add "Support" link (already exists: https://support.syscoin.org/)
- [ ] Check if FAQ link needed (mentioned in AGENT_CONTINUATION.md)
- [ ] Style links to match design

**Expected Links:**
- NEWS (new - needs URL)
- Support (exists, move here)
- FAQ (optional - verify if needed)

**Files to Modify:**
- `src/components/global/Footer.js` (create column 2)
- Potentially create `/news` route if doesn't exist

---

### 5. **STAY UPDATED! Column with Email Subscription**
**Priority:** HIGH
**Status:** Not Implemented

**Current:** No subscription form
**Required:** Email input + Subscribe button

**Tasks:**
- [ ] Create STAY UPDATED! column structure
- [ ] Add email input field with placeholder "youremail@example.com"
- [ ] Add "Subscribe now" button with arrow icon (→)
- [ ] Style input: dark background, light text, border-radius
- [ ] Style button: orange background (#FBB03B), rounded, hover effects
- [ ] Add form submission handler (determine backend endpoint)
- [ ] Add email validation
- [ ] Add success/error messaging
- [ ] Ensure responsive layout (stack on mobile)

**Design Specs:**
- Input: Dark gray background, light border, placeholder text
- Button: Orange (#FBB03B), white text, arrow icon, rounded
- Layout: Input above button on mobile, side-by-side on desktop

**Files to Modify:**
- `src/components/global/Footer.js` (add form)
- `src/scss/_footer.scss` (already has `.footer__subscribe-form` styles)
- Possibly create newsletter subscription handler

---

### 6. **Logo Placement**
**Priority:** MEDIUM
**Status:** Exists but needs repositioning

**Current:** Logo in top-left of footer
**Required:** Verify logo placement in Figma design

**Tasks:**
- [ ] Determine if logo should be:
  - Above the 3 columns (centered or left)
  - In the first column above "SENTRYNODES"
  - Removed (not visible in provided Figma snippet)
- [ ] Update logo positioning accordingly
- [ ] Ensure logo is responsive

**Note:** The Figma image provided doesn't show a logo, but current implementation has one. Need to verify full design.

**Files to Modify:**
- `src/components/global/Footer.js` (reposition or remove logo)

---

### 7. **Social Media Icons**
**Priority:** MEDIUM
**Status:** Exists but needs repositioning

**Current:** Social icons in `.footer__content` section
**Required:** Likely below the 3 columns or removed

**Tasks:**
- [ ] Determine placement from full Figma design:
  - Below the 3-column grid (centered)
  - In footer bottom section
  - Removed entirely
- [ ] Reposition `.socials` container accordingly
- [ ] Ensure icons use blue color (#1F5EFF) per design system
- [ ] Verify all 10 social platforms are needed

**Current Social Links:**
- Facebook, Twitter, Instagram, GitHub, Discord
- Telegram, Reddit, LinkedIn, WeChat, YouTube

**Files to Modify:**
- `src/components/global/Footer.js` (reposition socials)
- `src/scss/_footer.scss` (social icon styling)

---

### 8. **Copyright Notice**
**Priority:** LOW
**Status:** Exists but needs repositioning

**Current:** Copyright in `.footer__content`
**Required:** Likely in footer bottom, right-aligned

**Tasks:**
- [ ] Create `.footer__bottom` section if not exists
- [ ] Move copyright to bottom section
- [ ] Right-align or center copyright
- [ ] Verify text: "© 2025 Syscoin. All rights reserved"
- [ ] Use smaller, muted text color

**Files to Modify:**
- `src/components/global/Footer.js` (reposition copyright)
- `src/scss/_footer.scss` (bottom section styling)

---

### 9. **Responsive Layout**
**Priority:** HIGH
**Status:** Needs Implementation

**Current:** Basic responsive in SCSS
**Required:** Proper mobile/tablet stacking

**Tasks:**
- [ ] Desktop (>1024px): 3 columns side-by-side
- [ ] Tablet (768px-1023px): 3 columns, adjust spacing
- [ ] Mobile (<768px): Stack columns vertically
- [ ] Test email form on mobile (full-width button)
- [ ] Test navigation links on mobile (readable spacing)
- [ ] Verify touch targets are at least 44px

**Breakpoints to Test:**
- Mobile: 375px, 414px, 768px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px

**Files to Modify:**
- `src/scss/_footer.scss` (media queries already exist, verify)

---

### 10. **Color Scheme Compliance**
**Priority:** HIGH
**Status:** Needs Verification

**Current:** Using design tokens
**Required:** Match Figma colors exactly

**Tasks:**
- [ ] Headers: #FBB03B (orange - `$color-primary`)
- [ ] Background: Dark (#0A0A0A or similar - `$color-surface`)
- [ ] Text links: Light gray with opacity
- [ ] Button: Orange (#FBB03B) with white text
- [ ] Input: Dark background, light border
- [ ] Social icons: Blue (#1F5EFF - `$color-secondary`)

**Files to Check:**
- `src/scss/_design-tokens.scss` (verify color values)
- `src/scss/_footer.scss` (use design tokens)

---

### 11. **Typography**
**Priority:** MEDIUM
**Status:** Needs Verification

**Current:** Using design system typography
**Required:** Match Figma font sizes and weights

**Tasks:**
- [ ] Column headers: 14px, uppercase, semi-bold, letter-spacing
- [ ] Navigation links: Body small (12-14px), regular weight
- [ ] Input placeholder: Body small, light color
- [ ] Button text: Medium weight, uppercase or sentence case
- [ ] Copyright: Extra small (11-12px), light weight

**Files to Modify:**
- `src/scss/_footer.scss` (typography already uses mixins)

---

### 12. **Spacing & Layout**
**Priority:** MEDIUM
**Status:** Needs Adjustment

**Current:** Using design tokens for spacing
**Required:** Match Figma spacing exactly

**Tasks:**
- [ ] Column gap: ~40-60px between columns
- [ ] Header margin-bottom: ~16-24px
- [ ] Link spacing: ~12-16px between links
- [ ] Input + Button gap: ~8-12px
- [ ] Top/bottom padding: ~40-60px
- [ ] Measure exact values from Figma if possible

**Files to Modify:**
- `src/scss/_footer.scss` (adjust spacing values)

---

### 13. **Interactions & States**
**Priority:** MEDIUM
**Status:** Partially Implemented

**Current:** Basic hover states
**Required:** Full interaction states

**Tasks:**
- [ ] Link hover: Color change to orange
- [ ] Button hover: Slight darken + translateY effect
- [ ] Button active: Press effect
- [ ] Input focus: Border color change to orange
- [ ] Social icon hover: Background + color change
- [ ] Add smooth transitions (0.2-0.3s)

**Files to Modify:**
- `src/scss/_footer.scss` (already has transitions, verify)

---

## 📝 Implementation Priority Order

### Phase 1: Structure (Must Have)
1. Convert to 3-column grid layout
2. Add column headers (SENTRYNODES, RESOURCES, STAY UPDATED!)
3. Reorganize navigation links into SENTRYNODES column
4. Create RESOURCES column with NEWS link
5. Create STAY UPDATED! column structure

### Phase 2: Subscription Form (Must Have)
6. Add email input field
7. Add "Subscribe now" button with icon
8. Style form components
9. Add form validation
10. Add submission handler (placeholder/mock for now)

### Phase 3: Positioning (Should Have)
11. Reposition logo (or remove if not in design)
12. Reposition social icons
13. Reposition copyright

### Phase 4: Polish (Nice to Have)
14. Verify responsive breakpoints
15. Test all interaction states
16. Fine-tune spacing and typography
17. Cross-browser testing

---

## 🎯 Key Questions - RESOLVED

1. **Logo:** ✅ Top-left with tagline "Anchoring the final ledger of Web3 with Bitcoin's security and modular scalability." below it
2. **Social Icons:** ✅ Place after logo + tagline section, before copyright
3. **NEWS Link:** ✅ Use dummy link `#news` for now
4. **Newsletter API:** ✅ Console.log the email for now (no backend yet)
5. **FAQ Link:** Not mentioned - only NEWS in RESOURCES column

---

## 📦 Files That Will Be Modified

### JavaScript/JSX
- `src/components/global/Footer.js` - Complete restructure

### SCSS
- `src/scss/_footer.scss` - Update grid, spacing, positioning

### Potentially New Files
- Newsletter subscription handler (if API needed)
- `/news` route component (if NEWS link is internal)

---

## 🧪 Testing Checklist

- [ ] Visual comparison with Figma design
- [ ] Desktop layout (1920px, 1440px, 1280px)
- [ ] Tablet layout (1024px, 768px)
- [ ] Mobile layout (414px, 375px)
- [ ] All links functional
- [ ] Email validation works
- [ ] Subscribe button submits (or shows placeholder)
- [ ] Hover states on all interactive elements
- [ ] Focus states for keyboard navigation
- [ ] Color contrast meets WCAG AA standards
- [ ] Touch targets at least 44x44px on mobile

---

## 📸 Reference

**Figma Export Provided:**
- 3-column layout visible
- Headers: SENTRYNODES, RESOURCES, STAY UPDATED!
- NEWS link under RESOURCES
- Email input + Subscribe button under STAY UPDATED!

**Full Design Needed:**
- Logo placement
- Social icons placement
- Copyright placement
- Complete mobile layout

---

**Next Steps:**
1. Review full Figma design file if available
2. Clarify questions about missing elements
3. Begin Phase 1 implementation (structure)
4. Get newsletter subscription API endpoint
5. Implement and test

**Estimated Time:** 3-4 hours for complete implementation + testing
