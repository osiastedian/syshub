import React from "react";
import { withTranslation } from "react-i18next";

/**
 * Governance section explaining decentralized governance
 * @component
 * @category About Components
 */
const GovernanceSection = ({ t }) => {
  return (
    <section className="about-governance">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 order-2 order-lg-1">
            <div className="about-governance__image">
              <img
                src="/assets/images/governance.png"
                alt="Decentralized Governance"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 order-1 order-lg-2">
            <div className="about-governance__content">
              <h2 className="about-governance__title">
                {t("about.governance.title")}
              </h2>
              <p className="about-governance__question">
                {t("about.governance.question")}
              </p>
              <p className="about-governance__description">
                {t("about.governance.description.d1")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation()(GovernanceSection);
