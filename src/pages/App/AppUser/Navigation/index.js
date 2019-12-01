import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SessionContext from "../../../../contexts/Session";
import * as ROUTES from "../../../../constants/routes";
import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AccountIcon from "@material-ui/icons/AccountBox";
import BuildIcon from "@material-ui/icons/Build";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from "@material-ui/icons/Menu";
import MoneyIcon from "@material-ui/icons/MonetizationOn";
import RefreshIcon from "@material-ui/icons/Refresh";
import SignInIcon from "@material-ui/icons/Person";
import SignOutIcon from "@material-ui/icons/Close";
import ThemeIcon from "@material-ui/icons/BrightnessMedium";
import WalletIcon from "@material-ui/icons/AccountBalanceWallet";
import HistoryIcon from "@material-ui/icons/HistoryRounded";

const drawerWidth = 250;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    flexGrow: 1
  }
}));

const Navigation = () => {
  const classes = useStyles();
  const session = useContext(SessionContext);
  const [isDrawerOpened, setDrawerOpened] = useState(false);

  let navigation = [];
  navigation.push(NavigationNonAuth);
  if (session.isAuth) navigation.push(NavigationAuth);
  if (session.isAdmin) navigation.push(NavigationAdmin);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={() => setDrawerOpened(!isDrawerOpened)}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Petite Caisse
          </Typography>
          {session.isAuth ? (
            <IconButton
              onClick={() => session.doFetch()}
              color="inherit"
              aria-label="Refresh"
            >
              <RefreshIcon />
            </IconButton>
          ) : null}
          <IconButton
            onClick={() => session.setDarkMode(!session.prefersDarkMode)}
            color="inherit"
            aria-label="Refresh"
          >
            <ThemeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        open={isDrawerOpened}
        onClose={() => setDrawerOpened(false)}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setDrawerOpened(false)}>
            {classes.direction === "ltr" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {navigation.map((group, idx) => (
          <div key={idx}>
            <List>
              {group.map(elem => (
                <ListItem
                  button
                  key={elem.name}
                  onClick={() => setDrawerOpened(false)}
                  component={Link}
                  to={elem.to}
                >
                  <ListItemIcon>{elem.icon}</ListItemIcon>
                  <ListItemText primary={elem.name} />
                </ListItem>
              ))}
            </List>
            <Divider />
          </div>
        ))}
        <List>
          {session.isAuth ? (
            <ListItem
              button
              onClick={() => setDrawerOpened(false)}
              component={Link}
              to={ROUTES.SIGN_OUT}
            >
              <ListItemIcon>
                <SignOutIcon />
              </ListItemIcon>
              <ListItemText primary={"Déconnexion"} />
            </ListItem>
          ) : (
            <ListItem
              button
              onClick={() => setDrawerOpened(false)}
              component={Link}
              to={ROUTES.SIGN_IN}
            >
              <ListItemIcon>
                <SignInIcon />
              </ListItemIcon>
              <ListItemText primary={"Connexion"} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </div>
  );
};

const NavigationAdmin = [
  { name: "Gestion Caisses", icon: <BuildIcon />, to: ROUTES.ADMIN_REGISTER },
  { name: "Gestion Utilisateurs", icon: <BuildIcon />, to: ROUTES.ADMIN_USER },
  { name: "Gestion Produits", icon: <BuildIcon />, to: ROUTES.ADMIN_PRODUCT },
  { name: "Gestion Transactions", icon: <BuildIcon />, to: ROUTES.ADMIN_TRANSACTION }
];

const NavigationAuth = [
  { name: "Dashboard", icon: <WalletIcon />, to: ROUTES.DASHBOARD },
  { name: "Achat", icon: <MoneyIcon />, to: ROUTES.PURCHASE },
  { name: "Historique", icon: <HistoryIcon />, to: ROUTES.HISTORY },
  { name: "Compte", icon: <AccountIcon />, to: ROUTES.ACCOUNT }
];

const NavigationNonAuth = [
  { name: "Accueil", icon: <HomeIcon />, to: ROUTES.WELCOME },
  { name: "Politique de confidentialité", icon: <InfoIcon />, to: ROUTES.TOS }
];

export default Navigation;
