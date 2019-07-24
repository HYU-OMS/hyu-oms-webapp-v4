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

class Group extends React.Component {
  render() {
    return (
      <div>
        <Typography variant="h6">
          Group
        </Typography>
      </div>
    );
  }
}

const styleAddedApp = withStyles(styles, { withTheme: true })(Group);
export default styleAddedApp;