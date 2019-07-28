import React from 'react';
import {
  Paper,
  Typography,
  Divider,
  Container,
  List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction,
  Button, IconButton,
  TextField,
  Switch
} from '@material-ui/core';
import {
  Label as LabelIcon,
  Edit as EditIcon
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
  },
  textField: {
    paddingBottom: theme.spacing(0.5)
  }
});

class Menu extends React.Component<any, any> {
  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.container} maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography align='center' variant="h6">
            메뉴 관리
          </Typography>

          <List component="nav" aria-label="main mailbox folders">
            <ListItem>
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText primary="소주" secondary={1000} />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <EditIcon />
                </IconButton>
                <Switch
                  edge="end"
                  checked={true}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText primary="맥주" secondary={2000} />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <EditIcon />
                </IconButton>
                <Switch
                  edge="end"
                  checked={false}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          <Divider className={classes.divider} component='hr' variant='fullWidth' />

          <Typography align='center' variant="h6">
            새 메뉴 추가
          </Typography>

          <TextField
            required
            fullWidth
            label="이름"
            className={classes.textField}
            margin="dense"
            variant='outlined'
          />

          <TextField
            required
            fullWidth
            type="number"
            label="가격"
            className={classes.textField}
            margin="dense"
            variant='outlined'
          />

          <Button
            fullWidth
            size='medium'
            variant="contained"
            color="primary"
            className={classes.button}
          >
            추가하기
          </Button>
        </Paper>
      </Container>
    );
  }
}

const styleAddedApp = withStyles(styles, { withTheme: true })(Menu);
export default styleAddedApp;