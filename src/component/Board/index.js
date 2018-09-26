import React, {Component} from 'react';
import "./index.css"

class Board extends Component {
    render() {

        const { shapeName, sayYes, sayNo } = this.props;

        return (
            <div className={"board--main"}>
                <div className={"board--title"}>
                    <div className={"align-x"}>
                        <div className={"board--title--point"}></div>
                        <div className={"board--title--text"}>您画的图形是:</div>
                    </div>
                </div>
                <div className={"board--result"}>
                    <div className={"board--result--text"}>{shapeName}</div>
                </div>
                <div className={"board--judge"}>
                    <div className={"board--judge--button"} onClick={sayYes}><div className={"board--judge--button--text"}>正确</div></div>
                    <div className={"board--judge--button"} onClick={sayNo}><div className={"board--judge--button--text"}>错误</div></div>
                </div>
            </div>
        );
    }
}

export default Board;