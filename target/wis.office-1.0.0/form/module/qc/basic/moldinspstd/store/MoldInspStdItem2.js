Ext.define('module.qc.basic.moldinspstd.store.MoldInspStdItem2', { extend:'Axt.data.Store',
	model : 'module.qc.basic.moldinspstd.model.MoldInspStdItem2',
	pageSize : 30,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/basic/moldinspstd/get/item2.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});