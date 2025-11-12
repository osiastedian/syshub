import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import StatsGrid from '../Stats/StatsGrid';
import StatsCard from '../Stats/StatsCard';
import "./StatsShow.scss";

/**
 * Component to show the stats data
 * @component
 * @subcategory Stats
 * @param {*} props t from withTranslation and statsData
 * @example
 * const statsData = {}
 * return (
 *  <StatsShow statsData={statsData} />
 * )
 */
class StatsShow extends Component {
  /**
   * initialize the state
   * @property {Object}
   */
  state = {
    dataload: 0,
    statsData: [],
  };

  /**
   * DidMount to set the state
   * @function
   */
  componentDidMount() {
    this.setState({
      dataload: 1,
      statsData: this.props.statsData,
    });
  }

  render() {
    const { statsData } = this.state;

    if (this.state.dataload === 1) {
      return (
        <StatsGrid>
          <StatsCard
            label="Collateral"
            value={statsData.mn_stats.collateral_req}
            unit="SYS"
          />
          <StatsCard
            label="MN Cost"
            value={statsData.mn_stats.masternode_price_usd}
          />
          <StatsCard
            label="ROI"
            value={statsData.mn_stats.roi}
          />
          <StatsCard
            label="Monthly income"
            value={statsData.income_stats.usd.monthly}
            subValue={statsData.income_stats_seniority_one_year.usd.monthly}
          />
          <StatsCard
            label="First reward"
            value={statsData.mn_stats.first_pay}
          />
          <StatsCard
            label="Reward elegibility"
            value={statsData.mn_stats.reward_eligble}
          />
          <StatsCard
            label="SentryNodes"
            value={`${statsData.mn_stats.enabled} / ${statsData.mn_stats.total}`}
          />
          <StatsCard
            label="SYS collateralized"
            value={statsData.mn_stats.coins_percent_locked}
          />
        </StatsGrid>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default withTranslation()(StatsShow);
