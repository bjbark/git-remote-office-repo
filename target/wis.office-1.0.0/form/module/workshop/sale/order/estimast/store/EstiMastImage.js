Ext.define('module.workshop.sale.order.estimast.store.EstiMastImage', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.estimast.model.EstiMastTree',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/system/custom/hjsys/sale/order/estimast/get/image.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});