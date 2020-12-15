import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from "redux";
import './1.css'


const Counter = ({value, onIncrement,  onDecrement}) => ( // 直接解构props中的value, onIncrement, onDecrement
    <div>
        <h1>
            {value}
        </h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
)

const reducer = (state = 0, action) => { // store中用于计算的reducer函数接受两个参数，
    // 第一个参数是数据state，第二个参数是action，也就是用于描述state变化的一个对象
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state -  1
        default:
            return state
    }
}

const store = createStore(reducer) // createStore是redux自带用来生成store的方法，可接受多个参数，在这里是接收一个reducer用来做数据的处理

const render = () => {// render函数做该页面的渲染操作
    ReactDom.render(
        <Counter value={store.getState()}
            // 通过dispatch将type为 'INCREMENT' 的action提交到store，又因为在创建store时把 处理数据的reducer 当作参数传递了给createStore
            // 所以 只要组件把action通过dispatch提交到store，store中的reducer就会根据其action的type值自动进行处理，并返回更新之后的值
                 onIncrement={() => {store.dispatch({type: 'INCREMENT'})}}
                 onDecrement={() => {store.dispatch({type: 'DECREMENT'})}}
        />,
        document.getElementById('container')
    )
}
render()
store.subscribe(render)