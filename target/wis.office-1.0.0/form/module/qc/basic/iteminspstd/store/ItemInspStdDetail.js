Ext.define('module.qc.basic.iteminspstd.store.ItemInspStdDetail', { extend:'Axt.data.Store',
	model : 'module.qc.basic.iteminspstd.model.ItemInspStdDetail',
	pageSize : 30,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/basic/iteminspstd/get/detailsearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});