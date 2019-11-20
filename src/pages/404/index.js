import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Button from '@material-ui/core/Button';
import {isMobile} from "react-device-detect";

const Page404 = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <Typography variant={isMobile ? 'h4' : 'h2'} component="h2">
        Page non disponible !
      </Typography>
      <div style={{margin: 40}}/>
      <Button variant='contained' color='secondary' component={Link} to={ROUTES.WELCOME}>
        Accueil
      </Button>
    </div>
  )
};

export default Page404;
