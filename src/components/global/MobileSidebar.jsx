import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../context/user-context';
import './MobileSidebar.scss';

/**
 * Mobile sidebar navigation component
 * Features: User info header, navigation menu with expandable items, footer links
 * Only visible on mobile devices (below 768px)
 * @component
 */
const MobileSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useUser();
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

  // Get user email for display
  const getUserEmail = () => {
    if (user && user.data && user.data.email) {
      return user.data.email;
    }
    return 'User';
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
            About
          </Link>

          {/* User Profile - Expandable */}
          <div className="mobile-sidebar__nav-item-wrapper">
            <button
              className={`mobile-sidebar__nav-item ${isActiveLink('/profile') ? 'mobile-sidebar__nav-item--active' : ''}`}
              onClick={toggleUserProfile}
            >
              <span>User Profile</span>
              <svg
                className={`mobile-sidebar__dropdown-arrow ${isUserProfileExpanded ? 'mobile-sidebar__dropdown-arrow--expanded' : ''}`}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Submenu - shown when expanded */}
            {isUserProfileExpanded && (
              <div className="mobile-sidebar__submenu">
                <Link
                  to="/profile"
                  className="mobile-sidebar__submenu-item"
                  onClick={handleNavClick}
                >
                  Profile Settings
                </Link>
                <Link
                  to="/create-proposal"
                  className="mobile-sidebar__submenu-item"
                  onClick={handleNavClick}
                >
                  Create Proposal
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/stats"
            className={`mobile-sidebar__nav-item ${isActiveLink('/stats') ? 'mobile-sidebar__nav-item--active' : ''}`}
            onClick={handleNavClick}
          >
            Stats
          </Link>

          <Link
            to="/governance"
            className={`mobile-sidebar__nav-item ${isActiveLink('/governance') ? 'mobile-sidebar__nav-item--active' : ''}`}
            onClick={handleNavClick}
          >
            Governance
          </Link>

          <Link
            to="/sentry-nodes"
            className={`mobile-sidebar__nav-item ${isActiveLink('/sentry-nodes') ? 'mobile-sidebar__nav-item--active' : ''}`}
            onClick={handleNavClick}
          >
            SentryNodes
          </Link>

          <a
            href="https://support.syscoin.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-sidebar__nav-item"
            onClick={handleNavClick}
          >
            Support
          </a>
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

export default MobileSidebar;
