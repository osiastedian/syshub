import React from "react";
import { withTranslation } from "react-i18next";
import "./FeatureCards.scss";

/**
 * Feature cards section displaying 4 key features of Syscoin SentryNodes
 * @component
 * @category About Components
 */
const FeatureCards = ({ t }) => {
  const features = [
    {
      key: "f1",
      icon: "/assets/images/about-icons/about-feature-facilitation.png",
      alt: "Facilitation of future Syscoin features and services",
    },
    {
      key: "f2",
      icon: "/assets/images/about-icons/about-feature-seniority.png",
      alt: "Seniority benefits to masternode operators",
    },
    {
      key: "f3",
      icon: "/assets/images/about-icons/about-feature-zdags.png",
      alt: "Z-DAG Protocol's instant asset transfer",
    },
    {
      key: "f4",
      icon: "/assets/images/about-icons/about-feature-scalability.png",
      alt: "Scalability",
    },
  ];

  return (
    <section className="about-features">
      <div className="container">
        <h2 className="about-features__title text-center">
          {t("about.features.title")}
        </h2>
        <div className="about-features__grid">
          {features.map((feature) => (
            <div key={feature.key} className="about-feature-card">
              <div className="about-feature-card__icon">
                <img
                  src={feature.icon}
                  alt={feature.alt}
                  width="100"
                  height="100"
                />
              </div>
              <p className="about-feature-card__text">
                {t(`about.features.list.${feature.key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default withTranslation()(FeatureCards);
