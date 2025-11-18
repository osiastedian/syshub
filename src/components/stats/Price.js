import React, { Component } from 'react';
import { withTranslation } from "react-i18next";

/**
 * Component to show the price data
 * @component
 * @subcategory Stats
 * @param {*} props t from withTranslation and priceData
 * @example
 * const priceData = {}
 * return (
 *  <Price priceData={priceData} />
 * )
 */
class Price extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            priceData: []
        }
    }

    /**
     * DidMount to set the state with the props
     * @function
     */
    componentDidMount() {
        this.setState({
            dataload: 1,
            priceData: this.props.priceData
        });
    }

    /**
     * a function that replaces , as separation with blank spaces
     * @function
     * @param {number} number a number to give format
     */
    formatNumber = (number) => {
        return Number(number.toString().replace(/,/g, ''));
    }

    /**
     * function that returns a string of price with an icon
     * @function
     * @param {*} price the price used to know if the value is positive or negative
     * @returns {string}
     */
    priceWizard = (price) => {
        var html = price;
        if(parseFloat(price) > 0) {
            html = price + " ▲";
        } else if(parseFloat(price) < 0) {
            html = price + " ▼";
        }
        return html;
    }

    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
            return (
                <>
                    <h2 className="section-title">PRICE STATS</h2>
                    <div className="row row-cols-1 row-cols-lg-4 g-4">
                        <div className="col">
                            <div className="d-flex flex-column align-items-center gap-3">
                                <span className="stat_value">
                                    ${this.state.priceData.price_usd}
                                    <br />
                                    {this.state.priceData.price_btc} BTC
                                </span>
                                <span className="stat_label">{t('price.priceTable.price')}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="d-flex flex-column align-items-center gap-3">
                                <span className="stat_value">
                                    ${this.state.priceData.volume_usd}
                                    <br />
                                    {this.state.priceData.volume_btc} BTC
                                </span>
                                <span className="stat_label">{t('price.priceTable.volume')}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="d-flex flex-column align-items-center gap-3">
                                <span className="stat_value">
                                    ${this.state.priceData.market_cap_usd}
                                    <br />
                                    {this.state.priceData.market_cap_btc} BTC
                                </span>
                                <span className="stat_label">{t('price.priceTable.marketcap')}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="d-flex flex-column align-items-center gap-3">
                                <span className="stat_value">
                                    {this.priceWizard(this.state.priceData.price_change)}
                                </span>
                                <span className="stat_label">{t('price.priceTable.change')}</span>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return(
                <p>{t('price.loading')}</p>
            )
        }
    }
}

export default withTranslation()(Price);
