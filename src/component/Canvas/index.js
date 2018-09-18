import React, { Component } from "react";
import styles from "./index.css";

class Canvas extends Component {
    constructor(props) {
        super(props)
        this.initCanvas = this.initCanvas.bind(this)
    }
    initCanvas() {
        const {
            x0,//原点坐标
            y0,
            r,// 半径
            lineWidth, // 画笔宽度
            strokeStyle, //画笔颜色
            LinearGradientColor1, //起始渐变颜色
            LinearGradientColor2, //结束渐变颜色
            Percentage,// 进度百分比
        } = this.props
        let ele = document.getElementById("time_graph_canvas")
        let circle = ele.getContext("2d");
        //创建背景圆
        circle.lineWidth = lineWidth;
        circle.strokeStyle = strokeStyle;
        circle.lineCap = 'round';
        circle.beginPath();//开始一个新的路径
        circle.arc(x0, y0, r, 0, 2 * Math.PI, false);///用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        circle.stroke();//对当前路径进行描边
    }

    componentDidMount() {
        this.initCanvas()
    }
    componentDidUpdate() {
        this.initCanvas()
    }
    static defaultProps = {
        canvasWidth: 160,// 画布宽度
        canvasHeight: 160,// 画布高度
        x0: 80,
        y0: 80,
        r: 72,
        lineWidth: 16,
        strokeStyle: 'rgba(248, 248, 248, 1)',
        LinearGradientColor1: '#3EECED',
        LinearGradientColor2: '#499BE6'
    }
    render() {
        const { width, height, canvasWidth, canvasHeight } = this.props
        return (
            <div>
                <div className={styles.text}>
                    laallalaalal
                </div>
                <canvas id="time_graph_canvas" width={canvasWidth} height={canvasHeight}></canvas>
                <div>
                    laallalaalal
                </div>
            </div>
        )
    }
}

export default Canvas;