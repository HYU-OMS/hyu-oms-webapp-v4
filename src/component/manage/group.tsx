import React from 'react';
import {
  Paper,
  Typography,
  Container,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  IconButton,
  Switch, ListItemIcon
} from '@material-ui/core';
import {
  Edit as EditIcon,
  List as ListIcon,
  Title as TitleIcon,
  GetApp as GetAppICon,
  PersonAdd as PersonAddIcon,
  Warning as WarningIcon,
  DeleteForever as DeleteIcon
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

class Group extends React.Component<any, any> {
  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography align='center' variant="h6">
            그룹 관리
          </Typography>

          <List component="nav" aria-label="main mailbox folders">
            <ListItem>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="가입 가능 여부" secondary="회원 가입을 받을 지 여부를 설정" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={true}
                />
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <TitleIcon />
              </ListItemIcon>
              <ListItemText primary="이름 변경" secondary="그룹의 이름을 변경" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <EditIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="주문 내역 다운로드" secondary="전체 주문 내역을 다운로드" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <GetAppICon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <WarningIcon />
              </ListItemIcon>
              <ListItemText primary="그룹 삭제" secondary="그룹을 삭제하고 관련 데이터 제거" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
      </Container>
    );
  }
}

const styleAddedApp = withStyles(styles, { withTheme: true })(Group);
export default styleAddedApp;