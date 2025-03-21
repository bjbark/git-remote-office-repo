Ext.define('module.custom.sjflv.mtrl.po.purcordrndqt.model.PurcOrdrNdqtLister1', { extend:'Axt.data.Model',
	fields: [
		{	name: 'item_idcd'		, type: 'string'						// 품목ID
		},{	name: 'item_code'		, type: 'string'						// 품목코드
		},{	name: 'item_name'		, type: 'string'						// 품목명
		},{	name: 'item_spec'		, type: 'string'						// 품목규격
		},{	name: 'mixx_qntt'		, type: 'string'						// 수량
		},{	name: 'prod_qntt'		, type: 'string'						// 소요량
		},{	name: 'loss_qntt'		, type: 'string'						// 소요량
		},{	name: 'loss_rate'		, type: 'string'						// 소요량
		},{	name: 'stok_qntt'		, type: 'string', defaultValue : 0		// 재고량
		}
	]
});
