Ext.define('module.qc.basic.iteminspstd.store.ItemInspStdItem1', { extend:'Axt.data.Store',
	model : 'module.qc.basic.iteminspstd.model.ItemInspStdItem1',
	pageSize : 30,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/basic/iteminspstd/get/item1.do",
			update : _global.location.http() + "/qc/basic/iteminspstd/set/item1.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});