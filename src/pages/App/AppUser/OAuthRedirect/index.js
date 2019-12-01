import React, {useContext} from "react";
import {Redirect, useLocation} from "react-router-dom";
import * as ROUTES from "../../../../constants/routes";
import {ACCESS_TOKEN} from "../../../../constants/API";
import SessionContext from "../../../../contexts/Session";

export default () => {
    const location = useLocation();
    const session = useContext(SessionContext);

    const getUrlParameter = (name) => {
        // eslint-disable-next-line no-useless-escape
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        session.doFetch();
        return <Redirect to={{
            pathname: ROUTES.WELCOME,
            state: { from: location }
        }}/>;
    } else {
        return <Redirect to={{
            pathname: ROUTES.SIGN_IN,
            state: {
                from: location,
                error: error
            }
        }}/>;
    }
};
