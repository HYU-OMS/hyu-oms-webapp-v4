import React from 'react';
import {
  Paper,
  Typography,
  Container,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  IconButton,
  Switch, ListItemAvatar, Avatar, Icon
} from '@material-ui/core';
import {
  Star as StarIcon,
  Edit as EditIcon,
  VerifiedUser as VerifiedUserIcon
} from '@material-ui/icons';
import { withStyles, Theme } from '@material-ui/core/styles';

const styles: any = (theme: Theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2, 2),
    overflowX: 'auto'
  },
  container: {
    paddingLeft: 0,
    paddingRight: 0
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },
  listSubHeader: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5)
  },
  listItem: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5)
  },
  textField: {
    paddingBottom: theme.spacing(0.5)
  }
});

class Member extends React.Component<any, any> {
  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography align='center' variant="h6">
            멤버 관리
          </Typography>

          <List component="nav" aria-label="main mailbox folders">
            <ListItem>
              <ListItemAvatar>
                <Avatar><Icon className='xi-kakaotalk' /></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Test User 1" secondary="최고 관리자" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <StarIcon />
                </IconButton>
                <IconButton disabled edge="end">
                  <EditIcon />
                </IconButton>
                <Switch
                  disabled
                  edge="end"
                  checked={true}
                />
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar><Icon className='fab fa-facebook' /></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Test User 2" secondary="관리자" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <VerifiedUserIcon />
                </IconButton>
                <IconButton edge="end">
                  <EditIcon />
                </IconButton>
                <Switch
                  edge="end"
                  checked={true}
                />
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar><Icon className='fab fa-facebook' /></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Test User 3" secondary="일반 멤버" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <EditIcon />
                </IconButton>
                <Switch
                  edge="end"
                  checked={true}
                />
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar><Icon className='xi-kakaotalk' /></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Test User 3" secondary="일반 멤버" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <EditIcon />
                </IconButton>
                <Switch
                  edge="end"
                  checked={false}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
      </Container>
    );
  }
}

const styleAddedApp = withStyles(styles, { withTheme: true })(Member);
export default styleAddedApp;