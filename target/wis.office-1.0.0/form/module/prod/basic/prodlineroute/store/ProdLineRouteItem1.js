Ext.define('module.prod.basic.prodlineroute.store.ProdLineRouteItem1', { extend:'Axt.data.Store',
	model : 'module.prod.basic.prodlineroute.model.ProdLineRouteItem1',
	pageSize : 100,
	proxy : {
		api : {
			 read	: _global.location.http() + "/prod/basic/prodlineroute/get/SearchLister3.do"
			,update : _global.location.http() + "/prod/basic/prodlineroute/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});