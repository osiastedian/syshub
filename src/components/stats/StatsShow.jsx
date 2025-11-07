import React, { Component } from "react";
import { withTranslation } from "react-i18next";
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
        <>
          <div className="stats-grid">
            <div className="text-center">
              <div className="stat-value">
                {statsData.mn_stats.collateral_req} SYS
              </div>
              <div className="stat-label">Collateral</div>
            </div>
            <div className="text-center">
              <div className="stat-value">
                {statsData.mn_stats.masternode_price_usd}
              </div>
              <div className="stat-label">MN Cost</div>
            </div>
            <div className="text-center">
              <div className="stat-value">
                <span title="Return on investment">
                  {statsData.mn_stats.roi}
                </span>
              </div>
              <div className="stat-label">ROI</div>
            </div>
            <div className="text-center">
              <div className="stat-value">
                <span title="Regular SentryNode">
                  {statsData.income_stats.usd.monthly}
                </span>{" "}
                /{" "}
                <span title="SentryNode with 1 year seniority">
                  {statsData.income_stats_seniority_one_year.usd.monthly}
                </span>
              </div>
              <div className="stat-label">Monthly income</div>
            </div>
            <div className="text-center">
              <div className="stat-value">
                {statsData.mn_stats.first_pay}
              </div>
              <div className="stat-label">First reward</div>
            </div>
            <div className="text-center">
              <div className="stat-value">
                {statsData.mn_stats.reward_eligble}
              </div>
              <div className="stat-label">Reward elegibility</div>
            </div>
            <div className="text-center">
              <div className="stat-value">
                <span title="Enabled SentryNodes">
                  {statsData.mn_stats.enabled}
                </span>{" "}
                /{" "}
                <span title="All SentryNodes">{statsData.mn_stats.total}</span>
              </div>
              <div className="stat-label">SentryNodes</div>
            </div>
            <div className="text-center">
              <div className="stat-value">
                {statsData.mn_stats.coins_percent_locked}
              </div>
              <div className="stat-label">SYS collateralized</div>
            </div>
          </div>
        </>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default withTranslation()(StatsShow);
