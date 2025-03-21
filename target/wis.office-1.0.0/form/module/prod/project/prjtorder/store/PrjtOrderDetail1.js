Ext.define('module.prod.project.prjtorder.store.PrjtOrderDetail1', { extend:'Axt.data.Store',
	model : 'module.prod.project.prjtorder.model.PrjtOrderDetail1',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/cvic/prjtorder/get/detailsearch.do",
			update : _global.location.http() + "/prod/cvic/prjtorder/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});