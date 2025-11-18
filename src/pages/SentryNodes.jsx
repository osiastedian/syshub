import React from "react";
import { withTranslation } from "react-i18next";

import MetaTags from "react-meta-tags";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import { MasternodeRegister } from "../components/masternodes/MasternodeRegister";
import MasternodeTable from "../components/masternodes/MasternodeTable";
import './SentryNodes.scss';

/**
 * SentryNodes page that shows at /masternodes
 * @component
 * @category Pages
 */
const SentryNodes = ({ t }) => {
  let { path } = useRouteMatch();

  return (
    <Background>
      <BackgroundInner />
      <main className="sentry-nodes-check-page">
        <MetaTags>
          <title>{t("check.meta.title")}</title>
          <meta name="keywords" content={t("check.meta.keywords")} />
        </MetaTags>
        <div className="sentry-nodes-check-container">
          <Switch>
            <Route exact path={path}>
              <div className="d-flex flex-column align-items-start">
                <h1 className="sentry-nodes-check-title">{t("check.title")}</h1>
                <MasternodeTable path={path} />
              </div>
            </Route>
            <Route path={`${path}/masternode-registration`}>
              <MasternodeRegister />
            </Route>
            <Route path={path}>
              <Redirect to={path} />
            </Route>
          </Switch>
        </div>
      </main>
    </Background>
  );
};

export default withTranslation()(SentryNodes);
