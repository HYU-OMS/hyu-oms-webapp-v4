import React from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import classNames from 'classnames';
import axios from 'axios';
import {
  CssBaseline,
  AppBar, Toolbar,
  Typography,
  Button, IconButton, Icon,
  Drawer,
  List, ListItem, ListItemIcon, ListItemText,
  Divider,
  Hidden,
  Dialog, DialogTitle, DialogContent,
  Badge
} from '@material-ui/core';
import { loadCSS } from 'fg-loadcss';

/* To use Typescript types */
import { Theme } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TocIcon from '@material-ui/icons/Toc';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import { signIn, signOut } from '../action/auth';

import Home from './home';

const drawerWidth: number = 240;
const styles: any = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    display: 'flex',
    minWidth: '100vw',
    backgroundColor: '#fafafa'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: '0px 1px 7px 0px rgba(0,0,0,0.05)',
    backgroundColor: '#ffffff',
    height: '56px'
  },
  toolbar: {
    height: '56px',
    minHeight: '56px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#606060'
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#f5f5f5',
    border: 0,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    height: '40px'
  },
  listItem: {
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingTop: 0,
    paddingBottom: 0,
    height: '40px'
  },
  listItemIcon: {
    width: '48px',
    minWidth: '48px'
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  divider: {
    marginTop: '11.5px',
    marginBottom: '11.5px',
    paddingTop: '0.5px',
    paddingBottom: '0.5px'
  },
  drawerTopMostDivider: {
    paddingTop: '0.5px',
    paddingBottom: '0.5px'
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
    },
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  fbLoginButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1 / 2),
    backgroundColor: '#3b5998',
    borderColor: '#3b5998',
    color: '#ffffff',
    textTransform: 'initial'
  },
  kakaoLoginButton: {
    marginTop: theme.spacing(1 / 2),
    marginBottom: theme.spacing(1),
    borderColor: '#f9df33',
    backgroundColor: '#f9df33',
    textTransform: 'initial'
  }
});

/* React 에서 import 되지 않은 라이브러리 사용을 위해 아래 2줄의 코드를 추가. */
declare let FB: any;
declare let Kakao: any;

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      is_drawer_open: (window.innerWidth >= 600),
      is_authenticate_dialog_open: false,
      is_authenticate_in_progress: false
    };
  }

  componentDidMount(): void {
    /* Font Awesome */
    loadCSS('https://use.fontawesome.com/releases/v5.9.0/css/all.css');

    /* XEIcon - for Kakao Icon */
    loadCSS('https://cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css');
  }

  handleDrawerButtonClick = (): void => {
    this.setState({
      is_drawer_open: !this.state.is_drawer_open
    });
  };

  handleSigninButtonClick = (): void => {
    this.setState({
      is_authenticate_dialog_open: true
    });
  };

  handleSignoutButtonClick = (e: any) => {
    this.props.history.push('/main');
    this.props.signOut();
  };

  handleSigninDialogClose = () => {
    this.setState({
      is_authenticate_dialog_open: false
    });
  };

  handleFacebookLogin = () => {
    FB.login((response: any) => {
      if(response.status === 'connected') {
        const access_token = response['authResponse']['accessToken'];

        this.setState({
          is_authenticate_in_progress: true
        });

        const url = this.props.api_url + '/v1/user';
        const content = {
          type: 'facebook',
          access_token: access_token
        };

        axios.post(url, content)
          .then((response: any) => {
            this.props.signIn(response.data.jwt);
            this.setState({
              is_authenticate_in_progress: false,
              is_authenticate_dialog_open: false
            });

            this.props.history.push('/group');
          })
          .catch((error: any) => {
            alert(error.response.data.message);
            this.setState({
              is_authenticate_in_progress: false
            });
          });
      }
    });
  };

  handleKakaoLogin = () => {
    Kakao.Auth.login({
      success: (authObj: any) => {
        const access_token = authObj['access_token'];

        this.setState({
          is_authenticate_in_progress: true
        });

        const url = this.props.api_url + '/v1/user';
        const content = {
          type: 'kakao',
          access_token: access_token
        };

        axios.post(url, content)
          .then((response: any) => {
            this.props.signIn(response.data.jwt);
            this.setState({
              is_authenticate_in_progress: false,
              is_authenticate_dialog_open: false
            });

            this.props.history.push('/group');
          })
          .catch((error: any) => {
            alert(error.response.data.message);
            this.setState({
              is_authenticate_in_progress: false
            });
          });
      },
      fail: (err: any) => {
        console.log(err);
      }
    });
  };

  render(): any {
    const { classes, theme } = this.props;

    const appbar: any = (
      <AppBar className={classes.appBar} color='inherit' position='fixed'>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={this.handleDrawerButtonClick} edge='start' className={classes.menuButton} color='inherit' aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            HYU-OMS
          </Typography>

          <IconButton color='default'>
            <Badge badgeContent={4} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton color='default'>
            <NotificationsNoneIcon />
          </IconButton>

          <Button onClick={this.handleSignoutButtonClick} color='default'>로그아웃</Button>

          <Button onClick={this.handleSigninButtonClick} color='default'>로그인</Button>
        </Toolbar>
      </AppBar>
    );

    const drawer_content: any = (
      <React.Fragment>
        <div className={classes.toolbar} />

        <Hidden smUp>
          <Divider className={classes.drawerTopMostDivider} />
        </Hidden>

        <div style={{padding: '5px'}} />

        <List className={classes.list}>
          <Link to='/main' className={classes.link}>
            <ListItem className={classes.listItem} button selected={this.props.location.pathname === '/main'}>
              <ListItemIcon className={classes.listItemIcon}><HomeIcon /></ListItemIcon>
              <ListItemText>
                <Typography variant='button'>홈</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        </List>

        <Divider className={classes.divider} />

        <List className={classes.list}>
          <Link to='/group' className={classes.link}>
            <ListItem className={classes.listItem} button selected={this.props.location.pathname === '/group'}>
              <ListItemIcon className={classes.listItemIcon}><GroupIcon /></ListItemIcon>
              <ListItemText>
                <Typography variant='button'>그룹</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        </List>

        <Divider className={classes.divider} />

        <List className={classes.list}>
          <Link to='/order/request' className={classes.link}>
            <ListItem className={classes.listItem} button selected={this.props.location.pathname === '/order/request'}>
              <ListItemIcon className={classes.listItemIcon}><PlaylistAddIcon /></ListItemIcon>
              <ListItemText>
                <Typography variant='button'>주문 입력</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        </List>

        <List className={classes.list}>
          <Link to='/order/list' className={classes.link}>
            <ListItem className={classes.listItem} button selected={this.props.location.pathname === '/order/list'}>
              <ListItemIcon className={classes.listItemIcon}><TocIcon /></ListItemIcon>
              <ListItemText>
                <Typography variant='button'>전체 주문 내역</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        </List>

        <List className={classes.list}>
          <Link to='/order/unverified' className={classes.link}>
            <ListItem className={classes.listItem} button selected={this.props.location.pathname === '/order/unverified'}>
              <ListItemIcon className={classes.listItemIcon}><PlaylistAddCheckIcon /></ListItemIcon>
              <ListItemText>
                <Typography variant='button'>처리되지 않은 주문 내역</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        </List>

        <Divider className={classes.divider} />

        <List className={classes.list}>
          <Link to='/queue' className={classes.link}>
            <ListItem className={classes.listItem} button selected={this.props.location.pathname === '/queue'}>
              <ListItemIcon className={classes.listItemIcon}><FormatListNumberedIcon /></ListItemIcon>
              <ListItemText>
                <Typography variant='button'>메뉴별 대기열</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        </List>

        <Divider className={classes.divider} />

        <List className={classes.list}>
          <Link to='/statistics' className={classes.link}>
            <ListItem className={classes.listItem} button selected={this.props.location.pathname === '/statistics'}>
              <ListItemIcon className={classes.listItemIcon}><DonutSmallIcon /></ListItemIcon>
              <ListItemText>
                <Typography variant='button'>통계</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        </List>

        <Divider className={classes.divider} />

        <List className={classes.list}>
          <Link to='/manage/menu' className={classes.link}>
            <ListItem className={classes.listItem} button selected={this.props.location.pathname === '/manage/menu'}>
              <ListItemIcon className={classes.listItemIcon}><SettingsIcon /></ListItemIcon>
              <ListItemText>
                <Typography variant='button'>메뉴 관리</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        </List>

        <List className={classes.list}>
          <Link to='/manage/setmenu' className={classes.link}>
            <ListItem className={classes.listItem} button selected={this.props.location.pathname === '/manage/setmenu'}>
              <ListItemIcon className={classes.listItemIcon}><SettingsApplicationsIcon /></ListItemIcon>
              <ListItemText>
                <Typography variant='button'>세트메뉴 관리</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        </List>

        <List className={classes.list}>
          <Link to='/manage/group_and_member' className={classes.link}>
            <ListItem className={classes.listItem} button selected={this.props.location.pathname === '/manage/group_and_member'}>
              <ListItemIcon className={classes.listItemIcon}><PeopleOutlineIcon /></ListItemIcon>
              <ListItemText>
                <Typography variant='button'>그룹, 멤버 관리</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        </List>

        <Divider className={classes.divider} />

        <div style={{padding: '6px'}} />

        <Typography variant='caption' style={{color: '#888888', textAlign: 'center'}}>
          <strong>&copy; 2014 - 2019 한양대학교 한기훈</strong>
        </Typography>

        <div style={{padding: '12px'}} />

      </React.Fragment>
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
      <Dialog open={this.state.is_authenticate_dialog_open} onClose={this.handleSigninDialogClose} aria-labelledby='signin-dialog'>
        <DialogTitle style={{textAlign: 'center'}}>로그인 방법</DialogTitle>

        <Divider />

        <DialogContent>
          <Button
            className={classes.fbLoginButton}
            onClick={this.handleFacebookLogin}
            color='default' variant='outlined' size='large'
            fullWidth
          >
            <Icon className='fab fa-facebook-square' /> &nbsp;Facebook
          </Button>
          <Button
            className={classes.kakaoLoginButton}
            onClick={this.handleKakaoLogin}
            color='default' variant='outlined' size='large'
            fullWidth>
            <Icon className='xi-kakaotalk' /> &nbsp;Kakao
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
            {drawer_content}
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
            {drawer_content}
          </Drawer>
        </Hidden>

        <main className={classNames(classes.content, {
          [classes.contentShift]: !this.state.is_drawer_open,
        })}>
          <div className={classes.toolbar} />

          {RouteView}

          <br/>
        </main>

        {signinDialog}
      </div>
    );
  }
}

const mapStateToProps = (state: any): any => {
  return {
    'jwt': state.auth.jwt,
    'api_url': state.auth.api_url,
    'group_id': state.auth.group_id,
    'role': state.auth.role
  };
};

const mapDispatchToProps = (dispatch: any): any => {
  return {
    'signIn': (jwt: string) => {
      dispatch(signIn(jwt));
    },
    'signOut': () => {
      dispatch(signOut());
    }
  };
};


// TODO: 나중에 Type 제대로 정의해서 이 해괴망측한 코드를 좀 없애볼 것!
const styleAddedApp: any = withStyles(styles, { withTheme: true })(App);
const reduxStateAddedApp: any = connect(mapStateToProps, mapDispatchToProps)(styleAddedApp);
const routerAddedApp: any = withRouter(reduxStateAddedApp);
export default routerAddedApp;