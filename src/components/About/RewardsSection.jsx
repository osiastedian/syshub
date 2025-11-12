import React from "react";
import { withTranslation } from "react-i18next";

/**
 * Rewards section explaining Sentry Node rewards and seniority benefits
 * Implements Figma design specification (Node 2016:2258)
 * Layout: Centered header section (title + question), then side-by-side content (text left, chart right)
 * @component
 * @category About Components
 */
const RewardsSection = ({ t }) => {
  return (
    <section className="about-rewards">
      {/* Header Section - Centered title only */}
      <div className="about-rewards__header">
        <h2 className="about-rewards__title">
          {t("about.rewards.title")}
        </h2>
      </div>

      {/* Content Section - Text left, Chart right */}
      <div className="about-rewards__content-wrapper">
        {/* Text Content - Left side */}
        <div className="about-rewards__content">
          <div className="about-rewards__description">
            <p>{t("about.rewards.description.d1")}</p>
            <p>{t("about.rewards.description.d2")}</p>
            <p>{t("about.rewards.description.d3")}</p>
          </div>
        </div>

        {/* Chart/Image - Right side */}
        <div className="about-rewards__chart">
          <img
            src="/assets/images/reward.png"
            alt="Masternode Reward Increase"
            className="about-rewards__chart-image"
          />
        </div>
      </div>
    </section>
  );
};

export default withTranslation()(RewardsSection);
