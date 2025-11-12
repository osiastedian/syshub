import React from "react";
import { withTranslation } from "react-i18next";
import "./SenioritySection.scss";

/**
 * Seniority section explaining the Sentry Node seniority mechanism
 * Displays TX data blocks and seniority levels
 * @component
 * @category About Components
 */
const SenioritySection = ({ t }) => {
  const txData = [
    {
      key: "month",
      label: "1 Month =",
      blocks: t("about.seniority.seniority.s2.d2"),
    },
    {
      key: "year",
      label: "1 Year Seniority =",
      blocks: t("about.seniority.seniority.s2.d3"),
    },
    {
      key: "twoHalf",
      label: "2.5 Year Seniority =",
      blocks: t("about.seniority.seniority.s2.d4"),
    },
  ];

  return (
    <section className="about-seniority">
      <div className="about-seniority__wrapper">
        {/* Title and Description */}
        <div className="about-seniority__header">
          <h2 className="about-seniority__title">
            <span style={{ color: "#ffffff" }}>SENTRY NODE SENIORITY</span>
            <span style={{ color: "#fbb03b" }}> EXPLAINED</span>
          </h2>
          <p className="about-seniority__description">
            {t("about.seniority.description")}
          </p>
        </div>

        {/* Middle Section: Three-Column Layout */}
        <div className="about-seniority__middle-section">
          {/* Column 1: Text */}
          <div className="about-seniority__middle-text">
            {t("about.seniority.blockInfo.label")}
          </div>

          {/* Column 2: TX Data Grid */}
          <div className="about-seniority__tx-data-grid">
            {txData.map((data) => (
              <div key={data.key} className={`about-seniority__tx-data-item about-seniority__tx-data-item--${data.key}`}>
                <div className="about-seniority__tx-data-label-text">
                  {data.label}
                </div>
                <div className={`about-seniority__tx-data-blocks about-seniority__tx-data-blocks--${data.key}`}>
                  {data.blocks}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seniority Cards */}
        <div className="about-seniority__cards-container">
          {/* 1 YEAR Card */}
          <div className="seniority-card seniority-card--1year">
            <div className="seniority-card__header">
              <h3 className="seniority-card__title-main">1 YEAR</h3>
              <p className="seniority-card__title-subtitle">35% increase of base rate</p>
            </div>

            <div className="seniority-card__content">
              <h4 className="seniority-card__subheading">
                {t("about.seniority.seniority.s3.title")}
              </h4>

              <div className="seniority-card__text-blocks">
                <p className="seniority-card__text-block">
                  {t("about.seniority.seniority.s3.d1")}
                </p>
                <p className="seniority-card__text-block">
                  {t("about.seniority.seniority.s3.d2")}
                </p>
                <p className="seniority-card__text-block seniority-card__text-block--bold-gold">
                  {t("about.seniority.seniority.s3.d3")}
                </p>
              </div>
            </div>
          </div>

          {/* 2.5 YEARS Card */}
          <div className="seniority-card seniority-card--2half">
            <div className="seniority-card__header">
              <h3 className="seniority-card__title-main">2.5 YEARS</h3>
              <p className="seniority-card__title-subtitle">100% increase of base rate</p>
            </div>

            <div className="seniority-card__content">
              <h4 className="seniority-card__subheading">
                {t("about.seniority.seniority.s4.title")}
              </h4>

              <div className="seniority-card__text-blocks">
                <p className="seniority-card__text-block">
                  {t("about.seniority.seniority.s4.d1")}
                </p>
                <p className="seniority-card__text-block">
                  {t("about.seniority.seniority.s4.d2")}
                </p>
                <p className="seniority-card__text-block seniority-card__text-block--bold-gold">
                  {t("about.seniority.seniority.s4.d3")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="about-seniority__note">
          <p>
            Please note that Seniority is based purely on the{" "}
            <strong>Transaction Block Height</strong>. The <strong>ONLY</strong>{" "}
            thing that will affect your Seniority is if you MOVE YOUR 100,000
            Syscoin, which creates a new transaction, giving you a new Block
            Height. Stopping your Syscoin Sentry Node, restarting your server,
            closing QT, upgrading SentryNodes, Initialising your Sentry Node,
            changing your IP address, and anything you can possibly think of
            does not effect your Seniority.
          </p>
        </div>
      </div>
    </section>
  );
};

export default withTranslation()(SenioritySection);
