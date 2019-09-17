import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles: any = (theme: Theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  }
});

class Home extends React.Component {
  render() {
    return (
      <div>
        <Typography variant="h6">
          HYU-OMS (한양대학교 주문관리시스템)
        </Typography>

        <p>
          문의: <a href='mailto:khhan1993@gmail.com'>khhan1993@gmail.com</a>
        </p>
        <p>
          FrontEnd: <a href='https://github.com/HYU-OMS/hyu-oms-webapp-v4'>https://github.com/HYU-OMS/hyu-oms-webapp-v4</a><br/>
          BackEnd: <a href='https://github.com/HYU-OMS/hyu-oms-api-v3'>https://github.com/HYU-OMS/hyu-oms-api-v3</a>
        </p>
      </div>
    );
  }
}

const styleAddedApp = withStyles(styles, { withTheme: true })(Home);
export default styleAddedApp;