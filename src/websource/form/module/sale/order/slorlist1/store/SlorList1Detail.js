Ext.define('module.sale.order.slorlist1.store.SlorList1Detail', { extend:'Axt.data.Store',
	model : 'module.sale.order.slorlist1.model.SlorList1Detail',
	pageSize : 1000,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/order/slorlist1/get/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});