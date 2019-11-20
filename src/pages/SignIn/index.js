import React, { useContext, useReducer } from "react";
import { SignUpLink } from "../SignUp";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
  SvgIcon
} from "@material-ui/core";
import { PasswordForgetLink } from "../PasswordForget";
import { isMobile } from "react-device-detect";
import {
  ACCESS_TOKEN,
  GITHUB_AUTH_URL,
  GOOGLE_AUTH_URL
} from "../../constants/API";
import SessionContext from "../../contexts/Session";
import { login } from "../../utils/API";
import { mdiGoogle, mdiGithubCircle } from "@mdi/js";
import AlertContext from "../../contexts/Alert";

const SignInPage = () => {
  return (
    <>
      <Typography variant={isMobile ? "h4" : "h2"} component="h2">
        Connexion
      </Typography>
      <SignInForm />

      <div style={{ height: 20 }} />

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item md={6} sm={12} xs={12}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            href={GOOGLE_AUTH_URL}
          >
            <SvgIcon style={{ marginRight: 5 }}>
              <path d={mdiGoogle} />
            </SvgIcon>
            Connexion avec Google
          </Button>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            href={GITHUB_AUTH_URL}
          >
            <SvgIcon style={{ marginRight: 5 }}>
              <path d={mdiGithubCircle} />
            </SvgIcon>
            Connexion avec Github
          </Button>
        </Grid>
      </Grid>

      <div style={{ height: 20 }} />

      <PasswordForgetLink />
      <SignUpLink />
    </>
  );
};

const useStyles = makeStyles(theme => ({
  fields: {
    width: "100%"
  }
}));

const initialState = {
  email: "",
  password: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.value };
    case "password":
      return { ...state, password: action.value };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
};

const SignInForm = () => {
  const classes = useStyles();
  const session = useContext(SessionContext);
  const alert = useContext(AlertContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const isInvalid = state.password === "" || state.email === "";

  const onSubmit = event => {
    const { email, password } = state;

    login({ email: email, password: password })
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        dispatch({ type: "reset" });
        session.doFetch();
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
            id="password"
            label="Mot de passe"
            value={state.password}
            onChange={onChange}
            margin="normal"
            variant="outlined"
            type="password"
            placeholder="Mot de passe"
          />
        </Grid>
        <Grid item sm={9} xs={12}>
          <p>Remplissez tous les champs et appuyez sur Connexion</p>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Button
            variant="contained"
            color="secondary"
            disabled={isInvalid}
            type="submit"
          >
            Connexion
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignInPage;

export { SignInForm };
