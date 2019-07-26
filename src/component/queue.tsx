import React from 'react';
import {
  Paper,
  Typography,
  Container,
  List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction,
  Collapse,
  Avatar,
  IconButton
} from '@material-ui/core';
import {
  RemoveCircleOutlined as RemoveIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
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
  listItem: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5)
  },
  nested: {
    paddingLeft: theme.spacing(2.5)
  },
  chip: {

  }
});

class Queue extends React.Component<any, any> {
  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography align='center' variant="h6">
            메뉴별 대기열
          </Typography>

          <List dense disablePadding>
            <ListItem disabled className={classes.listItem}>
              <ListItemAvatar>
                <Avatar>
                  0
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="소주" secondary='0건 대기중' />
              <ListItemSecondaryAction>
                <IconButton disabled>
                  {false ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar>
                  0
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="맥주" secondary='2건 대기중'/>
              <ListItemSecondaryAction>
                <IconButton>
                  {true ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={true} timeout="auto" unmountOnExit>
              <List dense disablePadding>
                <ListItem className={classes.nested}>
                  <ListItemAvatar>
                    <Avatar>
                      0
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="To: 알로하" secondary='#143, 2019/6/15 16:34:15' />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <RemoveIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem className={classes.nested}>
                  <ListItemAvatar>
                    <Avatar>
                      0
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="To: 아이스월" secondary='#163, 2019/6/15 17:31:35' />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <RemoveIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Paper>
      </Container>
    );
  }
}

const styleAddedApp = withStyles(styles, { withTheme: true })(Queue);
export default styleAddedApp;