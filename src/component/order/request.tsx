import React from 'react';
import {
  Paper,
  Typography,
  Divider,
  Container,
  List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, ListSubheader,
  Avatar,
  Button, IconButton,
  TextField
} from '@material-ui/core';
import {
  AddCircleOutlined as AddIcon,
  RemoveCircleOutlined as RemoveIcon
} from '@material-ui/icons';
import { withStyles, Theme } from '@material-ui/core/styles';

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
  }
});

class OrderRequest extends React.Component<any, any> {
  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography align='center' variant="h6">
            주문 입력
          </Typography>

          <List
            dense
            subheader={
              <ListSubheader className={classes.listSubHeader} component="div">
                메뉴 목록
              </ListSubheader>
            }
          >
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar>
                  0
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="소주" secondary="1000" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <AddIcon/>
                </IconButton>
                <IconButton edge="end">
                  <RemoveIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar>
                  0
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="맥주" secondary="2000" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <AddIcon/>
                </IconButton>
                <IconButton edge="end">
                  <RemoveIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          <List
            dense
            subheader={
              <ListSubheader className={classes.listSubHeader} component="div">
                세트메뉴 목록
              </ListSubheader>
            }
          >
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar>
                  0
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="소주" secondary="1000" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <AddIcon/>
                </IconButton>
                <IconButton edge="end">
                  <RemoveIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar>
                  0
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="맥주" secondary="2000" />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <AddIcon/>
                </IconButton>
                <IconButton edge="end">
                  <RemoveIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          <TextField
            required
            fullWidth
            label="가져다 줄 위치를 입력해 주세요"
            margin="dense"
            variant='outlined'
          />

          <Divider className={classes.divider} component='hr' variant='fullWidth' />

          <Button
            fullWidth
            size='medium'
            variant="outlined"
            color="inherit"
            className={classes.button}
          >
            총 금액 : 100000
          </Button>

          <Button
            fullWidth
            size='medium'
            variant="contained"
            color="primary"
            className={classes.button}
          >
            주문 생성
          </Button>
        </Paper>
      </Container>
    );
  }
}

const styleAddedApp = withStyles(styles, { withTheme: true })(OrderRequest);
export default styleAddedApp;