import React, {useContext} from "react";
import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import { isMobile } from "react-device-detect";
import { useDashboardInfo } from "../../state/dashboard";
import Alert from "../../components/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import AlertContext from "../../contexts/Alert";

const useStyles = makeStyles(theme => ({
  part: {
    margin: theme.spacing(2)
  },
  card: {
    width: 300
  },
  amount: {
    fontSize: isMobile ? 48 : 72,
    margin: "10px 0"
  },
  subtitle: {
    fontSize: 14
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const alert = useContext(AlertContext);
  const [isLoading, getInfo, hasError] = useDashboardInfo();

  if (hasError !== null) {
    alert.setAlertData({
      variant: "error",
      message: hasError.message
    });
  }

  return (
    <>
      <Typography variant={isMobile ? "h4" : "h2"} align="center" gutterBottom>
        Dashboard
      </Typography>

      <div className={classes.part}>
        <Typography
          variant={isMobile ? "h6" : "h4"}
          align="center"
          gutterBottom
        >
          Infos sur la caisse
        </Typography>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Card className={classes.card}>
              <CardContent>
                {isLoading ? (
                    <Skeleton variant="text" height={70} />
                ) : (
                    <Typography
                        className={classes.amount}
                        variant="h2"
                        component="h2"
                    >
                      {getInfo !== null ? `${getInfo.amountInRegisters.toFixed(2)}$` : "0.0$"}
                    </Typography>
                )}
                <Typography
                  className={classes.subtitle}
                  color="textSecondary"
                  gutterBottom
                >
                  Argent dans la caisse
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardContent>
                {isLoading ? (
                    <Skeleton variant="text" height={70} />
                ) : (
                    <Typography
                        className={classes.amount}
                        variant="h2"
                        component="h2"
                    >
                      {getInfo !== null ? `${getInfo.amountInDebts.toFixed(2)}$` : "0.0$"}
                    </Typography>
                )}
                <Typography
                  className={classes.subtitle}
                  color="textSecondary"
                  gutterBottom
                >
                  Dettes à récupérer
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardContent>
                {isLoading ? (
                  <Skeleton variant="text" height={70} />
                ) : (
                  <Typography
                    className={classes.amount}
                    variant="h2"
                    component="h2"
                  >
                    {getInfo !== null ? `${getInfo.amountInProducts}$` : "0.0$"}
                  </Typography>
                )}
                <Typography
                  className={classes.subtitle}
                  color="textSecondary"
                  gutterBottom
                >
                  Valeur du stock
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardContent>
                {isLoading ? (
                  <Skeleton variant="text" height={70} />
                ) : (
                  <Typography
                    className={classes.amount}
                    variant="h2"
                    component="h2"
                  >
                    {getInfo !== null ? `${getInfo.productsInStock}` : "0"}
                  </Typography>
                )}
                <Typography
                  className={classes.subtitle}
                  color="textSecondary"
                  gutterBottom
                >
                  Nombre de produits en stock
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {hasError ? <Alert error={hasError} /> : null}
    </>
  );
};

export default Dashboard;
