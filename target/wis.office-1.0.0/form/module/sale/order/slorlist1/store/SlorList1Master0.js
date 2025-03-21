Ext.define('module.sale.order.slorlist1.store.SlorList1Master0', { extend:'Axt.data.Store',
	model : 'module.sale.order.slorlist1.model.SlorList1Master0',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/order/slorlist1/get/search0.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});