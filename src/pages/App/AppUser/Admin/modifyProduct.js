import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextDialog from "../../../../components/TextDialog";

const useStyles = makeStyles(theme => ({
  dialog: {
    zIndex: theme.zIndex.modal + 1000
  },
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddModifyProductDialog({ open, setOpen, handleSave, product }) {
  const classes = useStyles();

  const [name, setName] = useState(product !== null ? product.name : "");
  const [desc, setDesc] = useState(product !== null ? product.description : "");
  const [imageUrl, setImageUrl] = useState(
    product !== null ? product.imageUrl : ""
  );
  const [quantity, setQuantity] = useState(
    product !== null && product.stock !== null ? product.stock.quantity : 0
  );
  const [price, setPrice] = useState(product !== null ? product.price : 0.0);

  const [dialogNameOpen, setDialogNameOpen] = useState(false);
  const [dialogDescOpen, setDialogDescOpen] = useState(false);
  const [dialogImageUrlOpen, setDialogImageUrlOpen] = useState(false);
  const [dialogQuantityOpen, setDialogQuantityOpen] = useState(false);
  const [dialogPriceOpen, setDialogPriceOpen] = useState(false);

  function handleNameOpen() {
    setDialogNameOpen(true);
  }
  function handleNameSave(value) {
    setName(value);
    setDialogNameOpen(false);
  }
  function handleNameClose() {
    setDialogNameOpen(false);
  }

  function handleDescOpen() {
    setDialogDescOpen(true);
  }
  function handleDescSave(value) {
    setDesc(value);
    setDialogDescOpen(false);
  }
  function handleDescClose() {
    setDialogDescOpen(false);
  }

  function handleImageUrlOpen() {
    setDialogImageUrlOpen(true);
  }
  function handleImageUrlSave(value) {
    setImageUrl(value);
    setDialogImageUrlOpen(false);
  }
  function handleImageUrlClose() {
    setDialogImageUrlOpen(false);
  }

  function handleQuantityOpen() {
    setDialogQuantityOpen(true);
  }
  function handleQuantitySave(value) {
    setQuantity(parseInt(value));
    setDialogQuantityOpen(false);
  }
  function handleQuantityClose() {
    setDialogQuantityOpen(false);
  }

  function handlePriceOpen() {
    setDialogPriceOpen(true);
  }
  function handlePriceSave(value) {
    setPrice(parseFloat(value));
    setDialogPriceOpen(false);
  }
  function handlePriceClose() {
    setDialogPriceOpen(false);
  }

  function handleModalSave() {
    const id = product !== null ? product.id : null;
    handleSave(id, name, desc, imageUrl, price, quantity);
    setOpen(false);
  }
  function handleModalClose() {
    setOpen(false);
  }

  return (
    <>
      <Dialog
        className={classes.dialog}
        fullScreen
        open={open}
        onClose={handleModalClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleModalClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {product !== null ? "Modifier les informations du produit" : "Ajouter un nouveau produit"}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleModalSave}>
              Sauvegarder
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText
              onClick={handleNameOpen}
              primary="Le nom du produit"
              secondary={name ? name : "Aucun nom"}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              onClick={handleDescOpen}
              primary="La description du produit"
              secondary={desc ? desc : "Aucune description"}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              onClick={handleImageUrlOpen}
              primary="L'image du produit"
              secondary={imageUrl ? imageUrl : "Aucune image"}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              onClick={handleQuantityOpen}
              primary="Quantité disponible"
              secondary={quantity}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              onClick={handlePriceOpen}
              primary="Prix affiché"
              secondary={`${price}$`}
            />
          </ListItem>
        </List>
      </Dialog>

      <TextDialog
        opened={dialogNameOpen}
        handleCancel={handleNameClose}
        handleSave={handleNameSave}
        title="Changer le nom du produit"
        label="Nom du produit"
        desc="Changer le nom du produit qui apparaîtra lors d'un achat"
      />
      <TextDialog
        opened={dialogDescOpen}
        handleCancel={handleDescClose}
        handleSave={handleDescSave}
        title="Changer la description du produit"
        label="Description du produit"
        desc="Changer la description du produit qui apparaîtra lors d'un achat"
      />
      <TextDialog
        opened={dialogImageUrlOpen}
        handleCancel={handleImageUrlClose}
        handleSave={handleImageUrlSave}
        title="Changer l'image du produit"
        label="URL de l'image"
        desc="Changer l'image du produit en remplissant une URL d'une image disponible sur internet"
      />
      <TextDialog
        opened={dialogQuantityOpen}
        handleCancel={handleQuantityClose}
        handleSave={handleQuantitySave}
        title="Changer la quantité disponible"
        label="Nouvelle quantité"
        desc="Changer le stock disponible pour ce produit"
        doValidation={value => /^(\d+)?$/.test(value)}
        helperText="Veuillez entrer un nombre"
      />
      <TextDialog
        opened={dialogPriceOpen}
        handleCancel={handlePriceClose}
        handleSave={handlePriceSave}
        title="Changer le prix"
        label="Nouveau prix de vente"
        desc="Changer le prix de vente de ce produit"
        doValidation={value => /^(\d+\.\d{2})?$/.test(value)}
        helperText="Veuillez entrer un montant valide"
      />
    </>
  );
}
