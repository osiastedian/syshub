import React from "react";
import { withTranslation } from "react-i18next";

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
                  <i className="fa fa-angle-right"></i> {t(key)}
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
