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

class Statistics extends React.Component {
  render() {
    return (
      <div>
        <Typography variant="h6">
          Statistics
        </Typography>
      </div>
    );
  }
}

const styleAddedApp = withStyles(styles, { withTheme: true })(Statistics);
export default styleAddedApp;