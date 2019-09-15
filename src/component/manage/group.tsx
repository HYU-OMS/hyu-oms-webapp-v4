import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
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

import { selectGroup, postActionForDeleteGroup } from '../../action/auth';
import axios from "axios";

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
  constructor(props: any) {
    super(props);

    this.state = {
      "group_info": {}
    };
  }

  componentDidMount(): void {
    this.getGroupInfo();
  }

  getGroupInfo = () => {
    const url: string = this.props.api_url + "/group/" + (this.props.group_id).toString();
    const headers: any = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        const response = await axios.get(url, {"headers": headers});
        this.setState({
          "group_info": response.data
        });
      } catch(err) {
        if(err.response !== undefined) {
          alert(err.response.data.message);
        }
        else {
          alert("서버와의 연결에 문제가 있습니다.");
        }
      }
    })();
  };

  handleSwitchClick = (e: any) => {
    e.preventDefault();

    const url: string = this.props.api_url + "/group/" + (this.props.group_id).toString();
    const headers: any = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        await axios.put(url, {
          "allow_register": parseInt(this.state.group_info.allow_register) === 1 ? 0 : 1
        }, {"headers": headers});

        this.state.group_info.allow_register = parseInt(this.state.group_info.allow_register) === 1 ? 0 : 1;
        this.forceUpdate();
      } catch(err) {
        if(err.response !== undefined) {
          alert(err.response.data.message);
        }
        else {
          alert("서버와의 연결에 문제가 있습니다.");
        }
      }
    })();
  };

  downloadOrderList = (e: any) => {
    e.preventDefault();

    const url = this.props.api_url + "/download?jwt=" + this.props.jwt +
      "&group_id=" + this.props.group_id + "&type=orders";
    window.open(url);
  };

  deleteGroup = (e: any) => {
    e.preventDefault();

    if(window.confirm("그룹을 삭제하면 다시 되돌릴 수 없습니다. 계속하시겠습니까?")) {
      const url = this.props.api_url + "/group/" + (this.props.group_id).toString();
      const headers = {
        "Authorization": "Bearer " + this.props.jwt
      };

      (async () => {
        try {
          await axios.delete(url, {"headers": headers});
          alert("그룹이 성공적으로 삭제되었습니다!");
          this.props.postActionForDeleteGroup();
          this.props.history.push("/group");
        } catch(err) {
          if(err.response !== undefined) {
            alert(err.response.data.message);
          }
          else {
            alert("서버와의 연결에 문제가 있습니다.");
          }
        }
      })();
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography align='center' variant="h6">
            그룹 관리
          </Typography>

          <List component="nav" aria-label="main mailbox folders">
            <ListItem disabled={this.props.role !== 3}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="가입 가능 여부" secondary="회원 가입을 받을 지 여부를 설정" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onClick={this.handleSwitchClick}
                  checked={Boolean(this.state.group_info.allow_register)}
                  disabled={this.props.role !== 3}
                />
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem disabled>
              <ListItemIcon>
                <TitleIcon />
              </ListItemIcon>
              <ListItemText primary="이름 변경" secondary="그룹의 이름을 변경" />
              <ListItemSecondaryAction>
                <IconButton disabled edge="end">
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
                <IconButton onClick={this.downloadOrderList} edge="end">
                  <GetAppICon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem disabled={this.props.role !== 3}>
              <ListItemIcon>
                <WarningIcon />
              </ListItemIcon>
              <ListItemText primary="그룹 삭제" secondary="그룹을 삭제하고 관련 데이터 제거" />
              <ListItemSecondaryAction>
                <IconButton disabled={this.props.role !== 3} onClick={this.deleteGroup} edge="end">
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

const mapStateToProps = (state: any) => {
  return {
    "jwt": state.auth.jwt,
    "api_url": state.auth.api_url,
    "group_id": state.auth.group_id,
    "signup_code": state.auth.signup_code,
    "role": state.auth.role
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    "selectGroup": (group_id: number, role: number) => {
      dispatch(selectGroup(group_id, role));
    },
    "postActionForDeleteGroup": () => {
      dispatch(postActionForDeleteGroup());
    }
  }
};

const styleAddedApp = withStyles(styles, { withTheme: true })(Group);
const reduxStateAddedApp: any = connect(mapStateToProps, mapDispatchToProps)(styleAddedApp);
const routerAddedApp: any = withRouter(reduxStateAddedApp);
export default routerAddedApp;