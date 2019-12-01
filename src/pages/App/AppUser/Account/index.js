import React, { useContext, useState } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import AvatarWrapper from "../../../../components/AvatarWrapper";
import Button from "@material-ui/core/Button";
import SessionContext from "../../../../contexts/Session";
import { PasswordForgetLink } from "../PasswordForget";
import { PasswordChangeLink } from "../PasswordChange";
import { isMobile } from "react-device-detect";
import ModifyAccountDialog from "./modify";

const AccountPage = () => {
  const session = useContext(SessionContext);
  const [dialogModifyOpen, setDialogModifyOpen] = useState(false);

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
            Votre Compte
          </Typography>

          <div style={{ height: 40 }} />

          <Typography variant={isMobile ? "body1" : "h5"} paragraph>
            Nom d'utilisateur : {session.currentUser.name}
          </Typography>
          <Typography variant={isMobile ? "body1" : "h5"} paragraph>
            Email : {session.currentUser.email}
          </Typography>
          <Typography variant={isMobile ? "body1" : "h5"} paragraph>
            Solde :{" "}
            {session.currentUser.balance
              ? session.currentUser.balance.amount
              : 0.0}
            $
          </Typography>
          <Typography variant={isMobile ? "body1" : "h5"} paragraph>
            Connecté avec :{" "}
            {session.currentUser.provider.charAt(0).toUpperCase() +
              session.currentUser.provider.slice(1)}
          </Typography>
          <Typography variant={isMobile ? "body1" : "h5"} paragraph>
            Autorisé à faire des achats : {session.currentUser.userVerified ? "Oui" : "Non"}
          </Typography>
          <Typography variant={isMobile ? "body1" : "h5"} paragraph>
            Code NIP bloqué : {session.currentUser.nbBadPinCode >= 3 ? "Oui" : "Non"}
          </Typography>


          {session.currentUser.provider === "local" ? (
            <>
              <PasswordForgetLink />
              <PasswordChangeLink />
            </>
          ) : null}

          <div style={{ height: 20 }} />

          <Button
            onClick={() => setDialogModifyOpen(true)}
            variant="contained"
            color="secondary"
            fullWidth
          >
            Modifier vos informations
          </Button>

          <ModifyAccountDialog
            open={dialogModifyOpen}
            setOpen={setDialogModifyOpen}
          />
        </div>
      )}
    </>
  );
};

export default AccountPage;
