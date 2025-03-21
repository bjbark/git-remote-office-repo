Ext.define('module.prod.order.prodinput.store.ProdInputDetail2', { extend:'Axt.data.Store',
	model : 'module.prod.order.prodinput.model.ProdInputDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/order/prodinput/get/detailsearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});