Ext.define('module.workshop.sale.order.ordermast.store.OrderMastInvoice', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.ordermast.model.OrderMastInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/hjsys/sale/order/ordermast/get/invoice.do",
			update: _global.api_host_info + "/system/custom/hjsys/sale/order/ordermast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
