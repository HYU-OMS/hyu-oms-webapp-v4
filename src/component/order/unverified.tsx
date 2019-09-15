import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
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
  listItem: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5)
  }
});

class Unverified extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      "list": [],
      "pagination": [],
      "cur_page": 1
    };
  }

  componentDidMount(): void {
    this.getOrderList();
  }

  getOrderList = (page: number = this.state.cur_page): void => {
    const url = this.props.api_url + "/order?show_only_pending=1" +
      "&group_id=" + (this.props.group_id).toString() + "&page=" + page.toString();
    const headers = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        const response = await axios.get(url, {"headers": headers});
        this.setState({
          "list": response.data.list,
          "pagination": response.data.pagination
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

  handlePaginationClick = (page_num: number) => {
    this.setState({
      "cur_page": page_num,
    });

    this.getOrderList(page_num);
  };

  handleGetOrderInfo = (orderItem: any) => {
    const url = this.props.api_url + "/order/" + (orderItem.id).toString();
    const headers = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        const response = await axios.get(url, {"headers": headers});

        let alert_msg = "주문번호 : " + (response.data.order_id).toString() + "\n";
        alert_msg += "테이블 : " + (orderItem.table_id).toString() + "\n";
        alert_msg += "시간 : " + this.getDateString(orderItem.created_at) + "\n";

        alert_msg += "\n[일반메뉴]\n";
        for(const menu_info of response.data.order_menus) {
          alert_msg += (menu_info['name'] + " : " + menu_info['amount'] + "\n");
        }

        alert_msg += "\n[세트메뉴]\n";
        for(const setmenu_info of response.data.order_setmenus) {
          alert_msg += (setmenu_info['name'] + " : " + setmenu_info['amount'] + "\n");
        }

        alert(alert_msg);
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

  handleUpdateStatus = (order_id: number, is_approved: number): void => {
    let confirm_msg = "주문번호 " + order_id.toString() + " 을 ";
    if(is_approved === 1) {
      confirm_msg += "승인";
    }
    else {
      confirm_msg += "거절";
    }
    confirm_msg += "하시겠습니까?";

    if(window.confirm(confirm_msg)) {
      (async () => {
        const url = this.props.api_url + "/order/" + order_id.toString();
        const headers = {
          "Authorization": "Bearer " + this.props.jwt
        };

        try {
          await axios.put(url,{
            "is_approved": is_approved
          },{"headers": headers});

          this.getOrderList();
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

  getDateString = (date_iso_str: string): string => {
    const dateObj: Date = new Date(date_iso_str);

    const year = (dateObj.getFullYear()).toString();
    const month = (dateObj.getMonth() + 1).toString();
    const date = (dateObj.getDate()).toString();

    let hour = (dateObj.getHours() + 1).toString();
    if(hour.length === 1) {
      hour = "0" + hour;
    }

    let minute = (dateObj.getMinutes()).toString();
    if(minute.length === 1) {
      minute = "0" + minute;
    }

    let second = (dateObj.getSeconds()).toString();
    if(second.length === 1) {
      second = "0" + second;
    }

    return year + "/" + month + "/" + date + " " + hour + ":" + minute + ":" + second;
  };

  render() {
    const { classes } = this.props;

    const order_list = this.state.list.map((item: any) =>
      <ListItem
        key={item.id}
        button
        onClick={() => this.handleGetOrderInfo(item)}
        className={classes.listItem}
      >
        <ListItemText primary={
          <React.Fragment>
            <Chip size='small' avatar={<Avatar>#</Avatar>} label={item.id} />
            &nbsp;
            <Chip size='small' avatar={<Avatar>$</Avatar>} label={item.total_price} />
            &nbsp;
            <Chip size='small' avatar={<Avatar>To</Avatar>} label={item.table_id} />
          </React.Fragment>
        } secondary={item.name + " | "+ this.getDateString(item.created_at)} />
        <ListItemSecondaryAction>
          <IconButton onClick={(e) => this.handleUpdateStatus(item.id, 1)} edge="end">
            <CheckIcon/>
          </IconButton>
          <IconButton onClick={(e) => this.handleUpdateStatus(item.id, 0)} edge="end">
            <CloseIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );

    const pagination = this.state.pagination.map((item: any) =>
      <Button
        key={item.num}
        disabled={item.current === true}
        onClick={(e) => this.handlePaginationClick(item.num)}
      >
        {item.text}
      </Button>
    );

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography align='center' variant="h6">
            미처리 주문 내역
          </Typography>

          <List dense>
            {order_list}
          </List>

          <ButtonGroup fullWidth color='default'>
            {pagination}
          </ButtonGroup>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    "jwt": state.auth.jwt,
    "api_url": state.auth.api_url,
    "group_id": state.auth.group_id
  };
};

const styleAddedApp = withStyles(styles, { withTheme: true })(Unverified);
const reduxStateAddedApp: any = connect(mapStateToProps)(styleAddedApp);
const routerAddedApp: any = withRouter(reduxStateAddedApp);
export default routerAddedApp;