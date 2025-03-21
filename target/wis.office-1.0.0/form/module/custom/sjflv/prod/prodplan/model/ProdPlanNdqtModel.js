Ext.define('module.custom.sjflv.prod.prodplan.model.ProdPlanNdqtModel', { extend:'Axt.data.Model',
	fields: [
		{	name: 'item_idcd'		, type: 'string'	// 제품ID
		},{	name: 'item_code'		, type: 'string'	// 제품코드
		},{	name: 'item_name'		, type: 'string'	// 품명
		},{	name: 'item_spec'		, type: 'string'	// 규격
		},{	name: 'plan_qntt'		, type: 'float'		// 소요량
		},{	name: 'stok_qntt'		, type: 'float'		// 재고량
		},{	name: 'baln_qntt'		, type: 'float'		// 과부족량
		},{	name: 'revs_numb'		, type: 'string'	// 재고여부
		}
	]
});