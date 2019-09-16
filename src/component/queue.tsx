import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import {
  Paper,
  Typography,
  Container,
  List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction,
  Collapse,
  Avatar,
  IconButton,
  LinearProgress
} from '@material-ui/core';
import {
  RemoveCircleOutlined as RemoveIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
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
  },
  nested: {
    paddingLeft: theme.spacing(2.5)
  },
  paper: {
    boxShadow: 'none'
  }
});

class Queue extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      "queue": [],
      "expanded_chk": {},
      "is_loading": true,
      "setInterval": null,
      "interval_sec": 10
    };
  }

  componentDidMount(): void {
    this.getQueue();
    this.setState({
      "setInterval": setInterval(() => {
        if(this.state.interval_sec === 0) {
          this.getQueue();
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

  getQueue = (): void => {
    const url = this.props.api_url + "/queue?group_id=" + (this.props.group_id).toString();
    const headers = {
      "Authorization": "Bearer " + this.props.jwt
    };

    this.setState({
      "is_loading": true
    });

    (async () => {
      try {
        const response = await axios.get(url, {"headers": headers});

        const queue = response.data;
        for(const q of queue) {
          if(!(q.id in this.state.expanded_chk)) {
            this.state.expanded_chk[q.id] = false;
          }
        }

        this.setState({
          "queue": queue,
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

  getCount = (queueItem: any) => {
    let count_total = 0;
    for(const data of queueItem.queue) {
      count_total += parseInt(data['amount'], 10);
    }

    return count_total;
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

  clickExpandIcon = (item: any) => {
    const expanded_chk = this.state.expanded_chk;
    expanded_chk[item.id] = !expanded_chk[item.id];

    this.setState({
      "expanded_chk": expanded_chk
    });
  };

  removeItem = (q: any): void => {
    if(window.confirm("대기열에서 해당 항목을 제거하겠습니까?")) {
      const url = this.props.api_url + "/queue";
      const headers = {
        "Authorization": "Bearer " + this.props.jwt
      };

      (async () => {
        try {
          await axios.put(url, {
            "order_id": q.order_id,
            "menu_id": q.menu_id
          }, {"headers": headers});

          this.getQueue();
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

    const menus = this.state.queue.map((item: any) => {
      const queueItems = item.queue.map((q: any) =>
        <ListItem key={q.order_id.toString() + '_' + q.menu_id.toString()} className={classes.nested}>
          <ListItemAvatar>
            <Avatar>
              {q.amount}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={"To: " + q.table_id} secondary={'#' + q.order_id + ', ' + this.getDateString(q.created_at)} />
          <ListItemSecondaryAction>
            <IconButton onClick={(e) => this.removeItem(q)}>
              <RemoveIcon/>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );

      return (
        <React.Fragment key={item.id}>
          <ListItem disabled={item.queue.length === 0} className={classes.listItem}>
            <ListItemAvatar>
              <Avatar>
                {this.getCount(item)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.name} secondary={(item.queue.length).toString() + '건 대기중'}/>
            <ListItemSecondaryAction>
              <IconButton disabled={item.queue.length === 0} onClick={() => this.clickExpandIcon(item)}>
                {Boolean(this.state.expanded_chk[item.id]) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={Boolean(this.state.expanded_chk[item.id])} timeout="auto" unmountOnExit>
            <List dense disablePadding>
              {queueItems}
            </List>
          </Collapse>
        </React.Fragment>
      );
    });

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper square className={classes.paper}>
          <LinearProgress color={Boolean(this.state.is_loading) ? 'secondary' : 'primary'} />
          <div className={classes.root}>
            <Typography align='center' variant="h6">
              메뉴별 대기열
            </Typography>

            <List dense disablePadding>
              {menus}
            </List>
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
  };
};

const styleAddedApp = withStyles(styles, { withTheme: true })(Queue);
const reduxStateAddedApp: any = connect(mapStateToProps)(styleAddedApp);
const routerAddedApp: any = withRouter(reduxStateAddedApp);
export default routerAddedApp;