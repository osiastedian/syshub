/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Grid } from 'material-ui';
import { DashBoardHeader } from '../functionals/';
import { ProposalPayment } from '../functionals/';
import { ProposalApprovalStat } from '../functionals/';
import { ProposalDescription } from '../functionals/';
import { ProposalComments } from '../functionals/';

// import components
import { proposalDetailsStyle } from './styles';

export class ProposalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.proposal,
    };
  }
  render() {
    const { deviceType } = this.props;
    //Platform style switcher
    return (
      <Grid style={proposalDetailsStyle.root}>
        <DashBoardHeader
          data={{ showHeader: 'ProposalDetail', name: 'Proposal 1' }}
        />

        <Grid container style={proposalDetailsStyle.proposalDetails}>
          <ProposalPayment deviceType={deviceType} />
          <ProposalApprovalStat deviceType={deviceType} />
          <ProposalDescription deviceType={deviceType} />
          <ProposalComments deviceType={deviceType} />
        </Grid>
      </Grid>
    );
  }
}
const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

// ProposalDetail.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default connect(stateToProps, dispatchToProps)(ProposalDetail);
