Ext.define('module.qc.basic.iteminspstd.store.ItemInspStdItem2', { extend:'Axt.data.Store',
	model : 'module.qc.basic.iteminspstd.model.ItemInspStdItem2',
	pageSize : 30,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/basic/iteminspstd/get/item2.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});