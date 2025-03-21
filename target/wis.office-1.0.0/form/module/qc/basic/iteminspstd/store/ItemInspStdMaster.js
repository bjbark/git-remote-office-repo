Ext.define('module.qc.basic.iteminspstd.store.ItemInspStdMaster', { extend:'Axt.data.Store',
	model : 'module.qc.basic.iteminspstd.model.ItemInspStdMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/basic/iteminspstd/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});