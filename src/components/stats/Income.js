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
            incomeSenTwoYrData: [],
            mobileColumnIndex: 0 // 0 = Daily, 1 = Weekly, 2 = Monthly, 3 = Yearly
        }
    }

    /**
     * Handler to navigate to the previous column on mobile
     * @function
     */
    handlePrevColumn = () => {
        if (this.state.mobileColumnIndex > 0) {
            this.setState({ mobileColumnIndex: this.state.mobileColumnIndex - 1 });
        }
    }

    /**
     * Handler to navigate to the next column on mobile
     * @function
     */
    handleNextColumn = () => {
        if (this.state.mobileColumnIndex < 3) {
            this.setState({ mobileColumnIndex: this.state.mobileColumnIndex + 1 });
        }
    }

    /**
     * Get the column label based on the index
     * @function
     * @param {number} index - The column index (0-3)
     * @returns {string} The column label
     */
    getColumnLabel = (index) => {
        const labels = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
        return labels[index];
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

                    {/* Mobile table: hidden on tablet+, shows Seniority + one data column */}
                    <div className="table-resp d-md-none">
                        <div className="check_table">
                            <table className={`seniority mobile-column-${this.state.mobileColumnIndex}`}>
                            <thead>
                                <tr>
                                <td>Seniority</td>
                                <td className="mobile-col-0 mobile-header-cell">
                                    <div className="mobile-header-content">
                                        <span className="mobile-header-label">Daily</span>
                                        <div className="mobile-nav-buttons">
                                            <button
                                                className="income-nav-btn income-nav-btn--left"
                                                onClick={this.handlePrevColumn}
                                                disabled={this.state.mobileColumnIndex === 0}
                                                aria-label="Previous column"
                                            >
                                                <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.35254 8.57727L0.938935 5.16367C0.587463 4.81219 0.587464 4.24235 0.938935 3.89087L4.35254 0.47727" stroke="white" strokeWidth="1.35"/>
                                                </svg>
                                            </button>
                                            <button
                                                className="income-nav-btn income-nav-btn--right"
                                                onClick={this.handleNextColumn}
                                                disabled={this.state.mobileColumnIndex === 3}
                                                aria-label="Next column"
                                            >
                                                <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.64746 0.47727L4.06107 3.89087C4.41254 4.24235 4.41254 4.81219 4.06107 5.16367L0.64746 8.57727" stroke="white" strokeWidth="1.35"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="mobile-col-1 mobile-header-cell">
                                    <div className="mobile-header-content">
                                        <span className="mobile-header-label">Weekly</span>
                                        <div className="mobile-nav-buttons">
                                            <button
                                                className="income-nav-btn income-nav-btn--left"
                                                onClick={this.handlePrevColumn}
                                                disabled={this.state.mobileColumnIndex === 0}
                                                aria-label="Previous column"
                                            >
                                                <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.35254 8.57727L0.938935 5.16367C0.587463 4.81219 0.587464 4.24235 0.938935 3.89087L4.35254 0.47727" stroke="white" strokeWidth="1.35"/>
                                                </svg>
                                            </button>
                                            <button
                                                className="income-nav-btn income-nav-btn--right"
                                                onClick={this.handleNextColumn}
                                                disabled={this.state.mobileColumnIndex === 3}
                                                aria-label="Next column"
                                            >
                                                <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.64746 0.47727L4.06107 3.89087C4.41254 4.24235 4.41254 4.81219 4.06107 5.16367L0.64746 8.57727" stroke="white" strokeWidth="1.35"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="mobile-col-2 mobile-header-cell">
                                    <div className="mobile-header-content">
                                        <span className="mobile-header-label">Monthly</span>
                                        <div className="mobile-nav-buttons">
                                            <button
                                                className="income-nav-btn income-nav-btn--left"
                                                onClick={this.handlePrevColumn}
                                                disabled={this.state.mobileColumnIndex === 0}
                                                aria-label="Previous column"
                                            >
                                                <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.35254 8.57727L0.938935 5.16367C0.587463 4.81219 0.587464 4.24235 0.938935 3.89087L4.35254 0.47727" stroke="white" strokeWidth="1.35"/>
                                                </svg>
                                            </button>
                                            <button
                                                className="income-nav-btn income-nav-btn--right"
                                                onClick={this.handleNextColumn}
                                                disabled={this.state.mobileColumnIndex === 3}
                                                aria-label="Next column"
                                            >
                                                <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.64746 0.47727L4.06107 3.89087C4.41254 4.24235 4.41254 4.81219 4.06107 5.16367L0.64746 8.57727" stroke="white" strokeWidth="1.35"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="mobile-col-3 mobile-header-cell">
                                    <div className="mobile-header-content">
                                        <span className="mobile-header-label">Yearly</span>
                                        <div className="mobile-nav-buttons">
                                            <button
                                                className="income-nav-btn income-nav-btn--left"
                                                onClick={this.handlePrevColumn}
                                                disabled={this.state.mobileColumnIndex === 0}
                                                aria-label="Previous column"
                                            >
                                                <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.35254 8.57727L0.938935 5.16367C0.587463 4.81219 0.587464 4.24235 0.938935 3.89087L4.35254 0.47727" stroke="white" strokeWidth="1.35"/>
                                                </svg>
                                            </button>
                                            <button
                                                className="income-nav-btn income-nav-btn--right"
                                                onClick={this.handleNextColumn}
                                                disabled={this.state.mobileColumnIndex === 3}
                                                aria-label="Next column"
                                            >
                                                <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.64746 0.47727L4.06107 3.89087C4.41254 4.24235 4.41254 4.81219 4.06107 5.16367L0.64746 8.57727" stroke="white" strokeWidth="1.35"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Less than 1 Year</td>
                                <td className="mobile-col-0">
                                    {this.state.incomeData.usd.daily}
                                    <br />
                                    {this.state.incomeData.btc.daily}
                                    <br />
                                    <span className="sb">{this.state.incomeData.sys.daily}</span>
                                </td>
                                <td className="mobile-col-1">
                                    {this.state.incomeData.usd.weekly}
                                    <br />
                                    {this.state.incomeData.btc.weekly}
                                    <br />
                                    <span className="sb">{this.state.incomeData.sys.weekly}</span>
                                </td>
                                <td className="mobile-col-2">
                                    {this.state.incomeData.usd.monthly}
                                    <br />
                                    {this.state.incomeData.btc.monthly}
                                    <br />
                                    <span className="sb">{this.state.incomeData.sys.monthly}</span>
                                </td>
                                <td className="mobile-col-3">
                                    {this.state.incomeData.usd.yearly}
                                    <br />
                                    {this.state.incomeData.btc.yearly}
                                    <br />
                                    <span className="sb">{this.state.incomeData.sys.yearly}</span>
                                </td>
                                </tr>
                                <tr>
                                <td>1+ Year</td>
                                <td className="mobile-col-0">
                                    {this.state.incomeSenOneYrData.usd.daily}
                                    <br />
                                    {this.state.incomeSenOneYrData.btc.daily}
                                    <br />
                                    <span className="sb">{this.state.incomeSenOneYrData.sys.daily}</span>
                                </td>
                                <td className="mobile-col-1">
                                    {this.state.incomeSenOneYrData.usd.weekly}
                                    <br />
                                    {this.state.incomeSenOneYrData.btc.weekly}
                                    <br />
                                    <span className="sb">{this.state.incomeSenOneYrData.sys.weekly}</span>
                                </td>
                                <td className="mobile-col-2">
                                    {this.state.incomeSenOneYrData.usd.monthly}
                                    <br />
                                    {this.state.incomeSenOneYrData.btc.monthly}
                                    <br />
                                    <span className="sb">{this.state.incomeSenOneYrData.sys.monthly}</span>
                                </td>
                                <td className="mobile-col-3">
                                    {this.state.incomeSenOneYrData.usd.yearly}
                                    <br />
                                    {this.state.incomeSenOneYrData.btc.yearly}
                                    <br />
                                    <span className="sb">{this.state.incomeSenOneYrData.sys.yearly}</span>
                                </td>
                                </tr>
                                <tr>
                                <td>2.5+ Years</td>
                                <td className="mobile-col-0">
                                    {this.state.incomeSenTwoYrData.usd.daily}
                                    <br />
                                    {this.state.incomeSenTwoYrData.btc.daily}
                                    <br />
                                    <span className="sb">{this.state.incomeSenTwoYrData.sys.daily}</span>
                                </td>
                                <td className="mobile-col-1">
                                    {this.state.incomeSenTwoYrData.usd.weekly}
                                    <br />
                                    {this.state.incomeSenTwoYrData.btc.weekly}
                                    <br />
                                    <span className="sb">{this.state.incomeSenTwoYrData.sys.weekly}</span>
                                </td>
                                <td className="mobile-col-2">
                                    {this.state.incomeSenTwoYrData.usd.monthly}
                                    <br />
                                    {this.state.incomeSenTwoYrData.btc.monthly}
                                    <br />
                                    <span className="sb">{this.state.incomeSenTwoYrData.sys.monthly}</span>
                                </td>
                                <td className="mobile-col-3">
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

                    {/* DEPRECATED: Mobile cards - keeping for reference but hidden */}
                    <div className="income-cards d-none">
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
