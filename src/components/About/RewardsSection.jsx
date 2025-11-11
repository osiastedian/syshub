import React from "react";
import { withTranslation } from "react-i18next";

/**
 * Rewards section explaining Sentry Node rewards
 * @component
 * @category About Components
 */
const RewardsSection = ({ t }) => {
  return (
    <section className="about-rewards">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 order-2 order-lg-1">
            <div className="about-rewards__content">
              <h2 className="about-rewards__title">
                {t("about.rewards.title")}
              </h2>
              <p className="about-rewards__description">
                {t("about.rewards.description.d1")}
              </p>
              <p className="about-rewards__description">
                {t("about.rewards.description.d2")}
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 order-1 order-lg-2">
            <div className="about-rewards__image">
              <img
                src="/assets/images/reward.png"
                alt="Sentry Node Rewards"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation()(RewardsSection);
