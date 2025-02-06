

import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../../../redux/actions';
import { withRoot } from '../../HOC';

//Import functional components
import { SiderMenu } from '../../functionals';

// Styles
import appLSiderStyle from './appLSider.style';

class AppLSider extends Component {
  itemClick(pageActive) {
    this.props.setPage(pageActive);
  }

  render() {
    const { deviceType, app } = this.props;
    const style =
      deviceType === 'mobile'
        ? appLSiderStyle.mWrapper
        : appLSiderStyle.wrapper;
    return (
      <div style={style}>
        <SiderMenu
          menuItems={app.menuItems}
          active={this.props.app.showPage}
          logged={this.props.logged}
          onItemClick={pageActive => this.itemClick(pageActive)}
          deviceType={deviceType}
        />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    logged: state.app.currentUser ? true : false,
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {
    setPage: page => dispatch(actions.setPage(page)),
    toggleMenu: () => dispatch(actions.toggleMenu())
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(withRoot(AppLSider));
