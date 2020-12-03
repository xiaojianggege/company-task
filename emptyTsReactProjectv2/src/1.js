import React from "react";
import ReactDom from "react-dom";


class Toggle extends React.component{
    constructor(props){
        super(props);
        this.state = {
            isToggle: true
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState( {
            isToggle: !this.state.isToggle
        })
    }
    render() {
        return (
            <button onClick = {this.handleClick}> {this.state.isToggle ? 'ON' : 'OFF' } </button>
        )
    }
}

ReactDom.render( <Toggle />, document.getElementById('container'))
