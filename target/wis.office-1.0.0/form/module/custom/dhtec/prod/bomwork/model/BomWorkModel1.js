Ext.define('module.custom.dhtec.prod.bomwork.model.BomWorkModel1',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'acct_name',			type: 'string'},		// 계정구분
		{name: 'acct_bacd',			type: 'string'},		// 계정분류코드
		{name: 'item_idcd',			type: 'string'},		// 품목ID
		{name: 'item_code',			type: 'string'},		// 품목코드
		{name: 'item_name',			type: 'string'},		// 품목명
		{name: 'item_spec',			type: 'string'},		// 품목규격
	]
});
