import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { useUser } from "../../context/user-context";
import MobileSidebar from "./MobileSidebar";

/**
 * Component that shows the Header alongside with the navbar
 * @component
 * @subcategory Global
 * @param {*} props the T prop comes from withTranslation to use react-i18next
 */
function Header({ t }) {
  const { user, userAdmin, logoutUser } = useUser();

  const isMounted = useRef(false);

  const [isNotTop, setIsNotTop] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  /**
   * UseEffect used to add the scroll event so the navbar gets fixed
   * @function
   */
  useEffect(() => {
    isMounted.current = true;
    document.addEventListener("scroll", () => {
      const _isNotTop = window.scrollY > 0;
      if (_isNotTop !== isNotTop) {
        if (isMounted.current) setIsNotTop(_isNotTop);
      }
    });
    return () => {
      isMounted.current = false;
    };
  });

  /**
   * Function that toggles the mobile sidebar
   * @function
   */
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  /**
   * Function that closes the mobile sidebar
   * @function
   */
  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  /**
   * Function that toggles the user dropdown menu (desktop)
   * @function
   */
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  /**
   * Function that triggers the logoutUser of the context
   * @function
   */
  const logout = () => {
    logoutUser();
    setIsUserDropdownOpen(false);
  };

  /**
   * Returns username with email in parentheses
   * @function
   * @param {Object} userInfo Using the email of the user
   * @return {string}         Username (email)
   */
  const usernameWithEmail = (userInfo) => {
    let username = userInfo.data.email.substring(
      0,
      userInfo.data.email.lastIndexOf("@")
    );
    return `${username}(${userInfo.data.email})`;
  };

  return (
    <>
      <header className={`header ${isNotTop ? "fixed" : ""}`}>
        <div className="container">
          <div className="header__inner">
            <Link to="/">
              <div
                className="logo"
                style={{
                  backgroundImage: `url(/assets/images/logo.svg)`,
                }}
              ></div>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="header__content">
              <nav className="nav">
                <ul style={{ width: "100%" }}>
                  <li>
                    <Link to="/about">{t("header.about")}</Link>
                  </li>
                  <li>
                    <Link to="/stats">{t("header.stats")}</Link>
                  </li>
                  <li>
                    <a
                      href="https://support.syscoin.org/t/syscoin-nexus-sentry-node-install-guide/463"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t("header.setup")}
                    </a>
                  </li>
                  <li>
                    <Link to="/governance">{t("header.governance")}</Link>
                  </li>
                  <li>
                    <Link to="/sentrynodes">{t("header.masternodes")}</Link>
                  </li>
                  <li>
                    <a
                      rel="noopener noreferrer"
                      href="https://support.syscoin.org/"
                      target="_blank"
                    >
                      {t("header.support")}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="header__actions">
              {!user && (
                <Link to="/login" className="header__login-btn">
                  <span className="header__login-btn__icon">
                    <i className="icon-right-open"></i>
                  </span>
                  <span className="header__login-btn__text">{t("header.login")}</span>
                </Link>
              )}

              {user && (
                <div style={{ position: "relative" }}>
                  <button
                    onClick={toggleUserDropdown}
                    className="header__menu-btn"
                  >
                    <span className="header__menu-btn__icon">
                      <i className="icon-user"></i>
                    </span>
                    <span className="header__menu-btn__text">{usernameWithEmail(user)}</span>
                  </button>
                  <div className={`header__user-dropdown ${isUserDropdownOpen ? "open" : ""}`}>
                    <ul>
                      <li onClick={toggleUserDropdown}>
                        <Link to="/profile">{t("header.profile")}</Link>
                      </li>
                      <li onClick={toggleUserDropdown}>
                        <Link to="/create-proposal">
                          {t("header.proposal")}
                        </Link>
                      </li>
                      {userAdmin === "admin" && (
                        <li onClick={toggleUserDropdown}>
                          <Link to="/admin">{t("header.admin")}</Link>
                        </li>
                      )}
                      <li onClick={toggleUserDropdown}>
                        <Link to="/faq">{t("header.faq")}</Link>
                      </li>
                      <li onClick={toggleUserDropdown}>
                        <button className="nav-btn" onClick={logout}>
                          {t("header.logout")}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Hamburger Menu Button - Only on mobile */}
              <button
                className="header__hamburger"
                onClick={toggleMobileSidebar}
                aria-label="Toggle mobile menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar} />
    </>
  );
}
export default withTranslation()(Header);
