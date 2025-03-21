Ext.define('module.prod.basic.prodlineroute.store.ProdLineRouteDetail', { extend:'Axt.data.Store',
	model : 'module.prod.basic.prodlineroute.model.ProdLineRouteDetail',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/basic/prodlineroute/get/SearchLister2.do"
			,update : _global.location.http() + "/prod/basic/prodlineroute/set/record.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});