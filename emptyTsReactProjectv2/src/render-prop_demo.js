import React, { Component } from 'react';
import ReactDom from 'react-dom';

class Cat extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const mouse = this.props.mouse
        return (
            <img style={{width: '260px', position: 'absolute', left: mouse.x, top: mouse.y }} src='https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4220716882,1718698622&fm=26&gp=0.jpg' />
        )
    }
}

class Mouse extends Component {
    constructor(props){
        super(props);
        this.state = {
            x: 0 ,
            y: 0
        }
    }

    changeMouseMove = event => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }

    render() {
        return (
            <div>
                <div style={{height: '100vh'}} onMouseMove={this.changeMouseMove}>鼠标的坐标为x: {this.state.x}; y: {this.state.y}</div>
                {this.props.render(this.state)}
            </div>
        )
    }
}


class MouseTracker extends Component {
    render() {
        return (
            <div>
                <h1>移动鼠标</h1>
                <Mouse render={(mouse) => <Cat mouse={mouse} />}   />
            </div>
        )
    }
}
ReactDom.render(
    <MouseTracker />,
    document.getElementById('container')
);
