Ext.define('module.custom.sjflv.prod.prodplanlist.model.ProdPlanListModel2',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'acct_name'			, type: 'string'	// 계정구분
		},{	name: 'item_code'			, type: 'string'	// 원재료코드
		},{	name: 'item_name'			, type: 'string'	// 원재료명
		},{	name: 'item_spec'			, type: 'string'	// 원재료규격
		},{	name: 'need_qntt'			, type: 'float'		// 소요량
		},{	name: 'acpt_numb'			, type: 'string'	// 수주번호
		},{	name: 'prnt_item_code'		, type: 'string'	// 제품코드
		},{	name: 'prnt_item_name'		, type: 'string'	// 품명
		},{	name: 'prnt_item_spec'		, type: 'string'	// 규격
		},{	name: 'plan_qntt'			, type: 'float'		// 생산계획량
		},{	name: 'deli_date'			, type: 'string'	, convert: Ext.util.Format.strToDate	, serialize: Ext.util.Format.dateToStr	// 납기일자
		},{	name: 'plan_date'			, type: 'string'	, convert: Ext.util.Format.strToDate	, serialize: Ext.util.Format.dateToStr	// 계획일자
		}
	]
});
