Ext.define('module.workshop.sale.order.ordermast.store.OrderMastExcel', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.ordermast.model.OrderMastExcel',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/sale/order/ordermast/get/excel.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});