import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import defaultRoute from "../routeconfig/routeconfig";

const routeList = [defaultRoute];

export default function() {
    return (
        <BrowserRouter>
            <Switch>
                {routeList}
            </Switch>
        </BrowserRouter>
    );
}