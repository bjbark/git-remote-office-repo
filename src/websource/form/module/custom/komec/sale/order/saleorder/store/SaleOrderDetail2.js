Ext.define( 'module.custom.komec.sale.order.saleorder.store.SaleOrderDetail2', { extend:'Axt.data.Store',
	model : 'module.custom.komec.sale.order.saleorder.model.SaleOrderDetail2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy : {
		api : {
			read	: _global.api_host_info + "/system/custom/komec/sale/order/saleorder/get/detail2.do"
		},
		actionMethods : { read: 'POST' },
		extraParams : { token : _global.token_id }
	}
});