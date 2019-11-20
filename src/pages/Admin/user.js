import React, { useContext, useState } from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import MoneyIcon from "@material-ui/icons/MonetizationOn";
import CheckIcon from "@material-ui/icons/CheckBox";
import NoCheckIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import AvatarWrapper from "../../components/AvatarWrapper";
import TextDialog from "../../components/TextDialog";
import { isMobile } from "react-device-detect";
import {
  updateUserBalance,
  updateUserValidation
} from "../../utils/API";
import AlertContext from "../../contexts/Alert";
import { useUsers } from "../../state/users";
import { useCashRegisters } from "../../state/cashRegisters";
import SessionContext from "../../contexts/Session";

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: "center"
  },
  list: {
    width: "100%"
  }
}));

const AdminUserPage = () => {
  const classes = useStyles();
  const session = useContext(SessionContext);
  const alert = useContext(AlertContext);
  const [isLoadingUsers, users, , doFetchUsers] = useUsers();
  const [, cashRegisters] = useCashRegisters();

  const handleUserValidationSave = (id, value) => {
    const userId = id;
    const isValidated = value;

    updateUserValidation({ userId, isValidated })
      .then(() => {
        alert.setAlertData({
          variant: "success",
          message: isValidated
            ? "L'utilisateur a été validé"
            : "L'utilisateur a été invalidé"
        });
        doFetchUsers();
        session.doFetch();
      })
      .catch(reason =>
        alert.setAlertData({ variant: "error", message: reason.message })
      );
  };

  const handleAmountSave = (id, value) => {
    const register = cashRegisters[0];

    if (register === undefined) {
      alert.setAlertData({
        variant: "error",
        message: "Problème avec la récupération des caisses"
      });
    }
    const registerId = register.id;
    const userId = id;
    const amountToBeTransferred = parseFloat(value);

    updateUserBalance({ registerId, userId, amountToBeTransferred })
      .then(() => {
        alert.setAlertData({
          variant: "success",
          message: "La balance a été modifiée"
        });
        doFetchUsers();
        session.doFetch();
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
        Utilisateurs
      </Typography>
      {!isLoadingUsers && users.length !== 0 && (
        <List className={classes.list}>
          {users.map(elem => (
            <UserListItem
              key={elem.id}
              user={elem}
              handleValidationSave={handleUserValidationSave}
              handleAmountSave={handleAmountSave}
            />
          ))}
        </List>
      )}
    </>
  );
};

const UserListItem = ({ user, handleValidationSave, handleAmountSave }) => {
  const [dialogAmountOpen, setDialogAmountOpen] = useState(false);

  const handleCheckboxSave = () => {
    handleValidationSave(user.id, !user.userVerified);
  };

  const handleDialogOpen = () => {
    setDialogAmountOpen(true);
  };

  const handleDialogSave = value => {
    handleAmountSave(user.id, value);
    setDialogAmountOpen(false);
  };

  const handleDialogClose = () => {
    setDialogAmountOpen(false);
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
            onClick={handleCheckboxSave}
            aria-label="Validate"
          >
            {user.userVerified ? <CheckIcon /> : <NoCheckIcon />}
          </IconButton>
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
        opened={dialogAmountOpen}
        handleCancel={handleDialogClose}
        handleSave={handleDialogSave}
        title={`Ajouter un remboursement pour ${user.name}`}
        label="Remboursement"
        desc="Effectue un remboursement d'un utilisateur vers la caisse (negatif pour un crédit)"
        doValidation={value => /^(\d+\.\d{2})?$/.test(value)}
        helperText="Veuillez entrer un montant valide"
      />
    </>
  );
};

export default AdminUserPage;
