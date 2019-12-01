import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import { isMobile } from "react-device-detect";
import { useDashboardInfo } from "../../../../state/dashboard";
import Skeleton from "@material-ui/lab/Skeleton";
import AlertContext from "../../../../contexts/Alert";
import { Chart } from "react-charts";
import Paper from "@material-ui/core/Paper";

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

  const chartConfig = React.useMemo(() => {
    const data = [];
    if (getInfo !== null) {
      getInfo.pastSales.forEach(elem =>
        data.push([elem.first, elem.second])
      );
    }

    return {
      data: [{ label: "Ventes", data: data }],
      series: { type: "bar" },
      axes: [
        {
          primary: true,
          type: "ordinal",
          position: "bottom",
          show: false
        },
        {
          type: "linear",
          position: "left",
          show: false,
          hardMin: 0
        }
      ]
    };
  }, [getInfo]);

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
                    {getInfo !== null
                      ? `${getInfo.amountInRegisters.toFixed(2)}$`
                      : "0.0$"}
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
                    {getInfo !== null
                      ? `${(-getInfo.amountInDebts).toFixed(2)}$`
                      : "0.0$"}
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
                    {getInfo !== null
                      ? `${getInfo.amountInProducts.toFixed(2)}$`
                      : "0.0$"}
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
      <div className={classes.part}>
        <Typography
          variant={isMobile ? "h6" : "h4"}
          align="center"
          gutterBottom
        >
          Graphique des ventes
        </Typography>
        <Paper style={{ padding: 15, height: 500 }}>
          <Chart
            data={chartConfig.data}
            series={chartConfig.series}
            axes={chartConfig.axes}
            tooltip
          />
        </Paper>
      </div>
    </>
  );
};

export default Dashboard;
