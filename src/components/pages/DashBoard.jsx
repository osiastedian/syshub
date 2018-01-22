import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import PropTypes from 'prop-types';
import { Grid , withStyles } from 'material-ui';
import { ProposalList  } from '../containers/ProposalList';
import { ProposalDetail  } from '../containers/ProposalDetail';
import { DashBoardHeader  } from '../functionals/';


// import components
import { dashboardStyle  } from './styles';

class DashBoard extends Component {
  constructor(props){
    super(props);
  }

  
  render() {
   const { classes } = this.props;

    return (

      <Grid md={12} className={classes.root}>
        {' '}
        {/* You can see the <strong>PROPOSAL DASHBOARD</strong> page{' '} */}
        <h1 className="dashBoardheading">PROPOSAL DASHBOARD</h1>
          {/* {
            this.state.view =='list' ? <ProposalList  switchView={ this.switchView }/> : <ProposalDetail />
          } */}
          {
            {
              dashBoard: <ProposalList/>,
              proposalDetail: <ProposalDetail />
            }[this.props.app.showPage]
          }
      </Grid>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {};
};
DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(stateToProps, dispatchToProps)(withStyles(dashboardStyle)(DashBoard));
