import React, { useContext } from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import POSInfoContext from "../../contexts/POSInfo";
import { useUsers } from "../../state/users";
import AvatarWrapper from "../../components/AvatarWrapper";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles(theme => ({
  grid: {
    margin: 0,
    padding: 10,
    width: 800
  },
  cardButton: {
    width: "100%"
  },
  cardImg: {
    margin: "auto"
  }
}));

const DebtorPOS = () => {
  const classes = useStyles();
  const posContext = useContext(POSInfoContext);
  const [isLoadingUsers, users] = useUsers();

  return (
    <Grid
      className={classes.grid}
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      {!isLoadingUsers
        ? users.map(user => (
            <Grid key={user.id} item xs={4}>
              <ButtonBase
                className={classes.cardButton}
                focusRipple
                onClick={() => {
                  posContext.setDebtorId(user.id);
                  posContext.nextPage();
                }}
              >
                <UserCard user={user} />
              </ButtonBase>
            </Grid>
          ))
        : null}
    </Grid>
  );
};

const UserCard = ({ user }) => {
  const classes = useStyles();
  return (
    <Card className={classes.cardButton}>
      <CardContent>
        <AvatarWrapper
          className={classes.cardImg}
          isImg={user.imageUrl}
          src={user.imageUrl ? user.imageUrl : user.name}
        />
        <Typography variant="h6" color="inherit" noWrap>
          {user.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DebtorPOS;
