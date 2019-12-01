import React, { useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import * as ROUTES from "../../../../constants/routes";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import { signup } from "../../../../utils/API";
import AlertContext from "../../../../contexts/Alert";

const SignUpPage = () => {
  return (
    <>
      <Typography variant={isMobile ? "h4" : "h2"} component="h2">
        Inscription
      </Typography>
      <SignUpForm />
    </>
  );
};

const useStyles = makeStyles(theme => ({
  fields: {
    width: "100%"
  }
}));

const initialState = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "username":
      return { ...state, username: action.value };
    case "email":
      return { ...state, email: action.value };
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

const SignUpForm = () => {
  const classes = useStyles();
  const alert = useContext(AlertContext);
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  const isInvalid =
    state.passwordOne !== state.passwordTwo ||
    state.passwordOne === "" ||
    state.email === "" ||
    state.username === "";

  const onSubmit = event => {
    const { username, email, passwordOne } = state;

    signup({ name: username, email: email, password: passwordOne })
      .then(() => {
        dispatch({ type: "reset" });
        alert.setAlertData({
          variant: "success",
          message: "Votre compte a été crée, veuillez vous connecter"
        });
        history.push(ROUTES.SIGN_IN);
      })
      .catch(reason => {
        alert.setAlertData({ variant: "error", message: reason.message });
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
            id="username"
            label="Nom d'utilisateur"
            value={state.username}
            onChange={onChange}
            margin="normal"
            variant="outlined"
            type="text"
            placeholder="Nom d'utilisateur"
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            className={classes.fields}
            id="email"
            label="Email"
            value={state.email}
            onChange={onChange}
            margin="normal"
            variant="outlined"
            type="email"
            placeholder="Email"
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            className={classes.fields}
            id="passwordOne"
            label="Mot de passe"
            value={state.passwordOne}
            onChange={onChange}
            margin="normal"
            variant="outlined"
            type="password"
            placeholder="Mot de passe"
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            className={classes.fields}
            id="passwordTwo"
            label="Confirmer le mot de passe"
            value={state.passwordTwo}
            onChange={onChange}
            margin="normal"
            variant="outlined"
            type="password"
            placeholder="Confirmer le mot de passe"
          />
        </Grid>
        <Grid item sm={9} xs={12}>
          <p>Remplissez tous les champs et appuyez sur Inscription</p>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Button
            variant="contained"
            color="secondary"
            disabled={isInvalid}
            type="submit"
          >
            Inscription
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const SignUpLink = () => (
  <>
    <p>
      Vous n'avez pas de compte ?
      <Button
        style={{ marginLeft: "5px" }}
        color="secondary"
        component={Link}
        to={ROUTES.SIGN_UP}
      >
        Inscription
      </Button>
    </p>
  </>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
