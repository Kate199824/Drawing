import React, { Component } from "react";
import "./index.css"

class LoadingSpin extends Component {
    render() {
        return (
            <div className={"spinner"}>
                <div
                    className={"double-bounce1"}
                />
                <div
                    className={"double-bounce2"}
                />
            </div>
        );
    }
}

export default LoadingSpin;