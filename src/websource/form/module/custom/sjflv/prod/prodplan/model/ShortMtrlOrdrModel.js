Ext.define('module.custom.sjflv.prod.prodplan.model.ShortMtrlOrdrModel', { extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'		, type: 'string'	// 주문번호
		},{	name: 'invc_qntt'		, type: 'float'		// 주문수량
		},{	name: 'item_name'		, type: 'string'	// 품목명
		},{	name: 'item_code'		, type: 'string'	// 품목코드
		},{	name: 'item_spec'		, type: 'string'	// 품목규격
		},{	name: 'need_qntt'		, type: 'float'		// 소요량
		}
	]
});