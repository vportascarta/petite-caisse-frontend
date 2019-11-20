import React, { useContext, useState } from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ModifyIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import AvatarWrapper from "../../components/AvatarWrapper";
import { isMobile } from "react-device-detect";
import { useProducts } from "../../state/products";
import AddModifyProductDialog from "./modifyProduct";
import { addProduct, updateProduct } from "../../utils/API";
import AlertContext from "../../contexts/Alert";

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: "center"
  },
  list: {
    width: "100%"
  }
}));

const AdminProductPage = () => {
  const classes = useStyles();
  const alert = useContext(AlertContext);
  const [isLoadingProducts, products, , fetchData] = useProducts();
  const [dialogAddOpen, setDialogAddOpen] = useState(false);

  function handleAddOpen() {
    setDialogAddOpen(true);
  }

  function handleSaveProduct(
    id,
    name,
    description,
    imageUrl,
    price,
    newQuantity
  ) {
    if (id === null) {
      addProduct({ name, description, imageUrl, price, newQuantity })
        .then(() => {
          alert.setAlertData({
            variant: "success",
            message: "Le produit a été ajouté"
          });
          fetchData();
        })
        .catch(reason =>
          alert.setAlertData({ variant: "error", message: reason.message })
        );
    } else {
      updateProduct({ id, name, description, imageUrl, price, newQuantity })
        .then(r => {
          alert.setAlertData({
            variant: "success",
            message: "Le produit a été mis à jour"
          });
          fetchData();
        })
        .catch(reason =>
          alert.setAlertData({ variant: "error", message: reason.message })
        );
    }
  }

  return (
    <>
      <Typography
        className={classes.title}
        variant={isMobile ? "h4" : "h2"}
        component="h2"
        paragraph
      >
        Administration
      </Typography>

      <Typography variant="h5" component="h5" paragraph>
        Produits
        <IconButton
          size="small"
          style={{ float: "right" }}
          color="secondary"
          onClick={handleAddOpen}
        >
          <AddIcon />
        </IconButton>
      </Typography>
      <AddModifyProductDialog
        open={dialogAddOpen}
        setOpen={setDialogAddOpen}
        handleSave={handleSaveProduct}
        product={null}
      />
      {!isLoadingProducts && products.length !== 0 && (
        <List className={classes.list}>
          {products.map(elem => (
            <ProductListItem
              key={elem.id}
              product={elem}
              handleSave={handleSaveProduct}
            />
          ))}
        </List>
      )}
    </>
  );
};

const ProductListItem = ({ product, handleSave }) => {
  const [dialogModifyOpen, setDialogModifyOpen] = useState(false);

  function handleModifyOpen() {
    setDialogModifyOpen(true);
  }

  return (
    <>
      <ListItem style={{ paddingRight: 75 }}>
        <AvatarWrapper
          isImg={product.imageUrl !== ""}
          src={product.imageUrl !== "" ? product.imageUrl : product.name}
          style={{
            float: "right",
            width: isMobile ? 40 : 80,
            height: isMobile ? 40 : 80,
            marginRight: 15
          }}
        />
        <ListItemText
          primary={product.name}
          secondary={`Stock : ${product.stock.quantity} / Prix : ${
            product.price
          }$`}
        />
        <ListItemSecondaryAction style={{ right: 0, width: 70 }}>
          <IconButton
            size="small"
            onClick={handleModifyOpen}
            aria-label="Modify"
          >
            <ModifyIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <AddModifyProductDialog
        open={dialogModifyOpen}
        setOpen={setDialogModifyOpen}
        product={product}
        handleSave={handleSave}
      />
    </>
  );
};

export default AdminProductPage;
