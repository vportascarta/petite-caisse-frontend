import React, {useContext} from 'react';
import {Button, makeStyles, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import ImageBlurred from '../../../../components/ImageBlurred';
import SessionContext from '../../../../contexts/Session';
import {isMobile} from 'react-device-detect';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '10vh'
  },
  buttonDiv: {
    textAlign: 'center'
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
  }
}));

const Welcome = () => {
  const classes = useStyles();
  const session = useContext(SessionContext);

  return (
    <div className={classes.root}>
      <Typography variant={isMobile ? 'h4' : 'h2'} align='center' gutterBottom>
        Bienvenue sur le site de gestion de petite caisse
      </Typography>


      {
        !session.isAuth ?
          <>
            <Typography variant='subtitle1' align='center' gutterBottom>
              Afin de pouvoir utiliser l'application veuillez vous connecter
            </Typography>

            <div className={classes.buttonDiv}>
              <Button className={classes.button} component={Link} to="/signin" variant="contained" color="secondary"
                      href=''> Connexion </Button>
              <Button className={classes.button} component={Link} to="/signup" variant="contained" color="secondary"
                      href=''> Inscription </Button>
            </div>
          </>
          :
          <>
            <Typography variant='subtitle1' align='center'>
              Vous pouvez faire des achats
            </Typography>
            <div className={classes.buttonDiv}>
              <Button className={classes.button} component={Link} to="/purchase" variant="contained" color="secondary"
                      href=''> Faire un achat </Button>
            </div>
          </>
      }

      <ImageBlurred src='https://source.unsplash.com/800x480?drink,cocktail'/>
    </div>
  )
};

export default Welcome;
