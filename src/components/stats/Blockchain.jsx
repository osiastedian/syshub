import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import StatsGrid from './StatsGrid';
import StatsCard from './StatsCard';

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
                    <StatsGrid>
                        <StatsCard
                            label={t('investment.blockchainTable.version')}
                            value={`${this.state.blockchainData.version} / ${this.state.blockchainData.sub_version}`}
                            className="stats-card--blockchain"
                        />
                        <StatsCard
                            label={t('investment.blockchainTable.protocol')}
                            value={this.state.blockchainData.protocol}
                            className="stats-card--blockchain"
                        />
                        <StatsCard
                            label={t('investment.blockchainTable.genesisBlock')}
                            value={this.state.blockchainData.genesis}
                            className="stats-card--blockchain"
                        />
                        <StatsCard
                            label={t('investment.blockchainTable.averageBlockTime')}
                            value={this.state.blockchainData.avg_block}
                            className="stats-card--blockchain"
                        />
                    </StatsGrid>
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
