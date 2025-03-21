Ext.define('module.custom.sjflv.prod.prodplanlist.model.ProdPlanListPopupModel1',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'		, type: 'string'	// 계획번호
		},{	name: 'line_seqn'		, type: 'string'	// 계획Seqn
		},{	name: 'acpt_numb'		, type: 'string'	// 수주번호
		},{	name: 'plan_qntt'		, type: 'string'	// 생산계획량
		},{	name: 'item_name'		, type: 'string'	// 제품명
		},{	name: 'item_code'		, type: 'string'	// 제품코드
		},{	name: 'item_spec'		, type: 'string'	// 제품규격
		},{	name: 'deli_date'		, type: 'string'	, convert: Ext.util.Format.strToDate	, serialize: Ext.util.Format.dateToStr	// 납기일자
		}
	]
});
