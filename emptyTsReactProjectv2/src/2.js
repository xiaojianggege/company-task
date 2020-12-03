import React from 'react';
import ReactDom from 'react-dom';
import './index.scss'

class Index extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }
    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.tick()
            }
            , 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    tick() {
        this.setState({
            date: new Date()
        })
    }
    render () {
        return <div>
            It is {this.state.date.toLocaleTimeString()}
        </div>
    }
}

ReactDom.render(
    <Index></Index>,
    document.getElementById('container')
);