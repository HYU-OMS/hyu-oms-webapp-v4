import React from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  List, ListItem, ListItemIcon, ListItemText,
  Drawer,
  Hidden,
  Button, IconButton,
  Dialog, DialogTitle, DialogContent
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import axios from 'axios';
import { withSnackbar } from 'notistack';

import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';

import Home from './home/Home';

const drawerWidth: number = 240;
const styles: any = (theme: any) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    minWidth: '100vw',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
    backgroundColor: '#fdfdfd',
    height: '56px'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 10,
    color: '#aaaaaa'
  },
  toolbar: {
    height: '56px',
    minHeight: '56px'
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      position: 'fixed',
    },
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
    },
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  fbLoginButton: {
    marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit / 2,
      backgroundColor: '#3b5998',
      borderColor: '#3b5998',
      color: '#ffffff',
      textTransform: 'initial'
  },
  kakaoLoginButton: {
    marginTop: theme.spacing.unit / 2,
      marginBottom: theme.spacing.unit,
      borderColor: '#f9df33',
      backgroundColor: '#f9df33',
      textTransform: 'initial'
  }
});

class App extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      is_signin_dialog_open: false,
      is_drawer_open: (window.innerWidth >= 600),
      is_signin_in_progress: false,
    };
  }

  componentDidMount(): void {

  }

  componentWillUnmount(): void {

  }

  handleSigninButtonClick = (): void => {
    this.setState({
      is_signin_dialog_open: true
    });
  };

  handleSigninDialogClose = (): void => {
    this.setState({
      is_signin_dialog_open: false
    });
  };

  handleDrawerButtonClick = (): void => {
    this.setState({
      is_drawer_open: !this.state.is_drawer_open
    });
  };

  menulistDecoration = (path: string): string => {
    if(path === this.props.location.pathname) {
      return 'rgba(0, 0, 0, 0.05)';
    }
    else {
      return 'rgba(0, 0, 0, 0)';
    }
  };

  handleSignoutClick = (e: any): void => {
    this.props.history.push('/main');
    this.props.signOut();
  };

  handleFacebookLogin = (): void => {
    window.FB.login((response: any) => {
      if(response.status === 'connected') {
        const access_token = response['authResponse']['accessToken'];

        this.setState({
          'is_signin_in_progress': true
        });

        const url = this.props.api_url + '/v1/user';
        const content = {
          'type': 'facebook',
          'access_token': access_token
        };

        axios.post(url, content)
          .then((response: any) => {
            this.props.signIn(response.data.jwt);
            this.setState({
              'is_signin_in_progress': false,
              'is_signin_dialog_open': false
            });

            this.props.history.push('/group');
          })
          .catch((error: any) => {
            alert(error.response.data.message);
            this.setState({
              'is_signin_in_progress': false
            });
          });
      }
    });
  };

  handleKakaoLogin = (): void => {
    window.Kakao.Auth.login({
      success: (authObj: any) => {
        const access_token = authObj['access_token'];

        this.setState({
          'is_signin_in_progress': true
        });

        const url = this.props.api_url + '/v1/user';
        const content = {
          'type': 'kakao',
          'access_token': access_token
        };

        axios.post(url, content)
          .then((response: any) => {
            this.props.signIn(response.data.jwt);
            this.setState({
              'is_signin_in_progress': false,
              'is_signin_dialog_open': false
            });

            this.props.history.push('/group');
          })
          .catch((error: any) => {
            alert(error.response.data.message);
            this.setState({
              'is_signin_in_progress': false
            });
          });
      },
      fail: (err: any) => {
        console.log(err);
      }
    });
  };

  render(): any {
    const { classes, theme }: any = this.props;

    /* 상단바 */
    const appbar = (
      <AppBar className={classes.appBar} color='default'>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            className={classes.menuButton}
            onClick={this.handleDrawerButtonClick}
          >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.grow} variant='title' color='inherit' noWrap>
            HYU-OMS
          </Typography>

          {this.props.jwt === null &&
          <Button onClick={this.handleSigninButtonClick} color='inherit'>로그인</Button>
          }

          {this.props.jwt !== null &&
          <Button onClick={this.handleSignoutClick} color='inherit'>로그아웃</Button>
          }
        </Toolbar>
      </AppBar>
    );

    /* 메뉴 바 정의 */
    const drawer = (
      <div>
        <div className={classes.toolbar} />

        <Divider />

        <List>
          <Link to='/main' style={{ textDecoration: 'none' }}>
            <ListItem style={{ backgroundColor: this.menulistDecoration('/main') }} button>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary='홈' />
            </ListItem>
          </Link>
        </List>

        <Divider />

      </div>
    );

    /* Route로 변하는 부분을 정의 */
    const RouteView = (
      <Switch>
        <Route path='/main' component={Home} />
        <Redirect to='/main' />
      </Switch>
    );

    /* 로그인 Dialog */
    const signinDialog = (
      <Dialog open={this.state.is_signin_dialog_open} onClose={this.handleSigninDialogClose} aria-labelledby='signin-dialog'>
        <DialogTitle style={{textAlign: 'center'}}>로그인 방법</DialogTitle>

        <DialogContent>
          <Button
            className={classes.fbLoginButton}
            onClick={this.handleFacebookLogin}
            color='default' variant='outlined' size='large'
            fullWidth
          >
            Facebook
          </Button>
          <Button
            className={classes.kakaoLoginButton}
            onClick={this.handleKakaoLogin}
            color='default' variant='outlined' size='large'
            fullWidth>
            Kakao
          </Button>
        </DialogContent>
      </Dialog>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />

        {appbar}

        <Hidden xsDown implementation='css'>
          <Drawer
            variant='persistent'
            open={this.state.is_drawer_open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden smUp>
          <Drawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.is_drawer_open}
            onClose={this.handleDrawerButtonClick}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        {signinDialog}

        <main className={classNames(classes.content, {
          [classes.contentShift]: !this.state.is_drawer_open,
        })}>
          <div className={classes.toolbar} />

          {RouteView}

          <br/>

          <Typography variant='caption' align='center'>
            &copy; 2014 - 2019 한양대학교 한기훈
          </Typography>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(App);