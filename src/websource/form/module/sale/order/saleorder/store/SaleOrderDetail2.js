Ext.define('module.sale.order.saleorder.store.SaleOrderDetail2', { extend:'Axt.data.Store',
	model : 'module.sale.order.saleorder.model.SaleOrderDetail2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/order/saleorder/get/detail2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});