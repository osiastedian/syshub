import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import './Blockchain.scss';

/**
 * Component to show the blockchain stats
 * @component
 * @subcategory Stats
 * @param {*} props t from withTranslation and blockchainData from Stats
 * @example
 * const blockchainData = {}
 * return (
 *  <Blockchain blockchainData={blockchainData} />
 * )
 */
class Blockchain extends Component {
    /**
     * To initialize the state
     * @constructor
     * @param {*} props 
     */
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            blockchainData: []
        }
    }

    /**
     * DidMount to set the state
     * @function
     */
    componentDidMount() {
        this.setState({
            dataload: 1,
            blockchainData: this.props.blockchainData
        });
    }
    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
            return (
                <>
                    <h2 className="section-title">BLOCKCHAIN STATS</h2>
                    <div className="blockchain-stats-grid">
                        <div className="blockchain-stat">
                            <div className="blockchain-stat__value">{this.state.blockchainData.version} {this.state.blockchainData.sub_version}</div>
                            <div className="blockchain-stat__label">{t('investment.blockchainTable.version')}</div>
                        </div>
                        <div className="blockchain-stat">
                            <div className="blockchain-stat__value">{this.state.blockchainData.protocol}</div>
                            <div className="blockchain-stat__label">{t('investment.blockchainTable.protocol')}</div>
                        </div>
                        <div className="blockchain-stat">
                            <div className="blockchain-stat__value">{this.state.blockchainData.genesis}</div>
                            <div className="blockchain-stat__label">{t('investment.blockchainTable.genesisBlock')}</div>
                        </div>
                        <div className="blockchain-stat">
                            <div className="blockchain-stat__value">{this.state.blockchainData.avg_block}</div>
                            <div className="blockchain-stat__label">{t('investment.blockchainTable.averageBlockTime')}</div>
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

export default withTranslation()(Blockchain);
