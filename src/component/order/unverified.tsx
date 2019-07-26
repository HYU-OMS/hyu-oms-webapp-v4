import React from 'react';
import {
  Paper,
  Typography,
  Container,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  Avatar,
  Button, IconButton, ButtonGroup,
  Chip
} from '@material-ui/core';
import {
  CheckCircle as CheckIcon,
  Cancel as CloseIcon,
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
  }
});

class Unverified extends React.Component<any, any> {
  render() {
    const { classes } = this.props;

    const item = (
      <React.Fragment>
        <Chip size='small' avatar={<Avatar>#</Avatar>} label="1123" />
        &nbsp;
        <Chip size='small' avatar={<Avatar>$</Avatar>} label="1000" />
        &nbsp;
        <Chip size='small' avatar={<Avatar>To</Avatar>} label="23" />
      </React.Fragment>
    );

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography align='center' variant="h6">
            미처리 주문 내역
          </Typography>

          <List dense>
            <ListItem button className={classes.listItem}>
              <ListItemText primary="[주문번호] [가격] [테이블명]" secondary="[주문자명] [시간]" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <CheckIcon/>
                </IconButton>
                <IconButton edge="end">
                  <CloseIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem button className={classes.listItem}>
              <ListItemText primary={item} secondary="2019/6/15 13:45:30" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <CheckIcon/>
                </IconButton>
                <IconButton edge="end">
                  <CloseIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem button className={classes.listItem}>
              <ListItemText primary={item} secondary="2019/6/15 13:45:30" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <CheckIcon/>
                </IconButton>
                <IconButton edge="end">
                  <CloseIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          <ButtonGroup fullWidth color='default'>
            <Button>«</Button>
            <Button>1</Button>
            <Button disabled>2</Button>
            <Button>3</Button>
            <Button>4</Button>
            <Button>»</Button>
          </ButtonGroup>
        </Paper>
      </Container>
    );
  }
}

const styleAddedApp = withStyles(styles, { withTheme: true })(Unverified);
export default styleAddedApp;