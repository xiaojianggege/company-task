import React from "react";
import ReactDom from "react-dom"


class List extends  React.component{
    constructor(props){
        super(props);
        this.state = {
            numbers: this.props.numberList,
        }
    }
    render() {
        const listItem = this.state.numbers.map(item => <li key={item.toString()}> { item } </li>)
        return (
            <ul>
                {listItem}
            </ul>
        )
    }
}
ReactDom.render(
    <List  numberList = {[1, 3, 4, 5, 7]}/>,
    document.getElementById('container')
)