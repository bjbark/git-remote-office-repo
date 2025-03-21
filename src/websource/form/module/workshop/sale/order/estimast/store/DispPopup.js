Ext.define('module.workshop.sale.order.estimast.store.DispPopup', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.estimast.model.DispPopup',
	pageSize: 20,
	proxy:{
		api:{
			read	: _global.location.http() + "/workshop/sale/order/estimast/get/clsslookup.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});