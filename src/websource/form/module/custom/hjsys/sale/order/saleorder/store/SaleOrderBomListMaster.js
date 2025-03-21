Ext.define('module.custom.hjsys.sale.order.saleorder.store.SaleOrderBomListMaster', { extend:'Axt.data.TreeStore',
	model : 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderBomListMaster',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/sale/order/saleorder/get/mtrl_bom_list_master.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});