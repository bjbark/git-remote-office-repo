Ext.define('module.custom.hjsys.sale.order.saleorder.store.SaleOrderBomListDetail', { extend:'Axt.data.TreeStore',
	model : 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderBomListDetail',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
//			read	: _global.location.http() + "/custom/hjsys/sale/order/saleorder/get/tree.do"
			read	: _global.location.http() + "/custom/hjsys/sale/order/saleorder/get/mtrl_bom_list_detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});