import React, {Component} from 'react';
import "./index.css"

class ListItem extends Component {

    render() {

        const { onClick, name } = this.props;

        return (
            <div className={"item--main"} onClick={() => onClick(name)}>
                <div className={"align"}>
                    <div className={"item--text"}>{name}</div>
                </div>
            </div>
        );
    }

}

export default ListItem;