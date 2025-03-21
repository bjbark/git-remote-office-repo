Ext.define('module.custom.iypkg.sale.order.estimast1.store.EstiMast1Upload', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.sale.order.estimast1.model.EstiMast1Upload',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/sale/order/estimast1/get/search.do",
			update: _global.api_host_info + "/system/custom/iypkg/sale/order/estimast1/excel.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
