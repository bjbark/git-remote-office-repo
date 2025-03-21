Ext.define('module.prod.basic.prodlineroute.store.ProdLineRoute', { extend:'Axt.data.Store',
	model : 'module.prod.basic.prodlineroute.model.ProdLineRoute',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/basic/prodlineroute/get/SearchLister.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});