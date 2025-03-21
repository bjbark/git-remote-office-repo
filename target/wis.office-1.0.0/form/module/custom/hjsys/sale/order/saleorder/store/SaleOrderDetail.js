Ext.define('module.custom.hjsys.sale.order.saleorder.store.SaleOrderDetail', { extend:'Axt.data.Store',
	model: 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/hjsys/sale/order/saleorder/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
