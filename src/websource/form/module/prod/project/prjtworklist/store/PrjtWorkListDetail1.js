Ext.define('module.prod.project.prjtworklist.store.PrjtWorkListDetail1', { extend:'Axt.data.Store',
	model : 'module.prod.project.prjtworklist.model.PrjtWorkListDetail1',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/project/prjtworklist/get/search1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});