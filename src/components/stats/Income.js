import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import './Income.scss';

/**
 * Component to show the income data on stats
 * @component
 * @subcategory Stats
 * @param {*} props t from withTranslation and incomeData, incomeSenOneYrData, incomeSenTwoYrData from stats
 * @example
 * const incomeData = {}
 * const incomeSenOneYrData = {}
 * const incomeSenTwoYrData = {}
 * return (
 *  <Income incomeData={incomeData} incomeSenOneYrData={incomeSenOneYrData} incomeSenTwoYrData={incomeSenTwoYrData} />
 * )
 */
class Income extends Component {
    /**
     * To initialize the empty state
     * @constructor
     */
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            incomeData: [],
            incomeSenOneYrData: [],
            incomeSenTwoYrData: []
        }
    }

    /**
     * DidMount to set the state with the props
     * @function
     */
    componentDidMount() {
        this.setState({
            dataload: 1,
            incomeData: this.props.incomeData,
            incomeSenOneYrData: this.props.incomeSenOneYrData,
            incomeSenTwoYrData: this.props.incomeSenTwoYrData
        });
    }
    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
        return(
            <>
                <h2 className="section-title">INCOME STATS</h2>
                <div className="income-stats-container">
                    {/* Desktop table: hidden on mobile */}
                    <div className="table-resp d-none d-md-block">
                        <div className="check_table">
                            <table className="seniority">
                            <thead>
                                <tr>
                                <td>Seniority</td>
                                <td>Daily</td>
                                <td>Weekly</td>
                                <td>Monthly</td>
                                <td>Yearly</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Less than 1 Year</td>
                                <td>
                                    {this.state.incomeData.usd.daily}
                                    <br />
                                    {this.state.incomeData.btc.daily}
                                    <br />
                                    <span className="sb">{this.state.incomeData.sys.daily}</span>
                                </td>
                                <td>
                                    {this.state.incomeData.usd.weekly}
                                    <br />
                                    {this.state.incomeData.btc.weekly}
                                    <br />
                                    <span className="sb">{this.state.incomeData.sys.weekly}</span>
                                </td>
                                <td>
                                    {this.state.incomeData.usd.monthly}
                                    <br />
                                    {this.state.incomeData.btc.monthly}
                                    <br />
                                    <span className="sb">{this.state.incomeData.sys.monthly}</span>
                                </td>
                                <td>
                                    {this.state.incomeData.usd.yearly}
                                    <br />
                                    {this.state.incomeData.btc.yearly}
                                    <br />
                                    <span className="sb">{this.state.incomeData.sys.yearly}</span>
                                </td>
                                </tr>
                                <tr>
                                <td>1+ Year</td>
                                <td>
                                    {this.state.incomeSenOneYrData.usd.daily}
                                    <br />
                                    {this.state.incomeSenOneYrData.btc.daily}
                                    <br />
                                    <span className="sb">{this.state.incomeSenOneYrData.sys.daily}</span>
                                </td>
                                <td>
                                    {this.state.incomeSenOneYrData.usd.weekly}
                                    <br />
                                    {this.state.incomeSenOneYrData.btc.weekly}
                                    <br />
                                    <span className="sb">{this.state.incomeSenOneYrData.sys.weekly}</span>
                                </td>
                                <td>
                                    {this.state.incomeSenOneYrData.usd.monthly}
                                    <br />
                                    {this.state.incomeSenOneYrData.btc.monthly}
                                    <br />
                                    <span className="sb">{this.state.incomeSenOneYrData.sys.monthly}</span>
                                </td>
                                <td>
                                    {this.state.incomeSenOneYrData.usd.yearly}
                                    <br />
                                    {this.state.incomeSenOneYrData.btc.yearly}
                                    <br />
                                    <span className="sb">{this.state.incomeSenOneYrData.sys.yearly}</span>
                                </td>
                                </tr>
                                <tr>
                                <td>2.5+ Years</td>
                                <td>
                                    {this.state.incomeSenTwoYrData.usd.daily}
                                    <br />
                                    {this.state.incomeSenTwoYrData.btc.daily}
                                    <br />
                                    <span className="sb">{this.state.incomeSenTwoYrData.sys.daily}</span>
                                </td>
                                <td>
                                    {this.state.incomeSenTwoYrData.usd.weekly}
                                    <br />
                                    {this.state.incomeSenTwoYrData.btc.weekly}
                                    <br />
                                    <span className="sb">{this.state.incomeSenTwoYrData.sys.weekly}</span>
                                </td>
                                <td>
                                    {this.state.incomeSenTwoYrData.usd.monthly}
                                    <br />
                                    {this.state.incomeSenTwoYrData.btc.monthly}
                                    <br />
                                    <span className="sb">{this.state.incomeSenTwoYrData.sys.monthly}</span>
                                </td>
                                <td>
                                    {this.state.incomeSenTwoYrData.usd.yearly}
                                    <br />
                                    {this.state.incomeSenTwoYrData.btc.yearly}
                                    <br />
                                    <span className="sb">{this.state.incomeSenTwoYrData.sys.yearly}</span>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile cards: hidden on tablet+ */}
                    <div className="income-cards d-md-none">
                        {/* Card 1: Less than 1 Year */}
                        <div className="income-card">
                            <h4 className="income-card__title">Less than 1 Year</h4>
                            <div className="income-card__content">
                                <div className="income-row">
                                    <span className="income-row__label">Daily</span>
                                    <div className="income-row__values">
                                        <span>{this.state.incomeData.usd.daily}</span>
                                        <span>{this.state.incomeData.btc.daily}</span>
                                        <strong>{this.state.incomeData.sys.daily}</strong>
                                    </div>
                                </div>
                                <div className="income-row">
                                    <span className="income-row__label">Weekly</span>
                                    <div className="income-row__values">
                                        <span>{this.state.incomeData.usd.weekly}</span>
                                        <span>{this.state.incomeData.btc.weekly}</span>
                                        <strong>{this.state.incomeData.sys.weekly}</strong>
                                    </div>
                                </div>
                                <div className="income-row">
                                    <span className="income-row__label">Monthly</span>
                                    <div className="income-row__values">
                                        <span>{this.state.incomeData.usd.monthly}</span>
                                        <span>{this.state.incomeData.btc.monthly}</span>
                                        <strong>{this.state.incomeData.sys.monthly}</strong>
                                    </div>
                                </div>
                                <div className="income-row">
                                    <span className="income-row__label">Yearly</span>
                                    <div className="income-row__values">
                                        <span>{this.state.incomeData.usd.yearly}</span>
                                        <span>{this.state.incomeData.btc.yearly}</span>
                                        <strong>{this.state.incomeData.sys.yearly}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: 1+ Year */}
                        <div className="income-card">
                            <h4 className="income-card__title">1+ Year</h4>
                            <div className="income-card__content">
                                <div className="income-row">
                                    <span className="income-row__label">Daily</span>
                                    <div className="income-row__values">
                                        <span>{this.state.incomeSenOneYrData.usd.daily}</span>
                                        <span>{this.state.incomeSenOneYrData.btc.daily}</span>
                                        <strong>{this.state.incomeSenOneYrData.sys.daily}</strong>
                                    </div>
                                </div>
                                <div className="income-row">
                                    <span className="income-row__label">Weekly</span>
                                    <div className="income-row__values">
                                        <span>{this.state.incomeSenOneYrData.usd.weekly}</span>
                                        <span>{this.state.incomeSenOneYrData.btc.weekly}</span>
                                        <strong>{this.state.incomeSenOneYrData.sys.weekly}</strong>
                                    </div>
                                </div>
                                <div className="income-row">
                                    <span className="income-row__label">Monthly</span>
                                    <div className="income-row__values">
                                        <span>{this.state.incomeSenOneYrData.usd.monthly}</span>
                                        <span>{this.state.incomeSenOneYrData.btc.monthly}</span>
                                        <strong>{this.state.incomeSenOneYrData.sys.monthly}</strong>
                                    </div>
                                </div>
                                <div className="income-row">
                                    <span className="income-row__label">Yearly</span>
                                    <div className="income-row__values">
                                        <span>{this.state.incomeSenOneYrData.usd.yearly}</span>
                                        <span>{this.state.incomeSenOneYrData.btc.yearly}</span>
                                        <strong>{this.state.incomeSenOneYrData.sys.yearly}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: 2.5+ Years */}
                        <div className="income-card">
                            <h4 className="income-card__title">2.5+ Years</h4>
                            <div className="income-card__content">
                                <div className="income-row">
                                    <span className="income-row__label">Daily</span>
                                    <div className="income-row__values">
                                        <span>{this.state.incomeSenTwoYrData.usd.daily}</span>
                                        <span>{this.state.incomeSenTwoYrData.btc.daily}</span>
                                        <strong>{this.state.incomeSenTwoYrData.sys.daily}</strong>
                                    </div>
                                </div>
                                <div className="income-row">
                                    <span className="income-row__label">Weekly</span>
                                    <div className="income-row__values">
                                        <span>{this.state.incomeSenTwoYrData.usd.weekly}</span>
                                        <span>{this.state.incomeSenTwoYrData.btc.weekly}</span>
                                        <strong>{this.state.incomeSenTwoYrData.sys.weekly}</strong>
                                    </div>
                                </div>
                                <div className="income-row">
                                    <span className="income-row__label">Monthly</span>
                                    <div className="income-row__values">
                                        <span>{this.state.incomeSenTwoYrData.usd.monthly}</span>
                                        <span>{this.state.incomeSenTwoYrData.btc.monthly}</span>
                                        <strong>{this.state.incomeSenTwoYrData.sys.monthly}</strong>
                                    </div>
                                </div>
                                <div className="income-row">
                                    <span className="income-row__label">Yearly</span>
                                    <div className="income-row__values">
                                        <span>{this.state.incomeSenTwoYrData.usd.yearly}</span>
                                        <span>{this.state.incomeSenTwoYrData.btc.yearly}</span>
                                        <strong>{this.state.incomeSenTwoYrData.sys.yearly}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
        } else {
            return(
                <p>{t('income.loading')}</p>
            )
        }

    }
}

export default withTranslation()(Income);
