import React from 'react';
import ReactDom from 'react-dom';
import './index.scss'


function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    )
}
function Dialog(props) {
    return (
        <FancyBorder color='blue'>
            <h1> {props.title} </h1>
            <p> {props.message} </p>
            {props.children}
        </FancyBorder>
    )
}
// function  WelcomeDialog() {
//     return (
//         <Dialog title="Welcome" message="Thank you for visiting our spacecraft!" />
//     )
// }
class SignUpDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sign: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        this.setState({sign: e.target.value})
    }
    handleSubmit() {
        alert(`welcome aboard, ${this.state.sign}!`)
    }
    render(){
        return (
            <Dialog title="Mars Exploration Program"
                    message="How should we refer to you?">
                <input value={this.state.sign} onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>
                    Sign Me Up!
                </button>
            </Dialog>
        )
    }
}

class Index extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return <SignUpDialog />
    }
}

ReactDom.render(
    <Index></Index>,
    document.getElementById('container')
);