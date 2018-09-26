import React, { Component } from "react";
import "./index.css";
import MyButton from "./MyButton/index"

class Canvas extends Component {

    componentDidMount() {

    }

    render() {

        const {width, height, mouseDown, mouseMove, mouseUp, mouseLeave, getOrigin, getResult, onClear, onUpload} = this.props;

        return (
            <div id={"main"}>
                <div id={"align"}>
                    <canvas id="drawingCanvas" width={width} height={height} onMouseDown={mouseDown.bind(this)} onMouseLeave={mouseLeave.bind(this)} onMouseMove={mouseMove.bind(this)} onMouseUp={mouseUp.bind(this)}></canvas>
                    <div id={"buttons"}>
                        <MyButton onClick={getOrigin} text={"原图"}/>
                        <MyButton onClick={getResult} text={"识别"}/>
                        <MyButton onClick={onUpload} text={"上传"}/>
                        <MyButton onClick={onClear} text={"清空"}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Canvas;