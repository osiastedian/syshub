import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { useUser } from "../../context/user-context";
import { mainNavigationItems, userMenuItems } from "../../config/navigation";

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
  const [isMobileMenu, setIsMobileMenu] = useState(false);

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
   * Function that handles the activation of the responsive menu
   * @function
   */
  const menuLinks = () => {
    if (isMobileMenu) {
      toggleMenu();
    }
  };

  /**
   * Function that toggles the state of isMobileMenu
   * @function
   */
  const toggleMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };

  /**
   * Function that triggers the logoutUser of the context
   * @function
   */
  const logout = () => {
    logoutUser();
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
    <header className={`header ${isNotTop ? "fixed" : ""}`}>
      {/* TODO: add className "fixed" to .header when scroll > 0 */}
      <div className="container">
        <div className="header__inner">
          <Link to="/" onClick={menuLinks}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(/assets/images/logo.svg)`,
              }}
            ></div>
          </Link>
          {/* Hamburger menu button - visible only on mobile */}
          <button
            className={`nav-trigger ${isMobileMenu ? "nav-trigger--active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation content - toggleable on mobile */}
          <div className={`header__content ${isMobileMenu ? "open" : ""}`}>
            <nav className="nav">
              <ul style={{ width: "100%" }}>
                {mainNavigationItems.map((item, index) => (
                  <li key={index} onClick={menuLinks}>
                    {item.external ? (
                      <a
                        href={item.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {t(item.labelKey)}
                      </a>
                    ) : (
                      <Link to={item.path}>{t(item.labelKey)}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

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
                onClick={toggleMenu}
                className="header__menu-btn"
              >
                <span className="header__menu-btn__icon">
                  <i className="icon-user"></i>
                </span>
                <span className="header__menu-btn__text">{usernameWithEmail(user)}</span>
              </button>
              <div className={`header__user-dropdown ${isMobileMenu ? "open" : ""}`}>
                <ul>
                  {userMenuItems.map((item, index) => {
                    // Skip admin-only items if user is not admin
                    if (item.adminOnly && userAdmin !== "admin") {
                      return null;
                    }
                    return (
                      <li key={index} onClick={menuLinks}>
                        <Link to={item.path}>{t(item.labelKey)}</Link>
                      </li>
                    );
                  })}
                  <li onClick={menuLinks}>
                    <button className="nav-btn" onClick={logout}>
                      {t("header.logout")}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default withTranslation()(Header);
