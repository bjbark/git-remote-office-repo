Ext.define('module.workshop.sale.order.ordermast.store.OrderMastImage', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.ordermast.model.OrderMastTree',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/system/custom/hjsys/sale/order/ordermast/get/image.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});