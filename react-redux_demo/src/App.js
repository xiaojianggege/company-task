import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import { Menu } from 'antd';
import 'antd/dist/antd.css'
import getData from './server/index.js'
import Order from './components/Order'
// React component
import './css/1.css'
import isRecenlty from './untils/isRecenlty'
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";


//action
const Initialize = {
    type: 'INITIALIZE',
    payload: []
}

const reducer = (state = { tradeList: [], curStatus: 'WAIT_SELLER_SEND_GOODS'}, action) => {
    const { type, payload } =  action
    const { tradeList } = state
    switch (type) {
        case 'INITIALIZE':
            return {
                ...state,
                tradeList: payload
            }
        case 'WAIT_SELLER_SEND_GOODS' :
            return {
                ...state,
                curStatus: "WAIT_SELLER_SEND_GOODS"
            }
        case 'RECENTLY':
            return {
                ...state,
                curStatus: 'recently'
            }
        case 'REFUND':
            return {
                ...state,
                curStatus: 'refund'
            }
        case 'TRADE_FINISHED':
            return {
                ...state,
                curStatus: "TRADE_FINISHED"
            }
        case 'WAIT_BUYER_CONFIRM_GOODS':
            return {
                ...state,
                curStatus: "WAIT_BUYER_CONFIRM_GOODS"
            }
        default:
            return  state
    }
}
let mid=[thunk]
const store = createStore(
    reducer,
    compose(
        applyMiddleware(...mid),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

const mapStateToProps = (state) => {
    return {
        tradeList: state.tradeList,
        curStatus: state.curStatus
    }
}

class AiStore extends React.Component {
    constructor(props){
        super(props);
    }

    handleClick = e => {
       const { dispatch } = this.props
        dispatch({
            type: e.key.toUpperCase()
        })
    };

    componentDidMount(){
        this.props.dispatch(async dispatch => {
            const tradeList = await getData('https://trade.aiyongtech.com/aiyongTrade/base.list.get?appName=guanDian&pddApp=guandian&storeId=PDD')
            console.log(tradeList)
            Initialize.payload = tradeList
            dispatch(Initialize)
        })
    }

    render() {
        const { curStatus, tradeList } = this.props;
        // 拿到最近三个月内订单的数量
        const renceltyNum = tradeList.reduce((total, cur) => {
           return isRecenlty(cur.created) ? ++total : total
        }, 0)
        // 拿到待发货的数量
        const undeliveredNum = tradeList.reduce((total, cur) => {
            return cur.status == 'WAIT_SELLER_SEND_GOODS' ? ++total : total
        }, 0)
        // 拿到已完成的数量
        const completedNum = tradeList.reduce((total, cur) => {
            return cur.status == 'TRADE_FINISHED' ? ++total : total
        }, 0)
        // 拿到已发货的数量
        const deliveredNum = tradeList.reduce((total, cur) => {
            return cur.status == 'WAIT_BUYER_CONFIRM_GOODS' ? ++total : total
        }, 0)
        let tradeListMap = []
        if(curStatus === 'recently') {
            tradeListMap = tradeList
        } else {
            tradeListMap = tradeList.filter( item => item.status === curStatus)
        }
        const TradeListDom = tradeListMap.map( item => <Order key={item.created} orderInfo={item} /> )
        return (
            <div className="App">
                <Menu onClick={this.handleClick} selectedKeys={[curStatus]} mode="horizontal">
                    <Menu.Item key="recently" >
                       近三个月({renceltyNum})
                    </Menu.Item>
                    <Menu.Item key="WAIT_SELLER_SEND_GOODS" >
                        待发货({undeliveredNum})
                    </Menu.Item>
                    <Menu.Item key="WAIT_BUYER_CONFIRM_GOODS">
                        已发货({deliveredNum})
                    </Menu.Item>
                    <Menu.Item key="refund">
                        退款中
                    </Menu.Item>
                    <Menu.Item key="TRADE_FINISHED">
                        已成功({completedNum})
                    </Menu.Item>
                </Menu>
                {TradeListDom}
            </div>
        );
    }
}

const Com = connect(mapStateToProps)(AiStore)

const App = () => {
    return (
        <Provider store={store}><Com/></Provider>
    )
}
export default App;
