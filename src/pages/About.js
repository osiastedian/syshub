import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import MetaTags from "react-meta-tags";
import "./About.scss";

import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import {
  HeroSection,
  FeatureCards,
  GovernanceSection,
  RewardsSection,
  SenioritySection,
  RequirementsSection,
} from "../components/About";

/**
 * About page - Redesigned with modern component architecture
 * @component
 * @category Pages
 */
class About extends Component {
  render() {
    const { t } = this.props;
    return (
      <Background>
        <BackgroundInner type="clean" />
        <main className="aboutpage container">
          <MetaTags>
            <title>{t("about.meta.title")}</title>
            <meta name="keywords" content={t("about.meta.keywords")} />
          </MetaTags>
          {/* Hero Section */}
          <HeroSection />

          {/* Feature Cards */}
          <FeatureCards />

          {/* Governance Section */}
          <GovernanceSection />

          {/* Rewards Section */}
          <RewardsSection />

          {/* Seniority Section */}
          <SenioritySection />

          {/* Requirements Section */}
          <RequirementsSection />
        </main>
      </Background>
    );
  }
}

export default withTranslation()(About);
