import React, {Component} from 'react';
import "./index.css";
import { Avatar, Button } from 'antd';

class NameCard extends Component {

    render() {

        const { username, onChangeUser} = this.props;

        return (
            <div className={"nc--main"}>
                <div className={"nc--top"}>
                    <Avatar size={64} icon="user"  className={"nc--top--avatar"}/>
                </div>
                <div className={"nc--middle"}>
                    <div className={"nc--middle--text"}>{username}</div>
                </div>
                <div className={"nc--bottom"}>
                    <Button type="dashed" className={"nc--bottom--middle"} onClick={onChangeUser}>其他用户</Button>
                </div>
            </div>
        );

    }
}

export default NameCard;