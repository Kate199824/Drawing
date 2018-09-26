import React from "react";
import Header from "../component/Header/index"

export const DefaultLayout = ({ component: Component, ...rest }) => {
    return (
        <div>
            <Header/>
            <Component {...rest}/>
        </div>

    );
}