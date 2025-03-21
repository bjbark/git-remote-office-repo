Ext.define('module.workshop.sale.order.estimast.store.EstiMastDetail', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.estimast.model.EstiMastDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/workshop/sale/order/estimast/get/search.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
