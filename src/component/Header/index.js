import React, {Component} from "react";
import "./index.css"

class Header extends Component {
    render(){
            return (
                <div className={"header"}>
                    <div className={"header--left"}>

                    </div>
                    <div className={"header--right"}>
                        <div className={"header--logo"}>DRAWing</div>
                    </div>
                </div>
            );
    }
}

export default Header;