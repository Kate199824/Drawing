import React, { Component } from "react";
import styles from "./index.css";

class MyButton extends Component {

    render() {
        const { onClick, text } = this.props;

        return (
            <div className={"main"}>
                <div onClick={onClick} className={"button"}><div className={"text"}>{text}</div></div>
            </div>

        );
    }


}

export default MyButton;