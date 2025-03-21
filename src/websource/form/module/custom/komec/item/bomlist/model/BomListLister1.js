Ext.define('module.custom.komec.item.bomlist.model.BomListLister1', { extend:'Axt.data.Model',
	fields: [
		{	name: 'line_stat'		, type: 'string'						// 상태
		},{	name: 'acct_name'		, type: 'string'						// 계정구분
		},{	name: 'item_idcd'		, type: 'string'						// 품목ID
		},{	name: 'item_code'		, type: 'string'						// 품목코드
		},{	name: 'item_name'		, type: 'string'						// 품목명
		},{	name: 'item_spec'		, type: 'string'						// 품목규격
		},{	name: 'cstm_idcd'		, type: 'string'						// 거래처코드
		},{	name: 'cstm_name'		, type: 'string'						// 거래처명
		}
	]
});
