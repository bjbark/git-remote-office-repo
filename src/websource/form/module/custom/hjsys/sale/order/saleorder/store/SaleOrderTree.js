Ext.define('module.custom.hjsys.sale.order.saleorder.store.SaleOrderTree', { extend:'Axt.data.TreeStore',
	model : 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderTree',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/sale/order/saleorder/get/tree.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});