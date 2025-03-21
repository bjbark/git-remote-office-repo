Ext.define('module.workshop.sale.order.estimast.store.EstiMastProc', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.estimast.model.EstiMast',
	pageSize: 500,
	proxy:{
		api:{
			update	: _global.location.http() + "/workshop/sale/order/estimast/set/setProc.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});