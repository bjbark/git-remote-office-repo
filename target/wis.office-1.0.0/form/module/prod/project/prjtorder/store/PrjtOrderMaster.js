Ext.define('module.prod.project.prjtorder.store.PrjtOrderMaster', { extend:'Axt.data.Store',
	model : 'module.prod.project.prjtorder.model.PrjtOrderMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/cvic/prjtorder/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});