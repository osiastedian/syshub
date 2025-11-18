import React from "react";
import {MetaTags} from "react-meta-tags";
import {withTranslation} from "react-i18next";

import FormRecover from "../components/recover/formRecover";
import "./Recover.scss";

/**
 * Recover Password page that shows at /recover
 * @component
 * @category Pages
 * @param {*} t t prop received from withTranslation
 */
const Recover = ({ t }) => {
  return (
    <main className="recover-page">
      <MetaTags>
        <title> {t("recover.meta.title")} </title>
        <meta name="keywords" content={t("recover.meta.keywords")}/>
      </MetaTags>

      <section className="recover-section d-flex flex-column align-items-center">
        <h1 className="recover-title text-white text-center">
          {t("recover.data.heading")}
        </h1>
        <FormRecover />
      </section>
    </main>
  )
}

export default withTranslation()(Recover);
