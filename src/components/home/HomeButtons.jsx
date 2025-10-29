import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/user-context";

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
  const { user } = useUser();

  return (
    <div className="article__actions vertical">
      <Link to="/about" className="btn btn-primary">
        Learn More
      </Link>
      <a
        href="https://support.syscoin.org/t/syscoin-nexus-sentry-node-install-guide/463"
        className="btn btn-primary"
        rel="noopener noreferrer"
        target="_blank"
      >
        Setup SentryNode
      </a>
      {!user && (
        <Link to="/signup" className="btn btn-primary">
          Sign up
        </Link>
      )}
    </div>
  );
}
export default HomeButtons;
