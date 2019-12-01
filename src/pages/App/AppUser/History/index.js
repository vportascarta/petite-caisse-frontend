import React, { useContext } from "react";
import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import AvatarWrapper from "../../../../components/AvatarWrapper";
import SessionContext from "../../../../contexts/Session";
import { isMobile } from "react-device-detect";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const HistoryPage = () => {
  const classes = useStyles();
  const session = useContext(SessionContext);
  const debtTransactions = session.currentUser.debtTransactions;
  const buyerTransactions = session.currentUser.buyerTransactions.filter(
    elem => elem.debtor.id !== session.currentUser.id
  );

  return (
    <>
      {session.isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <AvatarWrapper
            isImg={session.currentUser.imageUrl}
            src={
              session.currentUser.imageUrl
                ? session.currentUser.imageUrl
                : session.currentUser.name
            }
            style={{
              float: "right",
              width: isMobile ? 40 : 80,
              height: isMobile ? 40 : 80
            }}
          />

          <Typography
            variant={isMobile ? "h4" : "h2"}
            component="h2"
            style={{ display: "inline-block" }}
            paragraph
          >
            Votre Historique
          </Typography>

          <div style={{ height: 40 }} />

          <Typography variant={isMobile ? "body1" : "h5"} paragraph>
            Dernières transactions débitées :
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
                </TableRow>
              </TableHead>
              <TableBody>
                {debtTransactions.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.product.name}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">
                      {`${(row.quantity * row.product.price).toFixed(2)}$`}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(Date.parse(row.purchaseAt)).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {row.buyer.id === session.currentUser.id ? "Vous" : row.buyer.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <div style={{ height: 20 }} />

          <Typography variant={isMobile ? "body1" : "h5"} paragraph>
            Dernières transactions achetées pour une autre personne :
          </Typography>

          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Produit</TableCell>
                  <TableCell align="right">Quantité</TableCell>
                  <TableCell align="right">Prix</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Personne débitée</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {buyerTransactions.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.product.name}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">
                      {`${(row.quantity * row.product.price).toFixed(2)}$`}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(Date.parse(row.purchaseAt)).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {row.debtor.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <div style={{ height: 20 }} />
        </div>
      )}
    </>
  );
};

export default HistoryPage;
