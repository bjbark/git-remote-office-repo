Ext.define('module.custom.hjsys.sale.order.saleorder.store.SaleOrderImage', { extend:'Axt.data.Store',
	model : 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderTree',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/system/custom/hjsys/sale/order/saleorder/get/image.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});