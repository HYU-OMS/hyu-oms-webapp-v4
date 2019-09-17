import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import {
  Typography,
  Container, Paper,
  List, ListItem, ListItemIcon, ListItemText,
  Icon
} from '@material-ui/core';
import {
  Email as EmailIcon
} from '@material-ui/icons';

const styles: any = (theme: Theme) => ({
  container: {
    paddingLeft: 0,
    paddingRight: 0
  },
  root: {
    width: '100%',
    padding: theme.spacing(2, 2),
    overflowX: 'auto'
  },
  icon: {
    width: '30px'
  }
});

class Home extends React.Component<any, any> {
  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography align='center' variant="h6">
            HYU-OMS
          </Typography>

          <List component="nav">
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Contact Email" secondary="khhan1993@gmail.com" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                alert("This system uses WebApp Version 4, API Version 3.");
                document.location.href = 'https://github.com/HYU-OMS';
              }}
            >
              <ListItemIcon>
                <Icon className='fab fa-github' />
              </ListItemIcon>
              <ListItemText primary="GitHub Repository" secondary="Click here to see repository." />
            </ListItem>
          </List>
        </Paper>
      </Container>
    );
  }
}

const styleAddedApp = withStyles(styles, { withTheme: true })(Home);
export default styleAddedApp;