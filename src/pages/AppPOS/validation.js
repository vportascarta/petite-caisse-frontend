import React, {useContext} from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import POSInfoContext from "../../contexts/POSInfo";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import {useUsers} from "../../state/users";
import {useProducts} from "../../state/products";
import {addTransaction} from "../../utils/API";
import AlertContext from "../../contexts/Alert";

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
    fontSize: 36,
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

const ValidationPOS = () => {
  const classes = useStyles();
  const posContext = useContext(POSInfoContext);
  const alert = useContext(AlertContext);
  const [isLoadingUsers, users] = useUsers();
  const [isLoadingProducts, products] = useProducts();

  const debtor = users.find(user => user.id === posContext.debtorId);
  const product = products.find(product => product.id === posContext.productId);

  const sendTransaction = () => {
    const transaction = {
      buyerId: posContext.buyerId,
      code: posContext.code,
      debtorId: posContext.debtorId,
      productId: posContext.productId,
      quantity: 1
    };

    addTransaction(transaction)
      .then(() => {
        alert.setAlertData({ variant: "success", message: "L'achat a été confirmé" });
        posContext.homePage();
      })
      .catch(reason =>
        alert.setAlertData({ variant: "error", message: reason.message })
      );
  };

  return (
    <>
      <Card className={`${classes.card} ${classes.card1}`}>
        <CardContent>
          {isLoadingUsers || debtor === undefined ? (
            <Skeleton variant="text" height={70} />
          ) : (
            <Typography className={classes.amount} variant="h2" component="h2">
              {debtor.name}
            </Typography>
          )}
          <Typography
            className={classes.subtitle}
            color="textSecondary"
            gutterBottom
          >
            Personne débitée
          </Typography>
        </CardContent>
      </Card>
      <Card className={`${classes.card} ${classes.card2}`}>
        <CardContent>
          {isLoadingProducts || product === undefined ? (
            <Skeleton variant="text" height={70} />
          ) : (
            <Typography className={classes.amount} variant="h2" component="h2">
              {product.name}
            </Typography>
          )}
          <Typography
            className={classes.subtitle}
            color="textSecondary"
            gutterBottom
          >
            Produit acheté
          </Typography>
        </CardContent>
      </Card>

      <Fab
        color="primary"
        variant="extended"
        aria-label="add"
        className={`${classes.fab} ${classes.fabAdd}`}
        onClick={sendTransaction}
      >
        <CheckIcon className={classes.extendedIcon} />
        VALIDER
      </Fab>

      <Fab
        color="secondary"
        variant="extended"
        aria-label="refresh"
        className={`${classes.fab} ${classes.fabRefresh}`}
        onClick={posContext.homePage}
      >
        <ClearIcon className={classes.extendedIcon} />
        ANNULER
      </Fab>
    </>
  );
};

export default ValidationPOS;
