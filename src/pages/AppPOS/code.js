import React, { useContext, useState } from "react";
import {
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";

import POSInfoContext from "../../contexts/POSInfo";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import BackspaceIcon from "@material-ui/icons/Backspace";
import CheckIcon from "@material-ui/icons/Done";

const useStyles = makeStyles(theme => ({
  root:{
    padding: 15,
  },
  code: {
    margin: 0,
    padding: 10,
    height: 64
  },
  codeText: {
    textAlign: "center",
    fontSize: 36
  },
  numpad: {
    marginTop: 10
  },
  cardButton: {
    width: "100%"
  },
  cardImg: {
    margin: "auto"
  }
}));

const CodePOS = () => {
  const classes = useStyles();
  const posContext = useContext(POSInfoContext);
  const [code, setCode] = useState("");

  const validCode = () => {
    return code.length === 5;
  };
  const addNumber = (number) => {
    setCode(code + number);
  };
  const removeNumber = () => {
    setCode(code.substring(0, code.length - 1));
  };
  const saveCode = () => {
    posContext.setCode(code);
    posContext.nextPage();
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.code}>
        <Typography className={classes.codeText} variant="h6" color="inherit">
          {"• ".repeat(code.length)}
        </Typography>
      </Paper>
      <NumPad addNumber={addNumber} removeNumber={removeNumber} validCode={validCode} saveCode={saveCode}/>
    </div>
  );
};

const NumPad = ({addNumber, removeNumber, validCode, saveCode}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.numpad}>
      <Grid
        className={classes.grid}
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={4}>
          <Button fullWidth onClick={() => addNumber("7")}>
            <Typography
              className={classes.codeText}
              variant="h6"
              color="inherit"
            >
              7
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth onClick={() => addNumber("8")}>
            <Typography
              className={classes.codeText}
              variant="h6"
              color="inherit"
            >
              8
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth onClick={() => addNumber("9")}>
            <Typography
              className={classes.codeText}
              variant="h6"
              color="inherit"
            >
              9
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth onClick={() => addNumber("4")}>
            <Typography
              className={classes.codeText}
              variant="h6"
              color="inherit"
            >
              4
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth onClick={() => addNumber("5")}>
            <Typography
              className={classes.codeText}
              variant="h6"
              color="inherit"
            >
              5
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth onClick={() => addNumber("6")}>
            <Typography
              className={classes.codeText}
              variant="h6"
              color="inherit"
            >
              6
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth onClick={() => addNumber("1")}>
            <Typography
              className={classes.codeText}
              variant="h6"
              color="inherit"
            >
              1
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth onClick={() => addNumber("2")}>
            <Typography
              className={classes.codeText}
              variant="h6"
              color="inherit"
            >
              2
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth onClick={() => addNumber("3")}>
            <Typography
              className={classes.codeText}
              variant="h6"
              color="inherit"
            >
              3
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth onClick={removeNumber}>
            <Typography
              className={classes.codeText}
              variant="h6"
              color="inherit"
            >
              <BackspaceIcon fontSize="inherit"/>
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth onClick={() => addNumber("0")}>
            <Typography
              className={classes.codeText}
              variant="h6"
              color="inherit"
            >
              0
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth disabled={!validCode()} onClick={saveCode}>
            <Typography
              className={classes.codeText}
              variant="h6"
              color="inherit"
            >
              <CheckIcon fontSize="inherit"/>
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CodePOS;
