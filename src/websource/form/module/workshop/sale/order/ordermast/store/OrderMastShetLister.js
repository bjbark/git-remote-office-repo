Ext.define('module.workshop.sale.order.ordermast.store.OrderMastShetLister', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.ordermast.model.OrderMastShetLister',
	pageSize: 20,
	proxy:{
		api:{
			read	: _global.location.http()  + "/workshop/sale/order/ordermast/get/shet.do",
			update	: _global.location.http() + "/workshop/sale/order/ordermast/set/prnt_shet.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});