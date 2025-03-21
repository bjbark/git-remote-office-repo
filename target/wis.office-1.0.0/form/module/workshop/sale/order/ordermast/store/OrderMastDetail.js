Ext.define('module.workshop.sale.order.ordermast.store.OrderMastDetail', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.ordermast.model.OrderMastDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/workshop/sale/order/ordermast/get/search.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
