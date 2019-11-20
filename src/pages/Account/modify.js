import React, { useContext, useState } from "react";
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
import SessionContext from "../../contexts/Session";
import TextDialog from "../../components/TextDialog";
import { changeUserInfo } from "../../utils/API";
import AlertContext from "../../contexts/Alert";

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

export default function ModifyAccountDialog({ open, setOpen }) {
  const classes = useStyles();
  const session = useContext(SessionContext);
  const alert = useContext(AlertContext);

  const [name, setName] = useState(session.currentUser.name);
  const [imageUrl, setImageUrl] = useState(session.currentUser.imageUrl);
  const [code, setCode] = useState(null);

  const [dialogNameOpen, setDialogNameOpen] = useState(false);
  const [dialogImageUrlOpen, setDialogImageUrlOpen] = useState(false);
  const [dialogCodeOpen, setDialogCodeOpen] = useState(false);

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

  function handleCodeOpen() {
    setDialogCodeOpen(true);
  }
  function handleCodeSave(value) {
    setCode(value);
    setDialogCodeOpen(false);
  }
  function handleCodeClose() {
    setDialogCodeOpen(false);
  }

  function handleModalSave() {
    changeUserInfo({ name, imageUrl, code })
      .then(() => {
        alert.setAlertData({
          variant: "success",
          message: "Vos informations ont été sauvegardées"
        });
        session.doFetch();
        setOpen(false);
      })
      .catch(reason =>
        alert.setAlertData({
          variant: "error",
          message: reason.message
        })
      );
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
              Modifier vos informations
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
              primary="Votre nom pour l'affichage"
              secondary={name}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              onClick={handleImageUrlOpen}
              primary="Votre avatar"
              secondary={imageUrl ? imageUrl : "Aucune image"}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              onClick={handleCodeOpen}
              primary="Votre code"
              secondary={code ? code : "Ne pas changer le code"}
            />
          </ListItem>
        </List>
      </Dialog>

      <TextDialog
        opened={dialogNameOpen}
        handleCancel={handleNameClose}
        handleSave={handleNameSave}
        title="Changer le nom d'utilisateur"
        label="Nom d'utilisateur"
        desc="Changer votre nom d'utilisateur qui apparaîtra lors d'un achat"
      />
      <TextDialog
        opened={dialogImageUrlOpen}
        handleCancel={handleImageUrlClose}
        handleSave={handleImageUrlSave}
        title="Changer l'avatar"
        label="URL de l'image"
        desc="Changer votre avatar en remplissant une URL d'une image disponible sur internet"
      />
      <TextDialog
        opened={dialogCodeOpen}
        handleCancel={handleCodeClose}
        handleSave={handleCodeSave}
        title="Changer le code"
        label="Nouveau code"
        desc="Changer votre code à utiliser sur la borne d'achat"
        doValidation={value => /^(\d{5})?$/.test(value)}
        helperText="Veuillez entrer 5 chiffres"
      />
    </>
  );
}
