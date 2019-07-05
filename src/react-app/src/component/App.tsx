import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  AppBar, Toolbar,
  Typography,
  Button, IconButton,
  Drawer,
  List, ListItem, ListItemIcon, ListItemText,
  Divider,
  Hidden
} from '@material-ui/core';

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

const drawerWidth: number = 240;
const styles = (theme: any) => ({
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
  divider: {
    marginTop: '11.5px',
    marginBottom: '11.5px',
    paddingTop: '0.5px',
    paddingBottom: '0.5px'
  }
});


class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      is_drawer_open: (window.innerWidth >= 600)
    };
  }

  handleDrawerButtonClick = (): void => {
    this.setState({
      is_drawer_open: !this.state.is_drawer_open
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

          <Button color='inherit'>로그인</Button>
          <Button color='inherit'>로그아웃</Button>
        </Toolbar>
      </AppBar>
    );

    const drawer_content: any = (
      <React.Fragment>
        <div className={classes.toolbar} />
        <div style={{padding: '6px'}} />

        <List className={classes.list}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.listItemIcon}><HomeIcon /></ListItemIcon>
            <ListItemText>
              <Typography variant='button'>홈</Typography>
            </ListItemText>
          </ListItem>
        </List>

        <Divider className={classes.divider} />

        <List className={classes.list}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.listItemIcon}><GroupIcon /></ListItemIcon>
            <ListItemText>
              <Typography variant='button'>그룹</Typography>
            </ListItemText>
          </ListItem>
        </List>

        <Divider className={classes.divider} />

        <List className={classes.list}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.listItemIcon}><PlaylistAddIcon /></ListItemIcon>
            <ListItemText>
              <Typography variant='button'>주문 입력</Typography>
            </ListItemText>
          </ListItem>
        </List>

        <List className={classes.list}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.listItemIcon}><TocIcon /></ListItemIcon>
            <ListItemText>
              <Typography variant='button'>전체 주문 내역</Typography>
            </ListItemText>
          </ListItem>
        </List>

        <List className={classes.list}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.listItemIcon}><PlaylistAddCheckIcon /></ListItemIcon>
            <ListItemText>
              <Typography variant='button'>처리되지 않은 주문 내역</Typography>
            </ListItemText>
          </ListItem>
        </List>

        <Divider className={classes.divider} />

        <List className={classes.list}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.listItemIcon}><FormatListNumberedIcon /></ListItemIcon>
            <ListItemText>
              <Typography variant='button'>메뉴별 대기열</Typography>
            </ListItemText>
          </ListItem>
        </List>

        <Divider className={classes.divider} />

        <List className={classes.list}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.listItemIcon}><DonutSmallIcon /></ListItemIcon>
            <ListItemText>
              <Typography variant='button'>통계</Typography>
            </ListItemText>
          </ListItem>
        </List>

        <Divider className={classes.divider} />

        <List className={classes.list}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.listItemIcon}><SettingsIcon /></ListItemIcon>
            <ListItemText>
              <Typography variant='button'>메뉴 관리</Typography>
            </ListItemText>
          </ListItem>
        </List>

        <List className={classes.list}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.listItemIcon}><SettingsApplicationsIcon /></ListItemIcon>
            <ListItemText>
              <Typography variant='button'>세트메뉴 관리</Typography>
            </ListItemText>
          </ListItem>
        </List>

        <List className={classes.list}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.listItemIcon}><PeopleOutlineIcon /></ListItemIcon>
            <ListItemText>
              <Typography variant='button'>그룹, 멤버 관리</Typography>
            </ListItemText>
          </ListItem>
        </List>

        <Divider className={classes.divider} />

        <div style={{padding: '6px'}} />

        <Typography variant="caption" align="center" style={{color: '#888888'}}>
          <strong>&copy; 2014 - 2019 한양대학교 한기훈</strong>
        </Typography>

        <div style={{padding: '12px'}} />

      </React.Fragment>
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
      </div>
    );
  }
}

export default withStyles(styles, { 'withTheme': true })(App);