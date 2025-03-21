Ext.define('module.custom.sjflv.prod.prodplan.model.ProdPlanPopupLister', { extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'		, type: 'string'	// 주문번호		
		},{	name: 'line_seqn'		, type: 'string'	// 항번
		},{	name: 'plan_invc_numb'	, type: 'string'	// 생산계획 invc_numb
		},{	name: 'plan_line_seqn'	, type: 'string'	// 생산계획내역 line_seqn
		},{	name: 'cstm_idcd'		, type: 'string'	// 거래처ID
		},{	name: 'deli_date'		, type: 'string'	// 납기일자
			, convert: Ext.util.Format.strToDate
			, serialize: Ext.util.Format.dateToStr	
		},{	name: 'plan_date'		, type: 'string'	// 계획일자
			, convert: Ext.util.Format.strToDate
			, serialize: Ext.util.Format.dateToStr
			, defaultValue: Ext.Date.format(new Date(), 'Ymd')
		},{	name: 'prod_trst_dvcd'	, type: 'string'	// 생산구분
		},{	name: 'item_idcd'		, type: 'string'	// 제품ID
		},{	name: 'item_code'		, type: 'string'	// 제품코드
		},{	name: 'item_name'		, type: 'string'	// 품명
		},{	name: 'item_spec'		, type: 'string'	// 규격
		},{	name: 'invc_qntt'		, type: 'float'		// 주문수량
		},{	name: 'plan_baln_qntt'	, type: 'float'		// 계획잔량
		},{	name: 'stok_asgn_qntt'	, type: 'float'		// 재고할당
		},{	name: 'plan_qntt'		, type: 'float'		// 생산계획량
		},{	name: 'indn_qntt'		, type: 'float'		// 작업지시량
		},{	name: 'incm_loss_rate'	, type: 'float'		// loss율
		},{	name: 'revs_numb'		, type: 'string'	// 리비젼번호
		},{	name: 'pckg_unit'		, type: 'string'	// 포장단위
		},{	name: 'labl_qntt'		, type: 'int'		// 라벨수
		},{	name: 'remk_text'		, type: 'string'	// 특이사항
		}
	]
});