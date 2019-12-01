import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import IdleTimer from "react-idle-timer";
import { ACCESS_TOKEN } from "../../../constants/API";
import { createMuiTheme, makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import HomePOS from "./home";
import POSInfoContext from "../../../contexts/POSInfo";
import green from "@material-ui/core/colors/green";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { ThemeProvider } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import BackIcon from "@material-ui/icons/ArrowBack";
import CodePOS from "./code";
import BuyerPOS from "./buyer";
import DebtorPOS from "./debtor";
import ProductPOS from "./product";
import ValidationPOS from "./validation";
import Alert from "../../../components/Alert";
import AlertContext from "../../../contexts/Alert";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

const theme = createMuiTheme({
  palette: {
    primary: { main: green[700] },
    secondary: { main: deepOrange[700] },
    type: "dark"
  },
  direction: "ltr"
});

const useStyles = makeStyles(theme => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0"
    },
  },
  root: {
    paddingTop: `${theme.mixins.toolbar.minHeight}px`,
    minHeight: 480,
    minWidth: 800,
    background:
      'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://source.unsplash.com/800x480?drink,cocktail") no-repeat center center fixed',
    backgroundSize: "cover"
  },
  title: {
    flexGrow: 1
  }
}));

const AppPOS = () => {
  const classes = useStyles();
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [alertData, setAlertData] = useState(null);
  const [buyerId, setBuyerId] = useState(null);
  const [code, setCode] = useState(null);
  const [debtorId, setDebtorId] = useState(null);
  const [productId, setProductId] = useState(null);

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);
  const homePage = () => setPage(0);

  let apiKey = parse(location.search).key;
  if (apiKey !== undefined) {
    localStorage.setItem(ACCESS_TOKEN, `${apiKey}`);
  }

  let pageElem;
  let title;
  switch (page) {
    case 1:
      pageElem = <BuyerPOS />;
      title = "Utilisateur";
      break;
    case 2:
      pageElem = <CodePOS />;
      title = "Code NIP";
      break;
    case 3:
      pageElem = <DebtorPOS />;
      title = "Personne débitée";
      break;
    case 4:
      pageElem = <ProductPOS />;
      title = "Choix du produit";
      break;
    case 5:
      pageElem = <ValidationPOS />;
      title = "Validation";
      break;
    default:
      pageElem = <HomePOS />;
      title = "Accueil";
      break;
  }

  return (
    <ThemeProvider theme={theme}>
      <POSInfoContext.Provider
        value={{
          homePage,
          prevPage,
          nextPage,
          buyerId,
          setBuyerId,
          code,
          setCode,
          debtorId,
          setDebtorId,
          productId,
          setProductId
        }}
      >
        <AlertContext.Provider value={{ alertData, setAlertData }}>
          <IdleTimer
            element={document}
            onIdle={homePage}
            debounce={250}
            timeout={1000 * 60 * 5}
          />
          {
            <div className={classes.root}>
              <CssBaseline />
              <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                  {page !== 0 ? (
                    <IconButton
                      onClick={prevPage}
                      color="inherit"
                      aria-label="Menu"
                    >
                      <BackIcon />
                    </IconButton>
                  ) : null}
                  <Breadcrumbs className={classes.title}>
                    <Typography variant="h6" color="inherit" noWrap>
                      Petite Caisse
                    </Typography>
                    <Typography variant="h6" color="inherit" noWrap>
                      {title}
                    </Typography>
                  </Breadcrumbs>
                  <IconButton
                    onClick={homePage}
                    color="inherit"
                    aria-label="Menu"
                  >
                    <HomeIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
              {pageElem}
              {alertData !== null ? (
                <Alert
                  open={true}
                  duration={5000}
                  variant={alertData.variant}
                  message={alertData.message}
                  onClose={() => setAlertData(null)}
                />
              ) : null}
            </div>
          }
        </AlertContext.Provider>
      </POSInfoContext.Provider>
    </ThemeProvider>
  );
};

export default AppPOS;
