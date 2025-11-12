import React from "react";
import { withTranslation } from "react-i18next";
import "./GovernanceSection.scss";

/**
 * Governance section explaining decentralized governance
 * Implements Figma design specification (Node 2016:678)
 * Layout: Centered header section, then side-by-side content (chart left, text right)
 * @component
 * @category About Components
 */
const GovernanceSection = ({ t }) => {
  return (
    <section className="about-governance">
      <div className="container d-flex flex-column">
        {/* Header Section - Centered title and question */}
        <div className="about-governance__header d-flex flex-column align-items-center text-center">
          <h2 className="about-governance__title">
            <span style={{ color: '#FBB03B' }}>Decentralized</span> Governance
          </h2>
          <p className="about-governance__question">
            {t("about.governance.question")}
          </p>
        </div>

        {/* Content Section - Chart and text side-by-side */}
        <div className="about-governance__content-wrapper d-flex flex-column flex-md-row align-items-md-center">
          {/* Chart/Image - Left side */}
          <div className="about-governance__image d-flex align-items-center justify-content-center">
            <img
              src="/assets/images/governance.png"
              alt="Decentralized Governance"
            />
          </div>

          {/* Text Content - Right side */}
          <div className="about-governance__content d-flex flex-column">
            <div className="about-governance__description">
              <p>{t("about.governance.description.d1")}</p>
              <p>{t("about.governance.description.d2")}</p>
              <p>{t("about.governance.description.d3")}</p>
              <p>{t("about.governance.description.d4")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation()(GovernanceSection);
