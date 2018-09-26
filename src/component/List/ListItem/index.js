import React, {Component} from 'react';
import "./index.css"
import {Icon} from 'antd';

class ListItem extends Component {

    render() {

        const { onClick, name, onDelete, chosed } = this.props;

        if(chosed === "chosed"){
            return (
                <div className={"item--main__chosed"}>
                    <div className={"align"}>
                        <div className={"item--text"}  onClick={() => onClick(name)}>{name}</div>
                        <div className={"item--icon"}><Icon type="delete" onClick={() => onDelete(name)}
                                                            style={{ fontSize: '16px', color: '#08c', opacity: 0.5 }}/></div>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className={"item--main"}>
                    <div className={"align"}>
                        <div className={"item--text"}  onClick={() => onClick(name)}>{name}</div>
                        <div className={"item--icon"}><Icon type="delete" onClick={() => onDelete(name)}
                                                            style={{ fontSize: '16px', color: '#08c', opacity: 0.5 }}/></div>
                    </div>
                </div>
            );
        }
    }

}

export default ListItem;