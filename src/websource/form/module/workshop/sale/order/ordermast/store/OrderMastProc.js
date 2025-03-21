Ext.define('module.workshop.sale.order.ordermast.store.OrderMastProc', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.ordermast.model.OrderMast',
	pageSize: 500,
	proxy:{
		api:{
			update	: _global.location.http() + "/workshop/sale/order/ordermast/set/setProc.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});