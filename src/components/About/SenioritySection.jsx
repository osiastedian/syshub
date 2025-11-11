import React from "react";
import { withTranslation } from "react-i18next";

/**
 * Seniority section explaining the Sentry Node seniority mechanism
 * Displays TX data blocks and seniority levels
 * @component
 * @category About Components
 */
const SenioritySection = ({ t }) => {
  const txData = [
    {
      key: "gamma",
      label: t("about.seniority.txData.gamma.label"),
      blocks: t("about.seniority.txData.gamma.blocks"),
    },
    {
      key: "beta",
      label: t("about.seniority.txData.beta.label"),
      blocks: t("about.seniority.txData.beta.blocks"),
    },
    {
      key: "alpha",
      label: t("about.seniority.txData.alpha.label"),
      blocks: t("about.seniority.txData.alpha.blocks"),
    },
  ];

  return (
    <section className="about-seniority">
      <div className="container">
        {/* Title and Description */}
        <div className="row">
          <div className="col-12">
            <div className="about-seniority__header text-center">
              <h2 className="about-seniority__title">
                {t("about.seniority.title")}
              </h2>
              <p className="about-seniority__description">
                {t("about.seniority.description")}
              </p>
            </div>
          </div>
        </div>

        {/* TX Data Blocks */}
        <div className="row">
          <div className="col-12">
            <div className="about-seniority__tx-data">
              <p className="about-seniority__tx-data-label">
                {t("about.seniority.blockInfo.label")}
              </p>
              <div className="about-seniority__tx-data-grid">
                {txData.map((data) => (
                  <div key={data.key} className="about-seniority__tx-data-item">
                    <div className="about-seniority__tx-data-label-text">
                      {data.label}
                    </div>
                    <div className="about-seniority__tx-data-blocks">
                      {data.blocks}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Seniority Cards */}
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="about-seniority__card">
              <h3 className="about-seniority__card-title">
                {t("about.seniority.oneYear.title")}
              </h3>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="about-seniority__card">
              <h3 className="about-seniority__card-title">
                {t("about.seniority.twoAndHalf.title")}
              </h3>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="row">
          <div className="col-12">
            <div className="about-seniority__note text-center">
              <p>{t("about.seniority.note.main")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation()(SenioritySection);
