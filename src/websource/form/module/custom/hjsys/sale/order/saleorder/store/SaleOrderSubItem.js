Ext.define('module.custom.hjsys.sale.order.saleorder.store.SaleOrderSubItem', { extend:'Axt.data.Store',
	model : 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderSubItem',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/hjsys/sale/order/saleorder/get/subItem.do",
			 update	: _global.location.http() + "/custom/hjsys/sale/order/saleorder/set/subItems.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});