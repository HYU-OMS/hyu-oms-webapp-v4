import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import {
  Paper,
  Typography,
  Divider,
  Container,
  List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, ListSubheader,
  Avatar,
  Button, IconButton,
  TextField,
  LinearProgress, CircularProgress
} from '@material-ui/core';
import {
  AddCircleOutlined as AddIcon,
  RemoveCircleOutlined as RemoveIcon
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
  paper: {
    boxShadow: 'none'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
});

class OrderRequest extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      "menu_list": [],
      "setmenu_list": [],
      "prev_status": null,
      "table_name": "",
      "total_price": 0,
      "is_loading": true,
      "setInterval": null,
      "interval_sec": 10
    };
  }

  componentDidMount(): void {
    this.getMenuAndSetmenuList();
    this.setState({
      "setInterval": setInterval(() => {
        if(this.state.interval_sec === 0) {
          this.getMenuAndSetmenuList();
        }

        this.setState({
          "interval_sec": this.state.interval_sec - 1
        });
      }, 1000)
    });
  }

  componentWillUnmount(): void {
    clearInterval(this.state.setInterval);
    this.setState({
      "setInterval": null
    });
  }

  getMenuAndSetmenuList = () => {
    const url_menu = this.props.api_url + "/menu?group_id=" + (this.props.group_id).toString();
    const url_setmenu = this.props.api_url + "/setmenu?group_id=" + (this.props.group_id).toString();

    const headers = {
      "Authorization": "Bearer " + this.props.jwt
    };

    this.setState({
      "is_loading": true
    });

    (async () => {
      try {
        const response_menu: any = await axios.get(url_menu, {"headers": headers});
        const menus = response_menu.data;
        for(const menu of menus) {
          menu.amount = 0;
        }

        const response_setmenu: any = await axios.get(url_setmenu, {"headers": headers});
        const setmenus = response_setmenu.data;
        for(const setmenu of setmenus) {
          setmenu.amount = 0;
        }

        if(this.state.prev_status === null) {
          const menu_status: any = {};
          for(const menu of menus) {
            menu_status[menu.id] = {"is_enabled": menu.is_enabled, "price": menu.price};
          }

          const setmenu_status: any = {};
          for(const setmenu of setmenus) {
            setmenu_status[setmenu.id] = {"is_enabled": setmenu.is_enabled, "price": setmenu.price};
          }

          this.setState({
            "prev_status": {
              "menu": menu_status,
              "setmenu": setmenu_status
            },
            "menu_list": menus,
            "setmenu_list": setmenus
          });
        }
        else {
          let is_changed: boolean = false;

          const menu_status: any = {};
          for(const menu of menus) {
            menu_status[menu.id] = {"is_enabled": menu.is_enabled, "price": menu.price};
          }

          const setmenu_status: any = {};
          for(const setmenu of setmenus) {
            setmenu_status[setmenu.id] = {"is_enabled": setmenu.is_enabled, "price": setmenu.price};
          }

          if(Object.keys(menu_status).length !== Object.keys(this.state.prev_status.menu).length) {
            is_changed = true;
          }
          else {
            const menu_ids = Object.keys(menu_status);
            for(const menu_id of menu_ids) {
              if(menu_status[menu_id].is_enabled !== this.state.prev_status.menu[menu_id].is_enabled) {
                is_changed = true;
                break;
              }

              if(menu_status[menu_id].price !== this.state.prev_status.menu[menu_id].price) {
                is_changed = true;
                break;
              }
            }
          }

          if(Object.keys(setmenu_status).length !== Object.keys(this.state.prev_status.setmenu).length) {
            is_changed = true;
          }
          else {
            const setmenu_ids = Object.keys(setmenu_status);
            for(const setmenu_id of setmenu_ids) {
              if(setmenu_status[setmenu_id].is_enabled !== this.state.prev_status.setmenu[setmenu_id].is_enabled) {
                is_changed = true;
                break;
              }

              if(setmenu_status[setmenu_id].price !== this.state.prev_status.setmenu[setmenu_id].price) {
                is_changed = true;
                break;
              }
            }
          }

          if(is_changed) {
            alert("메뉴/세트메뉴 에 변동사항이 있습니다!");
            
            this.setState({
              "prev_status": {
                "menu": menu_status,
                "setmenu": setmenu_status
              },
              "menu_list": menus,
              "setmenu_list": setmenus
            });
          }
        }

        this.setState({
          "is_loading": false,
          "interval_sec": 10
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

  handleMenuItemAdjust = (menuItem: any, value: number): void => {
    if(menuItem.is_enabled !== 1) {
      return;
    }

    if(isNaN(menuItem.amount)) {
      menuItem.amount = 0;
    }

    menuItem.amount += value;

    this.setState({
      "menu_list": this.state.menu_list,
      "total_price": this.state.total_price + (value * menuItem.price)
    });
  };

  handleSetmenuItemAdjust = (setmenuItem: any, value: number): void => {
    if(setmenuItem.is_enabled !== 1) {
      return;
    }

    if(isNaN(setmenuItem.amount)) {
      setmenuItem.amount = 0;
    }

    setmenuItem.amount += value;

    this.setState({
      "setmenu_list": this.state.setmenu_list,
      "total_price": this.state.total_price + (value * setmenuItem.price)
    });
  };

  handleTableNameChange = (e: any) => {
    this.setState({
      "table_name": e.target.value
    });
  };

  handleOnSubmit = (e: any) => {
    e.preventDefault();

    const url = this.props.api_url + "/order";
    const headers = {
      "Authorization": "Bearer " + this.props.jwt
    };

    const menu_list = [];
    for(const menu of this.state.menu_list) {
      if(!isNaN(menu.amount) && menu.amount !== 0) {
        menu_list.push({
          "id": menu.id,
          "amount": menu.amount
        });
      }
    }

    const setmenu_list = [];
    for(const setmenu of this.state.setmenu_list) {
      if(!isNaN(setmenu.amount) && setmenu.amount !== 0) {
        setmenu_list.push({
          "id": setmenu.id,
          "amount": setmenu.amount
        });
      }
    }

    if(menu_list.length === 0 && setmenu_list.length === 0) {
      alert("선택된 메뉴/세트메뉴 가 하나도 없습니다!");
    }
    else {
      (async () => {
        try {
          const response: any = await axios.post(url, {
            "group_id": this.props.group_id,
            "table_id": this.state.table_name,
            "menu_list": menu_list,
            "setmenu_list": setmenu_list
          }, {"headers": headers});

          const alert_msg = "주문 요청이 완료되었습니다.\n" +
            "주문번호 : " + (response.data.order_id).toString() + "\n" +
            "총 금액 : " + (response.data.total_price).toString();

          alert(alert_msg);

          for(const menu of this.state.menu_list) {
            if(!isNaN(menu.amount)) {
              delete menu.amount;
            }
          }

          for(const setmenu of this.state.setmenu_list) {
            if(!isNaN(setmenu.amount)) {
              delete setmenu.amount;
            }
          }

          this.setState({
            "table_name": "",
            "total_price": 0,
            "menu_list": this.state.menu_list,
            "setmenu_list": this.state.setmenu_list
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
    }
  };

  render() {
    const { classes } = this.props;

    const menuItems = this.state.menu_list.map((item: any) =>
      <ListItem key={item.id} className={classes.listItem} disabled={!Boolean(item.is_enabled)}>
        <ListItemAvatar>
          <Avatar>
            {item.amount}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} secondary={item.price} />
        <ListItemSecondaryAction>
          {Boolean(item.is_enabled) &&
          <React.Fragment>
            <IconButton onClick={(e) => this.handleMenuItemAdjust(item, 1)} edge="end">
              <AddIcon/>
            </IconButton>
            <IconButton onClick={(e) => this.handleMenuItemAdjust(item, -1)} edge="end">
              <RemoveIcon/>
            </IconButton>
          </React.Fragment>
          }
        </ListItemSecondaryAction>
      </ListItem>
    );

    const setmenuItems = this.state.setmenu_list.map((item: any) =>
      <ListItem key={item.id} className={classes.listItem} disabled={!Boolean(item.is_enabled)}>
        <ListItemAvatar>
          <Avatar>
            {item.amount}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} secondary={item.price} />
        <ListItemSecondaryAction>
          {Boolean(item.is_enabled) &&
          <React.Fragment>
            <IconButton onClick={(e) => this.handleSetmenuItemAdjust(item, 1)} edge="end">
              <AddIcon/>
            </IconButton>
            <IconButton onClick={(e) => this.handleSetmenuItemAdjust(item, -1)} edge="end">
              <RemoveIcon/>
            </IconButton>
          </React.Fragment>
          }
        </ListItemSecondaryAction>
      </ListItem>
    );

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper square className={classes.paper}>
          <LinearProgress color={Boolean(this.state.is_loading) ? 'secondary' : 'primary'} />
          <div className={classes.root}>
            <Typography align='center' variant="h6">
              주문 입력
            </Typography>

            <Typography align='center' className={classes.wrapper}>
              <Button variant='outlined' disabled>
                {!Boolean(this.state.is_loading) ? this.state.interval_sec : "Loading..."}
                {Boolean(this.state.is_loading) && <CircularProgress size={24} color='inherit' className={classes.buttonProgress} />}
              </Button>
            </Typography>

            <List
              dense
              subheader={
                <ListSubheader className={classes.listSubHeader} component="div">
                  메뉴 목록
                </ListSubheader>
              }
            >
              {this.state.menu_list.length === 0 &&
              <ListItem className={classes.listItem} disabled>
                <ListItemAvatar>
                  <Avatar>
                    X
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="메뉴가 없습니다." secondary="관리자 화면에서 메뉴를 추가해주세요." />
              </ListItem>
              }
              {menuItems}
            </List>

            {this.state.setmenu_list.length > 0 &&
            <List
              dense
              subheader={
                <ListSubheader className={classes.listSubHeader} component="div">
                  세트메뉴 목록
                </ListSubheader>
              }
            >
              {setmenuItems}
            </List>
            }

            <form onSubmit={this.handleOnSubmit} autoComplete="off">
              <TextField
                required
                fullWidth
                label="가져다 줄 위치를 입력해 주세요"
                margin="dense"
                variant='outlined'
                value={this.state.table_name}
                onChange={this.handleTableNameChange}
              />

              <Divider className={classes.divider} component='hr' variant='fullWidth' />

              <Button
                fullWidth
                size='medium'
                variant="outlined"
                color="inherit"
                className={classes.button}
              >
                총 금액 : {this.state.total_price}
              </Button>

              <Button
                fullWidth
                type="submit"
                size='medium'
                variant="contained"
                color="primary"
                className={classes.button}
              >
                주문 생성
              </Button>
            </form>
          </div>
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
  }
};

const styleAddedApp = withStyles(styles, { withTheme: true })(OrderRequest);
const reduxStateAddedApp: any = connect(mapStateToProps)(styleAddedApp);
const routerAddedApp: any = withRouter(reduxStateAddedApp);
export default routerAddedApp;