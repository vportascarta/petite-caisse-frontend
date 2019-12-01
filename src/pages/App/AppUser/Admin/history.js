import React, { useContext } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { useTransactionHistory } from "../../../../state/history";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TrashIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import { deleteTransaction } from "../../../../utils/API";
import AlertContext from "../../../../contexts/Alert";
import SessionContext from "../../../../contexts/Session";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: "center"
  },
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const AdminHistoryPage = () => {
  const classes = useStyles();
  const session = useContext(SessionContext);
  const alert = useContext(AlertContext);
  const [
    isLoading,
    getHistoryInfo,
    setPage,
    setSize,
    ,
    fetchData
  ] = useTransactionHistory();

  const prevPage = () => setPage(Math.max(0, getHistoryInfo.number - 1));
  const nextPage = () => setPage(getHistoryInfo.number + 1);

  const changeSize = event => {
    setPage(0);
    setSize(event.target.value);
  };

  const transactionDelete = id => {
    deleteTransaction(id)
      .then(() => {
        alert.setAlertData({
          variant: "success",
          message: "La transaction a été supprimée"
        });
        fetchData();
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

      {!isLoading && getHistoryInfo ? (
        <>
          <Typography variant="h5" component="h5" paragraph>
            {`Historique : Page ${getHistoryInfo.number + 1} sur ${
              getHistoryInfo.totalPages
            } / Transactions : ${getHistoryInfo.number * getHistoryInfo.size +
              1} à ${getHistoryInfo.number * getHistoryInfo.size +
              getHistoryInfo.numberOfElements}`}
            <IconButton
              size="small"
              style={{ float: "right" }}
              color="secondary"
              disabled={getHistoryInfo.last}
              onClick={nextPage}
            >
              <ChevronRightIcon />
            </IconButton>
            <IconButton
              size="small"
              style={{ float: "right" }}
              color="secondary"
              disabled={getHistoryInfo.first}
              onClick={prevPage}
            >
              <ChevronLeftIcon />
            </IconButton>
            <Select
              labelId="size"
              id="size"
              style={{ float: "right", marginRight: 10 }}
              value={getHistoryInfo.size}
              onChange={changeSize}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </Typography>
          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="debt table">
              <TableHead>
                <TableRow>
                  <TableCell>Produit</TableCell>
                  <TableCell align="right">Quantité</TableCell>
                  <TableCell align="right">Prix</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Acheteur</TableCell>
                  <TableCell align="right">Personne débité</TableCell>
                  <TableCell align="right">Effacer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getHistoryInfo.content.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell component="th" scope="row">
                      {transaction.product.name}
                    </TableCell>
                    <TableCell align="right">{transaction.quantity}</TableCell>
                    <TableCell align="right">
                      {`${(
                        transaction.quantity * transaction.product.price
                      ).toFixed(2)}$`}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(
                        Date.parse(transaction.purchaseAt)
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {transaction.buyer.name}
                    </TableCell>
                    <TableCell align="right">
                      {transaction.debtor.name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        style={{ float: "right" }}
                        color="secondary"
                        onClick={() => transactionDelete(transaction.id)}
                      >
                        <TrashIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </>
      ) : null}
      <div style={{ height: 20 }} />
    </>
  );
};

export default AdminHistoryPage;
