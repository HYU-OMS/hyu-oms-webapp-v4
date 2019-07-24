import React from 'react';
import {
  Paper,
  Typography,
  Divider,
  Container,
  List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction,
  Avatar,
  Button, IconButton,
  TextField
} from '@material-ui/core';
import {
  ReportProblem as ReportProblemIcon,
  HowToReg as HowToRegIcon,
  PersonAddOutlined as PersonAddIcon
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

  },
  textField: {
    paddingBottom: theme.spacing(0.5)
  }
});

class Group extends React.Component<any, any> {
  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography align='center' variant="h6">
            그룹 목록
          </Typography>

          <List dense>
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  ?
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="그룹이 없습니다" secondary="??? ?, ????" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <ReportProblemIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem button selected>
              <ListItemAvatar>
                <Avatar>
                  ㄱ
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="가입된 그룹" secondary="생성 일자" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <HowToRegIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  A
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="가입되지 않은 그룹 1" secondary="Jan 7, 2014" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <PersonAddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  ㄷ
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="가입되지 않은 그룹 2" secondary="July 20, 2014" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <PersonAddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          <Divider className={classes.divider} component='hr' variant='fullWidth' />

          <Typography align='center' variant="h6">
            새 그룹 생성
          </Typography>

          <TextField
            required
            fullWidth
            label="새 그룹 이름"
            className={classes.textField}
            margin="dense"
            variant='outlined'
          />

          <Button
            fullWidth
            size='medium'
            variant="contained"
            color="primary"
            className={classes.button}
          >
            생성하기
          </Button>
        </Paper>
      </Container>
    );
  }
}

const styleAddedApp = withStyles(styles, { withTheme: true })(Group);
export default styleAddedApp;