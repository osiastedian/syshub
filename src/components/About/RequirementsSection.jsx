import React from "react";
import { withTranslation } from "react-i18next";
import ArrowIcon from "../../images/arrow-right-requirement.svg";

/**
 * Requirements section listing Sentry Node setup requirements
 * @component
 * @category About Components
 */
const RequirementsSection = ({ t }) => {
  const requirementKeys = [
    "about.requirements.requirement.r1",
    "about.requirements.requirement.r2",
    "about.requirements.requirement.r3",
    "about.requirements.requirement.r4",
    "about.requirements.requirement.r5",
    "about.requirements.requirement.r6",
    "about.requirements.requirement.r7",
    "about.requirements.requirement.r8",
  ];

  return (
    <section className="about-requirements">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="about-requirements__title">
              {t("about.requirements.title")}
            </h2>
            <ul className="about-requirements__list">
              {requirementKeys.map((key) => (
                <li key={key} className="about-requirements__item">
                  <div className="about-requirements__icon">
                    <img src={ArrowIcon} alt="" />
                  </div>
                  <p className="about-requirements__text">{t(key)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation()(RequirementsSection);
