Ext.define('module.workshop.sale.order.estimast.store.EstiMastProcLister', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.estimast.model.EstiMastProcLister',
	pageSize: 20,
	proxy:{
		api:{
			read	: _global.location.http()  + "/workshop/sale/order/estimast/get/proc.do",
			update	: _global.location.http() + "/workshop/sale/order/estimast/set/prnt_proc.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});