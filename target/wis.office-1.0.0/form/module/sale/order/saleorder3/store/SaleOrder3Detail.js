Ext.define('module.sale.order.saleorder3.store.SaleOrder3Detail', { extend:'Axt.data.Store',
	model: 'module.sale.order.saleorder3.model.SaleOrder3Detail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/sale/order/saleorder3/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
