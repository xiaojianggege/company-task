
const getData = (url) => {
        let formdata = new FormData()
        formdata.append('fields','storeId,promise_service,collect_time,delivery_time,dispatch_time,sign_time,cutoff_minutes,es_date,es_range,os_date,os_range,timing_promise,num,buyer_alipay_no,step,modified,timeout_action_time,end_time,pay_time,consign_time,rate_status,seller_nick,shipping_type,cod_status,orders.oid,orders.oid_str,orders.outer_iid,orders.outer_sku_id,orders.consign_time,tid,tid_str,status,end_time,buyer_nick,trade_from,credit_card_fee,buyer_rate,seller_rate,created,num,payment,pic_path,has_buyer_message,receiver_country,receiver_state,receiver_city,receiver_district,receiver_town,receiver_address,receiver_zip,receiver_name,receiver_mobile,receiver_phone,orders.timeout_action_time,orders.end_time,orders.title,orders.status,orders.price,orders.payment,orders.sku_properties_name,orders.num_iid,orders.refund_id,orders.pic_path,orders.refund_status,orders.num,orders.logistics_company,orders.invoice_no,orders.adjust_fee,seller_flag,type,post_fee,has_yfx,yfx_fee,buyer_message,buyer_flag,buyer_memo,seller_memo,orders.seller_rate,adjust_fee,invoice_name,invoice_type,invoice_kind,promotion_details,alipay_no,buyerTaxNO,pbly,orders,total_fee,orders.cid,service_orders.tmser_spu_code,step_trade_status,step_paid_fee,send_time')
        return fetch(url, {
            body: formdata,
            method: 'post',
            credentials:'include',
        }).then(res => res.json())
            .then( r => r.body.tradeListResponse.trades.trade)
}
export default getData