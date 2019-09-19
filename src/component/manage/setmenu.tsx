import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import {
  Paper,
  Typography,
  Divider,
  Container,
  List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction,
  Button, IconButton,
  TextField,
  Switch, ListSubheader, ListItemAvatar, Avatar, Dialog, DialogTitle, DialogContent
} from '@material-ui/core';
import {
  Label as LabelIcon,
  Edit as EditIcon,
  InfoOutlined as InfoIcon, AddCircleOutlined as AddIcon, RemoveCircleOutlined as RemoveIcon
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
  buttonInDialog: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1)
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

class Setmenu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      "new_name": "",
      "new_price": 0,
      "setmenu_list": [],
      "menu_list": [],
      "is_edit_dialog_opened": false,
      "edit_targeted_item": null,
      "edit_price_value": 0
    };
  }

  componentDidMount(): void {
    this.getMenuList();
    this.getSetmenuList();
  }

  getMenuList = (): void => {
    const url = this.props.api_url + "/menu?group_id=" + (this.props.group_id).toString();
    const headers = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        const response = await axios.get(url, {"headers": headers});

        const menus = response.data;
        for(const menu of menus) {
          menu.amount = 0;
        }

        this.setState({
          "menu_list": menus
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

  getSetmenuList = (): void => {
    const url = this.props.api_url + "/setmenu?group_id=" + (this.props.group_id).toString();
    const headers = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        const response = await axios.get(url, {"headers": headers});
        this.setState({
          "setmenu_list": response.data
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

  editButtonClick = (item: any): void => {
    this.setState({
      "is_edit_dialog_opened": true,
      "edit_targeted_item": item,
      "edit_price_value": item.price
    });
  };

  handleEditPriceChange = (e: any) => {
    this.setState({
      "edit_price_value": e.target.value
    });
  };

  handleSwitchClick = (item: any) => {
    const url = this.props.api_url + "/setmenu/" + (item.id).toString();
    const headers = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        await axios.put(url, {
          "price": parseInt(item.price, 10),
          "is_enabled": parseInt(item.is_enabled, 10) === 1 ? 0 : 1
        }, {"headers": headers});

        //item.is_enabled = !item.is_enabled;
        //this.forceUpdate();
        this.getSetmenuList();
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

  submitEditedPrice = (e: any) => {
    e.preventDefault();

    const url = this.props.api_url + "/setmenu/" + (this.state.edit_targeted_item.id).toString();
    const headers = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        await axios.put(url, {
          "price": parseInt(this.state.edit_price_value, 10),
          "is_enabled": parseInt(this.state.edit_targeted_item.is_enabled, 10)
        }, {"headers": headers});

        //this.state.edit_targeted_item.price = this.state.edit_price_value;
        this.getSetmenuList();
        this.setState({
          "is_edit_dialog_opened": false,
          "edit_targeted_item": null,
          "edit_price_value": 0
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

  handleNewSetmenuNameChange = (e: any) => {
    this.setState({
      "new_name": e.target.value
    });
  };

  handleNewSetmenuPriceChange = (e: any) => {
    this.setState({
      "new_price": e.target.value
    });
  };

  handleMenuItemAdjust = (menuItem: any, value: number): void => {
    if(menuItem.is_enabled !== 1) {
      return;
    }

    if(isNaN(menuItem.amount)) {
      menuItem.amount = 0;
    }

    menuItem.amount += value;
    if(menuItem.amount < 0) {
      menuItem.amount = 0;
    }

    this.setState({
      "menu_list": this.state.menu_list
    });
  };

  addNewSetmenuSubmit = (e: any) => {
    e.preventDefault();

    const new_menu_list = [];
    for(const menu of this.state.menu_list) {
      for(let i = 0; i < menu.amount; i++) {
        new_menu_list.push(menu.id);
      }
    }

    const url = this.props.api_url + "/setmenu";
    const headers = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        await axios.post(url, {
          "group_id": this.props.group_id,
          "name": this.state.new_name,
          "price": this.state.new_price,
          "menu_list": new_menu_list
        }, {"headers": headers});

        this.setState({
          "new_name": "",
          "new_price": 0
        });

        this.getMenuList();
        this.getSetmenuList();
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

  render() {
    const { classes } = this.props;

    const setmenuUpdateDialog: any = (
      <Dialog
        open={this.state.is_edit_dialog_opened}
        onClose={() => { this.setState({is_edit_dialog_opened: false}) }}
      >
        {Boolean(this.state.edit_targeted_item) &&
        <React.Fragment>
          <DialogTitle style={{textAlign: 'center'}}>{this.state.edit_targeted_item.name} 가격 수정</DialogTitle>

          <Divider />

          <DialogContent>
            <form onSubmit={this.submitEditedPrice} autoComplete="off">
              <TextField
                required
                fullWidth
                value={this.state.edit_price_value}
                onChange={this.handleEditPriceChange}
                label="가격"
                className={classes.textField}
                margin="dense"
                variant='outlined'
              />

              <Button
                fullWidth
                type="submit"
                className={classes.buttonInDialog}
                size='medium'
                variant="contained"
                color="primary"
              >
                변경사항 저장
              </Button>
            </form>
          </DialogContent>
        </React.Fragment>
        }
      </Dialog>
    );

    /* TODO: 메뉴 정보 보여주기 제대로 작성 */
    const setmenus = this.state.setmenu_list.map((item: any) =>
      <ListItem key={item.id}>
        <ListItemIcon>
          <LabelIcon />
        </ListItemIcon>
        <ListItemText primary={item.name} secondary={item.price} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => alert(JSON.stringify(item.menu_list))} edge="end">
            <InfoIcon />
          </IconButton>
          <IconButton onClick={() => this.editButtonClick(item)} edge="end">
            <EditIcon />
          </IconButton>
          <Switch
            edge="end"
            onClick={() => this.handleSwitchClick(item)}
            checked={Boolean(item.is_enabled)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    );

    const menus = this.state.menu_list.map((item: any) =>
      <ListItem key={item.id} className={classes.listItem}>
        <ListItemAvatar>
          <Avatar>
            {item.amount}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} secondary={item.price} />
        <ListItemSecondaryAction>
          <IconButton onClick={(e) => this.handleMenuItemAdjust(item, 1)} edge="end">
            <AddIcon/>
          </IconButton>
          <IconButton onClick={(e) => this.handleMenuItemAdjust(item, -1)} edge="end">
            <RemoveIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography align='center' variant="h6">
            세트메뉴 관리
          </Typography>

          <List component="nav">
            {setmenus}
          </List>

          <Divider className={classes.divider} component='hr' variant='fullWidth' />

          <Typography align='center' variant="h6">
            새 세트메뉴 추가
          </Typography>

          <form onSubmit={this.addNewSetmenuSubmit} autoComplete="off">
            <TextField
              required
              fullWidth
              label="이름"
              onChange={this.handleNewSetmenuNameChange}
              value={this.state.new_name}
              className={classes.textField}
              margin="dense"
              variant='outlined'
            />

            <TextField
              required
              fullWidth
              type="number"
              label="가격"
              onChange={this.handleNewSetmenuPriceChange}
              value={this.state.new_price}
              className={classes.textField}
              margin="dense"
              variant='outlined'
            />

            <List
              dense
              subheader={
                <ListSubheader className={classes.listSubHeader} component="div">
                  메뉴 목록
                </ListSubheader>
              }
            >
              {menus}
            </List>

            <Button
              fullWidth
              type="submit"
              size='medium'
              variant="contained"
              color="primary"
              className={classes.button}
            >
              추가하기
            </Button>
          </form>
        </Paper>

        {setmenuUpdateDialog}
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

const styleAddedApp = withStyles(styles, { withTheme: true })(Setmenu);
const reduxStateAddedApp: any = connect(mapStateToProps)(styleAddedApp);
const routerAddedApp: any = withRouter(reduxStateAddedApp);
export default routerAddedApp;