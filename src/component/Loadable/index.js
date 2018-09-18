import React from "react";
import Loadable from "react-loadable";
import LoadingSpin from "../LoadingSpin/index";

export default function(loader) {
    return Loadable({
        loader,
        loading: LoadingSpin
    });
}