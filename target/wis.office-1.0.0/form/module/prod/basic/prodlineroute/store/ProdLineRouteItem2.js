Ext.define('module.prod.basic.prodlineroute.store.ProdLineRouteItem2', { extend:'Axt.data.Store',
	model : 'module.prod.basic.prodlineroute.model.ProdLineRouteItem2',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/basic/prodlineroute/get/SearchLister4.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});