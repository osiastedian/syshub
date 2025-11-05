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
                    {/* Logo and Tagline Section */}
                    <div className="footer__header">
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

                    {/* 3-Column Layout */}
                    <div className="footer__inner">
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
                                    <Link to="/sentrynodes">SentryNode</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2: RESOURCES */}
                        <div className="footer__column">
                            <h3 className="footer__column-title">RESOURCES</h3>
                            <ul className="footer__links">
                                <li className="footer__link">
                                    <a
                                        href="https://support.syscoin.org/hc/en-us"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        FAQ
                                    </a>
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

                        {/* Column 3: STAY UPDATED! */}
                        <div className="footer__column">
                            <h3 className="footer__column-title">STAY UPDATED!</h3>
                            <div className="footer__subscribe">
                                <p className="footer__subscribe-text">
                                    Get the latest updates and news delivered to your inbox.
                                </p>
                                <form className="footer__subscribe-form" onSubmit={this.handleSubscribe}>
                                    <input
                                        type="email"
                                        placeholder="youremail@example.com"
                                        value={this.state.email}
                                        onChange={this.handleEmailChange}
                                        required
                                        aria-label="Email address"
                                    />
                                    <button type="submit">
                                        Subscribe now
                                        <span className="arrow">→</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Icons */}
                    <div className="footer__social-section">
                        <div className="socials">
                            <ul>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www.facebook.com/Syscoin/"
                                        aria-label="Facebook"
                                    >
                                        <i className="ico-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://twitter.com/syscoin"
                                        aria-label="Twitter"
                                    >
                                        <i className="ico-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www.instagram.com/syscoin_org/"
                                        aria-label="Instagram"
                                    >
                                        <i className="ico-instagram"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://github.com/syscoin"
                                        aria-label="GitHub"
                                    >
                                        <i className="ico-bitcoin"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://discord.com/invite/syscoin"
                                        aria-label="Discord"
                                    >
                                        <i className="ico-discord"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://t.me/Syscoin_Official"
                                        aria-label="Telegram"
                                    >
                                        <i className="ico-send"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www.reddit.com/r/SysCoin/"
                                        aria-label="Reddit"
                                    >
                                        <i className="ico-reddit"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www.linkedin.com/company/syscoin/"
                                        aria-label="LinkedIn"
                                    >
                                        <i className="ico-linkedin"></i>
                                    </a>
                                </li>
                                <li>
                                    <button
                                        className="wechat-qr prevent"
                                        title="WeChat QR Code"
                                        style={{border: 'none', background:'none'}}
                                        data-tip
                                        data-for="wechat-qr-code"
                                        aria-label="WeChat"
                                    >
                                        <i className="ico-wechat"></i>
                                    </button>
                                    <ReactTooltip
                                        id="wechat-qr-code"
                                        aria-haspopup="true"
                                        className="tooltipSysClass"
                                        backgroundColor="#242652"
                                    >
                                        <img src="/assets/images/wechat-qr.png" alt="wechat qr code" />
                                    </ReactTooltip>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www.youtube.com/@Syscoin"
                                        aria-label="YouTube"
                                    >
                                        <i className="ico-youtube"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="footer__bottom">
                        <div className="footer__copyright">
                            <p>© {new Date().getFullYear()} Syscoin. All rights reserved</p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
