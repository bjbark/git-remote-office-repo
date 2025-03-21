Ext.define('module.custom.hjsys.sale.order.saleorder.store.SaleOrderExcel', { extend:'Axt.data.Store',
	model : 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderExcel',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/sale/order/saleorder/get/excel.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});