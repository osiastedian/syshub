import React, { Component } from 'react';
import { withTranslation } from "react-i18next";

/**
 * Component to show the investment data on stats
 * @component
 * @subcategory Stats
 * @param {*} props t from withTranslation and investData from stats
 * @example
 * const investData = {}
 * return (
 *  <Investment investData={investData} />
 * )
 */
class Investment extends Component {
    /**
     * To initialize the state
     * @constructor
     */
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            investData: []
        }
    }
    /**
     * DidMount to set the state
     * @function
     */
    componentDidMount() {
        this.setState({
            dataload: 1,
            investData: this.props.investData
        });
    }
    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
            return (
                <>
                    <h2 className="section-title section-title--black">{t('investment.investmentTable.title')}</h2>
                    <div className="row row-cols-1 row-cols-lg-4 g-4 mb-4">
                        <div className="col">
                            <div className="d-flex flex-column align-items-center gap-3">
                                <span className="stat_value">{this.state.investData.collateral_req}</span>
                                <span className="stat_label">{t('investment.investmentTable.coinsRequired')}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="d-flex flex-column align-items-center gap-3">
                                <span className="stat_value">${this.state.investData.masternode_price_usd}</span>
                                <span className="stat_label">{t('investment.investmentTable.masterNodePrice')}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="d-flex flex-column align-items-center gap-3">
                                <span className="stat_value">{this.state.investData.roi}</span>
                                <span className="stat_label">{t('investment.investmentTable.roi')}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="d-flex flex-column align-items-center gap-3">
                                <span className="stat_value">{this.state.investData.payout_frequency}</span>
                                <span className="stat_label">{t('investment.investmentTable.payoutFrequency')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-lg-2 g-4 justify-content-center">
                        <div className="col">
                            <div className="d-flex flex-column align-items-center gap-3">
                                <span className="stat_value">{this.state.investData.first_pay}</span>
                                <span className="stat_label">{t('investment.investmentTable.firstPayment')}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="d-flex flex-column align-items-center gap-3">
                                <span className="stat_value">{this.state.investData.reward_eligble}</span>
                                <span className="stat_label">{t('investment.investmentTable.rewardAbility')}</span>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return(
                <p>{t('investment.loading')}</p>
            )
        }
    }
}

export default withTranslation()(Investment);
