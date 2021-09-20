import React, { useContext } from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";
import { AuthContext } from "../Auth/auth-context";
import { useHistory } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import axios from "axios";
import MenuList from "@material-ui/core/MenuList";
import Avatar from "@material-ui/core/Avatar";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffeedb",
    },
    secondary: {
      main: deepOrange[500],
    },
  },
});

const useStyles = makeStyles({
  root: {
    backgroundColor: "red",
  },
  title: {
    flexGrow: 1,
    fontSize: "22px",
    fontFamily: "sans-serrif",
  },
  NavLink: {
    color: "black",
    textDecoration: "none",
    listStyle: "none",
    marginRight: "80px",
  },
  nestedNavLink: {
    color: "black",
    textDecoration: "none",
    listStyle: "none",
  },
  SwipeableDrawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listItem: {
    justifyContent: "flex-start",
    maxWidth: 150,
    minWidth: 120,
    padding: theme.spacing(2),
  },
  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
});

export default function NavBar() {
  const auth = useContext(AuthContext);
  let history = useHistory();
  const classes = useStyles();
  const [user, setUser] = React.useState();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [openDrawer, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openAccount, setOpenAccount] = React.useState(true);
  const handleClick = () => {
    setOpenAccount(!openAccount);
  };

  const LogoutClickHandler = (event) => {
    auth.logout();
    openDrawer && handleDrawerClose();
    history.push("/");
  };
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchUser = async () => {
      const User = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}`
      );
      setUser(User);
      setIsLoading(false);
    };
    if (auth.userId) {
      fetchUser();
    }
  }, [auth.userId]);
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        style={{ background: "transparent", boxShadow: "none" }}
        position="static"
      >
        <Toolbar>
          <Typography className={classes.title}>
            <NavLink className={classes.NavLink} to="/">
              BLOG
            </NavLink>
          </Typography>

          <Hidden xsDown implementation="css">
            {auth.isLoggedIn && (
              <Button
                className={classes.NavLink}
                component={NavLink}
                to={"/myblogs"}
              >
                My Blogs
              </Button>
            )}
            {auth.isLoggedIn && (
              <Button
                className={classes.NavLink}
                component={NavLink}
                to={"/addblog"}
              >
                Add Blog
              </Button>
            )}
            {auth.isLoggedIn && (
              <IconButton onClick={handleMenu}>
                {!isLoading && user.data && user.data.profilePic ? (
                  <Avatar
                    alt="User"
                    className={classes.small}
                    src={`https://blog-backend-8u9eu.ondigitalocean.app/uploads/images/${user.data.profilePic}`}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            )}
            {auth.isLoggedIn && (
              <Popper
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transition
                disablePortal
                placement="bottom"
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={Boolean(open)} id="menu-appbar">
                      <MenuItem
                        component={NavLink}
                        className={classes.listItem}
                        to="/user/"
                        onClick={handleClose}
                      >
                        My Profile
                      </MenuItem>
                      <MenuItem
                        component={NavLink}
                        to="/"
                        onClick={() => {
                          LogoutClickHandler();
                          handleClose();
                        }}
                        className={classes.listItem}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Popper>
            )}
            {!auth.isLoggedIn && (
              // <NavLink className={classes.nestedNavLink} to="/auth">
              //   <Button>Login</Button>
              // </NavLink>
              <Button color="inherit" component={NavLink} to={"/auth"}>
                Login
              </Button>
            )}
          </Hidden>
          <Hidden smUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, openDrawer && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              className={classes.SwipeableDrawer}
              variant="temporary"
              anchor="right"
              open={openDrawer}
              classes={{
                paper: classes.drawerPaper,
              }}
              onOpen={handleDrawerOpen}
              onClose={handleDrawerClose}
            >
              {!auth.isLoggedIn && (
                <Link to="/auth" className={classes.nestedNavLink}>
                  <List>
                    <ListItem button onClick={handleDrawerClose} key="Login">
                      <ListItemIcon>
                        <VpnKeyIcon />
                      </ListItemIcon>
                      <ListItemText primary="Login" />
                    </ListItem>
                  </List>
                </Link>
              )}
              {auth.isLoggedIn && (
                <List>
                  <ListItem button onClick={handleClick} key="My Account">
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="My Account" />
                    {openAccount ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                </List>
              )}
              {auth.isLoggedIn && (
                <NavLink className={classes.nestedNavLink} to="/user/">
                  <Collapse in={openAccount} timeout="auto" unmountOnExit>
                    <List>
                      <ListItem
                        button
                        onClick={handleDrawerClose}
                        key="My Profile"
                        className={classes.nested}
                      >
                        <ListItemText primary="My Profile" />
                      </ListItem>
                    </List>
                  </Collapse>
                </NavLink>
              )}
              {auth.isLoggedIn && (
                <NavLink className={classes.nestedNavLink} to="/myblogs">
                  <Collapse in={openAccount} timeout="auto" unmountOnExit>
                    <List>
                      <ListItem
                        button
                        onClick={handleDrawerClose}
                        key="My Blogs"
                        className={classes.nested}
                      >
                        <ListItemText primary="My Blogs" />
                      </ListItem>
                    </List>
                  </Collapse>
                </NavLink>
              )}
              {auth.isLoggedIn && (
                <NavLink className={classes.nestedNavLink} to="/addblog">
                  <Collapse in={openAccount} timeout="auto" unmountOnExit>
                    <List>
                      <ListItem
                        button
                        onClick={handleDrawerClose}
                        key="Add Blog"
                        className={classes.nested}
                      >
                        <ListItemText primary="Add Blog" />
                      </ListItem>
                    </List>
                  </Collapse>
                </NavLink>
              )}
              {auth.isLoggedIn && (
                <NavLink className={classes.nestedNavLink} to="/">
                  <List>
                    <ListItem button onClick={LogoutClickHandler} key="Logout">
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </NavLink>
              )}
            </SwipeableDrawer>
          </Hidden>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
