import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import {
  Paper,
  Typography,
  Container,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  Dialog, DialogTitle, DialogContent,
  IconButton, Fab,
  ListItemAvatar, Avatar, Divider
} from '@material-ui/core';
import {
  Star as StarIcon,
  Edit as EditIcon,
  VerifiedUser as VerifiedUserIcon,
  Block as BlockIcon,
  Delete as DeleteIcon,
  HowToReg as HowToRegIcon
} from '@material-ui/icons';
import { withStyles, Theme } from '@material-ui/core/styles';
import axios from "axios";
import _ from 'lodash';

import { selectGroup } from '../../action/auth';

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
  },
  fab: {
    margin: theme.spacing(1)
  }
});

class Member extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      members: [],
      is_member_change_dialog_opened: false,
      update_target_member: null
    };
  }

  componentDidMount(): void {
    this.getMembers();
  }

  getMembers = (): void => {
    const url: string = this.props.api_url + "/member?group_id=" + (this.props.group_id).toString();
    const headers: any = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        const response: any = await axios.get(url, {
          "headers": headers
        });

        let data = response.data;
        data = _.sortBy(data, [(item) => item.name]);
        data = _.sortBy(data, [(item) => -item.role]);

        this.setState({
          members: data
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

  editMemberStatus = (member: any) => {
    this.setState({
      is_member_change_dialog_opened: true,
      update_target_member: member
    });
  };

  updateMemberRole = (role: number) => {
    const url: string = this.props.api_url + "/member";
    const headers: any = {
      "Authorization": "Bearer " + this.props.jwt
    };
    const body: any = {
      "group_id": this.props.group_id,
      "user_id": this.state.update_target_member.id,
      "role": role
    };

    (async () => {
      try {
        await axios.put(url, body, {"headers": headers});

        this.state.update_target_member.role = role;

        let members = _.sortBy(this.state.members, [(item) => item.name]);
        members = _.sortBy(members, [(item) => -item.role]);

        this.setState({
          members: members
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

  displayRoleString = (role: number): string => {
    const role_str = ["미승인 멤버", "일반 멤버", "관리자", "그룹 만든 사람"];
    return role_str[role];
  };

  displayListHeadCharacter = (name: string): string => {
    if(name.length === 0) {
      return "-";
    }
    else {
      return name[0];
    }
  };

  displayIconColor = (role: number): any => {
    const color_str = ['secondary', 'default', 'inherit', 'primary'];
    return color_str[role];
  };

  render() {
    const { classes } = this.props;

    const members = this.state.members.map((item: any) =>
      <ListItem key={item.id} disabled={item.role === 0}>
        <ListItemAvatar>
          <Avatar>{this.displayListHeadCharacter(item.name)}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} secondary={this.displayRoleString(item.role)} />
        <ListItemSecondaryAction>
          <IconButton color={this.displayIconColor(item.role)} edge="end">
            {item.role === 3 && <StarIcon />}
            {item.role === 2 && <VerifiedUserIcon />}
            {item.role === 0 && <BlockIcon />}
          </IconButton>
          <IconButton onClick={() => this.editMemberStatus(item)} disabled={item.role === 3} edge="end">
            <EditIcon />
          </IconButton>
          {/* TODO: 멤버 삭제 추가할 것 */}
          <IconButton disabled={true || item.role === 3} edge="end">
            <DeleteIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );

    const memberUpdateDialog: any = (
      <Dialog
        open={this.state.is_member_change_dialog_opened}
        onClose={() => { this.setState({is_member_change_dialog_opened: false}) }}
      >
        {Boolean(this.state.update_target_member) &&
        <React.Fragment>
          <DialogTitle style={{textAlign: 'center'}}>{this.state.update_target_member.name} 권한 변경</DialogTitle>

          <Divider />

          <DialogContent>
            <Fab
              size="small"
              onClick={() => this.updateMemberRole(0)}
              className={classes.fab}
              color={this.state.update_target_member.role === 0 ? 'primary' : 'default'}
            >
              <BlockIcon/>
            </Fab>
            <Fab
              size="small"
              onClick={() => this.updateMemberRole(1)}
              className={classes.fab}
              color={this.state.update_target_member.role === 1 ? 'primary' : 'default'}
            >
              <HowToRegIcon/>
            </Fab>
            <Fab
              size="small"
              onClick={() => this.updateMemberRole(2)}
              className={classes.fab}
              color={this.state.update_target_member.role === 2 ? 'primary' : 'default'}
            >
              <VerifiedUserIcon/>
            </Fab>
          </DialogContent>
        </React.Fragment>
        }
      </Dialog>
    );

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography align='center' variant="h6">
            멤버 관리
          </Typography>

          <List component="nav" aria-label="main mailbox folders">
            {members}
          </List>

          {memberUpdateDialog}
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (state: any): any => {
  return {
    "jwt": state.auth.jwt,
    "api_url": state.auth.api_url,
    "group_id": state.auth.group_id,
    "signup_code": state.auth.signup_code,
    "role": state.auth.role
  }
};

const mapDispatchToProps = (dispatch: any): any => {
  return {
    "selectGroup": (group_id: number, role: number) => {
      dispatch(selectGroup(group_id, role));
    }
  }
};

const styleAddedApp = withStyles(styles, { withTheme: true })(Member);
const reduxStateAddedApp: any = connect(mapStateToProps, mapDispatchToProps)(styleAddedApp);
const routerAddedApp: any = withRouter(reduxStateAddedApp);
export default routerAddedApp;