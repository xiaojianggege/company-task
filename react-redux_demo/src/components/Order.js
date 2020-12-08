import React from 'react'
import { MessageOutlined, FilterOutlined, CopyOutlined, ProfileOutlined, LockOutlined } from '@ant-design/icons';
class Order extends  React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            // 最外面的盒子
            <div className="order-wrapper">
                {/*第一个盒子存放上部内容（订单信息）*/}
                <div className="order-info">
                    <input type='checkbox' />
                    <span className='wait-send'>待发货</span>
                    <MessageOutlined className='blue-icon' />
                    <span className='blue'>联系买家</span>
                    <FilterOutlined className='gary-icon'/>
                    <span className='deepen'>编号: 252656656556988-5515415154</span>
                    <CopyOutlined className='gary-icon'/>
                    <span className='deepen'>下单时间: 2020-12-01 14:19:23</span>
                </div>

                {/*第二个盒子存放中部内容*/}
                <div className="order-content">
                    {/*内部第一个盒子存放商品信息*/}
                    <div className="commodity-wrapper">

                        <div className='left'>
                            <div className='commodity-pic'>
                                <img src='http://t00img.yangkeduo.com/openapi/images/2020-12-01/6814696669f39afa013cbe4a9a9eb218.jpeg'/>
                            </div>
                            <div className='commodity-info'>
                                <p className='commodity-title'>秋冬新款袜子 男士纯棉商务休闲男袜 简约透气吸汗高筒袜厂家</p>
                                <p className='commodity-size'>船锚，均</p>
                                <div className='status'>
                                    <span>退款成功</span>
                                    <span className='check'>查看退款</span>
                                </div>
                            </div>
                        </div>

                        <div className='set-abbreviation'>设置简称</div>
                    </div>

                    {/*内部第二个盒子存放--received信息*/}
                    <div className='received-info'>
                        <div className='received-container'>
                            <span>实付</span>
                            <span className='count'>￥11.00</span>
                        </div>
                        <div>
                            <span>数量</span>
                            <span className='count'>1</span>
                        </div>
                    </div>

                    {/* 内部三第个盒子存放其他信息  */}
                    <div className= 'order-detail'>
                        <div>
                            <div className='ship'>发货</div>
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
                <div className="shopping-address">
                    <span className='address-text'>
                        收获地址 </span>
                    <span>小* <LockOutlined  className='lock-outlined'/>
                        13*********22 <LockOutlined  className='lock-outlined'/>
                        上海市宝山区新二路 * 号裙楼三楼（空间应用技术产业园）<LockOutlined  className='lock-outlined' /> </span>
                        <CopyOutlined className='gary-icon'/>

                </div>
            </div>
        )
    }
}
export default  Order