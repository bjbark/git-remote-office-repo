Ext.define('module.sale.salework.model.SaleWorkPayment', { extend:'Axt.data.Model',
    fields:
    [
		{ name : 'pay_no' 				, type : 'string' }, /* 주문 번호 */
		{ name : 'pay_dt' 				, type : 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } , /* 주문일자  */
        { name : 'pay_id'               , type : 'string' }, /* 결제방식 */  
        { name : 'pay_gb'               , type : 'string' }, /* 결제방식 */
        
        
        
        { name : 'payment'              , type : 'float'  , defaultValue : 0 , persist : false }, /* 결제금액 */
        { name : 'paysale'              , type : 'float'  , defaultValue : 0 , persist : false }, /* 수금금액 */
		{ name : 'line_stat'			, type : 'boolean', defaultValue : false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },/* 데이터 상태 코드 */
		{ name : 'user_memo' 			, type : 'string' }, /* 메모사항  */

		{ name : 'retn_gb'               , type : 'string' }, /* 결제방식 */  
        { name : 'cat_id'               , type : 'string' }, /* 결제ID */  
        { name : 'app_no'               , type : 'string' }, /* 승인번호  */  
        { name : 'app_id'               , type : 'string' }, /* 거래번호 */  
		
		{ name : 'upt_ip' 			, type : 'string' }, /* 데이터 수정자 IP */
		{ name : 'upt_dttm' 			, type : 'string' }, /* 데이터 수정일시 */
		{ name : 'crt_ip' 			, type : 'string' }, /* 데이터 생성자 IP */
		{ name : 'crt_dttm' 			, type : 'string' } /* 데이터 생성 일시 */
    ]

});
