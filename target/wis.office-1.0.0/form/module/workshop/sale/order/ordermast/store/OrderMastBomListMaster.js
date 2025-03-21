Ext.define('module.workshop.sale.order.ordermast.store.OrderMastBomListMaster', { extend:'Axt.data.TreeStore',
	model : 'module.workshop.sale.order.ordermast.model.OrderMastBomListMaster',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/sale/order/ordermast/get/mtrl_bom_list_master.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});