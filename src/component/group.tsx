import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import axios from 'axios';
import {
  Paper,
  Typography,
  Divider,
  Container,
  List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction,
  Avatar,
  Button, IconButton,
  TextField, ButtonGroup
} from '@material-ui/core';
import {
  HowToReg as HowToRegIcon,
  PersonAddOutlined as PersonAddIcon,
  PersonAddDisabledOutlined as PersonAddDisabledIcon,
  SupervisedUserCircle as AdminIcon
} from '@material-ui/icons';
import { withStyles, Theme } from '@material-ui/core/styles';

import { selectGroup } from '../action/auth';

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
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  textField: {
    paddingBottom: theme.spacing(0.5)
  }
});

class Group extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      "list_r": [],
      "pagination_r": [],
      "cur_page_r": 1,
      "list_ur": [],
      "pagination_ur": [],
      "cur_page_ur": 1,
      "new_group_name": ""
    };
  }

  componentDidMount(): void {
    this.getGroupList();
  }

  getGroupList = (page_r: number = this.state.cur_page_r, page_ur: number = this.state.cur_page_ur) => {
    const url: string = this.props.api_url + "/group?page_r=" + page_r.toString(10) + "&page_ur=" + page_ur.toString(10);
    const headers: any = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        const response: any = await axios.get(url, {
          "headers": headers
        });

        const data_r = response.data.registered;
        const data_ur = response.data.unregistered;

        this.setState({
          "list_r": data_r.list,
          "pagination_r": data_r.pagination,
          "list_ur": data_ur.list,
          "pagination_ur": data_ur.pagination
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

  clickRegisteredGroupButton = (item: any) => {
    if(item.role > 0) {
      this.props.selectGroup(item.id, item.role);
    }
  };

  clickRegisterToSpecificGroup = (item: any) => {
    if(!window.confirm(item.name + " 그룹에 가입 신청을 하겠습니까?")) {
      return;
    }

    const group_id = item.id;

    const url: string = this.props.api_url + "/member";
    const headers: any = {
      "Authorization": "Bearer " + this.props.jwt
    };
    const body: any = {
      "group_id": group_id
    };

    (async () => {
      try {
        await axios.post(url, body, {"headers": headers});
        alert("가입 신청 완료. 그룹 관리자 승인 대기 중입니다.");
        this.getGroupList();
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

  handleNewGroupValueOnChange = (e: any) => {
    this.setState({
      "new_group_name": e.target.value
    });
  };

  submitNewGroup = (e: any) => {
    e.preventDefault();

    const url: string = this.props.api_url + "/group";
    const headers: any = {
      "Authorization": "Bearer " + this.props.jwt
    };
    const body: any = {
      "name": this.state.new_group_name
    };

    (async () => {
      try {
        await axios.post(url, body, {"headers": headers});
        alert("그룹 생성이 완료되었습니다.");

        this.setState({
          "new_group_name": ""
        });
        this.getGroupList();
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

  displayDate = (date_str: string): string => {
    const dateObj: Date = new Date(date_str);

    const year = dateObj.getFullYear();
    const month_str = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = dateObj.getDate();

    return month_str[dateObj.getMonth()] + " " + date + ", " + year;
  };

  displayListHeadCharacter = (name: string): string => {
    if(name.length === 0) {
      return "-";
    }
    else {
      return name[0];
    }
  };

  render() {
    const { classes } = this.props;

    const registered_group: any = this.state.list_r.map((item: any) =>
      <ListItem
        button
        onClick={() => this.clickRegisteredGroupButton(item)}
        selected={parseInt(this.props.group_id) === parseInt(item.id)}
        disabled={parseInt(item.role, 10) === 0}
        key={item.id}
      >
        <ListItemAvatar>
          <Avatar>
            {this.displayListHeadCharacter(item.name)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} secondary={this.displayDate(item.created_at)} />
        <ListItemSecondaryAction>
          <IconButton edge="end" disabled={parseInt(item.role, 10) === 0}>
            {parseInt(item.role, 10) === 0 && <PersonAddDisabledIcon />}
            {parseInt(item.role, 10) === 1 && <HowToRegIcon />}
            {parseInt(item.role, 10) === 2 && <AdminIcon />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );

    const registered_pagination: any = this.state.pagination_r.map((item: any) =>
      <Button key={item.num}>{item.num}</Button>
    );

    const unregistered_group: any = this.state.list_ur.map((item: any) =>
      <ListItem
        button
        onClick={() => this.clickRegisterToSpecificGroup(item)}
        key={item.id}
      >
        <ListItemAvatar>
          <Avatar>
            {this.displayListHeadCharacter(item.name)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} secondary={this.displayDate(item.created_at)} />
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <PersonAddIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );

    const unregistered_pagination: any = this.state.pagination_ur.map((item: any) =>
      <Button key={item.num}>{item.num}</Button>
    );

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography align='center' variant="h6">
            가입된 그룹 목록
          </Typography>

          <List dense>
            {registered_group}
          </List>

          <ButtonGroup fullWidth color='default'>
            {registered_pagination}
          </ButtonGroup>

          <Divider className={classes.divider} component='hr' variant='fullWidth' />

          <Typography align='center' variant="h6">
            가입 가능 그룹 목록
          </Typography>

          <List dense>
            {unregistered_group}
          </List>

          <ButtonGroup fullWidth color='default'>
            {unregistered_pagination}
          </ButtonGroup>

          <Divider className={classes.divider} component='hr' variant='fullWidth' />

          <Typography align='center' variant="h6">
            새 그룹 생성
          </Typography>

          <form onSubmit={this.submitNewGroup} autoComplete="off">
            <TextField
              required
              fullWidth
              onChange={this.handleNewGroupValueOnChange}
              label="새 그룹 이름"
              className={classes.textField}
              margin="dense"
              variant='outlined'
            />

            <Button
              fullWidth
              type="submit"
              size='medium'
              variant="contained"
              color="primary"
            >
              생성하기
            </Button>
          </form>
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
  };
};

const mapDispatchToProps = (dispatch: any): any => {
  return {
    "selectGroup": (group_id: number, role: number) => {
      dispatch(selectGroup(group_id, role));
    }
  };
};

const styleAddedApp: any = withStyles(styles, { withTheme: true })(Group);
const reduxStateAddedApp: any = connect(mapStateToProps, mapDispatchToProps)(styleAddedApp);
const routerAddedApp: any = withRouter(reduxStateAddedApp);
export default routerAddedApp;