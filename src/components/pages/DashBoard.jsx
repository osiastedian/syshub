import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import PropTypes from 'prop-types';
import { Grid, withStyles } from 'material-ui';
import { Icon } from 'antd';
import { ProposalList } from '../containers/ProposalList';
import { ProposalDetail } from '../containers/ProposalDetail';
import { DashBoardHeader } from '../functionals/';

// import components
import { dashboardStyle } from './styles';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContainer: 'dashBoard',
      proposalID: '',
    };
    this.handleDashboard = this.handleDashboard.bind(this);
  }
  //changing state with this function
  handleDashboard(value) {
    const container =
      this.state.showContainer === 'dashBoard' ? 'proposalDetail' : 'dashBoard';
    this.setState({
      showContainer: container,
      proposalID: value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid md={12} className={classes.root}>
        <h1 className="dashBoardheading">PROPOSAL DASHBOARD</h1>
        {this.state.showContainer === 'proposalDetail' && (
          <div className="iconWraper" onClick={() => this.handleDashboard()}>
            <Icon type="backward" className="icon" />
            <span className="iconTxt">{`  Back to List`}</span>
          </div>
        )}
        {
          {
            dashBoard: <ProposalList selectProposal={this.handleDashboard} />,
            proposalDetail: <ProposalDetail />,
          }[this.state.showContainer]
        }
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
DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(dashboardStyle)(DashBoard)
);