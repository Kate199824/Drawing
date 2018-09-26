import React, { Component } from "react";
import Canvas from "../../component/Canvas/index";
import Board from "../../component/Board/index";
import "./index.css"
import { uploadDrawing, downloadDrawing, getResult, getShapeName, getAllProjects} from "../../services/drawingService.js";
import { message } from 'antd';
import List from "../../component/List/index";

class Home extends Component {


    state = {
        isDraw: false,
        canvas: document.getElementById("drawingCanvas"),
        pointSet: [],
        filename: "",
        width: 800,
        height: 600,
        shapeName: "",
        allProjects: [],
    }

    componentDidMount(){
        this.getAll();
    }

    mouseDown = (event) => {
        let clientLeft = document.getElementById("drawingCanvas").offsetLeft;
        let clientTop = document.getElementById("drawingCanvas").offsetTop;
        let scrollTop = window.scrollX;
        let scrollLeft = window.scrollY;
        console.log("down"+event.target);
        let cxt = document.getElementById("drawingCanvas").getContext("2d");
        cxt.lineWidth = 1;
        cxt.strokeStyle = "#000000";
        if(!this.state.isDraw){
            this.clearCanvas();
            this.setState({isDraw: true});
            let x = event.clientX - clientLeft + scrollTop;
            let y = event.clientY - clientTop + scrollLeft;
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
        let clientLeft = document.getElementById("drawingCanvas").offsetLeft;
        let clientTop = document.getElementById("drawingCanvas").offsetTop;
        let scrollTop = window.scrollX;
        let scrollLeft = window.scrollY;
        console.log("move"+clientLeft);
        let cxt = document.getElementById("drawingCanvas").getContext("2d");
        if(this.state.isDraw) {
            let x = event.clientX - clientLeft + scrollTop;
            let y = event.clientY - clientTop + scrollLeft;
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

    mouseUp = async () => {
        console.log("up");
        let cxt = document.getElementById("drawingCanvas").getContext("2d");
        if(this.state.isDraw) {
            cxt.closePath();
            this.setState({
                isDraw: false,
            })
          //  this.upload();
        }
    }

    mouseLeave = async () => {
        console.log("leave");
        let cxt = document.getElementById("drawingCanvas").getContext("2d");
        if(this.state.isDraw) {
            cxt.closePath();
            this.setState({
                isDraw: false,
            })
          //  this.upload();
        }
    }

    showPath = ( path , color) => {
        let cxt = document.getElementById("drawingCanvas").getContext("2d");
        cxt.strokeStyle = color;
        cxt.beginPath();
        for(let i=0;i<path.length;i++){
            let cxt = document.getElementById("drawingCanvas").getContext("2d");
            cxt.lineTo(path[i][0], path[i][1]);
            cxt.stroke();
        }
    }

    getResult = async () => {
        this.clearCanvas();
        let res = await getResult(this.state.filename);
        this.showPath(res.result, "#4b81f6");

        let name = await getShapeName(this.state.filename);
        this.setState({
            shapeName: name.result,
        });
    }

    getOrigin = async () => {
        this.clearCanvas();
        let res = await downloadDrawing(this.state.filename);
        // this.setState({
        //     pointSet: res.result,
        // });
        this.showPath(res.result, "#111111");
    }

    upload = async () => {
        if(this.state.pointSet.length === 0){
            message.info("暂无图片上传")
        }
        else{
            let res = await uploadDrawing(this.state.pointSet);
            console.log("UPLOAD RES: "+res.filename);
            this.setState({
                pointSet: [],
                filename: res.filename
            })
            this.getAll();
        }
    }

    clearCanvas = () => {
        let cxt = document.getElementById("drawingCanvas").getContext("2d");
        cxt.clearRect(0,0,this.state.width,this.state.height);
        this.setState({
            pointSet: [],
            shapeName: "",
        })
    }

    getAll = async () => {
        let pjs = await getAllProjects();
        console.log(pjs.result);
        this.setState({
            allProjects: pjs.result
        })
    }

    getPreviousProject = async (name) => {
        console.log("PRE" + name);
        await this.setState({
            filename: name,
        });
        this.getOrigin();
    }

    sayYes = () => {
        message.info("谢谢反馈！")
    }

    sayNo = () => {
        message.info("谢谢反馈！")
    }

    render() {

        return (
            <div className={"home--main"}>
                <div className={"home--middle"}><Canvas width={this.state.width} height={this.state.height} mouseDown={this.mouseDown}
                                                         mouseMove={this.mouseMove} mouseUp={this.mouseUp} mouseLeave={this.mouseLeave}
                                                        getOrigin={this.getOrigin} getResult={this.getResult} onClear={this.clearCanvas}
                                                            onUpload={this.upload}/></div>
                <div className={"home--right"}>
                    <Board shapeName={this.state.shapeName}  sayYes={this.sayYes} sayNo={this.sayNo}/>
                    <List list={this.state.allProjects} onClick={this.getPreviousProject.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default Home;