import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import './GovDetails.scss';

/**
 * Governance Details component
 * @component
 * @subcategory Governance
 * @example
 * const budgetSum = {}
 * const superBlockData = {}
 * return (
 *  <Govdetails superBlockData={superBlockData} budgetSum={budgetSum} />
 * )
 */
class Govdetails extends Component {
    /**
     * initialize the state
     * @constructor 
     * @param {*} props Needs superBlockData and budgetSum to work properly
     */
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            superBlockData: [],
            budgetSum: 0
        }
    }

    /**
     * Set the state of the data passed in props
     * @function 
     */
    componentDidMount() {
        this.setState({
            dataload: 1,
            superBlockData: this.props.superBlockData,
            budgetSum: this.props.budgetSum
        });
    }

    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
            return (
                <div className="gov-details d-flex gap-5">
                    {/* Governance Details - Gold Border */}
                    <div className="gov-details__section gov-details__section--governance">
                        <h3 className="gov-details__heading">
                            {t('superblocks.govdetailtable.title', 'Governance Details')}
                        </h3>

                        <div className="gov-details__card gov-details__card--gold">
                            <div className="gov-details__items">
                                <div className="gov-details__item">
                                    <div className="gov-details__label">Current Superblock</div>
                                    <div className="gov-details__value">
                                        {this.state.superBlockData.next_superblock}
                                    </div>
                                </div>

                                <div className="gov-details__item">
                                    <div className="gov-details__label">Superblock Budget</div>
                                    <div className="gov-details__value">
                                        {this.state.superBlockData.budget} SYS
                                    </div>
                                </div>

                                <div className="gov-details__item">
                                    <div className="gov-details__label">Requested Superblock Budget</div>
                                    <div className="gov-details__value">
                                        {this.state.budgetSum} SYS
                                    </div>
                                </div>

                                <div className="gov-details__item">
                                    <div className="gov-details__label">Superblock Date: UTC</div>
                                    <div className="gov-details__value">
                                        {this.state.superBlockData.superblock_date}
                                    </div>
                                </div>

                                <div className="gov-details__item">
                                    <div className="gov-details__label">Voting Deadline: UTC</div>
                                    <div className="gov-details__value">
                                        {this.state.superBlockData.voting_deadline}
                                    </div>
                                </div>
                            </div>

                            <a
                                href="https://github.com/syscoin/governance/wiki"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gov-details__button"
                            >
                                <div className="gov-details__button-icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 8L11 8M11 8L8 5M11 8L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <span className="gov-details__button-text">Access Community Wiki</span>
                            </a>
                        </div>
                    </div>

                    {/* Next 5 Superblocks - Blue Border */}
                    <div className="gov-details__section gov-details__section--superblocks">
                        <h3 className="gov-details__heading">
                            {t('superblocks.nextsuperblockstable.title', 'Next 5 Superblocks')}
                        </h3>

                        <div className="gov-details__card gov-details__card--blue">
                            <div className="gov-details__items">
                                <div className="gov-details__item">
                                    <div className="gov-details__sb-label">{this.state.superBlockData.sb1}</div>
                                    <div className="gov-details__sb-info">
                                        <div>{this.state.superBlockData.sb1Budget || 0} SYS</div>
                                        <div>{this.state.superBlockData.sb1Date}</div>
                                    </div>
                                </div>

                                <div className="gov-details__item">
                                    <div className="gov-details__sb-label">{this.state.superBlockData.sb2}</div>
                                    <div className="gov-details__sb-info">
                                        <div>{this.state.superBlockData.sb2Budget || 0} SYS</div>
                                        <div>{this.state.superBlockData.sb2Date}</div>
                                    </div>
                                </div>

                                <div className="gov-details__item">
                                    <div className="gov-details__sb-label">{this.state.superBlockData.sb3}</div>
                                    <div className="gov-details__sb-info">
                                        <div>{this.state.superBlockData.sb3Budget || 0} SYS</div>
                                        <div>{this.state.superBlockData.sb3Date}</div>
                                    </div>
                                </div>

                                <div className="gov-details__item">
                                    <div className="gov-details__sb-label">{this.state.superBlockData.sb4}</div>
                                    <div className="gov-details__sb-info">
                                        <div>{this.state.superBlockData.sb4Budget || 0} SYS</div>
                                        <div>{this.state.superBlockData.sb4Date}</div>
                                    </div>
                                </div>

                                <div className="gov-details__item">
                                    <div className="gov-details__sb-label">{this.state.superBlockData.sb5}</div>
                                    <div className="gov-details__sb-info">
                                        <div>{this.state.superBlockData.sb5Budget || 0} SYS</div>
                                        <div>{this.state.superBlockData.sb5Date}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <p>{t('investment.loading')}</p>
            )
        }
    }
}

export default withTranslation()(Govdetails);
