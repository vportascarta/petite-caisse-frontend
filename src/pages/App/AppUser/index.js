import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import AccountPage from "./Account";
import AdminHistoryPage from "./Admin/history";
import AdminProductPage from "./Admin/product";
import AdminRegisterPage from "./Admin/register";
import AdminUserPage from "./Admin/user";
import Alert from "../../../components/Alert";
import AlertContext from "../../../contexts/Alert";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import DashboardPage from "./Dashboard";
import deepOrange from "@material-ui/core/colors/deepOrange";
import green from "@material-ui/core/colors/green";
import HistoryPage from "./History";
import Navigation from "./Navigation";
import Page404 from "./404";
import PasswordChangePage from "./PasswordChange";
import PasswordForgetPage from "./PasswordForget";
import PurchasePage from "./Purchase";
import SessionContext from "../../../contexts/Session";
import SignInPage from "./SignIn";
import SignOutPage from "./SignOut";
import SignUpPage from "./SignUp";
import TOSPage from "./TOS";
import WelcomePage from "./Welcome";
import { createMuiTheme, makeStyles } from "@material-ui/core";
import { DARK_MODE } from "../../../constants/API";
import { ThemeProvider } from "@material-ui/styles";
import { useCurrentUser } from "../../../state/currentUser";
import { useLocalStorage } from "../../../utils/hooksUtils";

const themeTemplate = prefersDarkMode =>
  createMuiTheme({
    palette: {
      primary: { main: green[700] },
      secondary: { main: deepOrange[700] },
      type: prefersDarkMode ? "dark" : "light"
    },
    direction: "ltr"
  });

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  content: {
    marginTop: `calc(${theme.mixins.toolbar.minHeight}px + 5vh)`,
    marginLeft: "5vw",
    marginRight: "5vw"
  },
  loader: {
    marginTop: "calc(50vh - 40px)",
    marginLeft: "calc(50vw - 40px)"
  }
}));

const AppUser = () => {
  const classes = useStyles();
  const [alertData, setAlertData] = useState(null);
  const [prefersDarkMode, setDarkMode] = useLocalStorage(DARK_MODE, true);
  const [
    isLoading,
    isAuth,
    isAdmin,
    currentUser,
    hasError,
    doFetch
  ] = useCurrentUser();
  const theme = React.useMemo(() => themeTemplate(prefersDarkMode), [
    prefersDarkMode
  ]);

  return (
    <ThemeProvider theme={theme}>
      <SessionContext.Provider
        value={{
          isLoading,
          isAuth,
          isAdmin,
          currentUser,
          hasError,
          doFetch,
          prefersDarkMode,
          setDarkMode
        }}
      >
        <AlertContext.Provider value={{ alertData, setAlertData }}>
          <div className={classes.root}>
            <Router>
              <CssBaseline />
              <Navigation />
              {!isLoading ? (
                <div className={classes.content}>
                  <Switch>
                    <Route
                      exact
                      path={ROUTES.WELCOME}
                      component={WelcomePage}
                    />
                    <Route
                      exact
                      path={ROUTES.TOS}
                      component={TOSPage}
                    />
                    <ProtectedRoute
                      exact
                      path={ROUTES.DASHBOARD}
                      component={DashboardPage}
                    />
                    <ProtectedRoute
                      exact
                      requireNoAuth
                      path={ROUTES.SIGN_IN}
                      component={SignInPage}
                    />
                    <ProtectedRoute
                      exact
                      requireNoAuth
                      path={ROUTES.SIGN_UP}
                      component={SignUpPage}
                    />
                    <ProtectedRoute
                      exact
                      requireNoAuth
                      path={ROUTES.PASSWORD_FORGET}
                      component={PasswordForgetPage}
                    />
                    <ProtectedRoute
                      exact
                      path={ROUTES.ACCOUNT}
                      component={AccountPage}
                    />
                    <ProtectedRoute
                      exact
                      path={ROUTES.HISTORY}
                      component={HistoryPage}
                    />
                    <ProtectedRoute
                      exact
                      path={ROUTES.PURCHASE}
                      component={PurchasePage}
                    />
                    <ProtectedRoute
                      exact
                      path={ROUTES.SIGN_OUT}
                      component={SignOutPage}
                    />
                    <ProtectedRoute
                      exact
                      path={ROUTES.PASSWORD_CHANGE}
                      component={PasswordChangePage}
                    />
                    <ProtectedRoute
                      requireAdmin
                      exact
                      path={ROUTES.ADMIN_REGISTER}
                      component={AdminRegisterPage}
                    />
                    <ProtectedRoute
                      requireAdmin
                      exact
                      path={ROUTES.ADMIN_USER}
                      component={AdminUserPage}
                    />
                    <ProtectedRoute
                      requireAdmin
                      exact
                      path={ROUTES.ADMIN_PRODUCT}
                      component={AdminProductPage}
                    />
                    <ProtectedRoute
                      requireAdmin
                      exact
                      path={ROUTES.ADMIN_TRANSACTION}
                      component={AdminHistoryPage}
                    />
                    <Route exact component={Page404} />
                  </Switch>
                </div>
              ) : (
                  <CircularProgress className={classes.loader} />
                )}
            </Router>
          </div>
        </AlertContext.Provider>
        {alertData !== null ? (
          <Alert
            open={true}
            duration={5000}
            variant={alertData.variant}
            message={alertData.message}
            onClose={() => setAlertData(null)}
          />
        ) : null}
      </SessionContext.Provider>
    </ThemeProvider>
  );
};

const ProtectedRoute = props => {
  const {
    requireNoAuth,
    requireAdmin,
    component: Component,
    ...compProps
  } = props;
  const session = useContext(SessionContext);

  const shouldDisplay =
    (requireNoAuth && !session.isAuth) ||
    (!requireNoAuth && !requireAdmin && session.isAuth) ||
    (!requireNoAuth && requireAdmin && session.isAuth && session.isAdmin);

  return (
    <Route
      {...compProps}
      render={props =>
        shouldDisplay ? (
          <Component {...props} />
        ) : (
            <Redirect to={ROUTES.WELCOME} />
          )
      }
    />
  );
};

export default AppUser;
