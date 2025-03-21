Ext.define('module.sale.sale.saleosttlist.model.SaleOsttListPart5', { extend : 'Axt.data.Model',
	fields :
	[
		{ name: 'stor_grp'		, type : 'string' }, /* 사업장 그룹 ID */
		{ name: 'stor_id'		, type : 'string' }, /* 사업장 ID */
		{ name: 'stor_nm'		, type : 'string' }, /* 사업장명 */
		{ name: 'mngt_stor_id'	, type : 'string' }, /* 관리사업장 ID */
		{ name: 'owner_nm'		, type : 'string' }, /* 관리사업장명 */
		{ name: 'cstm_idcd'		, type : 'string' }, /* 고객 ID */
		{ name: 'cust_cd'		, type : 'string' }, /* 고객 CD */
		{ name: 'cstm_name'		, type : 'string' }, /* 고객 명 */
		{ name: 'cust_sts'		, type : 'string' }, /* 거래상태 */
		{ name: 'drtr_idcd'		, type : 'string' }, /* 작업 담당자 ID */
		{ name: 'user_memo'		, type : 'string' },
		{ name: 'line_clos'		, type : 'string' },
		{ name: 'invc_date'		, type : 'string' },
		{ name: 'bzpl_idcd'		, type : 'string' },

		{ name: 'inv_amt'		, type : 'float'  , defaultValue : 0 }, /* 출고수량 */
		{ name: 'sale_amnt'		, type : 'float'  , defaultValue : 0 }, /* 공급가 */
		{ name: 'vatx_amnt'		, type : 'float'  , defaultValue : 0 }, /* 부가새*/
		{ name: 'ttsm_amnt'		, type : 'float'  , defaultValue : 0 }, /* 합계금액 */
		{ name: 'payment'		, type : 'float'  , defaultValue : 0 }, /* 결제합계 */
		{ name: 'npay_amt'		, type : 'float'  , defaultValue : 0 }  /* 미수금 */

	]

});
