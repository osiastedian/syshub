import React from "react";
import { withTranslation } from "react-i18next";
import "./HeroSection.scss";

/**
 * Hero section for the About page
 * Displays the main heading, description, and illustration
 * @component
 * @category About Components
 */
const HeroSection = ({ t }) => {
  return (
    <section className="about-hero">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-12 order-2 order-lg-1">
            <div className="about-hero__content">
              <h1 className="about-hero__title">
                {t("about.hero.title")}
              </h1>
              <div className="about-hero__description d-flex flex-column">
                <p className="about-hero__description-paragraph">
                  {t("about.hero.description.p1")}
                </p>
                <p className="about-hero__description-paragraph">
                  {t("about.hero.description.p2")}
                </p>
                <p className="about-hero__description-paragraph">
                  {t("about.hero.description.p3")}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 order-1 order-lg-2">
            <div className="about-hero__image">
              <img
                src="/assets/images/header-img1.png"
                alt="Syscoin SentryNodes"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation()(HeroSection);
