import React from "react";
import Loadable from "react-loadable";

export default function(component) {
    return Loadable({
        component,
        loading: <div>Loading</div>
    });
}