import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { Menu } from 'antd';
import 'antd/dist/antd.css'
import getData from './server/index.js'
import Order from './components/Order'
// React component
import './css/1.css'

class App extends React.Component {
    state = {
        current: 'undelivered',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key }, () => {
            console.log(this.state.current)
        });
    };
    componentDidMount(){
        getData('https://trade.aiyongtech.com/aiyongTrade/base.list.get?appName=guanDian&pddApp=guandian&storeId=PDD')
            .then(res => {
                 console.log(res)
             })
    }

    render() {
        const { current } = this.state;
        return (
            <div className="App">
                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="recently" >
                       近三个月(109)
                    </Menu.Item>
                    <Menu.Item key="undelivered" >
                        待发货(1)
                    </Menu.Item>
                    <Menu.Item key="delivered">
                        已发货
                    </Menu.Item>
                    <Menu.Item key="refund">
                        退款中
                    </Menu.Item>
                    <Menu.Item key="completed">
                        已成功
                    </Menu.Item>
                </Menu>
                <Order />
            </div>
        );
    }
}




export default App;
