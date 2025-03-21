Ext.define('module.sale.order.saleorder2.store.SaleOrder2Detail', { extend:'Axt.data.Store',
	model: 'module.sale.order.saleorder2.model.SaleOrder2Detail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/sale/order/saleorder2/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
