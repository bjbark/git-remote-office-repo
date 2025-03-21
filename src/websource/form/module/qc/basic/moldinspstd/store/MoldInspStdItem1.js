Ext.define('module.qc.basic.moldinspstd.store.MoldInspStdItem1', { extend:'Axt.data.Store',
	model : 'module.qc.basic.moldinspstd.model.MoldInspStdItem1',
	pageSize : 30,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/basic/moldinspstd/get/item1.do",
			update : _global.location.http() + "/qc/basic/moldinspstd/set/item1.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});