import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../context/user-context';
import { withTranslation } from 'react-i18next';
import './MobileSidebar.scss';

/**
 * Mobile sidebar navigation component
 * Features: User info header, navigation menu with expandable items, footer links
 * Only visible on mobile devices (below 768px)
 * @component
 */
const MobileSidebar = ({ isOpen, onClose, t }) => {
  const location = useLocation();
  const { user, userAdmin, logoutUser } = useUser();
  const [isUserProfileExpanded, setIsUserProfileExpanded] = useState(false);

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const handleNavClick = () => {
    onClose();
  };

  const toggleUserProfile = () => {
    setIsUserProfileExpanded(!isUserProfileExpanded);
  };

  const handleLogout = () => {
    logoutUser();
    onClose();
  };

  // Get user email for display
  const getUserEmail = () => {
    if (user && user.data && user.data.email) {
      return user.data.email;
    }
    return t ? t('header.login') : 'Log In';
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && <div className="mobile-sidebar__backdrop" onClick={onClose} />}

      {/* Sidebar */}
      <div className={`mobile-sidebar ${isOpen ? 'mobile-sidebar--open' : ''}`}>
        {/* Header - User Info */}
        <div className="mobile-sidebar__header">
          <button className="mobile-sidebar__user-btn">
            <span className="mobile-sidebar__user-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1L14 8M14 8L8 15M14 8H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="mobile-sidebar__user-email">{getUserEmail()}</span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mobile-sidebar__nav">
          <Link
            to="/about"
            className={`mobile-sidebar__nav-item ${isActiveLink('/about') ? 'mobile-sidebar__nav-item--active' : ''}`}
            onClick={handleNavClick}
          >
            {t ? t('header.about') : 'About'}
          </Link>

          <Link
            to="/stats"
            className={`mobile-sidebar__nav-item ${isActiveLink('/stats') ? 'mobile-sidebar__nav-item--active' : ''}`}
            onClick={handleNavClick}
          >
            {t ? t('header.stats') : 'Stats'}
          </Link>

          <a
            href="https://support.syscoin.org/t/syscoin-nexus-sentry-node-install-guide/463"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-sidebar__nav-item"
            onClick={handleNavClick}
          >
            {t ? t('header.setup') : 'Setup'}
          </a>

          <Link
            to="/governance"
            className={`mobile-sidebar__nav-item ${isActiveLink('/governance') ? 'mobile-sidebar__nav-item--active' : ''}`}
            onClick={handleNavClick}
          >
            {t ? t('header.governance') : 'Governance'}
          </Link>

          <Link
            to="/sentrynodes"
            className={`mobile-sidebar__nav-item ${isActiveLink('/sentrynodes') ? 'mobile-sidebar__nav-item--active' : ''}`}
            onClick={handleNavClick}
          >
            {t ? t('header.masternodes') : 'SentryNodes'}
          </Link>

          <a
            href="https://support.syscoin.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-sidebar__nav-item"
            onClick={handleNavClick}
          >
            {t ? t('header.support') : 'Support'}
          </a>

          {/* User Menu - Only shown when logged in */}
          {user && (
            <>
              <div className="mobile-sidebar__divider"></div>

              <Link
                to="/profile"
                className={`mobile-sidebar__nav-item ${isActiveLink('/profile') ? 'mobile-sidebar__nav-item--active' : ''}`}
                onClick={handleNavClick}
              >
                {t ? t('header.profile') : 'Profile'}
              </Link>

              <Link
                to="/create-proposal"
                className={`mobile-sidebar__nav-item ${isActiveLink('/create-proposal') ? 'mobile-sidebar__nav-item--active' : ''}`}
                onClick={handleNavClick}
              >
                {t ? t('header.proposal') : 'Create Proposal'}
              </Link>

              {userAdmin === 'admin' && (
                <Link
                  to="/admin"
                  className={`mobile-sidebar__nav-item ${isActiveLink('/admin') ? 'mobile-sidebar__nav-item--active' : ''}`}
                  onClick={handleNavClick}
                >
                  {t ? t('header.admin') : 'Admin'}
                </Link>
              )}

              <Link
                to="/faq"
                className={`mobile-sidebar__nav-item ${isActiveLink('/faq') ? 'mobile-sidebar__nav-item--active' : ''}`}
                onClick={handleNavClick}
              >
                {t ? t('header.faq') : 'FAQ'}
              </Link>

              <button
                className="mobile-sidebar__nav-item mobile-sidebar__logout-btn"
                onClick={handleLogout}
              >
                {t ? t('header.logout') : 'Logout'}
              </button>
            </>
          )}
        </nav>

        {/* Footer Links */}
        <div className="mobile-sidebar__footer">
          <a
            href="/privacy-policy"
            className="mobile-sidebar__footer-link"
            onClick={handleNavClick}
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="mobile-sidebar__footer-link"
            onClick={handleNavClick}
          >
            Terms of Service
          </a>
        </div>
      </div>
    </>
  );
};

export default withTranslation()(MobileSidebar);
