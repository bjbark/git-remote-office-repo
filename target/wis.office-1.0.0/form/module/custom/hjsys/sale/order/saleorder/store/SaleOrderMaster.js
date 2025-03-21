Ext.define('module.custom.hjsys.sale.order.saleorder.store.SaleOrderMaster', { extend:'Axt.data.Store',
	model: 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderMaster',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/hjsys/sale/order/saleorder/get/master.do",
			update: _global.api_host_info + "/system/custom/hjsys/sale/order/saleorder/set/master.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
