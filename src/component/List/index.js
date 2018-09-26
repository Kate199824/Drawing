import React, {Component} from 'react';
import "./index.css"
import ListItem from "./ListItem/index";

class List extends Component {

    render() {

        const { list=[], onClick } = this.props;

        return (
            <div className={"list--main"}>
                <div className={"list--title"}>
                    <div className={"align-x"}>
                        <div className={"list--title--point"}></div>
                        <div className={"list--title--text"}>历史绘画:</div>
                        <hr/>
                    </div>
                </div>
                <div className={"list-content"}>
                    {list.map((item, index) => {
                        return <ListItem key={list[index]} onClick={onClick} name={list[index]} />;
                    })}
                </div>
            </div>
        );
    }

}

export default List;