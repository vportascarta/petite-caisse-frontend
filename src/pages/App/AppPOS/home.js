import React, { useContext } from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { useDashboardInfo } from "../../../state/dashboard";
import POSInfoContext from "../../../contexts/POSInfo";
import Fab from "@material-ui/core/Fab";
import CartIcon from "@material-ui/icons/AddShoppingCart";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles(theme => ({
  card: {
    opacity: 0.9,
    position: "fixed",
    height: 180,
    width: 350
  },
  card1: {
    top: 100,
    left: 40
  },
  card2: {
    top: 100,
    right: 40
  },
  amount: {
    fontSize: 72,
    margin: "10px 0"
  },
  subtitle: {
    fontSize: 28
  },
  fab: {
    position: "fixed"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  fabAdd: {
    bottom: 60,
    right: 150
  },
  fabRefresh: {
    bottom: 60,
    left: 150
  }
}));

const HomePOS = () => {
  const classes = useStyles();
  const posContext = useContext(POSInfoContext);
  const [isLoading, getInfo, , fetchData] = useDashboardInfo();

  posContext.setBuyerId(null);
  posContext.setCode(null);
  posContext.setDebtorId(null);
  posContext.setProductId(null);

  return (
    <>
      <Card className={`${classes.card} ${classes.card1}`}>
        <CardContent>
          {isLoading ? (
            <Skeleton variant="text" height={70} />
          ) : (
            <Typography className={classes.amount} variant="h2" component="h2">
              {getInfo !== null
                ? `${getInfo.amountInRegisters.toFixed(2)}$`
                : "0.0$"}
            </Typography>
          )}
          <Typography
            className={classes.subtitle}
            color="textSecondary"
            gutterBottom
          >
            Argent dans la caisse
          </Typography>
        </CardContent>
      </Card>
      <Card className={`${classes.card} ${classes.card2}`}>
        <CardContent>
          {isLoading ? (
            <Skeleton variant="text" height={70} />
          ) : (
            <Typography className={classes.amount} variant="h2" component="h2">
              {getInfo !== null
                ? `${(-getInfo.amountInDebts).toFixed(2)}$`
                : "0.0$"}
            </Typography>
          )}
          <Typography
            className={classes.subtitle}
            color="textSecondary"
            gutterBottom
          >
            Dettes à récupérer
          </Typography>
        </CardContent>
      </Card>

      <Fab
        color="primary"
        variant="extended"
        aria-label="add"
        className={`${classes.fab} ${classes.fabAdd}`}
        onClick={posContext.nextPage}
      >
        <CartIcon className={classes.extendedIcon} />
        ACHAT
      </Fab>

      <Fab
        color="secondary"
        variant="extended"
        aria-label="refresh"
        className={`${classes.fab} ${classes.fabRefresh}`}
        onClick={fetchData}
      >
        <RefreshIcon className={classes.extendedIcon} />
        RAFRAÎCHIR
      </Fab>
    </>
  );
};

export default HomePOS;
