Ext.define('module.sale.order.slorlist5.store.SlorList5Master1', { extend:'Axt.data.Store',
	model : 'module.sale.order.slorlist5.model.SlorList5Master1',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/order/slorlist5/get/search1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});