

import React, { Component } from 'react';
import { withRoot } from '../../HOC';
import { Layout } from 'antd';

//JSS and styles
import injectSheet from 'react-jss';
import mAppFooterStyle from './mAppFooter.style';

const { Footer } = Layout;

class AppFooter extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Footer className="footer">{`SysHub @ 2018`}</Footer>
      </div>
    );
  }
}

export default injectSheet(mAppFooterStyle)(withRoot(AppFooter));
