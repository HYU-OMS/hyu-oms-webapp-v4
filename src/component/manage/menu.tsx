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
  Switch, Dialog, DialogTitle, DialogContent
} from '@material-ui/core';
import {
  Label as LabelIcon,
  Edit as EditIcon
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

class Menu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      "new_name": "",
      "new_price": 0,
      "menu_list": [],
      "is_edit_dialog_opened": false,
      "edit_targeted_item": null,
      "edit_price_value": 0
    };
  }

  componentDidMount(): void {
    this.getMenuList();
  }

  getMenuList = (): void => {
    const url = this.props.api_url + "/menu?group_id=" + (this.props.group_id).toString();
    const headers = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        const response = await axios.get(url, {"headers": headers});
        this.setState({
          "menu_list": response.data
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

  submitEditedPrice = (e: any) => {
    e.preventDefault();

    const url = this.props.api_url + "/menu/" + (this.state.edit_targeted_item.id).toString();
    const headers = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        await axios.put(url, {
          "price": parseInt(this.state.edit_price_value, 10),
          "is_enabled": parseInt(this.state.edit_targeted_item.is_enabled, 10)
        }, {"headers": headers});

        this.state.edit_targeted_item.price = this.state.edit_price_value;
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

  handleSwitchClick = (item: any) => {
    const url = this.props.api_url + "/menu/" + (item.id).toString();
    const headers = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        await axios.put(url, {
          "price": parseInt(item.price, 10),
          "is_enabled": parseInt(item.is_enabled, 10) === 1 ? 0 : 1
        }, {"headers": headers});

        item.is_enabled = !item.is_enabled;
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

  handleNewMenuNameChange = (e: any) => {
    this.setState({
      "new_name": e.target.value
    });
  };

  handleNewMenuPriceChange = (e: any) => {
    this.setState({
      "new_price": e.target.value
    });
  };

  addNewMenuSubmit = (e: any) => {
    e.preventDefault();

    const url = this.props.api_url + "/menu";
    const headers = {
      "Authorization": "Bearer " + this.props.jwt
    };

    (async () => {
      try {
        await axios.post(url, {
          "group_id": this.props.group_id,
          "name": this.state.new_name,
          "price": this.state.new_price
        }, {"headers": headers});

        this.setState({
          "new_name": "",
          "new_price": 0
        });

        this.getMenuList();
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

    const menus = this.state.menu_list.map((item: any) =>
      <ListItem key={item.id}>
        <ListItemIcon>
          <LabelIcon />
        </ListItemIcon>
        <ListItemText primary={item.name} secondary={item.price} />
        <ListItemSecondaryAction>
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

    const memberUpdateDialog: any = (
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

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography align='center' variant="h6">
            메뉴 관리
          </Typography>

          <List component="nav" aria-label="main mailbox folders">
            {menus}
          </List>

          <Divider className={classes.divider} component='hr' variant='fullWidth' />

          <Typography align='center' variant="h6">
            새 메뉴 추가
          </Typography>

          <form onSubmit={this.addNewMenuSubmit} autoComplete="off">
            <TextField
              required
              fullWidth
              label="이름"
              onChange={this.handleNewMenuNameChange}
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
              onChange={this.handleNewMenuPriceChange}
              value={this.state.new_price}
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
              className={classes.button}
            >
              추가하기
            </Button>
          </form>
        </Paper>

        {memberUpdateDialog}
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

const styleAddedApp = withStyles(styles, { withTheme: true })(Menu);
const reduxStateAddedApp: any = connect(mapStateToProps)(styleAddedApp);
const routerAddedApp: any = withRouter(reduxStateAddedApp);
export default routerAddedApp;