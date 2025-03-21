Ext.define('module.sale.sale.saleosttlist.model.SaleOsttListMaster', { extend:'Axt.data.Model',
    fields: [

		{name: 'corp_id' 		, type: 'string' , defaultValue : _global.corp_id , persist : false }, /* 법인 ID */
		{name: 'hq_id' 			, type: 'string' , defaultValue : _global.hq_id , persist : false }, /* 본사 ID */
		{name: 'stor_id' 		, type: 'string' , defaultValue : _global.stor_id }, /* 매장 ID  ( 발주 등록 매장 ) */
		{name: 'stor_nm' 		, type: 'string' , persist : false }, /* 매장 명 */
		{name: 'mngt_stor_id' 	, type: 'string' , defaultValue : _global.stor_id , persist : false }, /* 매장 ID  ( 발주 등록 매장 ) */
		{name: 'owner_nm' 		, type: 'string' , persist : false }, /* 대표 명 */
		{name: 'cstm_idcd' 		, type: 'string' , persist : false }, /* 거래처 ID */
		{name: 'cstm_name'		, type: 'string' },
		{name: 'user_memo'		, type: 'string' },
		{name: 'bzpl_idcd'		, type: 'string' },

		{name: 'invc_numb' 		, type: 'string' }, /* 매출 번호 */
		{name: 'org_invc_numb' 	, type: 'string' , persist : false }, /* 주문 번호 */
		{name: 'invc_date' 		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } , /* 매출 일자 */
		{name: 'chnl' 			, type: 'string' , persist : false }, /* 작업 위치 */

		{name: 'chnl' 			, type: 'string' , persist : false }, /* 고객 구분 */
		{name: 'cust_idcd' 		, type: 'string' , persist : false }, /* 고객 ID */
		{name: 'cust_cd' 		, type: 'string' , persist : false }, /* 고객 ID */
		{name: 'cust_name' 		, type: 'string' , persist : false }, /* 고객 명 */
		{name: 'mmb_nm' 		, type: 'string' , persist : false }, /* 회원 명 */
		{name: 'login_id'		, type: 'string' , persist : false }, /* 로그인 ID */

		{name: 'drtr_idcd' 		, type: 'string' }, /* 작업 담당자 ID */
		{name: 'inv_usr_id' 	, type: 'string' , persist : false }, /* 작업 담당자 ID */
		{name: 'inv_user_nm' 	, type: 'string' , persist : false }, /* 작업 담당자 명 */
		{name: 'sales_man_id' 	, type: 'string' , persist : false }, /* 영업담당 ID */
		{name: 'salesman_nm' 	, type: 'string' , persist : false }, /* 영업담당자 명 */
		{name: 'pack_vend_nm' 	, type: 'string' , persist : false }, /* 직납 거래처 명 */
		{name: 'pack_zone_nm' 	, type: 'string' , persist : false }, /* 출고 검수대 명 */
		{name: 'hdli_id' 		, type: 'string' , persist : false }, /* 택배사 ID */
		{name: 'taekbae_nm' 	, type: 'string' , persist : false }, /* 택배사 명 */
		{name: 'hdli_no' 		, type: 'string' , persist : false }, /* 송장번호 */
		{name: 'inv_prt_cnt' 	, type: 'int'    , persist : false  , defaultValue : 0 }, /* 송장번호 수량 */
		{name: 'req_msg' 		, type: 'string' , persist : false }, /* 요청 메모 */

		{name: 'biz_no' 		, type: 'string' , persist : false }, /* 고객 사업자번호 */
		{name: 'hp_no' 			, type: 'string' , persist : false }, /* 고객 핸드폰번호 */
		{name: 'tel_no' 		, type: 'string' , persist : false }, /* 고객 전화번호 */
		{name: 'fax_no' 		, type: 'string' , persist : false }, /* 고객 팩스 */
		{name: 'reve_nm' 		, type: 'string' , persist : false }, /* 수령자 명 */
		{name: 'reve_tel_no' 	, type: 'string' , persist : false }, /* 수령자 전화번호 */
		{name: 'reve_hp_no' 	, type: 'string' , persist : false }, /* 수령자 핸드폰 */
		{name: 'reve_email' 	, type: 'string' , persist : false }, /* 수령자 이메일 */
		{name: 'reve_fax_no' 	, type: 'string' , persist : false }, /* 수령자 fax번호 */
		{name: 'reve_zip_cd' 	, type: 'string' , convert : Ext.util.Format.StrToZip , serialize: Ext.util.Format.ZipToStr }, /* 수령자 우편주소 */
		{name: 'reve_addr_1' 	, type: 'string' , persist : false }, /* 수령자 주소 */
		{name: 'reve_addr_2' 	, type: 'string' , persist : false }, /* 수령자 상세주소 */

		{name: 'inv_amt'		, type: 'float'	 , defaultValue : 0 , persist : false }, /* 합계 */
		{name: 'payment'		, type: 'float'	 , defaultValue : 0 , persist : false }, /* 합계 */
		{name: 'npay_amt'		, type: 'float'	 , defaultValue : 0 , persist : false }, /* 미수금 */
		{name: 'tax_amt'		, type: 'float'	 , defaultValue : 0 , persist : false }, /* 부가세 */
		{name: 'txfree_amt'		, type: 'float'	 , defaultValue : 0 , persist : false }, /* 면섹금액 */
		{name: 'sply_amt'		, type: 'float'	 , defaultValue : 0 , persist : false }, /* 과세금액 */

		{name: 'tax_yn' 		, type: 'string' , defaultValue : '0' , persist : false }, /* 계산서 발행 여부  */
		{name: 'tax_dt' 		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr , persist : false }, /* 계산서 발행 일시 */
		{name: 'issue_dt' 		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr , persist : false }, /* 계산서 작성 일시 */

		{name: 'balance_yn'		, type: 'boolean', defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },/* 데이터 마감 0=마감전/1:마감후 */
		{name: 'taxprint_yn'	, type: 'boolean', defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },/* 데이터 마감 0=마감전/1:마감후 */
		{name: 'rest_qty'	    , type: 'float'	 , defaultValue : 0 }, /* 미출수량 */

		{name: 'user_memo' 		, type: 'string' , persist : false   }, /* 작업 메모 */
		{name: 'line_clos'		, type:	'string' , defaultValue: '0' },/* 데이터 마감 0=마감전/1:마감후 */
		{name: 'line_stat'		, type: 'string' , defaultValue: '0' , persist : false },/* 데이터 상태 코드 */
		{name: 'upt_usr_nm' 	, type: 'string' }, /* 데이터 수정자 명 */
		{name: 'upt_dttm' 		, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr , persist : false }, /* 데이터 수정일시 */
		{name: 'crt_dttm' 		, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr , persist : false }, /* 데이터 생성일시 */
		{name: 'crt_usr_nm' 	, type: 'string' , defaultValue : _global.login_id , persist : false }, /* 데이터 생성자 명 */
		{name: 'confirm_dt'		, type: 'string' , convert : Ext.util.Format.strToDateTime , persist : false }, /* 주문확정일 , serialize: Ext.util.Format.dateToStr */

		{ name: 'sale_amnt'		, type : 'float'  , defaultValue : 0 }, /* 공급가 */
		{ name: 'vatx_amnt'		, type : 'float'  , defaultValue : 0 }, /* 부가새*/
	]

});
