# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SysHub is a React-based governance and masternode management platform for Syscoin. It provides features for user authentication, voting on proposals, governance participation, and masternode registration/management.

**Key Sites:**
- Development: https://syshub-dev.web.app/
- Tech Stack: React 16.14, Firebase (Auth), Bootstrap 5, SCSS, React Router 5
- Node: v20+ | npm: 10.x
- Package Manager: yarn 1.22.22

## Development Commands

```bash
# Start development server (port 3000)
npm start

# Start on alternate port (3001)
npm run dev

# Build for production
npm build

# Run tests
npm test

# Generate JSDoc documentation
npm docs

# Serve production build locally
npm run serve:build

# Take footer screenshot (Puppeteer)
npm run screenshot:footer
```

## Architecture Overview

### Core Structure

**User Context & Authentication** (`src/context/user-context.jsx`):
- Manages global user authentication state via `UserContext`
- Wraps entire app via `UserProvider` in `App.js`
- Provides `useUser()` hook for accessing user data, login, signup, logout, and 2FA operations
- Handles seed generation/encryption for secure credential storage
- Automatically loads user data on app mount and checks auth state

**Firebase Integration** (`src/utils/firebase.js`):
- Singleton Firebase class managing auth operations
- Handles email/password auth, phone auth, 2FA SMS verification
- Manages tokens, password resets, email verification
- Token refresh logic via `refreshInRequest()` to maintain auth state
- Configured via environment variables (API key, project ID, auth domain, sender ID)

**API Communication** (`src/utils/request.js`):
- Axios-based API client with interceptors
- Base URL from `REACT_APP_SYS_API_URI` environment variable
- Auto-redirects to `/login` on 401 responses
- Endpoints for masternodes, governance, proposals, user info, addresses, voting

### Routing Architecture

Routes managed in `src/App.js` using React Router v5:
- **Public Routes**: `/`, `/about`, `/sentrynodes`, `/stats`, `/governance`, `/faq`, `/404`
- **Restricted Auth Routes**: `/login`, `/signup`, `/recover` (redirect if authenticated)
- **Protected Routes**: `/profile`, `/create-proposal`, `/admin` (PrivateRoute component)

Route protection via `PrivateRoute` and `PublicRoute` wrapper components in `src/components/global/`.

### Component Organization

- `src/components/` - Feature-based component organization
  - `global/` - Header, Footer, routing components, shared UI
  - `login/` - Authentication forms
  - `signup/` - Registration forms
  - `profile/` - User profile, address management
  - `governance/` - Governance voting UI
  - `proposal/` - Proposal creation and display
  - `masternodes/` - Masternode registration and management
  - `admin/`, `stats/`, `home/`, `recover/`, `faq/` - Feature pages

- `src/pages/` - Top-level page components (wrappers around feature components)

- `src/utils/` - Utility functions:
  - `auth-token.js` - localStorage management for user data
  - `encryption.js` - Seed creation/encryption for secure storage
  - `firebase.js` - Firebase wrapper (see above)
  - `request.js` - API client (see above)
  - `sign-vote.js` - Voting signature generation (crypto)
  - `twoFaAuthentication.js` - 2FA TOTP utilities
  - `errorHandler.js` - Error logging/formatting
  - `networks.js` - Network configuration
  - `phoneUtil.js` - Phone number validation

### State Management

- **User Context** (`useUser()` hook) for global user/auth state
- **Local state** in components via `useState` hook
- **Environment variables** for configuration (loaded from `.env`)

### Cryptography & Security

The codebase uses several crypto libraries for blockchain operations:
- `@bitcoinerlab/secp256k1`, `secp256k1`, `tiny-secp256k1` - Elliptic curve crypto
- `@noble/hashes` - Hash functions
- `@scure/bip32`, `@scure/base` - BIP32 derivation and encoding
- `bitcoinjs-lib` - Bitcoin/Syscoin operations
- `crypto-js` - Encryption utilities
- Seeds are encrypted with password and stored locally

### Styling & Design System

- SCSS modules in `src/scss/styles.scss`
- Bootstrap 5 for component styling
- CSS-in-JS possible via inline styles

**Design System Structure:**
- Design tokens defined in `src/scss/_design-tokens.scss` (shared across all components)
- Global component styles: `src/scss/` directory (buttons, inputs, cards, tables, modal, icons, etc.)
- Page-specific component styles: Colocated with components (e.g., `src/components/About/HeroSection.scss` with `src/components/About/HeroSection.jsx`)
- All component SCSS files import shared design tokens: `@import '../../scss/design-tokens';`
- Breakpoints: `$breakpoint-md` (768px for mobile), `$breakpoint-lg` (992px), `$breakpoint-sm` (576px)
- Typography mixins: `typography-hero-h1`, `typography-section-h2`, `typography-body-large-regular`
- Color tokens: `$color-text`, `$color-primary`, `$color-brand-gold`, `$color-brand-blue`, `$color-neutral-white`, `$color-neutral-black`
- Spacing tokens: `$space-lg` (24px), `$space-xl` (32px), `$space-2xl` (64px), `$space-3xl` (100px)

**Responsive Design Standards (Figma Mobile Spec: node-id=2082-12308):**
- Mobile padding: 60px vertical (3.75rem), 16px horizontal (1rem)
- Desktop padding: 100px vertical (6.25rem), 180px horizontal (11.25rem)
- Mobile gaps between sections: 24px (1.5rem)
- Typography: Different sizes for desktop vs mobile (e.g., 38px desktop → 32px mobile)
- Layout: Desktop flex-row layouts convert to flex-column on mobile with center alignment
- Labels/text splitting: Content that doesn't fit mobile is split in translation files

**About Page Redesign (Figma: https://www.figma.com/design/azvuitP9PvixRa2SM1sLXj/SentryNodes)**
Hybrid SCSS architecture - page-level and component-level styles:

**Page-level styles** (`src/scss/_pages/_about.scss`):
- Container styles (`.aboutpage`)
- Imported in both `src/pages/About.js` and global `src/scss/styles.scss`

**Component-level styles** (colocated in `src/components/About/`):
- Each section component has its own SCSS file (imported in the component):
  - `HeroSection.jsx` + `HeroSection.scss`: 100px gap between image/content, responsive typography
  - `FeatureCards.jsx` + `FeatureCards.scss`: Icon + text cards, 24px gap on mobile
  - `GovernanceSection.jsx` + `GovernanceSection.scss`: Governance section styling
  - `RewardsSection.jsx` + `RewardsSection.scss`: Rewards section styling
  - `SenioritySection.jsx` + `SenioritySection.scss`: TX data items stay horizontal on mobile with space-between
  - `RequirementsSection.jsx` + `RequirementsSection.scss`: Centered desktop (993px max-width), left-aligned mobile
- Each component SCSS imports design tokens: `@import '../../scss/design-tokens';`
- Each component imports its own SCSS: `import "./SectionName.scss";`

**Translation patterns**: Split content for mobile (e.g., TX data labels separate from block numbers in `src/shared/locales/en/pages/about/index.js`)

### Internationalization

- i18next for multi-language support (`src/shared/i18n.js`)
- Language detection and HTTP backend for loading translations
- Locale files in `src/shared/locales/`

### Build Configuration

- **Webpack Customization**: `config-overrides.js` for CRA customization
  - Provides Node.js module polyfills (crypto, buffer, stream, url, util, vm)
  - Copies images to `assets/images/` directory
  - Provides global Buffer and process.browser
- **Firebase Hosting**: `firebase.json` configures SPA rewrites for routing
- **JSDoc Configuration**: `jsdoc.conf.json` for auto-generated docs

## Key Patterns & Important Details

### 2FA Implementation
- Located in `src/utils/twoFaAuthentication.js`
- Uses speakeasy library for TOTP (Time-based One-Time Password)
- SMS-based phone verification via Firebase PhoneAuthProvider
- **Important**: 2FA must be verified before persisting user session (see `user-context.jsx`)

### Voting & Proposals
- Vote signing via `src/utils/sign-vote.js` (crypto operations)
- Vote constants in `src/constants/votes.js`
- Proposal creation/voting handled through governance components

### Testing Setup
- React Testing Library with Jest
- Basic setup in `src/App.test.js` - mocks App to avoid heavy imports
- Test helpers in `src/test/setup-user-context-mock.js` for mocking UserContext
- Run: `npm test` (runs in watch mode)

### Environment Variables
Required in `.env` (see `.env_example`):
- Firebase config: `REACT_APP_FIREBASE_KEY`, `REACT_APP_FIREBASE_PROJECT_ID`, `REACT_APP_FIREBASE_DOMAIN`, `REACT_APP_FIREBASE_SENDER_ID`
- API: `REACT_APP_SYS_API_URI`, `REACT_APP_CLIENT`
- ReCAPTCHA: `RECAPTCHA_SITE`, `RECAPTCHA_SECRET`
- Encryption: `REACT_APP_ENCRYPT_KEY_DATA`
- Maps: Source map generation with `GENERATE_SOURCEMAP`

### Common Development Tasks

**Adding a New Page:**
1. Create component in `src/pages/PageName.jsx`
2. Add route in `src/App.js` Switch statement
3. Use `PrivateRoute` for protected pages, `PublicRoute` for public pages

**Using User Context:**
```jsx
import { useUser } from '../context/user-context';

function MyComponent() {
  const { user, loginUser, logoutUser, ... } = useUser();
  // user.data contains Firebase user, user.token contains auth token
}
```

**Making API Calls:**
```jsx
import { apiClient } from '../utils/request';

// apiClient is axios instance with base URL and interceptors
await apiClient.get('/endpoint');
```

**Encrypting Sensitive Data:**
- Use `createSeed(password)` to create/encrypt seed
- Use `getSeed()` to retrieve encrypted seed
- Use `removeSeed()` to clear seed on logout

## Important Gotchas

- **Webpack Polyfills**: Node.js modules are polyfilled for browser use (crypto, buffer, etc.) - don't assume they work as in Node.js
- **Firebase Token Expiration**: App calls `firebase.refreshInRequest()` before API calls to refresh expired tokens
- **localStorage Clearing on 401**: API interceptor clears all localStorage and redirects to `/login` on auth failures - be aware when testing
- **Phone Auth Only for 2FA**: Phone authentication is primarily for SMS-based 2FA, not standalone login
- **SCSS Scope**: Bootstrap is imported globally, so be cautious with naming conflicts
