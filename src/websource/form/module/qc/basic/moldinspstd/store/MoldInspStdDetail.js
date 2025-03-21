Ext.define('module.qc.basic.moldinspstd.store.MoldInspStdDetail', { extend:'Axt.data.Store',
	model : 'module.qc.basic.moldinspstd.model.MoldInspStdDetail',
	pageSize : 30,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/basic/moldinspstd/get/detailsearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});