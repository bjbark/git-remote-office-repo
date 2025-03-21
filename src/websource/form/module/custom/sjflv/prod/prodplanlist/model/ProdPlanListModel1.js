Ext.define('module.custom.sjflv.prod.prodplanlist.model.ProdPlanListModel1',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'item_code'		, type: 'string'	// 제품코드
		},{	name: 'item_name'		, type: 'string'	// 제품명
		},{	name: 'item_spec'		, type: 'string'	// 제품규격
		},{	name: 'plan_qntt'		, type: 'string'	// 생산계획량
		},{	name: 'plan_date'		, type: 'string'	, convert: Ext.util.Format.strToDate	, serialize: Ext.util.Format.dateToStr	// 계획일자
		},{	name: 'deli_date'		, type: 'string'	, convert: Ext.util.Format.strToDate	, serialize: Ext.util.Format.dateToStr	// 납기일자
		}
	]
});
