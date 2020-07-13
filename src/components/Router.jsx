import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
/**
 * @param {{route:[{path:string,component:React.ReactElement}],redirect:{from:string,to:string}}} props
 * @returns {React.ReactElement}
 */
export default (props) => (
    <HashRouter>
        <Switch>
            {props.route.map((value, index) => {
                return (
                    <Route
                        path={value.path}
                        key={index}
                        component={value.component}
                    ></Route>
                );
            })}
            <Redirect
                from={props.redirect.from}
                to={props.redirect.to}
            ></Redirect>
        </Switch>
    </HashRouter>
);
