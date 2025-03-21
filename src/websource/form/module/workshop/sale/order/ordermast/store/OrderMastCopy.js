Ext.define('module.workshop.sale.order.ordermast.store.OrderMastCopy', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.ordermast.model.OrderMast',
	pageSize: 20,
	proxy:{
		api:{
			read	: _global.location.http() + "/workshop/sale/order/ordermast/get/search.do",
			update	: _global.location.http() + "/workshop/sale/order/ordermast/set/records.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});