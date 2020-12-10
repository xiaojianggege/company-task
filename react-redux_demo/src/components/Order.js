import React from 'react'
import { MessageOutlined, FilterOutlined, CopyOutlined, ProfileOutlined, LockOutlined } from '@ant-design/icons';

const statusObj = {
    WAIT_SELLER_SEND_GOODS: '待发货',
    TRADE_FINISHED: '已成功',
    WAIT_BUYER_CONFIRM_GOODS: '已发货'
}
class Order extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            isSelected: false
        }
    }
    componentDidMount(){
        this.setState({
            isSelected: this.props.isSelected
        })
    }
    componentWillReceiveProps(nextProps,nextContext){
        if(nextProps.isSelected !== this.props.isSelected) {
            if(this.state.isSelected !== nextProps.isSelected) {
                this.setState({
                    isSelected: nextProps.isSelected
                })
            }
        }
    }

    onChangeIsSelected = e => {
        const checked = e.target.checked
        this.props.changeSelectNum(checked)
        this.setState({
            isSelected: checked
        })
    }
    render() {
        const {isSelected} = this.state
        const {status, tid, created, pic_path, title,
               receiver_name, receiver_phone, receiver_city ,
                receiver_town, receiver_address
               } = this.props.orderInfo
        const order = this.props.orderInfo.orders.order[0]
        //Refund用来控制这条order订单是否有 退款成功和查看退款这个结构，如果status为'WAIT_SELLER_SEND_GOODS',则没有
        const Refund = status !== 'WAIT_SELLER_SEND_GOODS' ?
                                    (<div className='status'>
                                            <span>退款成功</span>
                                            <span className='check'>查看退款</span>
                                    </div>)
                                                            : ''
        // 只有待发货状态下才有的发货按钮
        const Ship = status === 'WAIT_SELLER_SEND_GOODS' ? (<div className='ship'>发货</div>) : ''
        // 只有待发货状态下才有的收货地址组件
        const shoppingAddress = status === 'WAIT_SELLER_SEND_GOODS' ? (
            <div className="shopping-address">
                    <span className='address-text'> 收获地址 </span>
                <span>{receiver_name} </span><LockOutlined  className='lock-outlined'/>
                   <span>{receiver_phone}</span> <LockOutlined  className='lock-outlined'/>
                   <span>{receiver_city} {receiver_town}--{receiver_address}  </span><LockOutlined  className='lock-outlined' />
                <CopyOutlined className='gary-icon'/>

            </div>
        ) : ''
        return (
            // 最外面的盒子
            <div className="order-wrapper">
                {/*第一个盒子存放上部内容（订单信息）*/}
                <div className="order-info">
                    <input type='checkbox'  onClick={this.onChangeIsSelected} checked={isSelected}  readOnly/>
                    <span className={`type-status ${status}`}>{ statusObj[status] }</span>
                    <MessageOutlined className='blue-icon' />
                    <span className='blue'>联系买家</span>
                    <FilterOutlined className='gary-icon'/>
                    <span className='deepen'>编号: {tid}</span>
                    <CopyOutlined className='gary-icon'/>
                    <span className='deepen'>下单时间: {created}</span>
                </div>

                {/*第二个盒子存放中部内容*/}
                <div className="order-content">
                    {/*内部第一个盒子存放商品信息*/}
                    <div className="commodity-wrapper">

                        <div className='left'>
                            <div className='commodity-pic'>
                                <img src={pic_path} />
                            </div>
                            <div className='commodity-info'>
                                <p className='commodity-title'>{title}</p>
                                <p className='commodity-size'>{order.sku_properties_name}</p>
                                {Refund}
                                {/*<div className='status'>*/}
                                {/*    <span>退款成功</span>*/}
                                {/*    <span className='check'>查看退款</span>*/}
                                {/*</div>*/}
                            </div>
                        </div>

                        <div className='set-abbreviation'>设置简称</div>
                    </div>

                    {/*内部第二个盒子存放--received信息*/}
                    <div className='received-info'>
                        <div className='received-container'>
                            <span>实付</span>
                            <span className='count'>￥{order.price}</span>
                        </div>
                        <div>
                            <span>数量</span>
                            <span className='count'>{order.num}</span>
                        </div>
                    </div>

                    {/* 内部三第个盒子存放其他信息  */}
                    <div className= 'order-detail'>
                        <div>
                            {Ship}
                            <ProfileOutlined className='gary-icon'/>
                            <span className='blue'>订单详情</span>
                        </div>
                        <div className='print-wrapper'>
                            <div className='print-blue'>打印面单</div>
                            <div className='print-blue'>打发货单</div>
                        </div>
                    </div>
                </div>

                {/*第三个盒子存放下部内容（地址信息）*/}
                { shoppingAddress }
            </div>
        )
    }
}
export default  Order