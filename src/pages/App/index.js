import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import AppUser from "./AppUser";
import AppPOS from "./AppPOS";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path={ROUTES.POS}
                    component={AppPOS}
                />
                <Route exact component={AppUser} />
            </Switch>
        </Router>
    )
};

export default App;
