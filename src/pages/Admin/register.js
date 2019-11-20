import React, { useContext, useState } from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import MoneyIcon from "@material-ui/icons/MonetizationOn";
import AvatarWrapper from "../../components/AvatarWrapper";
import TextDialog from "../../components/TextDialog";
import { isMobile } from "react-device-detect";
import { useCashRegisters } from "../../state/cashRegisters";
import { updateCashRegister } from "../../utils/API";
import AlertContext from "../../contexts/Alert";

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: "center"
  },
  list: {
    width: "100%"
  }
}));

const AdminRegisterPage = () => {
  const classes = useStyles();
  const alert = useContext(AlertContext);
  const [
    isLoadingCashRegisters,
    cashRegisters,
    ,
    doFetchCashRegisters
  ] = useCashRegisters();

  const handleRegisterSave = (id, value) => {
    const registerId = id;
    const newAmount = parseFloat(value);

    updateCashRegister({ registerId, newAmount })
      .then(() => {
        alert.setAlertData({
          variant: "success",
          message: "Le solde a été modifié"
        });
        doFetchCashRegisters();
      })
      .catch(reason =>
        alert.setAlertData({ variant: "error", message: reason.message })
      );
  };

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
        Caisses
      </Typography>
      {!isLoadingCashRegisters && cashRegisters.length !== 0 && (
        <List className={classes.list}>
          {cashRegisters.map(elem => (
            <RegisterListItem
              key={elem.id}
              user={elem}
              handleSave={handleRegisterSave}
            />
          ))}
        </List>
      )}
    </>
  );
};

const RegisterListItem = ({ user, handleSave }) => {
  const [dialogRegisterOpen, setDialogRegisterOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogRegisterOpen(true);
  };

  const handleDialogSave = value => {
    handleSave(user.id, value);
    setDialogRegisterOpen(false);
  };

  const handleDialogClose = () => {
    setDialogRegisterOpen(false);
  };

  return (
    <>
      <ListItem key={user.id}>
        <AvatarWrapper
          isImg={user.imageUrl}
          src={user.imageUrl ? user.imageUrl : user.name}
          style={{
            float: "right",
            width: isMobile ? 40 : 80,
            height: isMobile ? 40 : 80,
            marginRight: 15
          }}
        />
        <ListItemText
          primary={user.name}
          secondary={`Cash : ${user.balance ? user.balance.amount : 0.0}$`}
        />
        <ListItemSecondaryAction>
          <IconButton
            size="small"
            onClick={handleDialogOpen}
            aria-label="Modify"
          >
            <MoneyIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <TextDialog
        opened={dialogRegisterOpen}
        handleCancel={handleDialogClose}
        handleSave={handleDialogSave}
        title={`Changer le solde de la caisse : ${user.name}`}
        label="Nouveau solde"
        desc="Changer facilement le solde de la caisse sans affecter aucun utilisateur"
      />
    </>
  );
};

export default AdminRegisterPage;
