Ext.define('module.custom.kortc.sale.order.sordermast.store.SorderMastUpload', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.sale.order.sordermast.model.SorderMastUpload',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/kortc/sale/order/sordermast/get/search.do",
			update: _global.api_host_info + "/system/custom/kortc/sale/order/sordermast/excel.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
