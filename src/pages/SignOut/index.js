import React, {useContext, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import {isMobile} from 'react-device-detect';
import {ACCESS_TOKEN} from "../../constants/API";
import SessionContext from "../../contexts/Session";

const SignOutPage = () => {
    const session = useContext(SessionContext);

    const logOut = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        session.doFetch();
    };

    useEffect(
        () => {
            const timer = setTimeout(logOut, 2500);
            return () => clearTimeout(timer);
        }
    );

    return (
        <>
            <Typography style={{textAlign: 'center'}} variant={isMobile ? 'h4' : 'h2'} component="h2">
                Vous êtes déconnecté
            </Typography>
        </>
    )
};

export default SignOutPage;
