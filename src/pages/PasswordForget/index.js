import React, { useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import { forgetPassword } from "../../utils/API";
import AlertContext from "../../contexts/Alert";

const PasswordForgetPage = () => {
  return (
    <div>
      <Typography variant={isMobile ? "h4" : "h2"} component="h2">
        Mot de passe oublié
      </Typography>
      <PasswordForgetForm />
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  fields: {
    width: "100%"
  }
}));

const initialState = {
  email: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.value };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
};

const PasswordForgetForm = () => {
  const classes = useStyles();
  const alert = useContext(AlertContext);
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  const isInvalid = state.email === "";

  const onSubmit = event => {
    const { email } = state;

    forgetPassword(email)
      .then(() => {
        dispatch({ type: "reset" });
        alert.setAlertData({
          variant: "success",
          message: "Vous allez recevoir votre mot de passe temporaire par mail"
        });
        history.push(ROUTES.SIGN_IN);
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
        <Grid item xs={12}>
          <TextField
            className={classes.fields}
            id="email"
            label="Email"
            value={state.username}
            onChange={onChange}
            margin="normal"
            variant="outlined"
            type="email"
            placeholder="Email"
          />
        </Grid>
        <Grid item sm={9} xs={12}>
          <p>Remplissez tous les champs et appuyez sur Envoyer</p>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Button
            variant="contained"
            color="secondary"
            disabled={isInvalid}
            type="submit"
          >
            Envoyer
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const PasswordForgetLink = () => (
  <div>
    Mot de passe oublié ?{" "}
    <Button
      size="small"
      color="secondary"
      component={Link}
      to={ROUTES.PASSWORD_FORGET}
    >
      Cliquer ici
    </Button>
  </div>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
