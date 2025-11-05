import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';

/**
 * Component of the Footer of sysnode it has all the icons of the syscoin social media
 * Updated to match Figma design with 3-column layout
 * @component
 * @subcategory Global
 */
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handleSubscribe = (e) => {
        e.preventDefault();
        // For now, just console.log the email
        console.log('Newsletter subscription email:', this.state.email);
        // TODO: Implement API call to newsletter service
        // Reset form
        this.setState({ email: '' });
        // Show success message (future enhancement)
        alert('Thank you for subscribing! (This is a placeholder - no actual subscription yet)');
    }

    render() {
        return (
            <footer className="footer">
                <div className="shell">
                    {/* Main Content Area: Logo/Tagline on Left, 3 Columns on Right */}
                    <div className="footer__main">
                        {/* Left Side: Logo and Tagline */}
                        <div className="footer__branding">
                            <Link to="/" className="footer__logo">
                                <div
                                    className="logo"
                                    style={{
                                        backgroundImage: `url(/assets/images/logo.svg)`,
                                    }}
                                ></div>
                            </Link>
                            <p className="footer__tagline">
                                Anchoring the final ledger of Web3 with Bitcoin's security and modular scalability.
                            </p>
                        </div>

                        {/* Right Side: 3 Columns */}
                        <div className="footer__columns">
                            {/* Column 1: SENTRYNODES */}
                            <div className="footer__column">
                                <h3 className="footer__column-title">SENTRYNODES</h3>
                                <ul className="footer__links">
                                    <li className="footer__link">
                                        <Link to="/about">About</Link>
                                    </li>
                                    <li className="footer__link">
                                        <Link to="/stats">Stats</Link>
                                    </li>
                                    <li className="footer__link">
                                        <a
                                            href="https://support.syscoin.org/t/syscoin-nexus-sentry-node-install-guide/463"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            Setup
                                        </a>
                                    </li>
                                    <li className="footer__link">
                                        <Link to="/governance">Governance</Link>
                                    </li>
                                    <li className="footer__link">
                                        <a
                                            href="https://support.syscoin.org/"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            Support
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 2: RESOURCES & NEWS */}
                            <div className="footer__column">
                                <h3 className="footer__column-title">RESOURCES</h3>
                                <ul className="footer__links">
                                    <li className="footer__link">
                                        <a
                                            href="https://docs.syscoin.org"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            Documentation
                                        </a>
                                    </li>
                                    <li className="footer__link">
                                        <a
                                            href="https://support.syscoin.org/hc/en-us"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            FAQs
                                        </a>
                                    </li>
                                </ul>

                                <h3 className="footer__column-title footer__column-title--secondary">NEWS</h3>
                                <ul className="footer__links">
                                    <li className="footer__link">
                                        <a
                                            href="https://syscoin.org/news"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                    <li className="footer__link">
                                        <a
                                            href="https://syscoin.org/news"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            Updates
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 3: STAY UPDATED! */}
                            <div className="footer__column">
                                <h3 className="footer__column-title">STAY UPDATED!</h3>
                                <div className="footer__subscribe">
                                    <p className="footer__subscribe-text">
                                        Get the latest on the modular Bitcoin stack, direct to your inbox.
                                    </p>
                                    <form className="footer__subscribe-form" onSubmit={this.handleSubscribe}>
                                        <input
                                            type="email"
                                            placeholder="youremail@example.com"
                                            value={this.state.email}
                                            onChange={this.handleEmailChange}
                                            required
                                            aria-label="Email address"
                                            className="footer__subscribe-input"
                                        />
                                        <button type="submit" className="footer__subscribe-button">
                                            <span className="arrow">→</span>
                                            Subscribe now
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Copyright and Legal Links */}
                    <div className="footer__bottom">
                        <div className="footer__copyright">
                            <p>© {new Date().getFullYear()} Syscoin. All Rights Reserved.</p>
                        </div>
                        <div className="footer__legal">
                            <a href="/privacy-policy">Privacy Policy</a>
                            <a href="/terms-of-service">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
