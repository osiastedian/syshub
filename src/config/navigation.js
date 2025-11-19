/**
 * Navigation configuration - Single source of truth for all navigation items
 * This file defines all navigation links used across desktop and mobile views
 * @module config/navigation
 */

/**
 * Main navigation items
 * @type {Array<{path: string, labelKey: string, external?: boolean, href?: string}>}
 */
export const mainNavigationItems = [
  {
    path: '/about',
    labelKey: 'header.about',
  },
  {
    path: '/stats',
    labelKey: 'header.stats',
  },
  {
    path: null,
    labelKey: 'header.setup',
    external: true,
    href: 'https://support.syscoin.org/t/syscoin-nexus-sentry-node-install-guide/463',
  },
  {
    path: '/governance',
    labelKey: 'header.governance',
  },
  {
    path: '/sentrynodes',
    labelKey: 'header.masternodes',
  },
  {
    path: null,
    labelKey: 'header.support',
    external: true,
    href: 'https://support.syscoin.org/',
  },
];

/**
 * User menu items (shown when authenticated)
 * @type {Array<{path: string, labelKey: string, adminOnly?: boolean}>}
 */
export const userMenuItems = [
  {
    path: '/profile',
    labelKey: 'header.profile',
  },
  {
    path: '/create-proposal',
    labelKey: 'header.proposal',
  },
  {
    path: '/admin',
    labelKey: 'header.admin',
    adminOnly: true,
  },
  {
    path: '/faq',
    labelKey: 'header.faq',
  },
];
