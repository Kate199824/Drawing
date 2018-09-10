import React from "react";

export const DefaultLayout = ({ component: Component, ...rest }) => {
    return (
        <div>
            <div>Header</div>
            {...rest}
        </div>
    );
}