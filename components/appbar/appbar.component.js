import React, { useState } from "react";
import { Link } from "next/link";
import clsx from "clsx";
// Material-UI
import AppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BankIcon from "@material-ui/icons/AccountBalance";
import WalletIcon from "@material-ui/icons/AccountBalanceWallet";
import DashboardIcon from "@material-ui/icons/Dashboard";
import StoreIcon from "@material-ui/icons/Store";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import BusinessIcon from "@material-ui/icons/Business";
import InvestmentIcon from "@material-ui/icons/Assessment";
import AccountCircle from "@material-ui/icons/AccountCircle";
// Local
import { useStyles } from "./appbar.styles";
import Logout from "../logout/logout.component";

export default function SimpleAppBar({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);
  const [openInvesment, setOpenInvesment] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const isNode = typeof module !== "undefined";
  const userPicture = !isNode && localStorage.getItem("userPicture");

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleWallet = () => {
    setOpenWallet(!openWallet);
  };

  const handleInvesment = () => {
    setOpenInvesment(!openInvesment);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: openDrawer,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {children}
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            className={classes.iconButton}
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            {Boolean(userPicture) ? (
              <img alt="avatar" src={userPicture} className={classes.avatar} />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <Logout onClick={handleClose} />
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }),
        }}
        open={openDrawer}
        onClose={handleDrawer}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawer}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/" className={classes.link}>
            <ListItem button key="Dashboard" onClick={handleDrawer}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <ListItem button key="Wallet" onClick={handleWallet}>
            <ListItemIcon>
              <WalletIcon />
            </ListItemIcon>
            <ListItemText primary="Wallet" />
            {openWallet ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openWallet} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/transactions" className={classes.link}>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={handleDrawer}
                >
                  <ListItemIcon>
                    <BankIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transactions" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
          <ListItem button key="Invesment" onClick={handleInvesment}>
            <ListItemIcon>
              <InvestmentIcon />
            </ListItemIcon>
            <ListItemText primary="Invesment" />
            {openInvesment ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openInvesment} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/stocks" className={classes.link}>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={handleDrawer}
                >
                  <ListItemIcon>
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText primary="Stocks" />
                </ListItem>
              </Link>
              <Link to="/stocks-market" className={classes.link}>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={handleDrawer}
                >
                  <ListItemIcon>
                    <StoreIcon />
                  </ListItemIcon>
                  <ListItemText primary="Market" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </div>
  );
}
