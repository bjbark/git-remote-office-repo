Ext.define('module.workshop.sale.order.estimast.store.EstiMastExcel', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.estimast.model.EstiMastExcel',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/sale/order/estimast/get/excel.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});