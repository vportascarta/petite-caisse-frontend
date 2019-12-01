import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import AvatarWrapper from "../../../../components/AvatarWrapper";
import { isMobile } from "react-device-detect";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import SessionContext from "../../../../contexts/Session";
import { useProducts } from "../../../../state/products";
import { addTransactions } from "../../../../utils/API";
import * as ROUTES from "../../../../constants/routes";
import AlertContext from "../../../../contexts/Alert";

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: "center"
  },
  list: {
    width: "100%"
  }
}));

const PurchasePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const session = useContext(SessionContext);
  const alert = useContext(AlertContext);
  const [isLoading, products, hasError] = useProducts();
  const [order, setOrder] = useState({});

  if (hasError !== null) {
    alert.setAlertData({
      variant: "error",
      message: hasError.message
    });
  }

  const handleChange = (id, value) => {
    setOrder(Object.assign({}, order, { [id]: value }));
  };

  const confirmPurchase = () => {
    const orderList = Object.keys(order).map(key => ({
      debtorId: session.currentUser.id,
      buyerId: session.currentUser.id,
      productId: parseInt(key),
      quantity: order[key]
    }));

    const orderListFiltered = orderList.filter(order => order.quantity !== 0);

    if (orderListFiltered.length === 0) {
      alert.setAlertData({
        variant: "warning",
        message: "Veuillez ajouter un produit avant de valider"
      });
    } else {
      addTransactions(orderListFiltered)
        .then(() => {
          alert.setAlertData({
            variant: "success",
            message: "L'achat a été confirmé"
          });
          session.doFetch();
          history.push(ROUTES.WELCOME);
        })
        .catch(reason =>
          alert.setAlertData({ variant: "error", message: reason.message })
        );
    }
  };

  return (
    <>
      <Typography
        className={classes.title}
        variant={isMobile ? "h4" : "h2"}
        component="h2"
        paragraph
      >
        Achat
      </Typography>

      {!isLoading && products.length !== 0 && (
        <List className={classes.list}>
          {products.map(elem => (
            <ProductListItem
              key={elem.id}
              qty={order[elem.id] ? order[elem.id] : 0}
              handleChange={handleChange}
              product={elem}
            />
          ))}
        </List>
      )}

      <Button
        onClick={confirmPurchase}
        style={{ marginBottom: 20 }}
        variant="contained"
        color="secondary"
        fullWidth
        disabled={isLoading}
        type="submit"
      >
        Valider
      </Button>
    </>
  );
};

const ProductListItem = ({ qty, handleChange, product }) => {
  const id = product.id;
  const name = product.name;
  const desc = product.description;
  const stock = product.stock ? product.stock.quantity : 0;
  const price = product.price;
  const imageUrl = product.imageUrl;

  return (
    <>
      <ListItem key={id} style={{ paddingRight: 135 }}>
        <AvatarWrapper
          isImg={imageUrl !== ""}
          src={imageUrl !== "" ? imageUrl : name}
          style={{
            float: "right",
            width: isMobile ? 40 : 80,
            height: isMobile ? 40 : 80,
            marginRight: 15
          }}
        />
        <ListItemText
          primary={name}
          secondary={`${
            !isMobile ? desc + " / " : ""
          }Stock : ${stock} / Prix : ${price}$`}
        />
        <ListItemSecondaryAction style={{ right: 0, width: 130 }}>
          <IconButton
            onClick={() => handleChange(id, Math.max(0, qty - 1))}
            aria-label="Modify"
          >
            <MinusIcon />
          </IconButton>
          <Typography variant="body1" component="span">
            {qty}
          </Typography>
          <IconButton
            onClick={() => handleChange(id, Math.min(stock, qty + 1))}
            aria-label="Modify"
          >
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default PurchasePage;
