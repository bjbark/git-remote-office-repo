Ext.define('module.custom.hantop.sale.saleorder.store.SaleOrderDetail', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.sale.saleorder.model.SaleOrderDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/hantop/sale/order/saleorder/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
