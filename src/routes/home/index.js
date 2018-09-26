import React, { Component } from "react";
import { message, Modal, Input} from 'antd';
import Canvas from "../../component/Canvas/index";
import Board from "../../component/Board/index";
import NameCard from "../../component/NameCard/index";
import "./index.css"
import { uploadDrawing, downloadDrawing, getResult, getShapeName, getAllProjects, deleteProject} from "../../services/drawingService.js";
import { changeUser } from "../../services/userService.js";
import List from "../../component/List/index";

class Home extends Component {


    state = {
        isDraw: false,
        canvas: document.getElementById("drawingCanvas"),
        pointSet: [],
        filename: "",
        width: 750,
        height: 550,
        shapeName: "",
        allProjects: [],
        modalVisible: false,
        username: "jinbingshu",
        userModalVisible: false,
    }

    async componentDidMount(){
        await localStorage.setItem("username", this.state.username);
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
        this.showPath(res.result, "#111111");
    }

    upload = async () => {

        if(this.state.pointSet.length === 0){
            message.info("暂无图片上传")
        }
        else{
            this.setState({modalVisible:true})
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

    deletePreviousProject = async (name) => {
        await deleteProject(name);
        await this.getAll();
    }

    sayYes = () => {
        message.info("感谢您的反馈！")
    }

    sayNo = () => {
        message.info("感谢您的反馈！")
    }

    handleModalOk = async () => {
        let userFilename = document.getElementById("filenameInput").value || "picture";
        let res = await uploadDrawing(this.state.pointSet, userFilename);
        console.log("UPLOAD RES: "+res.filename);
        this.setState({
            pointSet: [],
            filename: res.filename
        })
        this.getAll();
        this.setState({
            modalVisible: false,
        });
    }

    handleModalCancel = () => {
        this.setState({
            modalVisible: false,
        });
    }

    onChangeUser = () => {
        this.setState({
            userModalVisible: true,
        });
    }

    onChangeUserModalOk = async () => {
        let username = document.getElementById("usernameInput").value || "username";
        let res = await changeUser(username);
        await localStorage.setItem("username", username);

        this.setState({
            pointSet: [],
            username:username,
            filename:"",
        });

        this.clearCanvas();
        await this.getAll();
        this.setState({
            userModalVisible: false,
        });
    }

    onChangeUserModalCancel = () => {
        this.setState({
            userModalVisible: false,
        });
    }

    render() {
        return (
            <div className={"home--main"}>
                <div className={"home--left"}>
                    <div className={"home--left--top"}>
                        <Board shapeName={this.state.shapeName}  sayYes={this.sayYes} sayNo={this.sayNo} />
                    </div>
                    <div className={"home--left--bottom"}>
                        <NameCard username={this.state.username} onChangeUser={this.onChangeUser}/>
                    </div>
                </div>
                <div className={"home--middle"}>
                    <Canvas width={this.state.width} height={this.state.height} mouseDown={this.mouseDown}
                            mouseMove={this.mouseMove} mouseUp={this.mouseUp} mouseLeave={this.mouseLeave}
                            getOrigin={this.getOrigin} getResult={this.getResult} onClear={this.clearCanvas}
                            onUpload={this.upload}/>
                </div>
                <div className={"home--right"}>
                    <List list={this.state.allProjects} onClick={this.getPreviousProject.bind(this)}
                          onDelete={this.deletePreviousProject.bind(this)} currentFile={this.state.filename}/>
                </div>
                <Modal
                    title="文件名"
                    visible={this.state.modalVisible}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}>
                    <Input id={"filenameInput"}/>

                </Modal>

                <Modal
                    title="用户名"
                    visible={this.state.userModalVisible}
                    onOk={this.onChangeUserModalOk}
                    onCancel={this.onChangeUserModalCancel}>
                    <Input id={"usernameInput"}/>

                </Modal>

            </div>
        );
    }
}

export default Home;