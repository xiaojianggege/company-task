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
        </FancyBorder>
    )
}
function  WelcomeDialog() {
    return (
        <Dialog title="Welcome" message="Thank you for visiting our spacecraft!" />
    )
}
class Index extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return <WelcomeDialog />

    }
}

ReactDom.render(
    <Index></Index>,
    document.getElementById('container')
);