Ext.define('module.sale.order.slorlist2.store.SlorList2Master2', { extend:'Axt.data.Store',
	model : 'module.sale.order.slorlist2.model.SlorList2Master',
	pageSize : 210,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/order/slorlist2/get/search2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});