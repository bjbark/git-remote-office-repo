Ext.define('module.qc.basic.moldinspstd.store.MoldInspStdMaster', { extend:'Axt.data.Store',
	model : 'module.qc.basic.moldinspstd.model.MoldInspStdMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/basic/moldinspstd/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});