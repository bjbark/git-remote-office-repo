Ext.define('module.custom.sjflv.prod.prodplan.model.ProdPlanLister2', { extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'		, type: 'string'	// 계획번호
		},{	name: 'line_seqn'		, type: 'string'	// 순번
		},{	name: 'plan_date'		, type: 'string'	, convert: Ext.util.Format.strToDate	, serialize: Ext.util.Format.dateToStr	// 계획일자
		},{	name: 'acpt_invc_numb'	, type: 'string'	// 주문번호
		},{	name: 'cstm_idcd'		, type: 'string'	// 거래처ID
		},{	name: 'acpt_line_seqn'	, type: 'string'	// 항번
		},{	name: 'deli_date'		, type: 'string'	, convert: Ext.util.Format.strToDate	, serialize: Ext.util.Format.dateToStr	// 납기일자
		},{	name: 'prod_trst_dvcd'	, type: 'string'	// 생산구분
		},{	name: 'cstm_name'		, type: 'string'	// 거래처명
		},{	name: 'item_idcd'		, type: 'string'	// 제품ID
		},{	name: 'item_code'		, type: 'string'	// 제품코드
		},{	name: 'item_name'		, type: 'string'	// 품명
		},{	name: 'item_spec'		, type: 'string'	// 규격
		},{	name: 'invc_qntt'		, type: 'float'		// 주문수량
		},{	name: 'stok_qntt'		, type: 'float'		// 재고수량
		},{	name: 'stok_asgn_qntt'	, type: 'float'		// 재고할당
		},{	name: 'add_plan_qntt'	, type: 'float'		// 추가생산량
		},{	name: 'plan_qntt'		, type: 'float'		// 생산계획량
		},{	name: 'plan_baln_qntt'	, type: 'float'		// 계획잔량
		},{	name: 'indn_qntt'		, type: 'float'		// 작업지시량
		},{	name: 'need_stok_yorn'	, type: 'string'	// 원재료재고여부
		},{	name: 'remk_text'		, type: 'string'	// 특이사항
		}
	]
});
