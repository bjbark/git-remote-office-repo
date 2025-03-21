Ext.define('module.custom.sjflv.item.bomprint.model.BomPrintLister1', { extend:'Axt.data.Model',
	fields: [
		{	name: 'line_stat'		, type: 'string'						// 상태
		},{	name: 'item_idcd'		, type: 'string'						// 품목ID
		},{	name: 'item_code'		, type: 'string'						// 품목코드
		},{	name: 'item_name'		, type: 'string'						// 품목명
		},{	name: 'cstm_idcd'		, type: 'string'						// 거래처코드
		},{	name: 'cstm_name'		, type: 'string'						// 거래처명
		}
	]
});
