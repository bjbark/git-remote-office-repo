Ext.define('module.custom.hjsys.sale.order.saleorder.store.SaleOrderMainItem', { extend:'Axt.data.Store',
	model : 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderMainItem',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/hjsys/sale/order/saleorder/get/mainItem.do",
			 update	: _global.location.http() + "/custom/hjsys/sale/order/saleorder/set/subItems.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});