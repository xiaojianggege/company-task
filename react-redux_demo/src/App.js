import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import { Menu, Pagination  } from 'antd';
import 'antd/dist/antd.css'
import getData from './server/index.js'
import Order from './components/Order'
// React component
import './css/1.css'




//action

const initState = {
    tradeList: [],
    total_results: 0,
    curStatus: 'WAIT_SELLER_SEND_GOODS',
    pageSize: 50,
    pageNo: 1,
    sortBy: 'create_time_desc',
}

const reducer = (state = initState, action) => {
    const { type, payload } =  action
    switch (type) {
        case 'INITIALIZE':
            return {
                ...state,
                tradeList: payload
            }
        case 'TOTAL_RESULTS':
            return  {
                ...state, total_results: payload
            }
        case 'CUR_STATUS':
            return {
                ...state,
                curStatus: payload
            }
        case 'PAGE_SIZE' :
            return  {
                ...state,
                pageSize: payload
            }
        case 'PAGE_NO':
            return {
                ...state,
                pageNo: payload
            }
        default:
            return  state
    }
}

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

const mapStateToProps = (state) => {
    return {
        tradeList: state.tradeList,
        total_results: state.total_results,
        curStatus: state.curStatus,
        pageSize: state.pageSize,
        pageNo: state.pageNo,
        sortBy: state.sortBy,
    }
}

class AiStore extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedNum: 0,
            isAllSelected: false,
        }
    }


    // 初始化数据函数
    initTarde = (pageSize, pageNo, curStatus, sortBy) => {
        console.log('接口参数', pageSize, pageNo, curStatus, sortBy)
        this.props.dispatch(async dispatch => {
            const res = await getData({
                pageSize,
                pageNo,
                sortBy,
                status: curStatus
            })
            let tradeList, total_results;
            if (!res.trades) {
                tradeList = []
                total_results = 0
            } else {
                tradeList = res.trades.trade
                total_results = res.total_results}

            console.log(tradeList)
            dispatch({
                type: 'INITIALIZE',
                payload: tradeList
            })
            dispatch({
                type: 'TOTAL_RESULTS',
                payload: total_results
            })
        })
    }

    // 受控组件函数，传递给子组件 来改变selectedNum的值
    onChangeSelectNum = checked => {
        let {selectedNum} = this.state
        checked ? selectedNum++ : selectedNum--
        this.setState({
            selectedNum
        })
    }

    // 改变每页显示的条数
    onShowSizeChange = (current, pageSize) => {
        const { dispatch } = this.props
        dispatch({
            type: 'PAGE_SIZE',
            payload: pageSize
        })
    }

    changeCurrent = current => {
        const { dispatch } = this.props
        dispatch({
            type: 'PAGE_NO',
            payload: current
        })
    }


    // 改变status的状态
    handleClick = e => {
        const { dispatch } = this.props
        dispatch({
            type: 'CUR_STATUS',
            payload: e.key
        })
    }

    componentDidMount(){
        const {pageSize, pageNo, curStatus, sortBy} = this.props
        this.props.dispatch(async dispatch => {
            const res = await getData({
                pageSize,
                pageNo,
                sortBy,
                status: curStatus
            })
            const tradeList = res.trades.trade
            const total_results = res.total_results
            dispatch({
                type: 'INITIALIZE',
                payload: tradeList
            })
            dispatch({
                type: 'TOTAL_RESULTS',
                payload: total_results
            })
        })
    }

    componentWillReceiveProps(nextProps,nextContext){
        const {pageSize, pageNo, curStatus, sortBy} = nextProps
        if(this.props.pageSize !== pageSize || this.props.pageNo !== pageNo || this.props.curStatus !== curStatus) {
            this.initTarde(pageSize, pageNo, curStatus, sortBy)
        }
    }

    // 控制全选按钮函数
    onChangeIsAllSelected = (e, length) => {
        let selectedNum = 0
        if(e.target.checked) {
            selectedNum = length
        }
        this.setState({
            isAllSelected: e.target.checked,
            selectedNum
        })
    }
    render() {
        const { tradeList, total_results, curStatus, pageNo, pageSize} = this.props;
        const {selectedNum, isAllSelected} = this.state

        const TradeListDom = tradeList.map( item => <Order changeSelectNum={this.onChangeSelectNum} isSelected={isAllSelected} key={item.created} orderInfo={item}  /> )
        const len = TradeListDom.length
        return (
            <div className="App">
                <Menu onClick={this.handleClick} selectedKeys={[curStatus]} mode="horizontal">
                    <Menu.Item key="recently" >
                       近三个月({total_results})
                    </Menu.Item>
                    <Menu.Item key="WAIT_SELLER_SEND_GOODS" >
                        待发货({total_results})
                    </Menu.Item>
                    <Menu.Item key="WAIT_BUYER_CONFIRM_GOODS">
                        已发货({total_results})
                    </Menu.Item>
                    <Menu.Item key="TRADE_REFUND">
                        退款中
                    </Menu.Item>
                    <Menu.Item key="TRADE_FINISHED">
                        已成功({total_results})
                    </Menu.Item>
                </Menu>
                {TradeListDom}
                <div className='footer'>
                    <div className='allSelect'>
                        <input type='checkbox' onClick={(e) => { this.onChangeIsAllSelected(e, len) }}  checked={isAllSelected} readOnly/> <span>全选(已选{selectedNum})</span>
                    </div>
                    <Pagination
                    showSizeChanger
                    onShowSizeChange={this.onShowSizeChange}
                    defaultCurrent={1}
                    current={pageNo}
                    pageSize={pageSize}
                    total={total_results}
                    onChange={this.changeCurrent}
                    />
                </div>
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
