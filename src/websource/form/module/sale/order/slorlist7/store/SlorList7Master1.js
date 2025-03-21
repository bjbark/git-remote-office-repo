Ext.define('module.sale.order.slorlist7.store.SlorList7Master1', { extend:'Axt.data.Store',
	model : 'module.sale.order.slorlist7.model.SlorList7Master1',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/order/slorlist7/get/search1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});