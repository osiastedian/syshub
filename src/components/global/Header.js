import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { useUser } from "../../context/user-context";

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
   * Returns a showable username
   * @function
   * @param {Object} userInfo Using the email of the user to create a showable username on the header
   * @return {string}         Username of the user
   */
  const username = (userInfo) => {
    let username = userInfo.data.email.substring(
      0,
      userInfo.data.email.lastIndexOf("@")
    );

    return username;
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
          {/*TODO:to open mobile menu add className .open to .header__content*/}
          <div className={`header__content ${isMobileMenu ? "open" : ""}`}>
            <nav className="nav">
              <ul style={{ width: "100%" }}>
                <li onClick={menuLinks}>
                  <Link to="/about">{t("header.about")}</Link>
                </li>

                <li onClick={menuLinks}>
                  <Link to="/stats">{t("header.stats")}</Link>
                </li>

                <li onClick={menuLinks}>
                  <a
                    href="https://support.syscoin.org/t/syscoin-nexus-sentry-node-install-guide/463"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {t("header.setup")}
                  </a>
                </li>

                <li onClick={menuLinks}>
                  <Link to="/governance">{t("header.governance")}</Link>
                </li>

                <li onClick={menuLinks}>
                  <Link to="/sentrynodes">{t("header.masternodes")}</Link>
                </li>

                <li onClick={menuLinks}>
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
                <span className="header__menu-btn__text">{username(user)}</span>
              </button>
              <div className={`header__user-dropdown ${isMobileMenu ? "open" : ""}`}>
                <ul>
                  <li onClick={menuLinks}>
                    <Link to="/profile">{t("header.profile")}</Link>
                  </li>
                  <li onClick={menuLinks}>
                    <Link to="/create-proposal">
                      {t("header.proposal")}
                    </Link>
                  </li>
                  {userAdmin === "admin" && (
                    <li onClick={menuLinks}>
                      <Link to="/admin">{t("header.admin")}</Link>
                    </li>
                  )}
                  <li onClick={menuLinks}>
                    <Link to="/faq">{t("header.faq")}</Link>
                  </li>
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
