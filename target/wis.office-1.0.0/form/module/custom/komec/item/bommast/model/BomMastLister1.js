Ext.define('module.custom.komec.item.bommast.model.BomMastLister1', { extend:'Axt.data.Model',
	fields: [
		{	name: 'line_stat'		, type: 'string'						// 상태
		},{	name: 'item_idcd'		, type: 'string'						// 품목ID
		},{	name: 'item_code'		, type: 'string'						// 품목코드
		},{	name: 'item_name'		, type: 'string'						// 품목명
		},{	name: 'item_spec'		, type: 'string'						// 품목규격
		},{	name: 'cstm_idcd'		, type: 'string'						// 거래처코드
		},{	name: 'cstm_name'		, type: 'string'						// 거래처명
		},{	name: 'acct_name'		, type: 'string'						// 계정구분
		},{	name: 'acct_bacd'		, type: 'string'						// 계정코드
		}
	]
});
