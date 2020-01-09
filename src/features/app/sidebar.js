import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import * as RoutePath from '../../config/routeConfig.js'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Navbar from '../app/navbar.js'
import '../app/app.css'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position:'absolute',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  // menuButton: {
  //   marginLeft: 0,
  //   position:'relative',
  //   paddingTop:0
  // },
  hide: {
    display: 'none',
  },
  drawer: {   
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    boxShadow:'2px 1px 15px black',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(8) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{marginLeft:'0px', background:'none',color:'black',boxShadow:'none'}}
      >
        {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            style={{marginLeft:10}}
          >
          <MenuIcon />
          </IconButton> */}
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
         {open? <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <i className="fa fa-times"></i>}
          </IconButton>:<IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            style={{top:'15px', right:'5px'}}
          >
          <MenuIcon />
          </IconButton>}
        </div>
        <List>
            <Link to={`/${RoutePath.Dashboard}`} style={{textDecoration: 'none'}}>
                <ListItem button key="dashboard">
                <ListItemIcon><i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }}></i></ListItemIcon>
                <ListItemText primary="Dashboard" style={{color:'#000000'}}/>
                </ListItem>
            </Link>
        </List>
        <Divider />
        <List>
            <Link to={`/${RoutePath.Transactions}`} style={{textDecoration: 'none'}}>
                <ListItem button key="transactions">
                <ListItemIcon><i className="fa fa-money" style={{ fontSize: '1.75em' }}></i></ListItemIcon>
                <ListItemText primary="Transactions" style={{color:'#000000'}}/>
                </ListItem>
            </Link>
        </List>
        <Divider />
        <List>
            <Link to={`/${RoutePath.ViewTransactions}`} style={{textDecoration: 'none'}}>
                <ListItem button key="viewTransactions">
            <ListItemIcon><i className="fa fa-newspaper-o" style={{ fontSize: '1.75em' }}></i></ListItemIcon>
            <ListItemText primary="ViewTransactions" style={{color:'#000000'}}/>
            </ListItem>
            </Link>
     </List>
     <Divider />
     <List>
        <Link to={`/${RoutePath.Report}`} style={{textDecoration: 'none'}}>
            <ListItem button key="report">
            <ListItemIcon><i className="fa fa-share-square-o" style={{ fontSize: '1.75em' }}></i></ListItemIcon>
            <ListItemText primary="Report" style={{color:'#000000'}}/>
            </ListItem>
        </Link>
     </List>
     <Divider />
     <List>
        <Link to={`/${RoutePath.AdminPanel}`} style={{textDecoration: 'none'}}>
            <ListItem button key="adminPanel">
            <ListItemIcon><i className="fa fa-buysellads" style={{ fontSize: '1.75em' }}></i></ListItemIcon>
            <ListItemText primary="AdminPanel" style={{color:'#000000'}}/>
            </ListItem>
        </Link>
     </List>
     <Divider />
     <List>
        <Link to={`/${RoutePath.Setting}`} style={{textDecoration: 'none'}}>
            <ListItem button key="setting">
            <ListItemIcon><i className="fa fa-cogs" style={{ fontSize: '1.75em' }}></i></ListItemIcon>
            <ListItemText primary="Setting" style={{color:'#000000'}}/>
            </ListItem>
        </Link>
     </List>
     <Divider />
     <List>
        <Link to={`/${RoutePath.SetUp}`} style={{textDecoration: 'none'}}>
            <ListItem button key="setUp">
            <ListItemIcon><i className="fa fa-wrench" style={{ fontSize: '1.75em' }}></i></ListItemIcon>
            <ListItemText primary="SetUp" style={{color:'#000000'}}/>
            </ListItem>
        </Link>
     </List>
     <Divider />
      </Drawer>
 
    </div>
  );
}