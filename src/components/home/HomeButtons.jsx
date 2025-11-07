import React from "react";
import { Link } from "react-router-dom";

/**
 * Buttons showed on the home image banner
 * @component
 * @subcategory Home
 * @example
 * return (
 *  <HomeButtons />
 * )
 */
function HomeButtons() {
  return (
    <div className="hero-section__actions">
      <Link to="/about" className="hero-btn hero-btn--learn-more">
        <span className="hero-btn__icon">
          <i className="icon-right-open"></i>
        </span>
        <span className="hero-btn__text">Learn More</span>
      </Link>
      <a
        href="https://support.syscoin.org/t/syscoin-nexus-sentry-node-install-guide/463"
        className="hero-btn hero-btn--setup"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="hero-btn__icon">
          <i className="icon-right-open"></i>
        </span>
        <span className="hero-btn__text">Setup SentryNode</span>
      </a>
    </div>
  );
}
export default HomeButtons;
