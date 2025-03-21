Ext.define('module.sale.order.estimast.store.EstiMastDetail', { extend:'Axt.data.Store',
	model: 'module.sale.order.estimast.model.EstiMastDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/sale/order/estimast/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
