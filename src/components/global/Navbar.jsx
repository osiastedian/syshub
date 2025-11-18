import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';

/**
 * Navbar component with glassmorphic styling
 * Features: Logo, navigation links, login button
 * @component
 */
const Navbar = () => {
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div
            className="logo"
            style={{
              backgroundImage: `url(/assets/images/logo-icon.svg)`,
              width: '44.62px',
              height: '42.618px',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </Link>

        {/* Navigation Links - Hidden on mobile */}
        <div className="navbar__links">
          <Link
            to="/about"
            className={`navbar__link ${isActiveLink('/about') ? 'navbar__link--active' : ''}`}
          >
            About
          </Link>
          <Link
            to="/stats"
            className={`navbar__link ${isActiveLink('/stats') ? 'navbar__link--active' : ''}`}
          >
            Stats
          </Link>
          <Link
            to="/governance"
            className={`navbar__link ${isActiveLink('/governance') ? 'navbar__link--active' : ''}`}
          >
            Governance
          </Link>
          <Link
            to="/sentry-nodes"
            className={`navbar__link navbar__link--gold ${isActiveLink('/sentry-nodes') ? 'navbar__link--active' : ''}`}
          >
            SentryNodes
          </Link>
          <a
            href="https://support.syscoin.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__link"
          >
            Support
          </a>
        </div>

        {/* Log In Button */}
        <Link to="/login" className="navbar__login-btn">
          <span className="navbar__login-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1L14 8M14 8L8 15M14 8H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span>Log In</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
