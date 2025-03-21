Ext.define('module.workshop.sale.order.ordermast.store.OrderMastProcLister', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.ordermast.model.OrderMastProcLister',
	pageSize: 20,
	proxy:{
		api:{
			read	: _global.location.http()  + "/workshop/sale/order/ordermast/get/proc.do",
			update	: _global.location.http() + "/workshop/sale/order/ordermast/set/prnt_proc.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});