Ext.define('module.sale.order.slorlist1.store.SlorList1Master1', { extend:'Axt.data.Store',
	model : 'module.sale.order.slorlist1.model.SlorList1Master',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/order/slorlist1/get/search1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});