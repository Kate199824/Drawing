import React, { Component } from "react";
import styles from "./index.css";
import { uploadDrawing } from "../../services/drawingService";

class Canvas extends Component {

    state = {
        isDraw: false,
        canvas: document.getElementById("drawingCanvas"),
        pointSet: []
    }

    constructor(props) {
        super(props)
        this.initCanvas = this.initCanvas.bind(this)
    }

    componentDidMount() {
        this.initCanvas();
    }

    initCanvas() {
        document.getElementById("drawingCanvas").addEventListener("mousedown", this.mouseDown, false);
        document.getElementById("drawingCanvas").addEventListener("mousemove", this.mouseMove, false);
        document.getElementById("drawingCanvas").addEventListener("mouseup", this.mouseUp, false);
        document.getElementById("drawingCanvas").addEventListener("mouseleave", this.mouseLeave, false);
    }

    mouseDown = ( event ) => {
        console.log("down");
        let cxt = document.getElementById("drawingCanvas").getContext("2d");
        cxt.lineWidth = 1;
        if(!this.state.isDraw){
            this.setState({isDraw: true});
            let x = event.offsetX;
            let y = event.offsetY;
            console.log(x,y);
            cxt.beginPath();
            this.state.pointSet.push([x, y]);
            let newPointSet = this.state.pointSet;
            this.setState({
                pointSet: newPointSet
            })
        }
    }

    mouseMove = (event) => {
        console.log("move");
        let cxt = document.getElementById("drawingCanvas").getContext("2d");
        if(this.state.isDraw) {
            let x = event.offsetX;
            let y = event.offsetY;
            cxt.lineWidth = 1;
            cxt.lineTo(x, y);
            cxt.stroke();
            console.log(x, y);
            this.state.pointSet.push([x, y]);
            let newPointSet = this.state.pointSet;
            this.setState({
                pointSet: newPointSet
            })
        }
    }

    mouseUp = () => {
        console.log("up");
        let cxt = document.getElementById("drawingCanvas").getContext("2d");
        if(this.state.isDraw) {
            cxt.closePath();
            this.setState({isDraw: false});
            this.onUpload(this.state.pointSet);
        }
        console.log(this.state.pointSet);
    }

    mouseLeave = (event) => {
        console.log("leave");
        let cxt = document.getElementById("drawingCanvas").getContext("2d");
        if(this.state.isDraw) {
            cxt.closePath();
            this.setState({isDraw: false});
            this.onUpload(this.state.pointSet);
        }
    }

    static defaultProps = {
        lineWidth: 2,
        strokeStyle: 'rgb(248, 248, 248)',
    }

    reshow = ( path ) => {
        let cxt = document.getElementById("drawingCanvas").getContext("2d");
        cxt.beginPath();
        for(let i=0;i<path.length;i++){
            let cxt = document.getElementById("drawingCanvas").getContext("2d");
            cxt.lineTo(path[i][0], path[i][1]);
            cxt.stroke();
        }
    }

    onUpload = async (points) => {
        await uploadDrawing(points);
    }

    render() {
        return (
            <div id={"main"}>
                <canvas id="drawingCanvas" width={800} height={600}></canvas>
            </div>
        );
    }
}

export default Canvas;