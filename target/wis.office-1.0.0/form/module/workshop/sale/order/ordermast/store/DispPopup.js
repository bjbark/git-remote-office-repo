Ext.define('module.workshop.sale.order.ordermast.store.DispPopup', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.ordermast.model.DispPopup',
	pageSize: 20,
	proxy:{
		api:{
			read	: _global.location.http() + "/workshop/sale/order/ordermast/get/clsslookup.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});