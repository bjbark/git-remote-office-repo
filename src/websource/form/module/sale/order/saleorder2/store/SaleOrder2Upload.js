Ext.define('module.sale.order.saleorder2.store.SaleOrder2Upload', { extend:'Axt.data.Store',
	model: 'module.sale.order.saleorder2.model.SaleOrder2Upload',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/order/saleorder2/get/search.do",
			update: _global.api_host_info + "/system/sale/order/saleorder2/excel.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
