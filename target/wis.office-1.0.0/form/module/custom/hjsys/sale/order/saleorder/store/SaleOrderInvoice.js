Ext.define('module.custom.hjsys.sale.order.saleorder.store.SaleOrderInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/hjsys/sale/order/saleorder/get/invoice.do",
			update: _global.api_host_info + "/system/custom/hjsys/sale/order/saleorder/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
