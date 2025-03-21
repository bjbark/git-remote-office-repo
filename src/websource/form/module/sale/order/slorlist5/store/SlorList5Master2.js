Ext.define('module.sale.order.slorlist5.store.SlorList5Master2', { extend:'Axt.data.Store',
	model : 'module.sale.order.slorlist5.model.SlorList5Master2',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/order/slorlist5/get/search2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});