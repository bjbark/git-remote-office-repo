Ext.define('module.workshop.sale.order.estimast.store.EstiMastBomListMaster', { extend:'Axt.data.TreeStore',
	model : 'module.workshop.sale.order.estimast.model.EstiMastBomListMaster',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/sale/order/estimast/get/mtrl_bom_list_master.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});