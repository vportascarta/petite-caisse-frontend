import React, { useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { isMobile } from "react-device-detect";
import { changePassword } from "../../utils/API";
import AlertContext from "../../contexts/Alert";

const PasswordChangePage = () => {
  return (
    <div>
      <Typography variant={isMobile ? "h4" : "h2"} component="h2">
        Changement de mot de passe
      </Typography>
      <PasswordChangeForm />
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  fields: {
    width: "100%"
  }
}));

const initialState = {
  passwordOne: "",
  passwordTwo: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "passwordOne":
      return { ...state, passwordOne: action.value };
    case "passwordTwo":
      return { ...state, passwordTwo: action.value };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
};

const PasswordChangeForm = () => {
  const classes = useStyles();
  const alert = useContext(AlertContext);
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  const isInvalid =
    state.passwordOne === "" ||
    state.passwordTwo === "" ||
    state.passwordOne !== state.passwordTwo;

  const onSubmit = event => {
    const { passwordOne } = state;

    changePassword({ oldPasword: "", newPassword: passwordOne })
      .then(() => {
        dispatch({ type: "reset" });
        alert.setAlertData({
          variant: "success",
          message: "Votre mot de passe a été changé"
        });
        history.push(ROUTES.ACCOUNT);
      })
      .catch(reason => {
        alert.setAlertData({
          variant: "error",
          message: reason.message
        });
      });

    event.preventDefault();
  };

  const onChange = event => {
    dispatch({ type: event.target.id, value: event.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            className={classes.fields}
            id="passwordOne"
            label="Nouveau mot de passe"
            value={state.passwordOne}
            onChange={onChange}
            margin="normal"
            variant="outlined"
            type="password"
            placeholder="Nouveau mot de passe"
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            className={classes.fields}
            id="passwordTwo"
            label="Confirmer le nouveau mot de passe"
            value={state.passwordTwo}
            onChange={onChange}
            margin="normal"
            variant="outlined"
            type="password"
            placeholder="Confirmer le nouveau mot de passe"
          />
        </Grid>
        <Grid item sm={9} xs={12}>
          <p>Remplissez tous les champs et appuyez sur Changer</p>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Button
            variant="contained"
            color="secondary"
            disabled={isInvalid}
            type="submit"
          >
            Changer
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const PasswordChangeLink = () => (
  <div>
    Envie de changer votre mot de passe ?{" "}
    <Button
      size="small"
      color="secondary"
      component={Link}
      to={ROUTES.PASSWORD_CHANGE}
    >
      Cliquer ici
    </Button>
  </div>
);

export default PasswordChangePage;

export { PasswordChangeForm, PasswordChangeLink };
