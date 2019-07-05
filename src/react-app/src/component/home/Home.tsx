import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles: any = (theme: any) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  }
});

class Home extends React.Component {
  render() {
    return (
      <div>
        <Typography component='h4' variant='h6'>
          HYU-OMS (한양대학교 주문관리시스템)
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles, { 'withTheme': true })(Home);
